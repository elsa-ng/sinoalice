exports.nav_items = function (menu, submenu) {
    let menuItems = [
        {
            name: "Home",
            isCurrent: false,
            hasSubmenu: false,
            link: "/",
            title: "Home",
        },
        {
            name: "Members",
            isCurrent: false,
            hasSubmenu: false,
            link: "/members",
            title: "Members of Genesis Gucci",
            submenus: [
                {
                    name: "NM Calculator",
                    isCurrent: false,
                    hasSubmenu: false,
                    link: "/nmCal",
                    title: "Nightmare Calculator",
                }
            ]
        },
        {
            name: "NM Calculator",
            isCurrent: false,
            hasSubmenu: false,
            link: "/nmCal",
            title: "Nightmares Calculator",
        },
        {
            name: "Abou Us",
            isCurrent: false,
            hasSubmenu: false,
            link: "/about",
            title: "Learn more about Genesis Gucci",
            submenus: [
                {
                    name: "Members",
                    isCurrent: false,
                    hasSubmenu: false,
                }
            ]
        },
        {
            name: "Join Us",
            isCurrent: false,
            hasSubmenu: false,
            link: "/join",
            title: "Apply to join Genesis Gucci",
        }
    ];

    if (menu && menu.length > 0) {
        menuItems.forEach(item => {
            item.isCurrent = item.name.toUpperCase() === menu.toUpperCase();
            if (submenu && submenu.length > 0 && item.hasSubmenu) {
                item.submenus.forEach(subItem => {
                    subItem.isCurrent = subItem.name.toUpperCase() === submenu.toUpperCase();
                });
            }
        });
        return menuItems;
    }

    return menuItems;
}
