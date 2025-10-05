import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Slide = {
  title: string;
  content: ReactNode;
  visual?: ReactNode;
};

type SlideshowProps = {
  slides: Slide[];
  title: string;
};

export function Slideshow({ slides, title }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goTo = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-brand-600 w-8'
                  : index < currentSlide
                  ? 'bg-brand-400 w-2'
                  : 'bg-gray-300 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 space-y-6"
          >
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900">{slide.title}</h4>
              <div className="text-gray-700 space-y-3">{slide.content}</div>
            </div>

            {slide.visual && (
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                {slide.visual}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6 pt-6 border-t">
        <button
          onClick={prev}
          disabled={currentSlide === 0}
          className="btn btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-600 font-medium">
          {currentSlide + 1} / {slides.length}
        </span>

        <button
          onClick={next}
          disabled={currentSlide === slides.length - 1}
          className="btn btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
