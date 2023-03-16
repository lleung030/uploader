      // const buttonEditDisplay = document.getElementsByClassName("edit-button");
      // var buttonDelete = document.getElementsByClassName("delete-button");
      // var cancelButton = document.getElementsByClassName("cancel-button");
      // var doneButton = document.getElementsByClassName("done-button");
      // var status = document.getElementsByClassName("status");
      // for (var i = 0; i < buttonEditDisplay.length; i++) {
      //   buttonEditDisplay[i].addEventListener("click", function () {
      //     console.log(this.id)
      //     for (var j = 0; j < buttonDelete.length; j++) {
      //       buttonDelete[j].style.display = "block";
      //     }
      //     for (var j = 0; j < cancelButton.length; j++) {
      //       cancelButton[j].style.display = "block";
      //     }
      //     for (var j = 0; j < buttonEditDisplay.length; j++) {
      //       buttonEditDisplay[j].style.display = "none";
      //     }
      //     for (var j = 0; j < doneButton.length; j++) {
      //       doneButton[j].style.display = "block";
      //     }

      //     var speaker = document.getElementById(`speaker${this.id}`);
      //     var title = document.getElementById(`title${this.id}`);
      //     var topic = document.getElementById(`topic${this.id}`);
      //     var track = document.getElementById(`track${this.id}`);
      //     speaker.contentEditable = true;
      //     title.contentEditable = true;
      //     topic.contentEditable = true;
      //     track.contentEditable = true;
      //     speaker.style.boxShadow = "inset 0 0 0 1px black";
      //     title.style.boxShadow = "inset 0 0 0 1px black";
      //     topic.style.boxShadow = "inset 0 0 0 1px black";
      //     track.style.boxShadow = "inset 0 0 0 1px black";
      //   });
      // }

      import * as AWS from "aws-sdk";
import React, {useState} from 'react';


const BucketList = (bucketName) => {
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
          return `
          
          <tr class=" border-b hover:bg-gray-400 hover:dark:border-gray-700 bg-gray-50 dark:hover:bg-gray-600" id="id${id}">
          <th class="w-4 p-4 id=id${id}">
          <div class="flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white" id="${id}">
          ${id}
          </div>
          </th>
          <td onClick={handleChange} scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white speaker" id="speaker${id}">
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
          <path id="edit-button${id}" d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
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
          
          <td>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="red" 
          class="w-6 h-6 
          delete-button"
          type="button"
          value="Delete"
          id="${id}">
          <path id="delete-button${id}" stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          </td>

          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" id="status${id}">
          <span class="bg-red-100 text-red-800 text-xs font-high mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 status-archived" id="status-archived${id}">To Be Deleted</span>
          <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 status-published" id="status-published${id}">Published</span>
          </td>
          
          </div>
          </th>
          </tr>
          
          `;
        })
        .join("");
      document.getElementById("myTable").innerHTML = objectLists;

      const sortSpeaker = document.getElementById("btn-speaker");
      const objectInfo = JSON.parse(newObject);
      sortSpeaker.addEventListener("click", () => {
          objectInfo.sort((a, b) => {
            if(a.speaker == b.speaker)
              return 0;
            else if(a.speaker < b.speaker)
              return -1;
            else if(a.speaker > b.speaker)
              return 1;

            // a.speaker.localeCompare(b.speaker);
            
            // return a.speaker - b.speaker;
  
            // a = a.speaker || ''
            // b = b.speaker || ''
            // return a?.localeCompare(b)
          })
      })

      const statusBar = document.getElementsByClassName("status-archived");
      const statusBar2 = document.getElementsByClassName("status-published");
      for (var i = 0; i < statusBar.length; i++) {
        statusBar[i].style.display = "none";
      }
      for (var i = 0; i < statusBar2.length; i++) {
        statusBar2[i].style.display = "none";
      }
      const doneCells = document.querySelectorAll(".done-button");
      for (var i = 0; i < doneCells.length; i++) {
        doneCells[i].addEventListener("click", function () {
          var speaker = document.getElementById(`speaker${this.id}`);
          var title = document.getElementById(`title${this.id}`);
          var topic = document.getElementById(`topic${this.id}`);
          var track = document.getElementById(`track${this.id}`);
          speaker.contentEditable = false;
          title.contentEditable = false;
          topic.contentEditable = false;
          track.contentEditable = false;
          speaker.style.backgroundColor = "none";
          title.style.backgroundColor = "none";
          topic.style.backgroundColor = "none";
          track.style.backgroundColor = "none";
          speaker.style.boxShadow = "none";
          title.style.boxShadow = "none";
          topic.style.boxShadow = "none";
          track.style.boxShadow = "none";
          var input4 = document.getElementsByClassName(`input4`)
          var value4 = document.createTextNode(input4[0].value);
          document.getElementById(`track${this.id}`).removeChild(input4[0]);
          document.getElementById(`track${this.id}`).appendChild(value4);

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
          var statusArchived = document.getElementById(`status-archived${this.id}`);
          statusArchived.style.display = "inline";
          var deleteButton = document.getElementById(`delete-button${this.id}`);
          deleteButton.style.display = "none";
          var editButton = document.getElementById(`edit-button${this.id}`);
          editButton.style.display = "none";
          var published = document.getElementById(`status-published${this.id}`);
          published.style.display = "none";
          var speaker = document.getElementById(`speaker${this.id}`);
          speaker.classList.add("line-through");
        });
      }

      const Editor = document.getElementsByClassName(`edit-button`);
      var buttonDelete = document.getElementsByClassName("delete-button");
      var cancelButton = document.getElementsByClassName("cancel-button");
      var doneButton = document.getElementsByClassName("done-button");
        for (var i = 0; i < Editor.length; i++) {
          Editor[i].addEventListener("click", function () { 
            for (var j = 0; j < buttonDelete.length; j++) {
              buttonDelete[j].style.display = "block";
              }
              for (var j = 0; j < cancelButton.length; j++) {
              cancelButton[j].style.display = "block";
              }
              for (var j = 0; j < doneButton.length; j++) {
              doneButton[j].style.display = "block";
              }
              for (var j = 0; j < Editor.length; j++) {
              Editor[j].style.display = "none";
              }
            console.log('hi')
            var input1 = document.createElement("input");
            input1.setAttribute('type', 'text');
            input1.className = 'input1'
            var input2 = document.createElement("input");
            input2.setAttribute('type', 'text');
            input2.className = 'input2'
            var input3 = document.createElement("input");
            input3.setAttribute('type', 'text');
            input3.className = 'input3'
            var input4 = document.createElement("input");
            input4.setAttribute('type', 'text');
            input4.className = 'input4'
            document.getElementById(`speaker${this.id}`).appendChild(input1);
            document.getElementById(`title${this.id}`).appendChild(input2);
            document.getElementById(`topic${this.id}`).appendChild(input3);
            document.getElementById(`track${this.id}`).appendChild(input4);
          })
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
            speaker.style.boxShadow = "none";
            title.style.boxShadow = "none";
            topic.style.boxShadow = "none";
            track.style.boxShadow = "none";
            var input1 = document.getElementsByClassName(`input1`)
            document.getElementById(`speaker${this.id}`).removeChild(input1[0]);
            var input2 = document.getElementsByClassName(`input2`)
            document.getElementById(`title${this.id}`).removeChild(input2[0]);
            var input3 = document.getElementsByClassName(`input3`)
            document.getElementById(`topic${this.id}`).removeChild(input3[0]);
            var input4 = document.getElementsByClassName(`input4`)
            document.getElementById(`track${this.id}`).removeChild(input4[0]);
            
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


//Table

import BucketList from "../hooks/GetObject";
import Publish from '../hooks/Publish';
import 'flowbite';
import search_on_table from "../hooks/SearchTable";
import searchTable from "../hooks/SearchTable"




const Table = () => {
    return (
        
<>
<div class="">
<Publish />
<input class="form-control searchBar" type="text" name="search" placeholder="search"></input>
{/* <input type="text" id="search_input" placeholder="Search..." onkeyup={search_on_table}></input> */}
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-md text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center font-large text-gray-900 whitespace-nowrap dark:text-white">
                        ID
                    </div>
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Speaker  
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Title
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Topic
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Track
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Date
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    File
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Action
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            <BucketList />
        </tbody>
        <tbody id="myTable"></tbody>
    </table>
    <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul class="inline-flex items-center -space-x-px">
            <li>
                <a href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </a>
            </li>
            <li>
                <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
                <a href="#" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
                <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
            </li>
            <li>
                <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
            </li>
            <li>
                <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </a>
            </li>
        </ul>
    </nav>
</div>
<script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
)}

export default Table;
