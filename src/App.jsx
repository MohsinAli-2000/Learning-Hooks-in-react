import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);
  const createPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    createPassword();
  }, [length, numberAllowed, charAllowed, createPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl text-blue-700 text-center font-bold my-6 break-words">
          Password Generator!
        </h1>
        <div className="bg-black flex justify-center items-center rounded-lg text-white">
          <input
            className="w-full p-4 text-2xl outline-none border-y-2 border-l-2  rounded-tl-lg rounded-bl-lg"
            type="text"
            placeholder="Password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button
            className="bg-blue-500 hover:bg-white hover:text-blue-500 text-2xl text-white font-bold border-white border-2 rounded-tr-lg rounded-br-lg p-4 outline-none"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="mt-4 text-xl text-white">
          <input
            className="mx-2"
            type="range"
            value={length}
            min={8}
            max={100}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
          <input
            className="mx-2"
            type="checkbox"
            value={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label>NumberAllowed</label>
          <input
            className="mx-2"
            type="checkbox"
            value={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>CharAllowed</label>
        </div>
      </div>
    </>
  );
}

export default App;
