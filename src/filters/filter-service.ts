import moment from "moment";

export default class FilterService {
    public СheckNull(data: any) {
        if (data != null) return data;
        else return undefined;
    }
    public СheckNullString(data: any) {
        if (data != null) {
            if (data.length > 0) return data;
            else return undefined;
        } else return undefined;
    }
    public formatDate(date: Date) {
        return moment(date).format("DD.MM.YYYY");
    }
    public formatDateAll(date: Date) {
        return moment(date).format("DD.MM.YYYY HH:mm:ss");
    }
    public ScrollToElement(el: number, block: number = 150) {
        return window.scrollTo({ top: el - block, behavior: 'smooth' });
    }
}
