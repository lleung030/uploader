import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

const Publish = () => {
    
    var published = document.getElementsByClassName("status-published");
    var archived = document.getElementsByClassName("status-archived");
    for (var i = 0; i < published.length; i++) {
        
            if (archived[i].style.display === "inline") {
                console.log('not this one')
            } else {
                published[i].style.display = "inline"
                var AWS = require('aws-sdk');
                AWS.config.update({ region: 'us-west-1' });
                var s3 = new AWS.S3();

            var obj = {
                // ID: document.getElementsById('id').value,
                Speaker: document.getElementsByClassName(`speaker`)[i].innerText,
                Title: document.getElementsByClassName('title')[i].innerText,
                Topic: document.getElementsByClassName('topic')[i].innerText,
                Track: document.getElementsByClassName('track')[i].innerText,
                Date: document.getElementsByClassName('date')[i].innerText,
                File: document.getElementsByClassName('file')[i].innerText,
            };
            var buf = Buffer.from(JSON.stringify(obj));
            
            var data = {
                Bucket: 'audio-bucket-nct',
                Key: 'json',
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'application/json',
                // ACL: 'public-read'
            };
                
            s3.upload(data, function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('Error uploading data: ', data);
                } else {
                    console.log('succesfully uploaded!!!');
                }
            });
            console.log(obj)
            }
        }
    console.log('published')
    return <>
    <button class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    onClick={Publish}>Publish</button>
    </>

}

export default Publish;