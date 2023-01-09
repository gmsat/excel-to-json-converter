import React, { ReactNode } from 'react';

const Container: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <div style={{display: "flex", flexFlow: "column", border: "solid lightgrey 1px", borderRadius: 6, padding: 10, gap: 10}}>
      {children}
    </div>
  );
};

export default Container;