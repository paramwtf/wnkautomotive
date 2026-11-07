import os
from PIL import Image

def optimize_directory(src_dir, dest_dir, max_dim=1600, quality=90):
    os.makedirs(dest_dir, exist_ok=True)
    for root, _, files in os.walk(src_dir):
        for f in files:
            if not f.lower().endswith(('.png', '.jpg', '.jpeg')):
                continue
            src_path = os.path.join(root, f)
            rel_path = os.path.relpath(src_path, src_dir)
            out_path = os.path.join(dest_dir, rel_path)
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            
            # Change extension to webp or keep optimized png
            base_name, _ = os.path.splitext(out_path)
            webp_out = f"{base_name}.webp"
            
            try:
                with Image.open(src_path) as img:
                    orig_size = os.path.getsize(src_path)
                    w, h = img.size
                    
                    # Resize if larger than max_dim while maintaining aspect ratio
                    if max(w, h) > max_dim:
                        if w > h:
                            new_w = max_dim
                            new_h = int(h * (max_dim / w))
                        else:
                            new_h = max_dim
                            new_w = int(w * (max_dim / h))
                        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                    
                    # Save as optimized WebP
                    img.save(webp_out, 'WEBP', quality=quality, method=6)
                    webp_size = os.path.getsize(webp_out)
                    print(f"✓ {f} ({orig_size // 1024} KB -> {webp_size // 1024} KB WebP)")
            except Exception as e:
                print(f"Error optimizing {f}: {e}")

print("--- Optimizing RS457 Assets ---")
optimize_directory("public/assets/images/rs457", "public/assets/images/rs457/web", max_dim=1600, quality=92)

print("\n--- Optimizing KTM Assets ---")
optimize_directory("public/assets/images/ktm", "public/assets/images/ktm/web", max_dim=1600, quality=92)

print("\n--- Optimizing Hero Assets ---")
optimize_directory("public/assets/images/hero", "public/assets/images/hero/web", max_dim=1440, quality=90)

print("\nAsset optimization completed successfully.")

