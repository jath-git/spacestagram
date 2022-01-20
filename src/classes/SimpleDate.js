// This App is Deployed. See Live Site at:
// https://image-spacestagram.netlify.app

class SimpleDate {
    constructor(year, month, date) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.updateString();
    }

    updateString() {
        this.string = `${this.year}-${this.month}-${this.date}`;
    }
}

export default SimpleDate;