import React from 'react'
import CurrentBalance from './components/CurrentBalance'
import EntryForm from './components/EntryForm'
import EntriesDisplay from './components/EntriesDisplay'
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={Container}>
        <CurrentBalance />
        {/*<RefreshButton />*/}
      </div>
      <EntryForm />
      <EntriesDisplay />
    </div>
  );
}

const Container = {
    display: 'flex',
    justifyContent: 'space-between'
}

export default App;
