import { motion } from 'framer-motion';
import { useState } from 'react';

export function EntityAnimation() {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 4000);
  };

  return (
    <div className="card bg-gradient-to-br from-green-50 to-green-100">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Entity: Identity over Time</h4>
        <button onClick={play} className="btn btn-secondary text-sm" disabled={isPlaying}>
          {isPlaying ? 'Playing...' : 'Replay'}
        </button>
      </div>

      <div className="relative h-64 flex items-center justify-center">
        {/* ID Badge */}
        <motion.div
          className="absolute top-8 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm"
          animate={
            isPlaying
              ? {
                  y: [0, 100, 100],
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{ duration: 4 }}
        >
          ID: 123
        </motion.div>

        {/* Entity Box */}
        <motion.div
          className="w-48 h-32 bg-green-500 rounded-lg flex flex-col items-center justify-center text-white font-mono text-xs"
          animate={
            isPlaying
              ? {
                  backgroundColor: ['#22c55e', '#3b82f6', '#22c55e'],
                }
              : {}
          }
          transition={{ duration: 4 }}
        >
          <motion.div
            animate={
              isPlaying
                ? {
                    opacity: [1, 0, 0],
                  }
                : {}
            }
            transition={{ duration: 2 }}
          >
            <div className="font-semibold mb-2">User</div>
            <div>Name: John</div>
            <div>Status: Active</div>
          </motion.div>

          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={
              isPlaying
                ? {
                    opacity: [0, 0, 1],
                  }
                : {}
            }
            transition={{ duration: 4, times: [0, 0.5, 1] }}
          >
            <div className="font-semibold mb-2">User</div>
            <div>Name: Jane</div>
            <div>Status: Inactive</div>
          </motion.div>
        </motion.div>

        {/* Label */}
        <motion.div
          className="absolute bottom-0 text-sm text-gray-600 italic"
          initial={{ opacity: 0 }}
          animate={isPlaying ? { opacity: [0, 0, 1] } : {}}
          transition={{ duration: 4, times: [0, 0.7, 1] }}
        >
          Same identity, changing attributes
        </motion.div>
      </div>
    </div>
  );
}
