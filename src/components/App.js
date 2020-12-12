import React from 'react'
import CurrentBalance from './CurrentBalance'
import EntryForm from './EntryForm'
import EntriesDisplay from './EntriesDisplay'
import api from '../util/api'

function App() {

    const refreshData = () => {
        api.listFutureEntries({ userId: '' }).then(resp => {

        })
    }

    return (
        <div>
            <div style={Header}>MONEY</div>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <CurrentBalance />
                <EntryForm />
            </div>
            <EntriesDisplay />
        </div>
    );
}

const Header = {
    textAlign: 'center',
    fontSize: '34px',
    fontFamily: 'Times, serif',
    letterSpacing: '5px',
    marginTop: '2.2em',
    marginBottom: '1.6em'
}

export default App;
