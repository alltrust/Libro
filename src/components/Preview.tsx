import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  bundlingStatus:string;
}

const html = `
  <html>
    <head></head>
    <body>
      <div id=root></div>
      <script>
        const handleError = (err)=>{
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + err + '</div>';
          throw err;
        };
        window.addEventListener('error', (event)=>{
          event.preventDefault();
          handleError(event.error);
        });
        window.addEventListener('message', (event)=>{
          try{
            eval(event.data)
          } catch (err){
            handleError(err);
          }
        }, false)
      </script>
    </body>
  </html>

`;


const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iFrameRef = useRef<any>();

  useEffect(() => {
    iFrameRef.current.srcdoc = html;
    setTimeout(() => {
      iFrameRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="iframe-wrapper relative h-full grow">
      <iframe
        className="bg-white h-full w-full"
        ref={iFrameRef}
        srcDoc={html}
        title="preview"
        sandbox="allow-scripts"
      />
      {bundlingStatus && <div className='absolute bg-white text-red-500 top-0 right-0 left-0 bottom-0'>{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;
