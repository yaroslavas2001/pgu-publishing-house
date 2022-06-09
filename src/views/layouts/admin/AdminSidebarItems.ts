import { ADMINMATERIALS, AUTHORS, NEWMATERIALADMIN, REVIEWER } from "@/router/routerNames";

import SidebarItem from "@models/sidebar/sidebarItem";

export const AdminSidebarItems: Array<SidebarItem> = [
    { name: 'Авторы', routeName: AUTHORS, icon: 'icon-users' },
    { name: 'Материалы', routeName: ADMINMATERIALS, icon: 'icon-users' },
    { name: 'Новые материалы', routeName: NEWMATERIALADMIN, icon: 'icon-users' },
    { name: 'Рецензенты', routeName: REVIEWER, icon: 'icon-users' },

    // { name: 'Мои статьи', routeName: USERARTICLES, icon: 'icon-users' },
];

