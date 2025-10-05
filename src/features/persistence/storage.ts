import type { DomainGraph } from '@/shared/types';

const STORAGE_KEY = 'clean-arch-lab';

export function saveGraph(name: string, graph: DomainGraph): void {
  try {
    const key = `${STORAGE_KEY}/${name}`;
    localStorage.setItem(key, JSON.stringify(graph));
  } catch (error) {
    console.error('Failed to save graph:', error);
    throw new Error('Failed to save project to local storage');
  }
}

export function loadGraph(name: string): DomainGraph | null {
  try {
    const key = `${STORAGE_KEY}/${name}`;
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as DomainGraph;
  } catch (error) {
    console.error('Failed to load graph:', error);
    return null;
  }
}

export function listProjects(): string[] {
  try {
    const keys = Object.keys(localStorage);
    return keys
      .filter((key) => key.startsWith(STORAGE_KEY + '/'))
      .map((key) => key.replace(STORAGE_KEY + '/', ''));
  } catch (error) {
    console.error('Failed to list projects:', error);
    return [];
  }
}

export function deleteProject(name: string): void {
  try {
    const key = `${STORAGE_KEY}/${name}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw new Error('Failed to delete project');
  }
}

export function exportGraph(graph: DomainGraph): string {
  return JSON.stringify(graph, null, 2);
}

export function importGraph(json: string): DomainGraph {
  try {
    const graph = JSON.parse(json) as DomainGraph;
    // Basic validation
    if (!graph.meta || !graph.meta.name) {
      throw new Error('Invalid graph format: missing meta.name');
    }
    return graph;
  } catch (error) {
    console.error('Failed to import graph:', error);
    throw new Error('Invalid graph JSON');
  }
}
