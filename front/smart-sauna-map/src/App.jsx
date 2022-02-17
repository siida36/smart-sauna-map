import React from 'react';
// import './App.css';
import Maps from './components/Map';
import QueryForm from './components/QueryForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { query: '', center: { lat: 35.683542, lng: 139.703338 } };
  }

  handleCenterChange = (center) => {
    this.setState({ center });
  };

  render() {
    const { query, center } = this.state;
    return (
      <div className="App">
        <QueryForm
          center={center}
          onCenterChange={this.handleCenterChange}
        />
        <Maps center={center} />
      </div>
    );
  }
}

export default App;
