import { motion } from 'framer-motion';

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold text-brand-600"
            >
              Clean Architecture Lab
            </button>
          </div>

          <div className="hidden md:flex space-x-8">
            {[
              'intro',
              'principles',
              'value-objects',
              'entities',
              'aggregates',
              'use-cases',
              'builder',
              'exercises',
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-gray-700 hover:text-brand-600 px-3 py-2 text-sm font-medium transition-colors capitalize"
              >
                {section.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div>
            <button
              onClick={() => scrollToSection('exercises')}
              className="btn btn-primary"
            >
              Start Exercises
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
