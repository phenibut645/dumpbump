
const sidebar = document.getElementById("sidebar");
const groupsContainer = document.getElementsByClassName("groups-container")[0]

async function getGroups() {
    const url = location.protocol + "//" + location.host + "/api/groups";
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

async function fillNote(groupIndex, noteIndex){
    const url = location.protocol + "//" + location.host + "/api/note-text/" + `${groupIndex}-${noteIndex}`;
    const response = await fetch(url);
    const json = await response.json();
    window.eventHandler.callEvent("renderText", json["text"]);
    return json;
}

let newGroupInput = false;
let mainAddButton = null;
const alrObject = []

function renderAddButton(el, className = null, containerClassName = null, addGroup = true) {

    
    const addButtonContainer = document.createElement("div");
    addButtonContainer.classList.add(!containerClassName ? "add-button-container" : containerClassName);
    el.appendChild(addButtonContainer);

    const svgButton = document.createElement("img");
    svgButton.src = "/other/svg/add-round-black-icon.svg";
    svgButton.classList.add(!className ? "add-svg-button" : className)
    svgButton.id = "add-svg-button";
    addButtonContainer.appendChild(svgButton);

    if(addGroup){
        mainAddButton = addButtonContainer;
        svgButton.addEventListener("click", _ => {
            if(!newGroupInput)
            renderInputGroup();
        });
    }
    return [svgButton, addButtonContainer];

}
function renderRefreshButton(el){
    const refreshButtonContainer = document.createElement("div");
    const refreshButtonImg = document.createElement("img");
    refreshButtonContainer.classList.add("refresh-button-container");
    refreshButtonImg.classList.add("refresh-button");
    refreshButtonContainer.appendChild(refreshButtonImg);
    el.appendChild(refreshButtonContainer);
    refreshButtonImg.src = "../other/svg/refresh-svgrepo-com.svg";

    refreshButtonImg.addEventListener("click", (_) => {
        
        renderFilling()
    });

}


function renderComponent(obj, grpIndex) {


    const groupItemWrapper = document.createElement("div");
    groupItemWrapper.classList.add("group-item-wrapper")
    groupItemWrapper.classList.add("group-item-wrapper-hover");
    groupsContainer.appendChild(groupItemWrapper);

    const groupItem = document.createElement("div");
    groupItem.classList.add("group-item")
    groupItemWrapper.appendChild(groupItem);

    const groupItemTextWrapper = document.createElement("div");
    groupItemTextWrapper.classList.add("group-item-text-wrapper");
    groupItem.appendChild(groupItemTextWrapper);

    const groupContainerWrapper = document.createElement("div");
    groupContainerWrapper.classList.add("group-container-wrapper");
    groupItemTextWrapper.appendChild(groupContainerWrapper);

    const groupColorBox = document.createElement("div");
    groupColorBox.classList.add("group-color-box");
    groupColorBox.style.backgroundColor = `rgba(${obj.color[0]}, ${obj.color[1]}, ${obj.color[2]}, ${obj.color[3]})`;
    groupContainerWrapper.appendChild(groupColorBox);

    const groupItemText = document.createElement("div");
    groupItemText.classList.add("group-item-text")
    groupItemText.innerText = obj.name;
    groupContainerWrapper.appendChild(groupItemText)

    const groupItemLine = document.createElement("div");
    groupItemLine.classList.add("group-item-line")
    groupItemTextWrapper.appendChild(groupItemLine);

    const notesContainer = document.createElement("div");
    notesContainer.classList.add("notes-container");
    notesContainer.classList.add("hidden");
    groupItemWrapper.appendChild(notesContainer);
    let index = -1;
    obj.notes.forEach(note => {
        index++;
        let ntIndex = index;
        const noteItemWrapper = document.createElement("div");
        noteItemWrapper.classList.add("note-item-container");
        notesContainer.appendChild(noteItemWrapper);

        const noteItem = document.createElement("div");
        noteItem.classList.add("note-item");
        noteItemWrapper.appendChild(noteItem);

        const noteColorBox = document.createElement("div")
        noteColorBox.classList.add("note-color-box")
        noteColorBox.style.backgroundColor = `rgba(${note.color[0]},${note.color[1]},${note.color[2]}, ${note.color[3]})`
        noteItem.appendChild(noteColorBox);

        const noteItemText = document.createElement("div");
        noteItemText.innerText = note.name;
        noteItemText.classList.add("note-item-text");
        noteItem.appendChild(noteItemText);

        noteItemText.addEventListener("click", _ => {
            fillNote(grpIndex, ntIndex);
        });

        const noteItemLine = document.createElement("div");
        noteItemLine.classList.add("note-item-line");
        noteItemWrapper.appendChild(noteItemLine);


    })
    const [butt, buttContainer] = renderAddButton(notesContainer, "notes-add-button", "notes-add-button-container", false)
    butt.addEventListener("click", _ => {
        
        console.log(buttContainer in alrObject)
        if(buttContainer in alrObject !== true)
        renderInputNote(notesContainer, buttContainer, obj.name);
        else alrObject.push(notesContainer);
        
    })
    groupItemTextWrapper.addEventListener("click", (_) => {
        groupItemLine.classList.toggle("open");
        groupItemWrapper.classList.toggle("group-item-wrapper-hover");
        notesContainer.classList.toggle("hidden");
    })

}

function renderInputGroup(){
    document.getElementsByTagName("body")[0].appendChild(mainAddButton);


    const groupItemWrapper = document.createElement("div");
    groupItemWrapper.classList.add("group-item-wrapper")
    groupItemWrapper.classList.add("group-item-wrapper-hover");
    groupsContainer.appendChild(groupItemWrapper);

    const groupItem = document.createElement("div");
    groupItem.classList.add("group-item")
    groupItemWrapper.appendChild(groupItem);

    const groupItemTextWrapper = document.createElement("div");
    groupItemTextWrapper.classList.add("group-item-text-wrapper");
    groupItem.appendChild(groupItemTextWrapper);

    const groupContainerWrapper = document.createElement("div");
    groupContainerWrapper.classList.add("group-container-wrapper");
    groupItemTextWrapper.appendChild(groupContainerWrapper);

    const groupColorBox = document.createElement("input");
    groupColorBox.type = "color";
    groupColorBox.classList.add("group-color-box");
    groupColorBox.classList.add("group-color-box-input");
    groupColorBox.setAttribute("type", "color");
    groupColorBox.style.backgroundColor = `rgba(${25}, ${25}, ${25}, ${1})`;
    groupContainerWrapper.appendChild(groupColorBox);

    groupColorBox.addEventListener("change", _ => {
        console.log(groupColorBox.value);
    })

    const groupItemText = document.createElement("input");
    groupItemText.classList.add("group-item-text")
    groupItemText.classList.add("group-item-name-input")
    groupItemText.placeholder = "Input";
    groupContainerWrapper.appendChild(groupItemText)

    const groupItemLine = document.createElement("div");
    groupItemLine.classList.add("group-item-line")
    groupItemTextWrapper.appendChild(groupItemLine);

    const notesContainer = document.createElement("div");
    notesContainer.classList.add("notes-container");
    notesContainer.classList.add("hidden");
    groupItemWrapper.appendChild(notesContainer);

    newGroupInput = true;

    groupsContainer.appendChild(mainAddButton);

    const confirmButton = document.createElement("img");
    confirmButton.src = "../other/svg/icons8-confirm.svg";
    confirmButton.classList.add("group-confirm-button");
    groupContainerWrapper.appendChild(confirmButton);

    confirmButton.addEventListener("click", _ => {
        
        createNewGroup(hex2rgb(groupColorBox.value), groupItemText.value);
    })

}

function renderInputNote(notesContainer, buttContainer, groupName){
    
    document.getElementsByTagName("body")[0].appendChild(buttContainer);

    const noteItemWrapper = document.createElement("div");
    noteItemWrapper.classList.add("note-item-container");
    notesContainer.appendChild(noteItemWrapper);

    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");
    noteItemWrapper.appendChild(noteItem);

    const noteColorBox = document.createElement("input")
    noteColorBox.setAttribute("type", "color");
    noteColorBox.classList.add("note-color-box");
    noteColorBox.classList.add("note-color-box-input");
    noteColorBox.style.backgroundColor = `rgba(${25},${25},${25}, ${1})`
    noteItem.appendChild(noteColorBox);

    const noteItemText = document.createElement("input");
    noteItemText.placeholder = "Input";
    noteItemText.classList.add("note-item-text");
    noteItemText.classList.add("note-item-text-input");
    noteItem.appendChild(noteItemText);

    const noteItemLine = document.createElement("div");
    noteItemLine.classList.add("note-item-line");
    noteItemWrapper.appendChild(noteItemLine);

    notesContainer.appendChild(buttContainer);

    const confirmButton = document.createElement("img");
    confirmButton.src = "../other/svg/icons8-confirm.svg";
    confirmButton.classList.add("group-confirm-button");
    noteItem.appendChild(confirmButton);

    confirmButton.addEventListener("click", _ => {
        
        createNewNote(hex2rgb(noteColorBox.value), noteItemText.value, notesContainer, groupName);
    })
}

async function createNewNote(rgb, name, notesContainer, groupName){
    const response = await fetch(location.protocol + "//" + location.host + "/api/notes/add",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({rgb, name, groupName})
    })
    const json = await response.json();
    console.log(json);

    if(json.response.success === 1){
        const index = alrObject.indexOf(notesContainer);
        if (index > -1) { 
            array.splice(index, 1);
        }
        renderFilling()
    }


}

async function createNewGroup(rgb, name){
    const response = await fetch(location.protocol + "//" + location.host + "/api/groups/add",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({rgb, name})
    })
    const json = await response.json();
    console.log(json);
    if(json.response.success === 1){
        renderFilling();
        newGroupInput = false;
    }

}

function hex2rgb(hex) {
    var hex_color = hex
        , pattern_color = "^#([A-Fa-f0-9]{6})$";
    if (hex_color.match(pattern_color)) {
        var hex_color = hex_color.replace("#", "")
            , r = parseInt(hex_color.substring(0, 2), 16)
            , g = parseInt(hex_color.substring(2, 4), 16)
            , b = parseInt(hex_color.substring(4, 6), 16);
        return `${r}, ${g}, ${b}, ${1}`;
    }
    else {
        alert('Error Color Format');
    }
}

async function renderFilling() {
    groupsContainer.innerHTML = "";
    const groups = await getGroups()
    if (groups["response"]["success"] === 1) {
        renderRefreshButton(groupsContainer)
        let index = -1;
        groups["response"]["data"].forEach(group => {
            index++;
            renderComponent(group, index)
        })
        renderAddButton(groupsContainer)
    } else {
        console.log("gg");
    }

}

renderFilling();