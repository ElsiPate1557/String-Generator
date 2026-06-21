import {useState, useCallback, useEffect} from 'react';
import './App.css';
function App() {
  const [randomString, setRandomString] = useState('');
  const[length, setLength] = useState(8);
  const[uppercase, setUppercase] = useState(false);
  const[lowercase, setLowercase] = useState(false);
  const[numbers, setNumbers] = useState(false);
  const[symbols, setSymbols] = useState(false);
  const generatePassword = useCallback(() => {
    let characters = '';
    if (uppercase){
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     } 
    if (lowercase){
      characters += 'abcdefghijklmnopqrstuvwxyz';
    } 
    if (numbers){
      characters += '0123456789';
    } 
    if (symbols) {
      characters += '!@#$&*_:/';
    }
    console.log(characters);
    if(!characters){
      return;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    setRandomString(password);  
  }, [length, uppercase, lowercase, numbers, symbols]);
  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(randomString);
  }, [randomString]);
  useEffect(() => {
    console.log("Password Generator Loaded");
    }, []);
  let strength = 'weak';
  const selectedOptions = (uppercase ? 1 : 0) + 
  (lowercase ? 1 : 0) + 
  (numbers ? 1 : 0) + 
  (symbols ? 1 : 0);
  if (selectedOptions === 4) {
    strength = 'Very Strong';
  } else if (selectedOptions === 3) {
    strength = 'Strong';
  }else if (selectedOptions === 2) {
    strength = 'Medium';
  } else{
    strength = 'Weak';
  }
  return (
    <div className="card">
      <h1>Password Generator</h1>
      <p>Generate strong, secure, and unique passwords</p>
      <div className="password-box">
      <input
        type="text"
        value={randomString}
        readOnly
      />
      <div className="length-pill">
        {length}
      </div>
      <button className="copy-btn" 
      onClick={copyPassword}>
        Copy 
      </button>
      </div>
      <div className="strength-box">
        {strength}
      </div>
      <input
        type="range"
        min="8"
        max="15"
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
      />
      <div className="options">
      <label>
        <input
          type="checkbox"
          checked={uppercase}
          onChange={() => setUppercase(!uppercase)}
        />
        ABC
      </label>
      <label>
        <input
          type="checkbox"
          checked={lowercase}
          onChange={() => setLowercase(!lowercase)}
        />
        abc
      </label>
      <label>
        <input
          type="checkbox"
          checked={numbers}
          onChange={() => setNumbers(!numbers)}
        />
        123
      </label>
      <label>
        <input
          type="checkbox"
          checked={symbols}
          onChange={() => setSymbols(!symbols)}
        />
        #$&
      </label>
      </div>
      <button 
      className="generate-btn"
      onClick={generatePassword}>
        Generate 
      </button>
    </div>
  )
}

export default App;