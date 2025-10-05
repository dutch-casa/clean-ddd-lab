import { useEffect, useMemo } from 'react';
import { Navbar, Hero, Section, CodePane } from './shared/components';
import { BuilderCanvas } from './features/canvas/BuilderCanvas';
import { CodePlayground } from './features/exercises/CodePlayground';
import { ValueObjectSlides } from './features/animations/ValueObjectSlides';
import { EntitySlides } from './features/animations/EntitySlides';
import { AggregateSlides } from './features/animations/AggregateSlides';
import { UseCaseSlides } from './features/animations/UseCaseSlides';
import { DependencyRuleSlides } from './features/animations/DependencyRuleSlides';
import { RepositorySlides } from './features/animations/RepositorySlides';
import { useGraphStore } from './features/canvas/store';
import { generateAllCode } from './features/codegen/emitter';
import { starterGraph } from './shared/utils';

function App() {
  const { graph, loadGraph } = useGraphStore();

  // Load starter data on mount
  useEffect(() => {
    loadGraph(starterGraph);
  }, [loadGraph]);

  // Generate code from graph
  const generatedFiles = useMemo(() => generateAllCode(graph), [graph]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Hero />

      {/* Introduction */}
      <Section
        id="intro"
        title="What is Clean Architecture?"
        subtitle="A way to build software that doesn't fall apart when things change"
      >
        <div className="space-y-8">
          {/* The Problem (for beginners) */}
          <div className="card bg-red-50 border-red-200">
            <h3 className="text-xl font-semibold mb-4 text-red-900">The Problem: Spaghetti Code</h3>
            <div className="space-y-3 text-gray-800">
              <p className="text-lg">
                Imagine you're building a ride-sharing app like Uber. You write code that talks to your database, displays things on screen, and processes rides.
              </p>
              <p>
                Then your boss says: "We need to switch from PostgreSQL to MongoDB" or "We need an iOS app, not just a website."
              </p>
              <p className="font-semibold text-red-700">
                In most codebases, this requires rewriting EVERYTHING because it's all tangled together like spaghetti.
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div className="card bg-emerald-50 border-emerald-200">
            <h3 className="text-xl font-semibold mb-4 text-emerald-900">The Solution: Clean Architecture</h3>
            <div className="space-y-3 text-gray-800">
              <p className="text-lg">
                <strong>Clean Architecture</strong> is like building with LEGO blocks. Each piece has a specific job and connects to others through simple interfaces.
              </p>
              <p>
                Your <strong>core business rules</strong> (like "a ride needs a driver" or "money can't be negative") live in the center, protected from everything else.
              </p>
              <p className="font-semibold text-emerald-700">
                When you need to change databases, UI frameworks, or add new features - you only swap out the outer pieces. The core stays untouched.
              </p>
            </div>
          </div>

          {/* Benefits + Expert Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Why This Matters</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-semibold text-brand-600">✓ Independent of frameworks</p>
                  <p className="text-sm">React today, Vue tomorrow? No problem. Your business logic doesn't know or care.</p>
                </div>
                <div>
                  <p className="font-semibold text-brand-600">✓ Testable without infrastructure</p>
                  <p className="text-sm">Test your business rules without starting a database or web server. Tests run in milliseconds.</p>
                </div>
                <div>
                  <p className="font-semibold text-brand-600">✓ Database independence</p>
                  <p className="text-sm">SQL, NoSQL, in-memory, files - swap them out without touching business logic.</p>
                </div>
                <div>
                  <p className="font-semibold text-brand-600">✓ Easy to understand and change</p>
                  <p className="text-sm">New developers can understand the business rules without learning your entire tech stack.</p>
                </div>
              </div>
            </div>

            <div className="card bg-blue-50">
              <h3 className="text-xl font-semibold mb-3">Core Building Blocks</h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-semibold">Value Objects</p>
                  <p className="text-sm">Simple things like money, email addresses, dates - defined by their value, not identity</p>
                </div>
                <div>
                  <p className="font-semibold">Entities</p>
                  <p className="text-sm">Things with unique identity that change over time - like a User, Order, or Ride</p>
                </div>
                <div>
                  <p className="font-semibold">Aggregates</p>
                  <p className="text-sm">Groups of objects that must stay consistent - like an Order with its LineItems</p>
                </div>
                <div>
                  <p className="font-semibold">Use Cases</p>
                  <p className="text-sm">The actions users can take - "Request a Ride", "Cancel Order", "Update Profile"</p>
                </div>
                <div>
                  <p className="font-semibold">Ports (Interfaces)</p>
                  <p className="text-sm">Contracts that allow swapping out databases, APIs, etc. without changing business logic</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expert insight */}
          <div className="card bg-purple-50 border-purple-300">
            <div className="flex gap-3">
              <div className="text-3xl">🎓</div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">For Experienced Developers</h4>
                <p className="text-gray-700 text-sm">
                  Clean Architecture is the application of SOLID principles at the architectural level. It's a synthesis of
                  Hexagonal Architecture (Ports & Adapters), Onion Architecture, and Screaming Architecture. The key insight: <strong>dependency inversion</strong> applied
                  at every layer boundary. The domain never depends on infrastructure - infrastructure adapts to domain contracts.
                  This enables what Rich Hickey calls "programmable programming" - your core logic becomes a pure function of business rules,
                  free from accidental complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section
        id="principles"
        title="Core Principles"
        subtitle="The Dependency Rule: Source code dependencies point inward"
        className="bg-white"
      >
        <DependencyRuleSlides />
      </Section>

      {/* Value Objects */}
      <Section
        id="value-objects"
        title="Value Objects"
        subtitle="Building blocks that can't be broken"
      >
        <ValueObjectSlides />
      </Section>

      {/* Entities */}
      <Section
        id="entities"
        title="Entities"
        subtitle="Identity over time"
        className="bg-white"
      >
        <EntitySlides />
      </Section>

      {/* Aggregates */}
      <Section
        id="aggregates"
        title="Aggregates"
        subtitle="Consistency boundaries and invariants"
      >
        <AggregateSlides />
      </Section>

      {/* Use Cases */}
      <Section
        id="use-cases"
        title="Use Cases"
        subtitle="Application logic and orchestration"
        className="bg-white"
      >
        <UseCaseSlides />
      </Section>

      {/* Repositories */}
      <Section
        id="repositories"
        title="Repositories & Ports"
        subtitle="Abstracting infrastructure with interfaces"
      >
        <RepositorySlides />
      </Section>

      {/* Builder */}
      <Section
        id="builder"
        title="Visual Domain Builder"
        subtitle="Build your domain model with drag-and-drop"
      >
        <BuilderCanvas />
      </Section>

      {/* Generated Code */}
      <Section
        id="generated-code"
        title="Generated C# Code"
        subtitle="Clean, idiomatic C# from your domain model"
        className="bg-white"
      >
        <div className="space-y-4">
          {generatedFiles.slice(0, 3).map((file) => (
            <div key={file.path}>
              <h4 className="text-lg font-semibold mb-2">{file.path}</h4>
              <CodePane code={file.content} readonly height="300px" />
            </div>
          ))}

          {generatedFiles.length > 3 && (
            <div className="text-center text-gray-600 text-sm">
              + {generatedFiles.length - 3} more files
            </div>
          )}
        </div>
      </Section>

      {/* Exercises */}
      <Section
        id="exercises"
        title="Interactive Exercises"
        subtitle="Write C# and run tests in your browser"
      >
        <CodePlayground />
      </Section>

      {/* Footer */}
      <Section id="conclusion" title="Keep Learning" className="bg-gray-800 text-white">
        <div className="text-center">
          <p className="text-lg mb-4">
            You've learned the fundamentals of Clean Architecture domain modeling.
          </p>
          <p className="text-gray-300 mb-8">
            Build systems that are testable, maintainable, and independent of
            frameworks.
          </p>

          <div className="text-sm text-gray-400">
            <p>Built with React, TypeScript, Framer Motion, React Flow, and Monaco Editor</p>
            <p className="mt-2">
              C# execution powered by .NET WebAssembly (stub implementation - see{' '}
              <code>src/wasm/dotnet.ts</code>)
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default App;
