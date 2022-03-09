import React, { useState } from 'react';
import './App.css';
import Maps from './Map';
import QueryForm from './QueryForm';


function App() {
  const [center, setCenter] = useState({lat: 35.683542, lng: 139.703338});
  const [saunas, setSaunas] = useState([]);
  const [query, setQuery] = useState("");

  const handleFormInput = (event) => {
    // state でも property でもなく event.target.value で値を渡す
    setQuery(event.target.value);
  }

  const handleFormSubmit= (event) => {
    event.preventDefault();  // デフォルトではページのリロードが行われる。これを防ぐため。
    updateMapViewCenter(setCenter, query);
    updateSaunas(setSaunas, query, "");
  }

  return (
    <div className="App">
      <QueryForm
        query={ query }
        onInput={ handleFormInput }
        onSubmit={ handleFormSubmit } />
      <Maps center={ center } saunas={ saunas } />
    </div>
  );
}

function updateMapViewCenter(setCenter, query){
  const url = "http://localhost:5000/";
  createPromise(url, {"query": query})
    .then(location => {
      setCenter({lat: location.lat, lng: location.lng});
    });
}

function updateSaunas(setSaunas, keyword="shinjuku", prefecture="") {
  // Python のサウナイキタイパースサーバにクエリを投げてサウナ情報を取得する関数.
  const url = "http://localhost:5000/sauna";
  createPromise(url, {"keyword": keyword, "prefecture": prefecture})
    .then(saunas => {
      setSaunas(saunas);
    });
}

async function createPromise(url, query){
  const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(query)
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export default App;
