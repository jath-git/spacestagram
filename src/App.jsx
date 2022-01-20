import { Component, createRef } from 'react';
import Image from './components/Image';
import './App.scss';

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

const nowDate = new Date();
const earliestDate = new SimpleDate(1995, 6, 16);
const latestDate = new SimpleDate(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate());
const apiKey = 'GVOJ4vu8cMAdBi1abcT0oXCVZeRCOwqgc7LM0hrY';
const months31 = [1, 3, 5, 7, 8, 10, 12];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
    this.startDate = createRef();
  }

  nextDate = (currentDate) => {
    if (currentDate.date === 31) {
      currentDate.date = 1;
      if (currentDate.month === 12) {
        currentDate.month = 1;
        ++currentDate.year;
      } else {
        ++currentDate.month;
      }
    } else if (currentDate.date === 30) {
      if (months31.includes(currentDate.month)) {
        ++currentDate.date;
      } else {
        currentDate.date = 1;
        ++currentDate.month;
      }
    } else if (currentDate.month === 2 && currentDate.date >= 28) {
      if (currentDate.date === 29) {
        currentDate.date = 1;
        currentDate.month = 3;
      } else {
        const isLeap = currentDate.year % 400 === 0 || (currentDate.year % 100 !== 0 && currentDate.year % 4 === 0);
        if (isLeap) {
          ++currentDate.date;
        } else {
          currentDate.date = 1;
          currentDate.month = 3;
        }
      }
    } else {
      ++currentDate.date;
    }

    currentDate.updateString();
    return currentDate;
  }

  addData = (date) => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date.string}&api_key=${apiKey}`)
      .then(res => res.json())
      .then(dataElement => {
        const { date, url, title, explanation, copyright } = dataElement;
        this.setState({ data: [...this.state.data, { date, title, description: explanation, src: url, author: copyright, like: false }] });
      });

    if (date.string === latestDate.string || this.state.data.length > 500) {
      return;
    } else {
      this.addData(this.nextDate(date));
    }
  }

  componentDidMount = () => {
    const retrieveData = localStorage.getItem('data');

    if (!retrieveData) {
      return;
    }

    const data = JSON.parse(retrieveData);
    const startDate = localStorage.getItem('startDate');
    if (data && data.length > 0) {
      this.setState({ data: data });
    } else if (startDate) {
      this.addData(this.convertStringToDate(startDate));
    }
  }

  isValidDate = date => {
    if (date.year > earliestDate.year && date.year < latestDate.year) {
      return true;
    } else if (date.year < earliestDate.year || date.year > latestDate.year) {
      return false;
    }

    if (date.year === earliestDate.year) {
      if (date.month > earliestDate.month) {
        return true;
      } else if (date.month > earliestDate.month) {
        return false;
      }
      return date.date >= earliestDate.date;
    }

    if (date.month < latestDate.month) {
      return true;
    } else if (date.month > latestDate.month) {
      return false;
    }

    return date.date <= latestDate.date;
  }

  convertStringToDate = (startDate) => {
    return new SimpleDate(Number(startDate.substring(0, 4)), Number(startDate.substring(5, 7)), Number(startDate.substring(8)));
  }

  setStartDate = () => {
    const startDate = this.startDate.current.value;
    if (startDate.length === 0) {
      return;
    }
    const simpleStartDate = this.convertStringToDate(startDate);

    if (!this.isValidDate(simpleStartDate)) {
      return;
    }

    if (this.state.data.length > 0) {
      this.setState({ data: [] });
    }
    this.addData(simpleStartDate);

    setTimeout(() =>
      localStorage.setItem('data', JSON.stringify(this.state.data)), 5000);
    localStorage.setItem('startDate', startDate);
  }

  toggleLike = (index) => {
    const newData = this.state.data;
    newData[index].like = !newData[index].like;
    this.setState({ data: newData });
    setTimeout(() =>
      localStorage.setItem('data', JSON.stringify(newData)), 0);
  }

  render = () => {
    return (
      <div className="app">
        <form className="block">
          <h1 className="title">Spacestagram</h1>
          <label>Start Date:</label>
          <input type="date" ref={this.startDate} />
          <div className="button" onClick={this.setStartDate}>Submit</div>
        </form>

        <div className="gram" >
          {
            this.state.data.map((discard, index) => {
              return (
                <Image data={this.state.data} key={index} index={index} toggleLike={this.toggleLike} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
