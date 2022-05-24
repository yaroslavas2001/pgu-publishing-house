export default class TabsProvider {
    tabs: TabInfo[] = [];
    activeTabHash = '';
    constructor(obj?: Partial<TabsProvider>) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }
    trySelectTab(tab: TabInfo): boolean {
        if (tab.isDisabled) {
            return false;
        }
        this.activeTabHash = tab.hash;
        return true;
    }
    addTab(tab: TabInfo) {
        if (this.tabs.length == 0 && !tab.isDisabled) {
            this.activeTabHash = tab.hash;
        }
        this.tabs.push(tab);
    }
}

export class TabInfo {
    title: string;
    isDisabled: boolean;
    index: number;
    hash: string;
    constructor(obj?: Partial<TabInfo>) {
        if (obj != null) {
            Object.assign(this, obj);
        }
        if (!this.hash) {
            this.hash = Array(10)
            .fill(null)
            .map(() => String.fromCharCode(Math.random()*100%25 + 'A'.charCodeAt(0))).join('')
        }
    }    
}