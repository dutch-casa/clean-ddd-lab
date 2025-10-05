import type { TestReport } from '@/shared/types';
import { runActualTests } from './testRunner';

/**
 * Test Execution System
 *
 * This parses your C# code and runs REAL tests against it!
 * It validates that you've implemented the correct logic.
 *
 * How it works:
 * 1. Parses your C# code to extract validation logic
 * 2. Runs actual test cases against your implementation
 * 3. Returns real pass/fail results based on your code
 *
 * This is not a full C# compiler, but it validates that:
 * - You added the right checks (negative amounts, null values, etc.)
 * - You throw exceptions when you should
 * - You set the right properties
 * - Your state transitions are correct
 */

// No initialization needed - we parse and validate C# directly!

export async function runCSharpTests(
  sources: Record<string, string>
): Promise<TestReport> {
  // Simulate compilation delay (to feel like real compilation)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Get the filename and code
  const [filename, code] = Object.entries(sources)[0] || ['', ''];

  if (!code) {
    return {
      passed: 0,
      failed: 1,
      details: [
        {
          name: 'Compilation',
          passed: false,
          message: 'No code provided',
        },
      ],
    };
  }

  // Check if stub code (not implemented yet)
  if (code.includes('NotImplementedException')) {
    return {
      passed: 0,
      failed: 1,
      details: [
        {
          name: 'Implementation Required',
          passed: false,
          message: 'Replace "throw new NotImplementedException()" with actual code, or click "Show Solution"',
        },
      ],
    };
  }

  // Simulate test execution delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Run ACTUAL tests that validate the code logic
  return runActualTests(filename, code);
}
