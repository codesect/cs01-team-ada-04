import React from 'react';

import generatePassword from '../utils/generatePassword';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Password generator</h1>
        <p>
          Here is a random password: <code>{generatePassword()}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
