// This App is Deployed. See Live Site at:
// https://image-spacestagram.netlify.app

import { Component, createRef } from 'react';
import Image from './components/Image';
import './App.scss';
import FunctionalDate, { latestDate } from './classes/FunctionalDate';
const apiKey = 'GVOJ4vu8cMAdBi1abcT0oXCVZeRCOwqgc7LM0hrY';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
    this.startDate = createRef();
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
      this.addData(date.nextDate());
    }
  }

  componentDidMount = () => {
    const retrieveData = localStorage.getItem('data');

    if (!retrieveData) {
      return;
    }

    const data = JSON.parse(retrieveData);
    if (data && data.length > 0) {
      this.setState({ data: data });
      return;
    }

    const startDate = localStorage.getItem('startDate');
    if (startDate) {
      this.addData(this.convertStringToDate(startDate));
    }
  }

  convertStringToDate = (startDate) => {
    return new FunctionalDate(Number(startDate.substring(0, 4)), Number(startDate.substring(5, 7)), Number(startDate.substring(8)));
  }

  setStartDate = () => {
    const startDate = this.startDate.current.value;
    if (startDate.length === 0) {
      return;
    }
    const functionalStartDate = this.convertStringToDate(startDate);

    if (!functionalStartDate.isValidDate()) {
      return;
    }

    if (this.state.data.length > 0) {
      this.setState({ data: [] });
    }
    this.addData(functionalStartDate);

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
