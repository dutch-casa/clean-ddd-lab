import { Handle, Position, type NodeProps } from 'reactflow';
import type { Entity } from '@/shared/types';
import { motion } from 'framer-motion';

export type EntityNodeData = Entity & {
  errors?: string[];
  voNames?: Record<string, string>;
};

export function EntityNode({ data, selected }: NodeProps<EntityNodeData>) {
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 ${
        selected ? 'border-green-500' : 'border-green-300'
      } min-w-[220px]`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="font-semibold text-gray-800 text-sm">Entity</div>
      </div>

      <div className="text-lg font-bold text-gray-900 mb-1">{data.name}</div>
      <div className="text-xs text-gray-600 mb-3 font-mono">
        Id: <span className="text-green-600">{data.idType}</span>
      </div>

      <div className="space-y-1">
        {data.fields.map((field, i) => (
          <div key={i} className="text-xs text-gray-700 font-mono">
            {field.name}:{' '}
            <span className="text-green-600">
              {field.kind === 'primitive'
                ? field.type
                : data.voNames?.[field.voId] || 'VO'}
            </span>
          </div>
        ))}
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
