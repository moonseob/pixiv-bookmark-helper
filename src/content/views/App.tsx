import { useState } from 'react';
import './App.css';

function App() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <div className='popup-container'>
      {show && (
        <div className={`popup-content ${show ? 'opacity-100' : 'opacity-0'}`}>
          <h1>HELLO CRXJS</h1>
        </div>
      )}
      <button type='button' className='toggle-button' onClick={toggle}>
        CRXJS logo
      </button>
    </div>
  );
}

export default App;
