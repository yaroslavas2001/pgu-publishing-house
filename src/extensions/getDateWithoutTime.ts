import moment from "moment";

export { }

declare global {
    interface Date {
        truncateTime(): Date;
        setHourMinutes(hour: number, minutes: number): Date;
        getTimeSet(): Date;
    }
}

Date.prototype.truncateTime = function () {
    return new Date(this.toDateString());
}
Date.prototype.setHourMinutes = function (hour: number, minutes: number): Date {
    this.setHours(hour);
    this.setMinutes(minutes);
    return this;
}
Date.prototype.getTimeSet = function (): Date {
    if (this.getTimezoneOffset() < 0) {
        return moment(
            this.getTime() - this.getTimezoneOffset() * 60 * 1000
        ).toDate();
    } else {
        return moment(
            this.getTime() + this.getTimezoneOffset() * 60 * 1000
        ).toDate();
    }
}


