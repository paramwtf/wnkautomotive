import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full bg-paper min-h-[70vh] flex items-center justify-center py-24">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="font-mono text-[72px] font-bold text-ink leading-none mb-4">
          404<span className="text-red">.</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.4px] text-muted block mb-2">
          PAGE NOT FOUND
        </span>
        <h1 className="font-sans font-medium text-[28px] text-ink mb-4">
          Off the racing line.
        </h1>
        <p className="font-sans text-[15px] text-secondary leading-relaxed mb-8">
          The page or product you were looking for doesn't exist, has been relocated, or is currently undergoing studio refinement.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button variant="primary">Return Home →</Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary">Browse Catalogue</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

