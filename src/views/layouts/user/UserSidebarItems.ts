import { NEWARTICLE, ARTICLEARCHIVE, USERARTICLES, } from "@/router/routerNames";

import SidebarItem from "@models/sidebar/sidebarItem";

export const UserSidebarItems: Array<SidebarItem> = [
    { name: 'Добавить статью', routeName: NEWARTICLE, icon: 'icon-users' },
    { name: 'Архив статей', routeName: ARTICLEARCHIVE, icon: 'icon-users' },
    { name: 'Мои статьи', routeName: USERARTICLES, icon: 'icon-users' },
];

