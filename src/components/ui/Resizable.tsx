import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizeCss.css';

interface ResizableProps {
  direction: 'vertical' | 'horizontal';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
 
  let resizableProps:ResizableBoxProps;

  if(direction === "vertical"){

    resizableProps = {
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints:[Infinity, 50],
      width: Infinity,
      height: 500,
      resizeHandles: ["s"]
    };

  }else{

    resizableProps={
      className: "flex flex-row",
      maxConstraints: [window.innerWidth * 75, Infinity],
      minConstraints:[window.innerWidth * 0.2, Infinity],
      width: window.innerWidth * 0.75,
      height: Infinity,
      resizeHandles: ["e"]
    };
  }

  return (
    <ResizableBox
      {...resizableProps}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
