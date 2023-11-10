import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizeCss.css';

interface ResizableProps {
  direction: 'vertical' | 'horizontal';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;

    if (timer) {
      clearTimeout(timer);
    }
    const listener = () => {
      timer = setTimeout(() => {

        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }

      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  if (direction === 'vertical') {
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
      width: Infinity,
      height: 500,
      resizeHandles: ['s'],
    };
  } else {
    resizableProps = {
      className: 'flex flex-row',
      maxConstraints: [innerWidth * 75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      width: width,
      height: Infinity,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
