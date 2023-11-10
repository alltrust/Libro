import { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Button from './ui/Button';

interface CodeEditorProps { 
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleEditOnMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    editor.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    const unformattaedValue = editorRef.current?.getModel()?.getValue();

    if (unformattaedValue) {
      const formmattedValue = prettier
        .format(unformattaedValue, {
          parser: 'babel',
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, '');

      editorRef.current?.setValue(formmattedValue);
    }
  };

  return (
    <div className="relative h-full group w-[calc(100%-10px)]">
      <Button
        onClick={onFormatClick}
        label="Format"
        status="tertiary"
        isFormat
      />
      <MonacoEditor
        defaultValue={initialValue}
        theme="vs-dark"
        defaultLanguage="javascript"
        onMount={handleEditOnMount}
        className="h-full"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
