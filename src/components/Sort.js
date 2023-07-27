import React, { useState } from 'react';

function SortableTable() {
  const [data, setData] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleSort = (columnKey) => {
    let direction = 'asc';

    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: columnKey, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[columnKey] > b[columnKey]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('id')}>
            ID {sortConfig.key === 'id' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
          <th onClick={() => handleSort('speaker')}>
            Speaker {sortConfig.key === 'speaker' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
          <th onClick={() => handleSort('title')}>
            Title {sortConfig.key === 'title' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
          <th onClick={() => handleSort('topic')}>
            Topic {sortConfig.key === 'topic' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
          <th onClick={() => handleSort('track')}>
            Track {sortConfig.key === 'track' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
          <th onClick={() => handleSort('date')}>
            Date {sortConfig.key === 'date' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.speaker}</td>
            <td>{row.title}</td>
            <td>{row.topic}</td>
            <td>{row.track}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SortableTable;
