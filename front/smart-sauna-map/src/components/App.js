import React, { useState } from 'react';
import {
  Grid, ThemeProvider, CssBaseline,
} from '@mui/material';

import theme from '../theme/theme';
import './App.css';
import Maps from './Map';
import QueryForm from './QueryForm';
import LongMenu from './LongMenu';
import pic from '../data/img/logo.png';

function App() {
  const [center, setCenter] = useState({ lat: 35.683542, lng: 139.703338 });
  const [saunas, setSaunas] = useState([]);
  const [query, setQuery] = useState('');

  const handleFormInput = (event) => {
    // state でも property でもなく event.target.value で値を渡す
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // デフォルトではページのリロードが行われる。これを防ぐため。
    updateMapViewCenter(setCenter, query);
    updateSaunas(setSaunas, query, '');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={10}>
            <p><img src={pic} alt="logo.png" /></p>
          </Grid>
          <Grid item xs={2}>
            <LongMenu />
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <QueryForm
              query={query}
              onInput={handleFormInput}
              onSubmit={handleFormSubmit}
            />
          </Grid>
        </Grid>
        <Maps center={center} saunas={saunas} />
      </div>
    </ThemeProvider>
  );
}

function updateMapViewCenter(setCenter, query) {
  const url = 'http://localhost:5000/';
  createPromise(url, { query })
    .then((location) => {
      setCenter({ lat: location.lat, lng: location.lng });
    });
}

function updateSaunas(setSaunas, keyword = 'shinjuku', prefecture = '') {
  // Python のサウナイキタイパースサーバにクエリを投げてサウナ情報を取得する関数.
  const url = 'http://localhost:5000/sauna';
  createPromise(url, { keyword, prefecture })
    .then((saunas) => {
      setSaunas(saunas);
    });
}

async function createPromise(url, query) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => { throw new Error(error); });
}

export default App;
