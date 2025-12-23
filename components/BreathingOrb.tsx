import React from 'react';

const BreathingOrb = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-128 h-128">
        {/* Outer orb with enhanced radial gradient */}
        <div className="absolute inset-0 animate-breath-slow">
          <div className="w-full h-full rounded-full custom-gradient" />
        </div>
        
        {/* Inner core */}
        <div className="absolute inset-0 flex items-center justify-center animate-breath">
          <div className="w-40 h-40 rounded-full bg-white opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default BreathingOrb;