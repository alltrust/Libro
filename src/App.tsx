import { ChangeEvent, useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleCodeClick = async () => {
    if (!ref.current) {
      return;
    }

    //transpile the jsx
    const result = await ref.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });

    setCode(result.code);
  };

  return (
    <div>
      <textarea value={input} onChange={handleInput}></textarea>
      <div>
        <button onClick={handleCodeClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
