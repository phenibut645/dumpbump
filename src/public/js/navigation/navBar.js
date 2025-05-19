const navContainer = document.getElementById("navbar")

const buttons = {
    "Notes": {
        link: "..."
    },
    "Connected": {
        link: "..."
    }
}

function render(){
    const navigationButtonsWrapper = document.createElement("div")
    navigationButtonsWrapper.classList.add("navigation-buttons-wrapper")
    navContainer.appendChild(navigationButtonsWrapper)

    const fastNotesNavigationContainer = document.createElement("div");
    fastNotesNavigationContainer.classList.add("fast-notes-navigation-container")
    navigationButtonsWrapper.appendChild(fastNotesNavigationContainer)

    const fastNotesNavigationButton = document.createElement("img")
    fastNotesNavigationButton.src = "../other/svg/menu-svgrepo-com.svg";
    fastNotesNavigationButton.id = "fast-notes-navigation-button";
    fastNotesNavigationContainer.appendChild(fastNotesNavigationButton)

    const navigationButtonsContainer = document.createElement("div")
    navigationButtonsContainer.classList.add("navigation-buttons-container");
    navigationButtonsWrapper.appendChild(navigationButtonsContainer);

    
    
    Object.keys(buttons).forEach(button => {
        const navigationButton = document.createElement("div")
        navigationButton.classList.add("navigation-button")
        navigationButtonsContainer.appendChild(navigationButton)

        const navigationButtonInner = document.createElement("div")
        navigationButtonInner.classList.add("navigation-button-inner");
        navigationButton.appendChild(navigationButtonInner);
        
        const text = document.createElement("div");
        text.innerText = button;    
        navigationButtonInner.appendChild(text);

        const navigationButtonLine = document.createElement("div");
        navigationButtonLine.classList.add("navigation-button-line")
        navigationButtonInner.appendChild(navigationButtonLine)

    })

    const navigationProfileButton = document.createElement("div")
    navigationProfileButton.classList.add("navigation-profile-button")
    navContainer.appendChild(navigationProfileButton);

    const profileImg = document.createElement("img");
    profileImg.src = "https://i.pinimg.com/736x/9d/5b/c1/9d5bc1576b8514ecc83deccc2c9b263c.jpg";
    profileImg.alt = "zxccat"
    navigationProfileButton.appendChild(profileImg)

}

render();