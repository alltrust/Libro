import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
  <html>
    <head></head>
    <body>
      <div id=root></div>
      <script>
        window.addEventListener('message', (event)=>{
          try{
            eval(event.data)
          } catch (err){
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + err + '</div>';
            throw err;
          }
        }, false)
      </script>
    </body>
  </html>

`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iFrameRef = useRef<any>();

  useEffect(() => {
    iFrameRef.current.srcdoc = html;
    iFrameRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div
      className="iframe-wrapper relative h-full grow"
    >
      <iframe
        className="bg-white h-full w-full"
        ref={iFrameRef}
        srcDoc={html}
        title="preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
