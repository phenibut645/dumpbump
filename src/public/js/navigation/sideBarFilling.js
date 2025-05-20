const sidebar = document.getElementById("sidebar");
const groupsContainer = document.getElementsByClassName("groups-container")[0]

async function getGroups() {
    const url = location.protocol + "//" + location.host + "/api/groups";
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

function renderAddButton(el, className = null, containerClassName = null) {
    const addButtonContainer = document.createElement("div");
    addButtonContainer.classList.add(!containerClassName ? "add-button-container" : containerClassName);
    el.appendChild(addButtonContainer);

    const svgButton = document.createElement("img");
    svgButton.src = "/other/svg/add-round-black-icon.svg";
    svgButton.classList.add(!className ? "add-svg-button" : className)
    svgButton.id = "add-svg-button";
    addButtonContainer.appendChild(svgButton);

}


function renderComponent(obj) {
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

    obj.notes.forEach(note => {

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

        const noteItemLine = document.createElement("div");
        noteItemLine.classList.add("note-item-line");
        noteItemWrapper.appendChild(noteItemLine);


    })
    renderAddButton(notesContainer, "notes-add-button", "notes-add-button-container")

    groupItemTextWrapper.addEventListener("click", (_) => {
        groupItemLine.classList.toggle("open");
        groupItemWrapper.classList.toggle("group-item-wrapper-hover");
        notesContainer.classList.toggle("hidden");
    })

}


async function renderFilling() {
    groupsContainer.innerHTML = "";
    const groups = await getGroups()
    if (groups["response"]["success"] === 1) {
        groups["response"]["data"].forEach(group => {
            renderComponent(group)
        })
        renderAddButton(groupsContainer)
    } else {
        console.log("gg");
    }

}

renderFilling();