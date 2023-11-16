import { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useDispatchFn } from '../hooks/UseTypedDispatch';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { id, content } = cell;
  const { updateCell } = useDispatchFn();

  const mdEditorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        mdEditorRef.current &&
        event.target &&
        mdEditorRef.current.contains(event.target as Node)
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
      <div ref={mdEditorRef}>
        <MDEditor
          value={content}
          onChange={(value) => updateCell({ id: id, content: value || 'Click to edit' })}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown className="p-3 border-solid" source={content} />
    </div>
  );
};

export default TextEditor;
