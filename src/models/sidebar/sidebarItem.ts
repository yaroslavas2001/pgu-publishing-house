export default class SidebarItem {
    icon: string;
    name: string;
    routeName: string;
    constructor(obj?: Partial<SidebarItem>) {
        obj && Object.assign(this, obj);
    }
}