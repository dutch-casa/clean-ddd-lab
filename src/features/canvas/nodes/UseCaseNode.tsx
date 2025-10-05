import { Handle, Position, type NodeProps } from 'reactflow';
import type { UseCase } from '@/shared/types';
import { motion } from 'framer-motion';

export type UseCaseNodeData = UseCase & {
  errors?: string[];
};

export function UseCaseNode({ data, selected }: NodeProps<UseCaseNodeData>) {
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-4 bg-gradient-to-br from-pink-50 to-pink-100 border-2 ${
        selected ? 'border-pink-500' : 'border-pink-300'
      } min-w-[280px]`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-pink-500" />
        <div className="font-semibold text-gray-800 text-sm">Use Case</div>
      </div>

      <div className="text-lg font-bold text-gray-900 mb-3">{data.name}</div>

      <div className="space-y-2">
        <div className="bg-white p-2 rounded">
          <div className="text-xs font-semibold text-gray-700 mb-1">Input:</div>
          <div className="text-xs font-mono text-gray-600">
            {data.input.fields.map((f) => f.name).join(', ') || 'None'}
          </div>
        </div>

        <div className="bg-white p-2 rounded">
          <div className="text-xs font-semibold text-gray-700 mb-1">Output:</div>
          <div className="text-xs font-mono text-gray-600">
            {data.output.fields.map((f) => f.name).join(', ') || 'None'}
          </div>
        </div>

        {data.repoIds.length > 0 && (
          <div className="text-xs text-gray-600">
            <span className="font-semibold">Repositories:</span> {data.repoIds.length}
          </div>
        )}
      </div>

      {data.errors && data.errors.length > 0 && (
        <div className="mt-2 text-xs text-red-600">
          ⚠ {data.errors[0]}
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </motion.div>
  );
}
