import * as AWS from "aws-sdk";

const BucketList = (bucketName) => {
  AWS.config.update({
    accessKeyId: "AKIA3M7HW3KNJAOFM5VF",
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
      // console.log(data);
      const info = data.Contents;
      const newObject = window.localStorage.getItem("item");
      const objectLists = info
        .map((item, index) => {
          const id = index + 1;
          return `
          
          <tr class=" border-b hover:bg-gray-400 hover:dark:border-gray-700 bg-gray-50 dark:hover:bg-gray-600" id="id${id}">
          <th class="w-4 p-4 id=id${id}">
          <div class="flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white" id="${id}">
          ${id}
          </div>
          </th>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white speaker" id="speaker${id}">
          ${"" ? null : JSON.parse(newObject)[id].speaker} 
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white title" id="title${id}">
          ${"" ? null : JSON.parse(newObject)[id].title}
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white topic" id="topic${id}">
          ${"" ? null : JSON.parse(newObject)[id].topic} 
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white track" id="track${id}">
          ${"" ? null : JSON.parse(newObject)[id].track}
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" id="date${id}">
          ${item.LastModified.slice(0, 4)}
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" id="file${id}">
          ${item.Key.slice(-3)}
          </td>
          
          <th>
          <div class="flex flex-row space-x-1 space-x-reverse">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" 
          class="w-6 h-6 
          edit-button" 
          type="button" 
          value="Edit" 
          id="${id}">
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" 
          class="w-6 h-6
          cancel-button"
          value="Cancel"
          id="${id}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" 
          class="w-6 h-6 
          done-button" 
          type="button" 
          value="Done" 
          id="${id}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="red" 
          class="w-6 h-6 
          delete-button"
          type="button"
          value="Delete"
          id="${id}">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>


          </div>
          </th>
          </tr>
          `;
        })
        .join("");
      document.getElementById("myTable").innerHTML = objectLists;

      
      const doneCells = document.querySelectorAll(".done-button");
      for (var i = 0; i < doneCells.length; i++) {
        doneCells[i].addEventListener("click", function () {
          console.log(this.id);

          var speaker = document.getElementById(`speaker${this.id}`);
          var title = document.getElementById(`title${this.id}`);
          var topic = document.getElementById(`topic${this.id}`);
          var track = document.getElementById(`track${this.id}`);
          speaker.contentEditable = false;
          title.contentEditable = false;
          topic.contentEditable = false;
          track.contentEditable = false;
          speaker.style.backgroundColor = "white";
          title.style.backgroundColor = "white";
          topic.style.backgroundColor = "white";
          track.style.backgroundColor = "white";
          speaker.style.boxShadow = "none";
          title.style.boxShadow = "none";
          topic.style.boxShadow = "none";
          track.style.boxShadow = "none";

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
          localStorage.setItem("item", JSON.stringify(json));
        });
      }
      const buttonDoneDisplay = document.getElementsByClassName("done-button");
      var buttonEdit = document.getElementsByClassName("edit-button");
      var cancelButton = document.getElementsByClassName("cancel-button");
      for (var i = 0; i < buttonDoneDisplay.length; i++) {
        buttonDoneDisplay[i].style.display = "none";
        buttonDoneDisplay[i].addEventListener("click", function () {
          for (var j = 0; j < buttonEdit.length; j++) {
            buttonEdit[j].style.display = "block";
          }
          for (var j = 0; j < cancelButton.length; j++) {
            cancelButton[j].style.display = "none";
          }
          for (var j = 0; j < buttonDoneDisplay.length; j++) {
            buttonDoneDisplay[j].style.display = "none";
          }
          var id = document.getElementById(`id${this.id}`);
          var speaker = document.getElementById(`speaker${this.id}`);
          var title = document.getElementById(`title${this.id}`);
          var topic = document.getElementById(`topic${this.id}`);
          var track = document.getElementById(`track${this.id}`);
          var date = document.getElementById(`date${this.id}`);
          var file = document.getElementById(`file${this.id}`);
          speaker.contentEditable = false;
          title.contentEditable = false;
          topic.contentEditable = false;
          track.contentEditable = false;
          id.style.backgroundColor = "yellow";
          speaker.style.backgroundColor = "yellow";
          title.style.backgroundColor = "yellow";
          topic.style.backgroundColor = "yellow";
          track.style.backgroundColor = "yellow";
          date.style.backgroundColor = "yellow";
          file.style.backgroundColor = "yellow";
        });
      }
      const deleteCells = document.getElementsByClassName("delete-button");
      for (var i = 0; i < deleteCells.length; i++) {
        deleteCells[i].addEventListener("click", function () {
          console.log(this.id);
        });
      }
      const buttonEditDisplay = document.getElementsByClassName("edit-button");
      var buttonDelete = document.getElementsByClassName("delete-button");
      var cancelButton = document.getElementsByClassName("cancel-button");
      var doneButton = document.getElementsByClassName("done-button");
      for (var i = 0; i < buttonEditDisplay.length; i++) {
        buttonEditDisplay[i].addEventListener("click", function () {
          console.log(this.id)
          for (var j = 0; j < buttonDelete.length; j++) {
            buttonDelete[j].style.display = "block";
          }
          for (var j = 0; j < cancelButton.length; j++) {
            cancelButton[j].style.display = "block";
          }
          for (var j = 0; j < buttonEditDisplay.length; j++) {
            buttonEditDisplay[j].style.display = "none";
          }
          for (var j = 0; j < doneButton.length; j++) {
            doneButton[j].style.display = "block";
          }
          var speaker = document.getElementById(`speaker${this.id}`);
          var title = document.getElementById(`title${this.id}`);
          var topic = document.getElementById(`topic${this.id}`);
          var track = document.getElementById(`track${this.id}`);
          speaker.contentEditable = true;
          title.contentEditable = true;
          topic.contentEditable = true;
          track.contentEditable = true;
          speaker.style.backgroundColor = "darkgray";
          title.style.backgroundColor = "darkgray";
          topic.style.backgroundColor = "darkgray";
          track.style.backgroundColor = "darkgray";
          speaker.style.boxShadow = "inset 0 0 0 1px black";
          title.style.boxShadow = "inset 0 0 0 1px black";
          topic.style.boxShadow = "inset 0 0 0 1px black";
          track.style.boxShadow = "inset 0 0 0 1px black";
        });
      }

        const buttonCancelDisplay =
          document.getElementsByClassName("cancel-button");
        var buttonEdit = document.getElementsByClassName("edit-button");
        var doneButton = document.getElementsByClassName("done-button");
        for (var i = 0; i < buttonCancelDisplay.length; i++) {
          buttonCancelDisplay[i].style.display = "none"; //hide button
          buttonCancelDisplay[i].addEventListener("click", function () {
            var speaker = document.getElementById(`speaker${this.id}`);
            var title = document.getElementById(`title${this.id}`);
            var topic = document.getElementById(`topic${this.id}`);
            var track = document.getElementById(`track${this.id}`);
            speaker.contentEditable = false;
            title.contentEditable = false;
            topic.contentEditable = false;
            track.contentEditable = false;
            speaker.style.backgroundColor = "white";
            title.style.backgroundColor = "white";
            topic.style.backgroundColor = "white";
            track.style.backgroundColor = "white";
            speaker.style.boxShadow = "none";
            title.style.boxShadow = "none";
            topic.style.boxShadow = "none";
            track.style.boxShadow = "none";

            for (var j = 0; j < buttonEdit.length; j++) {
              buttonEdit[j].style.display = "block";
            }
            for (var j = 0; j < buttonCancelDisplay.length; j++) {
              buttonCancelDisplay[j].style.display = "none";
            }
            for (var j = 0; j < doneButton.length; j++) {
              doneButton[j].style.display = "none";
            }
          });
      }
    }
  });

  return <div />;
};

export default BucketList;
