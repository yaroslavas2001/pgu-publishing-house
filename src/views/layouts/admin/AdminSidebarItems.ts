import { ADMINMATERIALS, AUTHORS, DEPARTMENTS, NEWMATERIALADMIN, REVIEWER } from "@/router/routerNames";

import SidebarItem from "@models/sidebar/sidebarItem";

export const AdminSidebarItems: Array<SidebarItem> = [
    { name: 'Новые материалы', routeName: NEWMATERIALADMIN, icon: 'icon-users' },
    { name: 'Материалы', routeName: ADMINMATERIALS, icon: 'icon-users' },
    { name: 'Авторы', routeName: AUTHORS, icon: 'icon-users' },
    { name: 'Рецензенты', routeName: REVIEWER, icon: 'icon-users' },
    { name: 'Кафедры и факультеты', routeName: DEPARTMENTS, icon: 'icon-users' },

];

