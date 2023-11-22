import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../state";
import { useAppSelector } from "./UseTypedSelector";

const cellSelector = (state: RootState) => state.cellReducer;

const showFunc = `
import _React from 'react';
import _ReactDOM from 'react-dom';

var show = (value)=>{
  const root = document.querySelector('#root');

  if (typeof value === 'object'){
    if(value.$$typeof && value.props){

      _ReactDOM.render(value, root);

    }else{
      root.innerHTML = JSON.stringify(value);
    }
  }else{
    root.innerHTML = value;
  }
}
  
`;

const showFuncNoOp = 'var show = ()=> {};';

export const useCumulativeCodeSelector = (cellId: string) => {

    const cumulativeCodeSelector = createSelector(
        [cellSelector],
        (cellReducer) => {
            const { data, order } = cellReducer;
            const orderedCells = order.map((id) => data[id]);
            const cumulativeCode = [];

            for (const c of orderedCells) {
                if (c.type === 'code') {
                    if (c.id !== cellId) {
                        cumulativeCode.push(showFuncNoOp);
                    } else {
                        cumulativeCode.push(showFunc);
                    }
                    cumulativeCode.push(c.content);
                }
                if (c.id === cellId) {
                    break;
                }
            }
            return cumulativeCode.join('\n');
        }
    );

    const cumulativeCode = useAppSelector(cumulativeCodeSelector);
    return cumulativeCode;
}

