// This App is Deployed. See Live Site at:
// https://image-spacestagram.netlify.app

import SimpleDate from "./SimpleDate";

const nowDate = new Date();
const earliestDate = new SimpleDate(1995, 6, 16);
const latestDate = new SimpleDate(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate());
const months31 = [1, 3, 5, 7, 8, 10, 12];

class FunctionalDate extends SimpleDate {
    constructor(year, month, date) {
        super(year, month, date);
    }

    nextDate = () => {
        if (this.date === 31) {
            this.date = 1;
            if (this.month === 12) {
                this.month = 1;
                ++this.year;
            } else {
                ++this.month;
            }
        } else if (this.date === 30) {
            if (months31.includes(this.month)) {
                ++this.date;
            } else {
                this.date = 1;
                ++this.month;
            }
        } else if (this.month === 2 && this.date >= 28) {
            if (this.date === 29) {
                this.date = 1;
                this.month = 3;
            } else {
                const isLeap = this.year % 400 === 0 || (this.year % 100 !== 0 && this.year % 4 === 0);
                if (isLeap) {
                    ++this.date;
                } else {
                    this.date = 1;
                    this.month = 3;
                }
            }
        } else {
            ++this.date;
        }

        this.updateString();
    }

    isValidDate = () => {
        if (this.year > earliestDate.year && this.year < latestDate.year) {
            return true;
        } else if (this.year < earliestDate.year || this.year > latestDate.year) {
            return false;
        }

        if (this.year === earliestDate.year) {
            if (this.month > earliestDate.month) {
                return true;
            } else if (this.month > earliestDate.month) {
                return false;
            }
            return this.date >= earliestDate.date;
        }

        if (this.month < latestDate.month) {
            return true;
        } else if (this.month > latestDate.month) {
            return false;
        }

        return this.date <= latestDate.date;
    }
}

export default FunctionalDate;
export { earliestDate, latestDate, months31 };