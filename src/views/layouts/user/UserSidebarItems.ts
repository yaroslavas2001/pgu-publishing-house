import { NEWMATERIAL, ARTICLEARCHIVE, USERMATERIALS, } from "@/router/routerNames";

import SidebarItem from "@models/sidebar/sidebarItem";

export const UserSidebarItems: Array<SidebarItem> = [
    { name: 'Добавить материал', routeName: NEWMATERIAL, icon: 'icon-users' },
    // { name: 'Архив статей', routeName: ARTICLEARCHIVE, icon: 'icon-users' },
    { name: 'Мои материалы', routeName: USERMATERIALS, icon: 'icon-users' },
];

