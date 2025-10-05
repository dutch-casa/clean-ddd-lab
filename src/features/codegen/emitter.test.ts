import { describe, it, expect } from 'vitest';
import { emitValueObject, emitEntity, generateAllCode } from './emitter';
import type { ValueObject, Entity, DomainGraph } from '@/shared/types';

describe('Code Generation', () => {
  it('should generate value object code', () => {
    const vo: ValueObject = {
      id: 'vo-1',
      name: 'Money',
      fields: [
        { name: 'Amount', type: 'decimal' },
        { name: 'Currency', type: 'string' },
      ],
    };

    const code = emitValueObject(vo);
    expect(code).toContain('namespace Domain.ValueObjects');
    expect(code).toContain('public readonly record struct Money');
    expect(code).toContain('decimal Amount');
    expect(code).toContain('string Currency');
    expect(code).toContain('public static Money Create');
  });

  it('should generate entity code', () => {
    const entity: Entity = {
      id: 'e-1',
      name: 'User',
      idType: 'Guid',
      fields: [
        { kind: 'primitive', name: 'Name', type: 'string' },
        { kind: 'primitive', name: 'Age', type: 'int' },
      ],
    };

    const code = emitEntity(entity, []);
    expect(code).toContain('namespace Domain.Entities');
    expect(code).toContain('public class User');
    expect(code).toContain('public Guid Id');
    expect(code).toContain('public string Name');
    expect(code).toContain('public int Age');
  });

  it('should generate all code from graph', () => {
    const graph: DomainGraph = {
      valueObjects: [
        {
          id: 'vo-1',
          name: 'Email',
          fields: [{ name: 'Value', type: 'string' }],
        },
      ],
      entities: [],
      aggregates: [],
      repositories: [],
      useCases: [],
      meta: { name: 'Test', version: 1 },
    };

    const files = generateAllCode(graph);
    expect(files).toHaveLength(1);
    expect(files[0].path).toBe('/Domain/ValueObjects/Email.cs');
    expect(files[0].content).toContain('Email');
  });
});
