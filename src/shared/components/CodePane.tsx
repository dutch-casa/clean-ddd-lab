import Editor from '@monaco-editor/react';

type CodePaneProps = {
  code: string;
  language?: string;
  readonly?: boolean;
  onChange?: (value: string | undefined) => void;
  height?: string;
};

export function CodePane({
  code,
  language = 'csharp',
  readonly = false,
  onChange,
  height = '400px',
}: CodePaneProps) {
  return (
    <div className="rounded-lg overflow-hidden border-2 border-gray-300 shadow-md">
      <Editor
        height={height}
        language={language}
        value={code}
        onChange={onChange}
        options={{
          readOnly: readonly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          theme: 'vs-dark',
        }}
      />
    </div>
  );
}
