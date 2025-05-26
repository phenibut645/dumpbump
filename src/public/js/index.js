const menu = document.getElementById("fast-notes-navigation-button");

const navbar = document.getElementById('navbar');

menu.addEventListener("click", (_) => {
    menu.classList.toggle("rotated");
    sidebar.classList.toggle("open");
});

function matchSidebarHeight() {
    const height = navbar.offsetHeight;
    sidebar.style.height = `${window.innerHeight - height}px`;
}

window.addEventListener('resize', matchSidebarHeight);
window.addEventListener('load', matchSidebarHeight);
