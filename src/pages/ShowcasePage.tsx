import React from 'react';
import { PerspectiveStack } from '../components/showcase/PerspectiveStack';

export const ShowcasePage: React.FC = () => {
  return (
    <div className="w-full bg-paper min-h-screen">
      {/* Figma Perspective Archive & Studio Showcase (Node 2177:54715) */}
      <PerspectiveStack />
    </div>
  );
};
