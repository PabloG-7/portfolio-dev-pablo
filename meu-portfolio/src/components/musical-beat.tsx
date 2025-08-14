// Musical Beat Animation keyframe missing in CSS
// This file ensures the keyframe is available

import { useEffect } from 'react';

export const useMusicalBeat = () => {
  useEffect(() => {
    // Ensure musical-beat keyframe exists in CSS
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes musical-beat {
          0%, 100% { 
            transform: scale(1) translateZ(0);
            box-shadow: 0 0 30px hsl(var(--primary) / 0.3);
          }
          25% { 
            transform: scale(1.05) translateZ(10px);
            box-shadow: 0 0 40px hsl(var(--primary) / 0.5);
          }
          50% { 
            transform: scale(1.08) translateZ(15px);
            box-shadow: 0 0 50px hsl(var(--accent) / 0.4);
          }
          75% { 
            transform: scale(1.03) translateZ(8px);
            box-shadow: 0 0 35px hsl(var(--primary) / 0.4);
          }
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);
};