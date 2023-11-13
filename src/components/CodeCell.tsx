import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from '../components/Preview';
import bundle from '../bundler';
import Resizable from './ui/Resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {

      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err}/>
      </div>
    </Resizable>
  );
};

export default CodeCell;
