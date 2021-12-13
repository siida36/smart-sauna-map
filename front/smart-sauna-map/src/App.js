import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyComponent from './Map.js';
import { Location } from './Database.js';

const location_db = new Location();

function App() {
  return (
    <div className="App">
      <NameForm />
      <MyComponent />
    </div>
  );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // POST
    const url = "http://localhost:5000/";

    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({"query": this.state.value})
    };

    fetch(url, requestOptions
    ).then((response) => response.json()
    ).then((responseJson) => {
      console.log("Response;");
      console.log(responseJson)
      location_db.add_to_db(this.state.value, responseJson.lat, responseJson.lng);
      console.log(location_db.get_from_db(this.state.value));
      console.log("Submission event is finished.");
    })

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;