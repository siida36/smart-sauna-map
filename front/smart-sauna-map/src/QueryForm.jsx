import React from 'react';

export default class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' }; // ローカルの要素queryだけ。グローバルなcenterは入れない

    // bind(this) をしないと props, state を使えない
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // state でも property でもなく event.target.value で値を渡す
    console.log('query@handlechange()');
    console.log(e.target.value);
    this.setState({ query: e.target.value });
    console.log(this.state.query);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('query@handlesubmit()');
    console.log(this.state.query);

    // POST
    const url = 'http://localhost:5000/';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: this.state.query }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Response;');
        console.log(responseJson);
        console.log('Submission event is finished.');
        this.props.onCenterChange({
          lat: responseJson.lat,
          lng: responseJson.lng,
        });
      });
  }

  render() {
    const { query } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={query} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
