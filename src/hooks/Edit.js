
export default function Edit() {

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
      var input2 = document.createElement("input");
      input2.setAttribute('type', 'text');
      var input3 = document.createElement("input");
      input3.setAttribute('type', 'text');
      var input4 = document.createElement("input");
      input4.setAttribute('type', 'text');
      document.getElementById(`speaker${this.id}`).appendChild(input1);
      document.getElementById(`title${this.id}`).appendChild(input2);
      document.getElementById(`topic${this.id}`).appendChild(input3);
      document.getElementById(`track${this.id}`).appendChild(input4);
    })
  }
}