import React from 'react'
// import Publish from './Publish';
import {useState} from 'react';

  //moving from new_uploads to year folder
  //iterate through year folder and get URLs - for only new messages
  //pull existing messages.json
  //append each of the new messages to messages.json (with Urls)
  //upload messages.json to s3


const Migration = () => {

//Copy

const AWS = require('aws-sdk');

// Set up AWS configuration
AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    region: "us-west-1",
  });

// Create an S3 instance
const s3 = new AWS.S3();

// Define the bucket name
const bucket = 'nct.northcreek';

// Define the source and destination folder names
const sourceFolder = 'new_uploads/';
const destinationFolder = '2023/';

// List objects in the source folder
const listParams = {
  Bucket: bucket,
  Prefix: sourceFolder
};

s3.listObjectsV2(listParams, (err, data) => {
  if (err) {
    console.log('Error listing objects:', err);
  } else {
    // Iterate over the objects in the source folder
    data.Contents.forEach((object) => {
      // Define the source and destination object keys
      const sourceObjectKey = object.Key;
      const destinationObjectKey = sourceObjectKey.replace(sourceFolder, destinationFolder);

      // Create the copy parameters
      const copyParams = {
        Bucket: bucket,
        CopySource: `${bucket}/${sourceObjectKey}`,
        Key: destinationObjectKey
      };

      // Copy the object
      s3.copyObject(copyParams, (copyErr, copyData) => {
        if (copyErr) {
          console.log('Error copying object:', copyErr);
        } else {
          console.log(
            // 'Object copied successfully:',
           copyData);
        }
      });
    });
  }
});

const folder = '2023/';

// Define the list objects parameters
const listParams2 = {
  Bucket: bucket,
  Prefix: folder
};

// List objects in the folder
s3.listObjectsV2(listParams2, (err, data) => {
  if (err) {
    console.log('Error listing objects:', err);
  } else {
    // Iterate over the objects
    data.Contents.forEach((object) => {
      // Get the object key
      const objectKey = object.Key;

      // Generate a presigned URL for the object
      const params = {
        Bucket: bucket,
        Key: objectKey,
        Expires: 3600 // Expiration time for the URL in seconds
      };

      const url = s3.getSignedUrl('getObject', params);
    });
  }
});

//Format


// Set up AWS configuration
AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    region: "us-west-1",
  });

// Define the list objects parameters
const listParams3 = {
  Bucket: bucket,
  Prefix: folder
};

// List objects in the folder
s3.listObjectsV2(listParams3, (err, data) => {
  if (err) {
    console.log('Error listing objects:', err);
  } else {
    const objectsArray = [];

    // Iterate over the objects
    data.Contents.forEach((object) => {
      // Get the object key
      const objectKey = object.Key;

      // Generate a presigned URL for the object
      const urlParams = {
        Bucket: bucket,
        Key: objectKey,
        Expires: 3600 // Expiration time for the URL in seconds
      };

      const url = s3.getSignedUrl('getObject', urlParams);

      // Retrieve the object from S3
      const getObjectParams = {
        Bucket: bucket,
        Key: objectKey
      };

      s3.getObject(getObjectParams, (getObjectErr, getObjectData) => {
        if (getObjectErr) {
          console.log('Error retrieving object:', getObjectErr);
        } else {
          // Convert the object data to the desired format
          const modifiedObject = {
            
            // data: getObjectData.Body.toString(), // Use appropriate conversion for non-JSON data
            speaker: '',
            title: '',
            topic: '',
            track: '',
            date: '',
            url: url,
            id: ''
          };

          // Push the modified object to the array
          objectsArray.push(modifiedObject);

          // Check if all objects have been processed
          if (objectsArray.length === data.Contents.length) {
            // Convert the objects array to JSON string
            const jsonArrayString = JSON.stringify(objectsArray);

            // Define the upload parameters
            const uploadParams = {
              Bucket: bucket,
              Key: 'modified.json',
              Body: jsonArrayString
            };

            // Upload the modified JSON file to S3
            s3.upload(uploadParams, (uploadErr, uploadData) => {
              if (uploadErr) {
                console.log('Error uploading modified JSON file:', uploadErr);
              } else {
                console.log(
                  // 'Modified JSON file uploaded successfully:', 
                  uploadData.Location);
              }
            });
          }
        }
      });
    });
  }
});

//Show

const url = `https://s3.us-west-1.amazonaws.com/nct.northcreek/modified.json`

fetch(url)
  .then(response => response.json())
  .then(data => {
    const jsonData = data; 
    const objectLists = jsonData
    objectLists.map((item, index) => {
      const id = index + 1
    
    })
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

  //Merge

  // Set up AWS configuration
  AWS.config.update({ region: "us-west-1" });

  const file1 = "messages.json-1xg";
  const file2 = "modified.json";
  const mergedFile = "merged.json";

  // Retrieve the first JSON file
  const getFile1Params = {
    Bucket: bucket,
    Key: file1,
  };

  s3.getObject(getFile1Params, (getFile1Err, getFile1Data) => {
    if (getFile1Err) {
      console.log("Error retrieving file 1:", getFile1Err);
    } else {
      // Parse the first JSON file
      const json1 = JSON.parse(getFile1Data.Body.toString());

      // Retrieve the second JSON file
      const getFile2Params = {
        Bucket: bucket,
        Key: file2,
      };

      s3.getObject(getFile2Params, (getFile2Err, getFile2Data) => {
        if (getFile2Err) {
          console.log("Error retrieving file 2:", getFile2Err);
        } else {
          // Parse the second JSON file
          const json2 = JSON.parse(getFile2Data.Body.toString());

          // Merge the two JSON objects
          const mergedJson = [ ...json1, ...json2 ];

          // Convert the merged JSON object to a string
          const mergedJsonString = JSON.stringify(mergedJson);

          // Upload the merged JSON object back to S3
          const uploadParams = {
            Bucket: bucket,
            Key: mergedFile,
            Body: mergedJsonString,
          };

          s3.upload(uploadParams, (uploadErr, uploadData) => {
            if (uploadErr) {
              console.log("Error uploading merged JSON file:", uploadErr);
            } else {
              console.log(
                // "Merged JSON file uploaded successfully:",
                uploadData.Location
              );

              const url = `https://s3.us-west-1.amazonaws.com/nct.northcreek/merged.json`;

              fetch(url)
                .then((response) => response.json())
                .then((data) => {
                  const jsonData = data;
                  const objectLists = jsonData;
                })
                .catch((error) => {
                  console.error("Error fetching JSON:", error);
                });
            }
          });
        }
      });
    }
  });
  //publish
  const [pillStatuses, setPillStatuses] = useState([]);
  const [isPillVisible, setIsPillVisible] = useState(false); // Track pill visibility
  function Publish() {
  
 
    const handlePublishAll = async () => {
      // Publish logic here
      setIsPillVisible(true); // Set pill visibility to true after publishing
      
    };
  }


return <>
  <button
    class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    onClick={Migration}
  >
    Publish
  </button>
  <div className="flex">
    <div
        className={`pill ${isPillVisible ? 'visible' : 'hidden'}`}
      >
        <p className='inline-block bg-green-600 text-white rounded-full px-4 py-2'>Pill Status: Visible</p>
      </div>
      </div>
</>
}

export default Migration
