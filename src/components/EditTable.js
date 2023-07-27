import React, { useState, useEffect } from "react";
import Publish from "./Publish";
import { S3 } from "aws-sdk";
import AWS from "aws-sdk";
import { TrashIcon } from "@heroicons/react/24/solid";

function EditableTable() {
  const [data, setData] = useState([]);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    // Fetch JSON data from Amazon S3
    fetchDataFromS3();
  }, []);

  const fetchDataFromS3 = async () => {
    try {
      // Initialize the S3 client
      const s3 = new S3();

      // Retrieve the JSON file from S3
      const response = await s3
        .getObject({
          Bucket: "nct.northcreek",
          Key: "merged.json",
        })
        .promise();

      // Parse the JSON data
      const jsonData = JSON.parse(response.Body.toString());

      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data from S3:", error);
    }
  };

  const handleCellChange = (event, rowIndex, columnName) => {
    const { value } = event.target;

    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][columnName] = value;
      return newData;
    });
  };

  const archiveFile = (event, rowIndex, columnName) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // debugger;
    const s3 = new AWS.S3();

    const value = (data[rowIndex]["state"] = columnName);

    data[rowIndex]["state"] = "archived";
    console.log(data);

    const jsonString = JSON.stringify(value);

    const uploadParams = {
      Bucket: "nct.northcreek",
      Key: `archived.json`, //change the key name
      Body: jsonString,
    };

    s3.upload(uploadParams, (uploadErr, uploadData) => {
      if (uploadErr) {
        console.log("Error uploading merged JSON file:", uploadErr);
      } else {
        console.log(
          "Merged JSON file uploaded successfully:",
          uploadData.Location
        );
      }
    });
  };

  //sort

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (columnKey) => {
    let direction = "asc";

    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key: columnKey, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[columnKey] > b[columnKey]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div className="overflow-x-scroll">
      <table className="">
        <thead className="">
          <tr>
            
            <th onClick={() => handleSort("No.")}
            className="headerStyles"
            >
              No.{" "}
              {sortConfig.key === "No." && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("speaker")}
            className="headerStyles"
            >
              Speaker{" "}
              {sortConfig.key === "speaker" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("title")}
            className="headerStyles"
            >
              Title{" "}
              {sortConfig.key === "title" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("topic")}
            className="headerStyles"
            >
              Topic{" "}
              {sortConfig.key === "topic" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("track")}
            className="headerStyles"
            >
              Track{" "}
              {sortConfig.key === "track" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("date")}
            className="headerStyles"
            >
              Date{" "}
              {sortConfig.key === "date" && (
                <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th className="headerStyles">Url</th>
            <th className="headerStyles">ID</th>
            <th></th>
            <th className="headerStyles">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} id={rowIndex}>
              <td className="text-white">{rowIndex + 1}</td>
              <td className="text-black">
                <input
                  className="inputBar"
                  type="text"
                  value={row.speaker}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "speaker")
                  }
                />
              </td>
              <td className="text-black">
                <input
                  className="inputBar"
                  type="text"
                  value={row.title}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "title")
                  }
                />
              </td>
              <td className="text-black">
                <input
                  className="inputBar"
                  type="text"
                  value={row.topic}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "topic")
                  }
                />
              </td>
              <td className="text-black">
                <input
                className="inputBar"
                  type="text"
                  value={row.track}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "track")
                  }
                />
              </td>
              <td className="text-black">
                <input
                className="inputBar"
                  type="text"
                  value={row.date.slice(0, 4)}
                  onChange={(event) =>
                    handleCellChange(event, rowIndex, "date")
                  }
                />
              </td>
              <td className="text-white">{row.url}</td>
              <td className="text-white">{row.id}</td>

              <td>
                <TrashIcon />
                <button
                  onClick={(event) => archiveFile(event, rowIndex, "archived")}
                >
                  Delete
                </button>
              </td>
              <td className="text-white">
                {
                  <div>
                    {row.state === "archived" ? <p>Archived</p> : <p>Public</p>}
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditableTable;
