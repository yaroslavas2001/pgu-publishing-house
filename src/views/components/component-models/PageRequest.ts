

export default class PageRequest  {
	Skip?: number = null;
	Take?: number = null;
	constructor(obj?: Partial<PageRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
