import { motion } from 'framer-motion';
import { useState } from 'react';

export function ValueObjectAnimation() {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 4000);
  };

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Value Object: Immutability</h4>
        <button onClick={play} className="btn btn-secondary text-sm" disabled={isPlaying}>
          {isPlaying ? 'Playing...' : 'Replay'}
        </button>
      </div>

      <div className="relative h-64 flex items-center justify-center gap-8">
        {/* Original VO */}
        <motion.div
          className="absolute w-32 h-32 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white font-mono text-xs"
          initial={{ x: -100, opacity: 1 }}
          animate={
            isPlaying
              ? {
                  x: [-100, -100, -100],
                  opacity: [1, 1, 0.5],
                }
              : {}
          }
          transition={{ duration: 4, times: [0, 0.5, 1] }}
        >
          <div className="font-semibold mb-2">Money</div>
          <div>Amount: 100</div>
          <div>USD</div>
        </motion.div>

        {/* Clone arrow */}
        <motion.div
          className="absolute text-4xl"
          initial={{ opacity: 0 }}
          animate={isPlaying ? { opacity: [0, 1, 0] } : {}}
          transition={{ duration: 2, times: [0, 0.5, 1], delay: 1.5 }}
        >
          →
        </motion.div>

        {/* New VO */}
        <motion.div
          className="absolute w-32 h-32 bg-green-500 rounded-lg flex flex-col items-center justify-center text-white font-mono text-xs"
          initial={{ x: 100, opacity: 0, scale: 0 }}
          animate={
            isPlaying
              ? {
                  opacity: [0, 0, 1],
                  scale: [0, 0, 1],
                  x: [100, 100, 100],
                }
              : {}
          }
          transition={{ duration: 4, times: [0, 0.5, 1] }}
        >
          <div className="font-semibold mb-2">Money</div>
          <div>Amount: 150</div>
          <div>USD</div>
        </motion.div>

        {/* Label */}
        <motion.div
          className="absolute bottom-0 text-sm text-gray-600 italic"
          initial={{ opacity: 0 }}
          animate={isPlaying ? { opacity: [0, 0, 1] } : {}}
          transition={{ duration: 4, times: [0, 0.7, 1] }}
        >
          Changes create new instances
        </motion.div>
      </div>
    </div>
  );
}
