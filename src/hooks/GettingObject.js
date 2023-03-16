import * as AWS from "aws-sdk";
import React, {useState} from 'react';


const BucketLists = (bucketName) => {
  const [sortedField, setSortedField] = useState(null);
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    region: "us-west-1",
  });
  // Create the parameters for calling listObjects
  var bucketParams = {
    Bucket: "mp3-bucket-nct",
  };

  const s3 = new AWS.S3();
  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjectsV2(bucketParams, function (err, data) {
    
    if (err) {
      console.log("Error", err);
    } else {
      data = JSON.stringify(data, null, 1);
      data = JSON.parse(data);
      const info = data.Contents;
      const newObject = window.localStorage.getItem("item");

      const objectLists = info
        .map((item, index) => {
          const id = index + 1;
          console.log(item)
          return item

        })
    }
})
}

export default BucketLists;