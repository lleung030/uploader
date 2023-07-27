import React, { useState, useEffect } from 'react';

const MyTableComponent = () => {
  const [jsonData, setJsonData] = useState([]);
  const [hiddenRows, setHiddenRows] = useState([]);

  useEffect(() => {
    // Fetch JSON data from S3
    fetch('https://s3.us-west-1.amazonaws.com/nct.northcreek/2023')
      .then(response => response.json())
      .then(data => setJsonData(data))
      .catch(error => console.error(error));
  }, []);

  const toggleRowVisibility = (rowId) => {
    setHiddenRows(prevHiddenRows => {
      if (prevHiddenRows.includes(rowId)) {
        return prevHiddenRows.filter(id => id !== rowId);
      } else {
        return [...prevHiddenRows, rowId];
      }
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jsonData.map((row) => {
          const isHidden = hiddenRows.includes(row.id);

          return (
            <tr
              key={row.id}
              style={{ display: isHidden ? 'none' : 'table-row' }}
            >
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>
                <button onClick={() => toggleRowVisibility(row.id)}>
                  {isHidden ? 'Show' : 'Hide'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MyTableComponent;
