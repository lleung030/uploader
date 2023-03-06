import * as AWS from "aws-sdk";


const DeleteFile = (bucketName) => {
  AWS.config.update({
    accessKeyId: "AKIA3M7HW3KNJAOFM5VF",
    secretAccessKey: "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",
    region: "us-west-1",
  });
  
  // Create the parameters for calling listObjects
  var bucketParams = {
    Bucket: "mp3-bucket-nct",
    Key: 'jpg'
  };

  const s3 = new AWS.S3();

  s3.listObjectsV2(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      data = JSON.stringify(data, null, 1);
      data = JSON.parse(data);
        // console.log(data);
      const info = data.Contents;
      const objectLists = info
        .map((item, index) => {
            console.log(item.Key);
        })
    }});

  s3.deleteObject(bucketParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
  return `
  <button type="button" class="btn btn-danger" onclick="DeleteFile('${bucketName}')">
  `
}

export default DeleteFile;