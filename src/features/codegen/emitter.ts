import type {
  Primitive,
  ValueObject,
  Entity,
  Aggregate,
  Repository,
  UseCase,
  DomainGraph,
} from '@/shared/types';

// Helper functions
const mapType = (type: Primitive): string => {
  const typeMap: Record<Primitive, string> = {
    string: 'string',
    int: 'int',
    decimal: 'decimal',
    Guid: 'Guid',
    DateTime: 'DateTime',
    bool: 'bool',
  };
  return typeMap[type];
};

const pascal = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camel = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// Emitters
export function emitValueObject(vo: ValueObject): string {
  const fields = vo.fields
    .map((f) => `${mapType(f.type)} ${pascal(f.name)}`)
    .join(', ');

  const validations = vo.fields
    .map((f) => {
      if (f.type === 'decimal') {
        return `    if (${pascal(f.name)} < 0) throw new ArgumentException("${pascal(
          f.name
        )} cannot be negative");`;
      }
      if (f.type === 'string') {
        return `    if (string.IsNullOrWhiteSpace(${pascal(
          f.name
        )})) throw new ArgumentException("${pascal(f.name)} is required");`;
      }
      return null;
    })
    .filter(Boolean)
    .join('\n');

  const factoryParams = vo.fields
    .map((f) => `${mapType(f.type)} ${camel(f.name)}`)
    .join(', ');

  const factoryArgs = vo.fields.map((f) => pascal(f.name)).join(', ');

  return `namespace Domain.ValueObjects;

public readonly record struct ${vo.name}(${fields})
{
  public static ${vo.name} Create(${factoryParams})
  {
${validations}
    return new ${vo.name}(${factoryArgs});
  }
}`;
}

export function emitEntity(entity: Entity, valueObjects: ValueObject[]): string {
  const voMap = new Map(valueObjects.map((v) => [v.id, v]));

  const fieldDeclarations = entity.fields
    .map((f) => {
      if (f.kind === 'primitive') {
        return `  public ${mapType(f.type)} ${pascal(f.name)} { get; private set; }`;
      } else {
        const vo = voMap.get(f.voId);
        if (!vo) return `  // Missing VO: ${f.name}`;
        return `  public ${vo.name} ${pascal(f.name)} { get; private set; }`;
      }
    })
    .join('\n');

  const ctorParams = entity.fields
    .map((f) => {
      if (f.kind === 'primitive') {
        return `${mapType(f.type)} ${camel(f.name)}`;
      } else {
        const vo = voMap.get(f.voId);
        return vo ? `${vo.name} ${camel(f.name)}` : '';
      }
    })
    .filter(Boolean)
    .join(', ');

  const ctorAssignments = entity.fields
    .map((f) => `    ${pascal(f.name)} = ${camel(f.name)};`)
    .join('\n');

  return `namespace Domain.Entities;

public class ${entity.name}
{
  public ${mapType(entity.idType)} Id { get; private set; }
${fieldDeclarations}

  public ${entity.name}(${ctorParams})
  {
    Id = ${entity.idType === 'Guid' ? 'Guid.NewGuid()' : 'default'};
${ctorAssignments}
  }

  // Domain methods
  // TODO: Add behavior methods that enforce business rules
}`;
}

export function emitAggregate(
  aggregate: Aggregate,
  entities: Entity[]
): string {
  const root = entities.find((e) => e.id === aggregate.rootEntityId);
  if (!root) return `// Missing root entity for aggregate ${aggregate.name}`;

  const invariantChecks = aggregate.invariants
    .map(
      (inv, i) => `    // Invariant ${i + 1}: ${inv}
    // TODO: Implement validation logic`
    )
    .join('\n');

  return `namespace Domain.Aggregates;
using Domain.Entities;

public class ${aggregate.name}
{
  public ${root.name} Root { get; private set; }

  public ${aggregate.name}(${root.name} root)
  {
    Root = root ?? throw new ArgumentNullException(nameof(root));
    EnforceInvariants();
  }

  public void EnforceInvariants()
  {
${invariantChecks}
  }

  // Aggregate operations
  // TODO: Add methods that coordinate changes across the aggregate
}`;
}

export function emitRepository(repository: Repository): string {
  const methods = repository.methods
    .map((m) => `  ${m.signature};`)
    .join('\n');

  return `namespace Application.Ports;
using Domain.Entities;

public interface ${repository.name}
{
${methods}
}`;
}

export function emitUseCase(
  useCase: UseCase,
  repositories: Repository[]
): string {
  const inputFields = useCase.input.fields
    .map((f) => `${mapType(f.type)} ${pascal(f.name)}`)
    .join(', ');

  const outputFields = useCase.output.fields
    .map((f) => `${mapType(f.type)} ${pascal(f.name)}`)
    .join(', ');

  const repoDeps = useCase.repoIds
    .map((id) => {
      const repo = repositories.find((r) => r.id === id);
      return repo
        ? `  private readonly ${repo.name} _${camel(repo.name.replace(/^I/, ''))};`
        : '';
    })
    .filter(Boolean)
    .join('\n');

  const ctorParams = useCase.repoIds
    .map((id) => {
      const repo = repositories.find((r) => r.id === id);
      return repo ? `${repo.name} ${camel(repo.name.replace(/^I/, ''))}` : '';
    })
    .filter(Boolean)
    .join(', ');

  const ctorAssignments = useCase.repoIds
    .map((id) => {
      const repo = repositories.find((r) => r.id === id);
      const paramName = repo ? camel(repo.name.replace(/^I/, '')) : '';
      return repo
        ? `    _${paramName} = ${paramName} ?? throw new ArgumentNullException(nameof(${paramName}));`
        : '';
    })
    .filter(Boolean)
    .join('\n');

  return `namespace Application.UseCases;
using Application.Ports;
using Domain.Entities;

public record ${useCase.input.name}(${inputFields});
public record ${useCase.output.name}(${outputFields});

public class ${useCase.name}
{
${repoDeps}

  public ${useCase.name}(${ctorParams})
  {
${ctorAssignments}
  }

  public async Task<${useCase.output.name}> ExecuteAsync(${useCase.input.name} request, CancellationToken ct = default)
  {
    // TODO: Implement use case logic
    throw new NotImplementedException();
  }
}`;
}

export type GeneratedFile = {
  path: string;
  content: string;
};

export function generateAllCode(graph: DomainGraph): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  // Value Objects
  graph.valueObjects.forEach((vo) => {
    files.push({
      path: `/Domain/ValueObjects/${vo.name}.cs`,
      content: emitValueObject(vo),
    });
  });

  // Entities
  graph.entities.forEach((entity) => {
    files.push({
      path: `/Domain/Entities/${entity.name}.cs`,
      content: emitEntity(entity, graph.valueObjects),
    });
  });

  // Aggregates
  graph.aggregates.forEach((agg) => {
    files.push({
      path: `/Domain/Aggregates/${agg.name}.cs`,
      content: emitAggregate(agg, graph.entities),
    });
  });

  // Repositories (Ports)
  graph.repositories.forEach((repo) => {
    files.push({
      path: `/Application/Ports/${repo.name}.cs`,
      content: emitRepository(repo),
    });
  });

  // Use Cases
  graph.useCases.forEach((uc) => {
    files.push({
      path: `/Application/UseCases/${uc.name}.cs`,
      content: emitUseCase(uc, graph.repositories),
    });
  });

  return files;
}
