import { describe, it, expect } from 'vitest';
import { validateGraph } from './validation';
import type { DomainGraph } from '@/shared/types';

describe('Graph Validation', () => {
  it('should pass validation for valid graph', () => {
    const graph: DomainGraph = {
      valueObjects: [{ id: 'vo-1', name: 'Money', fields: [{ name: 'Amount', type: 'decimal' }] }],
      entities: [
        {
          id: 'e-1',
          name: 'Ride',
          idType: 'Guid',
          fields: [{ kind: 'primitive', name: 'Status', type: 'string' }],
        },
      ],
      aggregates: [
        {
          id: 'agg-1',
          name: 'RideAggregate',
          rootEntityId: 'e-1',
          entityIds: ['e-1'],
          invariants: ['Must have driver'],
        },
      ],
      repositories: [{ id: 'r-1', name: 'IRideRepository', methods: [{ name: 'Save', signature: 'Task Save(Ride)' }] }],
      useCases: [
        {
          id: 'uc-1',
          name: 'RequestRide',
          input: { name: 'Request', fields: [] },
          output: { name: 'Response', fields: [] },
          repoIds: ['r-1'],
          reads: [],
          writes: ['e-1'],
        },
      ],
      meta: { name: 'Test', version: 1 },
    };

    const errors = validateGraph(graph);
    expect(errors).toHaveLength(0);
  });

  it('should detect missing aggregate root', () => {
    const graph: DomainGraph = {
      valueObjects: [],
      entities: [],
      aggregates: [
        {
          id: 'agg-1',
          name: 'Bad',
          rootEntityId: 'nonexistent',
          entityIds: [],
          invariants: [],
        },
      ],
      repositories: [],
      useCases: [],
      meta: { name: 'Test', version: 1 },
    };

    const errors = validateGraph(graph);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].message).toContain('root entity');
  });

  it('should warn about missing invariants', () => {
    const graph: DomainGraph = {
      valueObjects: [],
      entities: [{ id: 'e-1', name: 'E', idType: 'Guid', fields: [] }],
      aggregates: [
        {
          id: 'agg-1',
          name: 'A',
          rootEntityId: 'e-1',
          entityIds: ['e-1'],
          invariants: [],
        },
      ],
      repositories: [],
      useCases: [],
      meta: { name: 'Test', version: 1 },
    };

    const errors = validateGraph(graph);
    const warning = errors.find((e) => e.severity === 'warning');
    expect(warning).toBeDefined();
    expect(warning?.message).toContain('invariant');
  });
});
