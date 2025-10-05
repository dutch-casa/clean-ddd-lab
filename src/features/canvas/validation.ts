import type { DomainGraph, ValidationError } from '@/shared/types';

export function validateGraph(graph: DomainGraph): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate Aggregates
  graph.aggregates.forEach((agg) => {
    // Must have exactly one root
    const root = graph.entities.find((e) => e.id === agg.rootEntityId);
    if (!root) {
      errors.push({
        nodeId: agg.id,
        message: 'Aggregate must have a valid root entity',
        severity: 'error',
      });
    }

    // All entities in aggregate must exist
    agg.entityIds.forEach((entityId) => {
      if (!graph.entities.find((e) => e.id === entityId)) {
        errors.push({
          nodeId: agg.id,
          message: `Entity ${entityId} not found in aggregate`,
          severity: 'error',
        });
      }
    });

    // At least one invariant recommended
    if (agg.invariants.length === 0) {
      errors.push({
        nodeId: agg.id,
        message: 'Aggregate should define at least one invariant',
        severity: 'warning',
      });
    }
  });

  // Validate Use Cases
  graph.useCases.forEach((uc) => {
    // Should only depend on repositories (ports), not concrete implementations
    uc.repoIds.forEach((repoId) => {
      if (!graph.repositories.find((r) => r.id === repoId)) {
        errors.push({
          nodeId: uc.id,
          message: `Repository ${repoId} not found`,
          severity: 'error',
        });
      }
    });

    // Reads/writes should reference valid entities or aggregates
    [...uc.reads, ...uc.writes].forEach((targetId) => {
      const found =
        graph.entities.find((e) => e.id === targetId) ||
        graph.aggregates.find((a) => a.id === targetId);
      if (!found) {
        errors.push({
          nodeId: uc.id,
          message: `Target ${targetId} not found`,
          severity: 'error',
        });
      }
    });
  });

  // Validate Entities
  graph.entities.forEach((entity) => {
    entity.fields.forEach((field) => {
      if (field.kind === 'vo') {
        // VO must exist
        if (!graph.valueObjects.find((v) => v.id === field.voId)) {
          errors.push({
            nodeId: entity.id,
            message: `Value Object ${field.voId} not found for field ${field.name}`,
            severity: 'error',
          });
        }
      }
    });
  });

  // Validate Value Objects
  graph.valueObjects.forEach((vo) => {
    if (vo.fields.length === 0) {
      errors.push({
        nodeId: vo.id,
        message: 'Value Object should have at least one field',
        severity: 'warning',
      });
    }
  });

  // Validate Repositories
  graph.repositories.forEach((repo) => {
    if (repo.methods.length === 0) {
      errors.push({
        nodeId: repo.id,
        message: 'Repository should define at least one method',
        severity: 'warning',
      });
    }
  });

  return errors;
}
