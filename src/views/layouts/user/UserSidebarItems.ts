import { NEWMATERIAL,  USERMATERIALS, ADDAUTHOR, } from "@/router/routerNames";

import SidebarItem from "@models/sidebar/sidebarItem";

export const UserSidebarItems: Array<SidebarItem> = [
    { name: 'Добавить автора', routeName: ADDAUTHOR, icon: 'icon-users' },
    { name: 'Добавить материал', routeName: NEWMATERIAL, icon: 'icon-users' },
    { name: 'Мои материалы', routeName: USERMATERIALS, icon: 'icon-users' },
];

