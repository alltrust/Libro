import { useState } from 'react';
import CodeEditor from '../components/code-editor';
import Preview from '../components/Preview';
import bundle from '../bundler';

const CodeCell = ()=>{
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const handleCodeClick = async () => {

        const output = await bundle(input)
        setCode(output);
        
      };
  
    return(
        <div>
        <CodeEditor
          initialValue="const a = 1"
          onChange={(value) => setInput(value)}
        />
        <div>
          <button onClick={handleCodeClick}>Submit</button>
        </div>
        <Preview code={code}/>
      </div>
    );
};

export default CodeCell;