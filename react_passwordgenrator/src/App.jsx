import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numallowed, setNumallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordgenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*?~+-_=";
    for (let i = 0; i < length; i++) {
      // Fixed loop index
      let char = Math.floor(Math.random() * str.length); // Fixed index calculation
      pass += str.charAt(char); // Use += to build the password
    }
    setPassword(pass);
  }, [length, numallowed, charallowed, setPassword]);

  const copyPasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionrange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordgenrator();
  }, [length, numallowed, charallowed, passwordgenrator]);

  return (
    <>
      <div className="max-w-md mx-auto my-8">
        <div className="relative -ml-500 bg-gray-700 shadow-md rounded-lg px-4 py-4 text-aqua-500">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordtoclipboard}
              className="outline-none bg-aqua text-white px-3 py-0.5 shrink-0"
            >
              copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={4}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(Number(e.target.value)); // Convert to number
                }}
              />
              <label className="text-white">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={numallowed} // Changed to 'checked'
                onChange={() => {
                  setNumallowed((prev) => !prev); // Fixed 'perv' to 'prev'
                }}
              />
              <label className="text-white" htmlFor="numinput">
                Numbers
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                checked={charallowed} // Changed to 'checked'
                onChange={() => {
                  setCharallowed((prev) => !prev); // Fixed function name
                }}
              />
              <label className="text-white" htmlFor="charinput">
                Special Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
