import './App.css';
import React from 'react';
import AutoCompleteInput from './AutoCompleteInput';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>City Auto Complete App</h1>
        </header>
        <AutoCompleteInput text='City'/>
      </div>
    );
  }
}

export default App;
