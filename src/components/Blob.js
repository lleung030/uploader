import React from "react";
import { default as messages } from "../nct_messages.json";



const NewBlob = () => {
  let entries = document.querySelectorAll("tr");
  let json = [],
    props = ["speaker", "title", "topic", "track", "date", "file"]; // in order that they appear in the table
  entries.forEach((row) => {
    let dataObject = {};
    row.querySelectorAll("td").forEach((element, index) => {
      dataObject[props[index]] = element.innerText;
    });
    json.push(dataObject);
  });
  // console.log(json);
  localStorage.setItem("item", JSON.stringify(json));

const blob = new Blob([json], { type: 'text/plain' });

const url = `https://s3.us-west-1.amazonaws.com/nct.northcreek/messages.json-1xg`;

fetch(url)
  .then(response => response.blob())
  .then(blob => {
    // Process the blob here
    // console.log(blob);
  })
  .catch(error => {
    console.error('Error occurred while fetching the Blob:', error);
  });

  // console.log(messages)

  var AWS = require("aws-sdk");
  AWS.config.update({ region: "us-west-1" });
  var s3 = new AWS.S3();

        fetch(url)
          .then(function (serverPromise) {
            serverPromise
              .json()
              .then(function (info) {
                // console.log(info);
              })
              .catch(function (e) {
                console.log(e);
              });
          })
          .catch(function (e) {
            console.log(e);
          });

  s3.putObject({
    Bucket: "nct.northcreek",
    Key: "messages.json-1xg",
    Body: JSON.stringify(messages),
    ContentType: "application/json; charset=utf-8",
  }).promise();

  return (
    <button
      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      onClick={NewBlob}
    >
      Upload Original JSON & checking s3 data 
    </button>
  );
};
export default NewBlob;
