import React from 'react';

interface TableProps<T> {
  data: T[];
}

export default function SomeOtherTableCode<T>({ data }: TableProps<T>) {
  
  const keys = Object.keys(data[0] as string); // Get keys of the first item

  //console.log(keys)

  keys.forEach((key) => {
    console.log(key)     
  })

  const tableHeaders = keys.map((key) => {
    // Customize header rendering based on key types
    return (
      <th key={key}>
        {/* {typeof data[0][key] === 'string' ? (
          <span>{key.toUpperCase()}</span>
        ) : (
          <span>Other Type</span>
        )} */}
      </th>
    );
  });

  // Render the table
  return (
    <table>
      <thead>
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody>
        {/* Render table rows */}
      </tbody>
    </table>
  );
}

