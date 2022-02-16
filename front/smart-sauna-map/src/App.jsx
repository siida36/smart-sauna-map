import React from 'react';
import './App.css';
import Maps from './Map';
import QueryForm from './QueryForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', center: { lat: 35.683542, lng: 139.703338 } };
  }

  handleCenterChange = (center) => {
    this.setState({ center });
  };

  render() {
    return (
      <div className="App">
        <QueryForm
          center={this.state.center}
          onCenterChange={this.handleCenterChange}
        />
        <Maps center={this.state.center} />
      </div>
    );
  }
}

export default App;
