

export default class PageResponse  {
	Current: number = 0;
	Size: number = 0;
	Count: number = 0;
	constructor(obj?: Partial<PageResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
