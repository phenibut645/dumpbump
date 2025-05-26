console.log(window.eventHandler.listeners);
const bodyContainer = document.getElementsByClassName("body-container")[0];
let currentElementInteract = null;
const pointerElement = document.createElement("div");
pointerElement.classList.add("hidden");

function renderElements(text){
    bodyContainer.innerHTML = "";
    text.split('\n').forEach(el => {
        renderElement(el);
    });
}

function renderElement(text){
    let outText = text;
    let el = "pre";
    if(text[0] === "#"){
        outText = text.slice(1);
        el = "h1"
    }
    const pre = document.createElement(el);
    pre.innerText = outText;
    bodyContainer.appendChild(pre);
    pre.addEventListener("click", _ => {
        let pr = pre;
        currentElementInteract = pr
    });
    return pre;
}

window.addEventListener("keydown", logKey => {
    if(currentElementInteract != null){
        console.log(logKey);
        switch(logKey.key){
            case "Tab":
                currentElementInteract.innerText = currentElementInteract.innerText + "   ";
                break;
            case "Enter":
                let pr = renderElement("");
                currentElementInteract = pr;
                break;
            case "Backspace":
                currentElementInteract.innerText = currentElementInteract.innerText.slice(0, -1);
                break;
            default:
                currentElementInteract.innerText = currentElementInteract.innerText + logKey.key;
                break;
        }
        
    }
});
window.eventHandler.addListener("renderText", renderElements);