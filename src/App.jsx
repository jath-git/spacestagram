// This App is Deployed. See Live Site at:
// https://image-spacestagram.netlify.app

import { Component, createRef } from 'react';
import Image from './components/Image';
import './App.scss';
import FunctionalDate, { latestDate } from './classes/FunctionalDate';

class App extends Component {
  // initialize react state and ref
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
    this.startDate = createRef();
  }

  addData = (date) => {
    // retrieve nasa object on given date
    // checked if date is valid before function call
    fetch(`https://api.nasa.gov/planetary/apod?date=${date.string}&api_key=${process.env.REACT_APP_API_KEY || 'DEMO_KEY'}`)
      .then(res => res.json())
      .then(dataElement => {
        // add object to data
        const { date, url, title, explanation, copyright } = dataElement;
        this.setState({ data: [...this.state.data, { date, title, description: explanation, src: url, author: copyright, like: false }] });
      });

    // recursive call to add more data iff today's date is not reached or data limit is exceeded
    if (date.string === latestDate.string || this.state.data.length > 500) {
      return;
    } else {
      date.nextDate();
      this.addData(date);
    }
  }

  // function called prior to loading dom
  componentDidMount = () => {
    // verify that data is in client storage
    const retrieveData = localStorage.getItem('data');
    if (!retrieveData) {
      return;
    }

    // update data to previously saved data
    const data = JSON.parse(retrieveData);
    if (data && data.length > 0) {
      this.setState({ data: data });
      return;
    }
  }

  // parser creates FunctionalDate to modify fields later
  convertStringToDate = (startDate) => {
    return new FunctionalDate(Number(startDate.substring(0, 4)), Number(startDate.substring(5, 7)), Number(startDate.substring(8)));
  }

  // called when submit button clicked
  setStartDate = () => {
    // check that date is inputted
    const startDate = this.startDate.current.value;
    if (startDate.length === 0) {
      return;
    }
    // convert date to FunctionalDate
    const functionalStartDate = this.convertStringToDate(startDate);

    // check if date is in range [earliestDate, latestDate]
    if (!functionalStartDate.isValidDate()) {
      return;
    }

    // make new data instead of appending new elements to already existing
    if (this.state.data.length > 0) {
      this.setState({ data: [] });
    }

    // append new data objects
    this.addData(functionalStartDate);

    // store new datain client storage
    setTimeout(() => localStorage.setItem('data', JSON.stringify(this.state.data)), 5000);
  }

  toggleLike = (index) => {
    // toggle like field of data element at index
    const newData = this.state.data;
    newData[index].like = !newData[index].like;
    this.setState({ data: newData });

    // store new data
    setTimeout(() => localStorage.setItem('data', JSON.stringify(newData)), 0);
  }

  deletePost = index => {
    // delete post from data array
    const newData = [];
    for (let i = 0; i < this.state.data.length; ++i) {
      if (i !== index) {
        newData.push(this.state.data[i]);
      }
    }

    this.setState({ data: newData });

    // store new data
    setTimeout(() => localStorage.setItem('data', JSON.stringify(newData)), 0);

  }

  render = () => {
    return (
      <div className="app">
        <div className="form">
          <h1 className="title">Spacestagram</h1>
          <div className="innerMain">
            <label>Start Date</label>
            <input type="date" ref={this.startDate} />
            <div className="button" onClick={this.setStartDate}>Submit</div>
          </div>
        </div>

        {this.state.data && this.state.data.length > 0 ? <div className="gram" >
          {
            this.state.data.map((discard, index) => {
              return (
                <Image data={this.state.data} key={index} index={index} toggleLike={this.toggleLike} deletePost={this.deletePost} />
              )
            })
          }
        </div>
          : <div className="error">Enter Valid Date to Load Posts</div>}
      </div>
    );
  }
}

export default App;
