import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-purple-50 to-pink-50 pt-16"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-purple-600"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Clean Architecture
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-gray-700 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Build software that <span className="font-semibold text-brand-600">lasts</span>
        </motion.p>

        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Learn to design domain models with Value Objects, Entities, Aggregates, and
          Use Cases. Build visually, generate C# code, and run real exercises in your
          browser.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() =>
              document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn btn-primary text-lg px-8 py-3"
          >
            Get Started
          </button>
          <button
            onClick={() =>
              document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn btn-secondary text-lg px-8 py-3"
          >
            Try Builder
          </button>
        </motion.div>

        {/* Animated decoration */}
        <motion.div
          className="mt-16 flex justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {['VO', 'Entity', 'Aggregate'].map((label, i) => (
            <motion.div
              key={label}
              className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-sm font-semibold text-brand-600"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
