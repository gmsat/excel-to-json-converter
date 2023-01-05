import React, { useEffect, useState } from 'react';

interface Props {
  data: string[] | null
}

// TODO: add checkboxes to enable / disable keys
// TODO: add input fields to set default values for each key

const DataKeys: React.FC<Props> = ({data}) => {
  const [headers, setHeaders] = useState<string[] | null>(null);

  useEffect(() => {
    setHeaders(data);
  }, [data]);

  const headersList = headers?.map((item) => {
    return (
      <div style={{display: "flex", flexFlow: "column", alignItems: "flex-start"}}>
        <div>
          <input type="checkbox" checked={true}/>
          <input type="text" value={item}/>
        </div>
      </div>
    )
  })

  return (
    <div>
      {headers ? headersList : <div>No headers found</div>}
    </div>
  );
}

export default DataKeys;