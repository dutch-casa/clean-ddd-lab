import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodePane } from '@/shared/components/CodePane';
import { runCSharpTests } from '@/wasm/dotnet';
import type { TestReport } from '@/shared/types';
import { exerciseStubs, type ExerciseStub } from './stubs';
import { exerciseSolutions } from './solutions';

export function CodePlayground() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseStub>(
    exerciseStubs[0]
  );
  const [code, setCode] = useState(selectedExercise.code);
  const [testReport, setTestReport] = useState<TestReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showingSolution, setShowingSolution] = useState(false);

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestReport(null);

    try {
      const report = await runCSharpTests({
        [selectedExercise.filename]: code,
      });
      setTestReport(report);
    } catch (error) {
      console.error('Test execution failed:', error);
      setTestReport({
        passed: 0,
        failed: 1,
        details: [
          {
            name: 'Execution',
            passed: false,
            message: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleExerciseChange = (exercise: ExerciseStub) => {
    setSelectedExercise(exercise);
    setCode(exercise.code);
    setTestReport(null);
    setShowingSolution(false);
  };

  const handleShowSolution = () => {
    const solution = exerciseSolutions.find((s) => s.name === selectedExercise.name);
    if (solution) {
      setCode(solution.code);
      setShowingSolution(true);
      setTestReport(null);
    }
  };

  const handleReset = () => {
    setCode(selectedExercise.code);
    setShowingSolution(false);
    setTestReport(null);
  };

  return (
    <div className="space-y-6">
      {/* Exercise selector */}
      <div className="flex gap-2 flex-wrap">
        {exerciseStubs.map((ex) => (
          <button
            key={ex.name}
            onClick={() => handleExerciseChange(ex)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedExercise.name === ex.name
                ? 'bg-brand-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {ex.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-2">{selectedExercise.name}</h3>
        <p className="text-gray-600">{selectedExercise.description}</p>
      </div>

      {/* Editor */}
      <CodePane code={code} onChange={(value) => setCode(value || '')} height="500px" />

      {/* Action buttons */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-3">
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="btn btn-primary text-lg px-8 py-3 disabled:opacity-50"
          >
            {isRunning ? 'Running Tests...' : 'Run Tests'}
          </button>

          {showingSolution ? (
            <button
              onClick={handleReset}
              className="btn btn-secondary text-lg px-8 py-3"
            >
              Reset to Exercise
            </button>
          ) : (
            <button
              onClick={handleShowSolution}
              className="btn text-lg px-8 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              💡 Show Solution
            </button>
          )}
        </div>

        {testReport && (
          <div className="text-lg font-semibold">
            <span className="text-green-600">{testReport.passed} passed</span>
            {' • '}
            <span className="text-red-600">{testReport.failed} failed</span>
          </div>
        )}
      </div>

      {showingSolution && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4"
        >
          <p className="text-emerald-800 font-semibold">
            ✓ Solution loaded! This is fully working code with detailed comments explaining
            every line and how it relates to Clean Architecture and Domain-Driven Design.
          </p>
        </motion.div>
      )}

      {/* Test results */}
      <AnimatePresence>
        {testReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-2"
          >
            {testReport.details.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-lg border-2 ${
                  result.passed
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">
                    {result.passed ? '✅' : '❌'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {result.name}
                    </div>
                    {result.message && (
                      <div className="text-sm text-gray-600 mt-1 font-mono">
                        {result.message}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
