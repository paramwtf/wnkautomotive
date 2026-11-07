import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHOWCASE_PROJECTS, ShowcaseProject } from './PerspectiveStack';

export interface WebGLStackedCarouselProps {
  images?: string[];
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  direction?: 'forward' | 'backward';
  pitch?: number;
  yaw?: number;
  speed?: number;
  onSelectProject?: (project: ShowcaseProject) => void;
}

// 24 slots to ensure minimum 20 planes deep stack
const SLOT_COUNT = 24;

export const WebGLStackedCarousel: React.FC<WebGLStackedCarouselProps> = ({
  cardWidth = 420,
  cardHeight = 300,
  gap = 100,
  direction = 'forward',
  pitch = 14,
  yaw = -22,
  speed = 100,
  onSelectProject,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null);
  const [isWebGlSupported, setIsWebGlSupported] = useState<boolean>(true);
  const [selectedModalProject, setSelectedModalProject] = useState<ShowcaseProject | null>(null);

  const navigate = useNavigate();

  // Map slots to projects
  const deckSlots = useRef<
    Array<{
      slotId: number;
      project: ShowcaseProject;
      imageSrc: string;
      hoverFactor: number;
    }>
  >([]);

  useEffect(() => {
    deckSlots.current = Array.from({ length: SLOT_COUNT }, (_, i) => {
      const proj = SHOWCASE_PROJECTS[i % SHOWCASE_PROJECTS.length];
      const imageSrc =
        i % 2 === 1 && proj.secondaryImage ? proj.secondaryImage : proj.image;
      return {
        slotId: i,
        project: proj,
        imageSrc,
        hoverFactor: 0,
      };
    });
  }, []);

  // WebGL rendering engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl =
        (canvas.getContext('webgl', { antialias: true, alpha: true, depth: true }) as WebGLRenderingContext) ||
        (canvas.getContext('experimental-webgl', { antialias: true, alpha: true, depth: true }) as WebGLRenderingContext);
    } catch {
      setIsWebGlSupported(false);
      return;
    }

    if (!gl) {
      setIsWebGlSupported(false);
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec3 aPosition;
      attribute vec2 aTexCoord;
      uniform mat4 uProjection;
      uniform mat4 uView;
      uniform mat4 uModel;
      varying vec2 vTexCoord;
      varying float vDepth;
      void main() {
        vTexCoord = aTexCoord;
        vec4 viewPos = uView * uModel * vec4(aPosition, 1.0);
        vDepth = -viewPos.z;
        gl_Position = uProjection * viewPos;
      }
    `;

    // Fragment Shader
    const fsSource = `
      precision mediump float;
      uniform sampler2D uTexture;
      uniform float uFade;
      uniform float uIsHovered;
      varying vec2 vTexCoord;
      varying float vDepth;
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        // Soft depth atmospheric shading
        float fog = clamp((vDepth - 400.0) / 3200.0, 0.0, 0.45);
        vec3 finalRgb = mix(color.rgb, vec3(0.96, 0.96, 0.95), fog);
        // Hover highlight rim
        if (uIsHovered > 0.01) {
          finalRgb += vec3(0.06, 0.06, 0.06) * uIsHovered;
        }
        gl_FragColor = vec4(finalRgb, color.a * uFade);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      setIsWebGlSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setIsWebGlSupported(false);
      return;
    }
    gl.useProgram(program);

    // Locations
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    const aTexCoord = gl.getAttribLocation(program, 'aTexCoord');
    const uProjection = gl.getUniformLocation(program, 'uProjection');
    const uView = gl.getUniformLocation(program, 'uView');
    const uModel = gl.getUniformLocation(program, 'uModel');
    const uTexture = gl.getUniformLocation(program, 'uTexture');
    const uFade = gl.getUniformLocation(program, 'uFade');
    const uIsHovered = gl.getUniformLocation(program, 'uIsHovered');

    // Quad geometry (card quad)
    const halfW = cardWidth / 2;
    const halfH = cardHeight / 2;
    // prettier-ignore
    const vertices = new Float32Array([
      -halfW, -halfH, 0.0,   0.0, 1.0,
       halfW, -halfH, 0.0,   1.0, 1.0,
       halfW,  halfH, 0.0,   1.0, 0.0,
      -halfW,  halfH, 0.0,   0.0, 0.0,
    ]);
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 5 * 4, 0);

    gl.enableVertexAttribArray(aTexCoord);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 5 * 4, 3 * 4);

    // Matrix helpers
    function mat4Perspective(fovRad: number, aspect: number, near: number, far: number): Float32Array {
      const f = 1.0 / Math.tan(fovRad / 2);
      const nf = 1 / (near - far);
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, (2 * far * near) * nf, 0,
      ]);
    }

    function mat4Identity(): Float32Array {
      return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ]);
    }

    function mat4Multiply(a: Float32Array, b: Float32Array): Float32Array {
      const out = new Float32Array(16);
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          out[c * 4 + r] =
            a[0 * 4 + r] * b[c * 4 + 0] +
            a[1 * 4 + r] * b[c * 4 + 1] +
            a[2 * 4 + r] * b[c * 4 + 2] +
            a[3 * 4 + r] * b[c * 4 + 3];
        }
      }
      return out;
    }

    function mat4Translate(x: number, y: number, z: number): Float32Array {
      const m = mat4Identity();
      m[12] = x;
      m[13] = y;
      m[14] = z;
      return m;
    }

    function mat4RotateX(rad: number): Float32Array {
      const m = mat4Identity();
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      m[5] = c;
      m[6] = s;
      m[9] = -s;
      m[10] = c;
      return m;
    }

    function mat4RotateY(rad: number): Float32Array {
      const m = mat4Identity();
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      m[0] = c;
      m[2] = -s;
      m[8] = s;
      m[10] = c;
      return m;
    }

    // Load textures
    const textureMap = new Map<string, WebGLTexture>();
    function getTexture(src: string): WebGLTexture {
      if (textureMap.has(src)) return textureMap.get(src)!;
      const tex = gl!.createTexture()!;
      textureMap.set(src, tex);

      // 1x1 placeholder
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        gl!.RGBA,
        1,
        1,
        0,
        gl!.RGBA,
        gl!.UNSIGNED_BYTE,
        new Uint8Array([240, 240, 240, 255])
      );

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        gl!.bindTexture(gl!.TEXTURE_2D, tex);
        gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, 1);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, img);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      };

      return tex;
    }

    // Preload textures
    SHOWCASE_PROJECTS.forEach((p) => {
      getTexture(p.image);
      if (p.secondaryImage) getTexture(p.secondaryImage);
    });

    // Interaction & Animation State
    let scrollPos = 0;
    let targetWheelDelta = 0;
    let isHovering = false;
    let currentHoverIdx: number | null = null;
    let mouseX = -9999;
    let mouseY = -9999;
    let animFrameId: number;
    let lastTimestamp = performance.now();

    const totalDeckSpan = SLOT_COUNT * gap;
    const pitchRad = (pitch * Math.PI) / 180;
    const yawRad = (yaw * Math.PI) / 180;

    // View matrix
    const viewMat = mat4Translate(0, 0, -1100);

    // Mouse picking hit-test
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      mouseX = -9999;
      mouseY = -9999;
      currentHoverIdx = null;
      setHoveredCardIdx(null);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Wheel input accumulates into damped scroll
      targetWheelDelta += e.deltaY * 0.75;
    };

    const handleClick = () => {
      if (currentHoverIdx !== null && deckSlots.current[currentHoverIdx]) {
        const proj = deckSlots.current[currentHoverIdx].project;
        if (onSelectProject) {
          onSelectProject(proj);
        } else {
          setSelectedModalProject(proj);
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('click', handleClick);

    // Render loop
    const render = (now: number) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      // Resize canvas to display size
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;
      if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
        gl!.viewport(0, 0, canvas.width, canvas.height);
      }

      // Wheel damping
      scrollPos += targetWheelDelta * dt * 3.5;
      targetWheelDelta *= Math.pow(0.05, dt);

      // Continuous idle drift
      const dirMult = direction === 'forward' ? 1 : -1;
      scrollPos += speed * 0.45 * dirMult * dt;

      // Keep scroll within positive loop
      while (scrollPos < 0) scrollPos += totalDeckSpan;
      scrollPos = scrollPos % totalDeckSpan;

      // Projection
      const aspect = canvas.width / canvas.height;
      const projMat = mat4Perspective((46 * Math.PI) / 180, aspect, 10, 8000);

      // GL State
      gl!.enable(gl!.DEPTH_TEST);
      gl!.depthFunc(gl!.LEQUAL);
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.clearColor(0.97, 0.97, 0.96, 0.0);
      gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);

      gl!.uniformMatrix4fv(uProjection, false, projMat);
      gl!.uniformMatrix4fv(uView, false, viewMat);

      // Compute card planes
      interface CardRenderItem {
        idx: number;
        z: number;
        viewZ: number;
        modelMat: Float32Array;
        hoverFactor: number;
        imageSrc: string;
        project: ShowcaseProject;
      }

      const renderList: CardRenderItem[] = [];

      for (let i = 0; i < SLOT_COUNT; i++) {
        const slot = deckSlots.current[i];
        if (!slot) continue;

        // Position in Z relative to scroll
        let rawZ = i * gap - scrollPos;
        while (rawZ < -gap * 2) rawZ += totalDeckSpan;
        while (rawZ > totalDeckSpan - gap * 2) rawZ -= totalDeckSpan;

        // Hover tweening: 1.2s flatten duration
        const isTargetHovered = isHovering && currentHoverIdx === i;
        const targetHover = isTargetHovered ? 1.0 : 0.0;
        // Tween towards target
        const hoverSpeed = isTargetHovered ? 1.0 / 1.2 : 2.5; // flatten over 1.2s
        if (slot.hoverFactor < targetHover) {
          slot.hoverFactor = Math.min(targetHover, slot.hoverFactor + dt * hoverSpeed);
        } else if (slot.hoverFactor > targetHover) {
          slot.hoverFactor = Math.max(targetHover, slot.hoverFactor - dt * hoverSpeed);
        }

        // Neighbors in Z pushed apart when a card is hovered
        let zOffset = 0;
        if (currentHoverIdx !== null && currentHoverIdx !== i) {
          const diff = i - currentHoverIdx;
          const activeCardHover = deckSlots.current[currentHoverIdx]?.hoverFactor || 0;
          if (activeCardHover > 0.01) {
            if (diff > 0) zOffset = 70 * activeCardHover;
            else if (diff < 0) zOffset = -70 * activeCardHover;
          }
        }

        const finalZ = -rawZ + zOffset;

        // Model matrix calculation:
        // Base stack orientation: tilted by yaw and pitch
        // When hovered: card's local rotation tweens to the inverse of the deck's, flattening square to camera!
        const hf = slot.hoverFactor;
        const curPitch = pitchRad * (1 - hf);
        const curYaw = yawRad * (1 - hf);

        // Deck center anchor
        const tDeck = mat4Translate(0, 0, finalZ);
        const rotX = mat4RotateX(curPitch);
        const rotY = mat4RotateY(curYaw);
        const tOffset = mat4Translate(0, 0, 0);

        let model = mat4Multiply(tDeck, rotY);
        model = mat4Multiply(model, rotX);
        model = mat4Multiply(model, tOffset);

        renderList.push({
          idx: i,
          z: finalZ,
          viewZ: finalZ,
          modelMat: model,
          hoverFactor: slot.hoverFactor,
          imageSrc: slot.imageSrc,
          project: slot.project,
        });
      }

      // Painter sorting: back to front by view depth
      renderList.sort((a, b) => a.z - b.z);

      // Simple CPU ray picking hit detection against front face
      if (isHovering && mouseX >= 0 && mouseY >= 0) {
        // Approximate screen projection picking:
        // Check cards from front to back (closest to camera first)
        let hitIdx: number | null = null;
        for (let j = renderList.length - 1; j >= 0; j--) {
          const item = renderList[j];
          // Transform center point to screen
          const cz = item.z - 1100;
          if (cz > -100) continue; // Behind or clipping camera

          // Screen coords estimate
          const fov = 46 * (Math.PI / 180);
          const f = 1.0 / Math.tan(fov / 2);
          const projScale = f / -cz;
          const sx = displayW / 2 + (0 * projScale * displayW) / 2;
          const sy = displayH / 2 - (0 * projScale * displayH) / 2;
          const sw = (cardWidth * projScale * displayW) / (2 * aspect);
          const sh = (cardHeight * projScale * displayH) / 2;

          if (
            mouseX >= sx - sw * 0.7 &&
            mouseX <= sx + sw * 0.7 &&
            mouseY >= sy - sh * 0.7 &&
            mouseY <= sy + sh * 0.7
          ) {
            hitIdx = item.idx;
            break;
          }
        }

        if (hitIdx !== currentHoverIdx) {
          currentHoverIdx = hitIdx;
          setHoveredCardIdx(hitIdx);
          if (hitIdx !== null && deckSlots.current[hitIdx]) {
            setActiveProject(deckSlots.current[hitIdx].project);
          }
        }
      }

      // Draw each quad
      renderList.forEach((item) => {
        gl!.uniformMatrix4fv(uModel, false, item.modelMat);
        gl!.uniform1f(uIsHovered, item.hoverFactor);

        // Distance fade at back of tunnel
        const distFade = Math.max(0.0, Math.min(1.0, 1.0 - (item.z + 1800) / 2200));
        gl!.uniform1f(uFade, distFade);

        const tex = getTexture(item.imageSrc);
        gl!.activeTexture(gl!.TEXTURE0);
        gl!.bindTexture(gl!.TEXTURE_2D, tex);
        gl!.uniform1i(uTexture, 0);

        gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0);
      });

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('click', handleClick);
    };
  }, [cardWidth, cardHeight, gap, direction, pitch, yaw, speed, onSelectProject]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] sm:h-[680px] lg:h-[760px] bg-[#f7f7f6] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Editorial HUD & Controls */}
      <div className="absolute top-6 left-6 sm:left-10 z-20 pointer-events-none">
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-muted block mb-1">
          WEBGL 3D DECK / INTERACTIVE
        </span>
        <h2 className="font-sans font-medium text-[24px] sm:text-[32px] text-ink">
          Z-Axis Stacked Gallery<span className="text-[#e61919]">.</span>
        </h2>
        <p className="font-sans text-[13px] text-secondary max-w-sm mt-1">
          Scroll wheel navigates the deck. Hover any card to flatten it square to view.
        </p>
      </div>

      <div className="absolute top-6 right-6 sm:right-10 z-20 pointer-events-none text-right">
        <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-ink font-medium block">
          24 PLANES IN DEPTH
        </span>
        <span className="font-mono text-[10px] text-muted block">
          DELTA-TIME SMOOTHED · 1.2S FLATTEN
        </span>
      </div>

      {/* Active Project Overlay Indicator */}
      {activeProject && (
        <div className="absolute bottom-6 left-6 sm:left-10 z-20 pointer-events-auto bg-white/90 backdrop-blur-md border border-line p-4 sm:p-5 shadow-lg max-w-md animate-in fade-in duration-200">
          <span className="font-mono text-[9px] uppercase tracking-[0.3px] text-muted block mb-1">
            {activeProject.tag}
          </span>
          <h3 className="font-sans font-medium text-[18px] text-ink leading-tight">
            {activeProject.title}
          </h3>
          <p className="font-mono text-[11px] text-secondary mt-0.5">
            {activeProject.vehicle}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedModalProject(activeProject)}
              className="text-[12px] font-sans font-medium bg-[#010101] text-white px-3.5 py-1.5 hover:bg-charcoal transition-colors cursor-pointer"
            >
              Open project window →
            </button>
            <button
              type="button"
              onClick={() => navigate(`/product/${activeProject.slug}`)}
              className="text-[12px] font-sans text-ink hover:underline cursor-pointer"
            >
              Configure wrap
            </button>
          </div>
        </div>
      )}

      {/* Bottom Right Wheel Hint */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-20 pointer-events-none text-right font-mono text-[11px] text-muted flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#e61919] animate-pulse" />
        <span>CLICK CARD TO VIEW DETAILS</span>
      </div>

      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Fallback CSS 3D Stack if WebGL is unavailable on older browsers */}
      {!isWebGlSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-paper">
          <div>
            <p className="font-sans text-[16px] text-ink font-medium mb-2">
              Viewing in High-Performance Mode
            </p>
            <p className="font-sans text-[14px] text-secondary max-w-sm mb-4">
              Explore the Aprilia Mayhem, Spiderman, Venom and KTM 390 Pike Peak projects below.
            </p>
          </div>
        </div>
      )}

      {/* Exact Figma Project Window Modal (media_1794046057803_fbc82b70.png) */}
      {selectedModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedModalProject(null)}
        >
          <div
            className="bg-white w-full max-w-[1100px] border border-line shadow-2xl relative my-auto p-6 sm:p-10 lg:p-14 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setSelectedModalProject(null)}
              className="absolute top-5 right-5 text-muted hover:text-ink font-mono text-xl w-9 h-9 flex items-center justify-center border border-line bg-surface hover:bg-surface-2 transition-colors cursor-pointer"
              title="Close window"
            >
              ✕
            </button>

            {/* Page Title & Category (Figma node 2041:9398) */}
            <div className="flex flex-col gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3px] text-muted">
                SHOWCASE / PROJECT
              </span>
              <h2 className="font-sans font-medium text-[36px] sm:text-[54px] lg:text-[72px] leading-[1.05] tracking-[-1.6px] text-ink">
                {selectedModalProject.title}
              </h2>
              <p className="font-sans text-[18px] sm:text-[20px] text-ink">
                {selectedModalProject.vehicle}
              </p>
            </div>

            {/* Large Vehicle Artwork Image */}
            <div className="w-full h-[280px] sm:h-[420px] lg:h-[500px] bg-[#f2f4f7] border border-line flex items-center justify-center p-4 sm:p-8 mb-8 overflow-hidden relative">
              <img
                src={selectedModalProject.image}
                alt={`${selectedModalProject.title} ${selectedModalProject.vehicle}`}
                className="w-full h-full object-contain filter drop-shadow-[0_16px_22px_rgba(0,0,0,0.2)]"
              />
            </div>

            {/* Story Text Row: "Every line has a purpose." */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4 border-t border-line">
              <div className="md:col-span-6">
                <h3 className="font-sans font-medium text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-1.2px] text-ink">
                  Every line<br />
                  has a purpose<span className="text-[#e61919]">.</span>
                </h3>
              </div>

              <div className="md:col-span-6 flex flex-col space-y-6">
                <p className="font-sans text-[16px] sm:text-[18px] text-secondary leading-relaxed">
                  {selectedModalProject.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/product/${selectedModalProject.slug}`);
                    }}
                    className="h-[52px] px-8 bg-[#010101] text-white font-sans text-[14px] hover:bg-charcoal transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Configure this wrap</span>
                    <span className="font-mono">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedModalProject(null)}
                    className="h-[52px] px-6 bg-white border border-[#cecece] text-ink font-sans text-[14px] hover:border-ink transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Back to Showcase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

