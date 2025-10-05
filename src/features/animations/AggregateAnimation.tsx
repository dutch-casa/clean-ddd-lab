import { motion } from 'framer-motion';
import { useState } from 'react';

export function AggregateAnimation() {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 5000);
  };

  return (
    <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Aggregate: Boundary Protection</h4>
        <button onClick={play} className="btn btn-secondary text-sm" disabled={isPlaying}>
          {isPlaying ? 'Playing...' : 'Replay'}
        </button>
      </div>

      <div className="relative h-64 flex items-center justify-center">
        {/* Aggregate boundary */}
        <motion.div
          className="w-64 h-48 rounded-2xl border-4 border-purple-500 relative bg-white/50"
          animate={
            isPlaying
              ? {
                  boxShadow: [
                    '0 0 0 0px rgba(168, 85, 247, 0)',
                    '0 0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 0 0px rgba(168, 85, 247, 0)',
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: 2 }}
        >
          <div className="absolute top-2 left-2 text-xs font-semibold text-purple-600">
            RideAggregate
          </div>

          {/* Root entity */}
          <motion.div
            className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
            animate={
              isPlaying
                ? {
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 2, delay: 1 }}
          >
            Ride (Root)
          </motion.div>

          {/* Child entities */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-20 h-12 bg-purple-300 rounded text-xs flex items-center justify-center">
              Payment
            </div>
            <div className="w-20 h-12 bg-purple-300 rounded text-xs flex items-center justify-center">
              Route
            </div>
          </div>
        </motion.div>

        {/* External write attempt */}
        <motion.div
          className="absolute right-8 w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white text-2xl"
          initial={{ x: 100, opacity: 0 }}
          animate={
            isPlaying
              ? {
                  x: [100, -50, 50],
                  opacity: [0, 1, 0],
                  rotate: [0, -20, 20],
                }
              : {}
            }
          transition={{ duration: 3, delay: 2 }}
        >
          ✕
        </motion.div>

        {/* Label */}
        <motion.div
          className="absolute bottom-0 text-sm text-gray-600 italic"
          initial={{ opacity: 0 }}
          animate={isPlaying ? { opacity: [0, 0, 1] } : {}}
          transition={{ duration: 5, times: [0, 0.6, 1] }}
        >
          External changes blocked by boundary
        </motion.div>
      </div>
    </div>
  );
}
