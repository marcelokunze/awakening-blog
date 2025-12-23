import React from 'react';

interface BreathingOrbInvertedProps {
  size?: string; // e.g. 'w-64 h-64' or 'w-[48rem] h-[48rem]'
}

const BreathingOrbInverted: React.FC<BreathingOrbInvertedProps> = ({ size = 'w-full h-full' }) => {
  return (
    <div className={`relative ${size}`}>  
      {/* Outer orb with enhanced radial gradient */}
      <div className="absolute inset-0 animate-breath-slow">
        <div className="w-full h-full rounded-full custom-gradient" />
      </div>
      
      {/* Inner core */}
      <div className="absolute inset-0 flex items-center justify-center animate-breath">
        <div className="w-1/3 h-1/3 rounded-full bg-black" />
      </div>
    </div>
  );
};

export default BreathingOrbInverted;
