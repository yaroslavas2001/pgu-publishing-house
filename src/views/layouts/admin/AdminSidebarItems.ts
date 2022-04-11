import { ARTICLES,AUTHORS } from "@/router/routerNames";

import SidebarItem from "@models/sidebar/sidebarItem";

export const AdminSidebarItems: Array<SidebarItem> = [
    { name: 'Авторы', routeName: AUTHORS, icon: 'icon-users' },
    { name: 'Сатьи', routeName: ARTICLES, icon: 'icon-users' },
    // { name: 'Мои статьи', routeName: USERARTICLES, icon: 'icon-users' },
];

