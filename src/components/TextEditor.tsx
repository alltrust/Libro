import { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const medEditorRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState('**Hello world!!!**');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        medEditorRef.current &&
        event.target &&
        medEditorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="mt-2" ref={medEditorRef}>
        <MDEditor value={text} onChange={(v) => setText(v || '')} />
      </div>
    );
  }

  return (
    <div className="mt-2" onClick={() => setEditing(true)}>
        <MDEditor.Markdown className="p-3 border-solid" source={text} />
    </div>
  );
};

export default TextEditor;
