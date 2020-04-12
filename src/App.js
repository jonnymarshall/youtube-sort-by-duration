import React, { Component }  from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCdL_mXnwxBxVSHBnkoXaIbQ&maxResults=25&key=AIzaSyCQ4TYDAsSyu9jDTcwG3rxPu_JgOIEuZ8s`)
      .then(res => console.log(res))
  }

  render() {
    return (

        <div className="App">
          <div className="container">
            <div>hello world</div>
          </div>
        </div>

    );
  }
}

export default App;
