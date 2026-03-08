function toggleMenu(event, button) {
    event.stopPropagation();
    const currentMenu = button.nextElementSibling;

    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== currentMenu) {
            menu.classList.remove('active');
        }
    });

    currentMenu.classList.toggle('active');
}

document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
    });
});