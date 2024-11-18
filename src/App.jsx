import { useState,useEffect,useCallback,useRef } from 'react'
import React from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [passsword, setpassword] = useState("");
  const Passwordref = useRef(null);
  const passswordGenerator = useCallback(()=>{
    let pass ="";
    let str ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numallowed){ str+="0123456789"};
    if(charallowed){ str+="!@#$%*&"};
    for(let i=0; i<=length;i++){
      let char = Math.floor(Math.random()*str.length +1);
      pass+=str.charAt(char);
    }
    setpassword(pass);
  },[length,numallowed,charallowed,setpassword]);
  
  const copyPasswordtoClipboard= useCallback(()=>{
    Passwordref.current?.select();
    Passwordref.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(passsword)
  },[passsword]);
  
  useEffect(()=>{
    passswordGenerator();
  },[length,charallowed,numallowed,passswordGenerator])

  return (
    <div className='min-h-screen flex items-center'>
    <div className='w-full h-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3 text-xl  font-bold'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={passsword}
          className='outline-none w-full py-2 px-3 text-lg font-medium'
          placeholder='password'
          readOnly
          ref={Passwordref}
        />
        <button
         onClick={copyPasswordtoClipboard}
         className='outline-none bg-blue-700 text-white px-3 shrink-0 text-lg font-medium'
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={40}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numallowed}
          id='numberInput'
          onChange={()=>{
            setnumberallowed((prev)=>!prev)
          }}
           />
           <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charallowed}
          id='charInput'
          onChange={()=>{
            setcharallowed((prev)=>!prev)
          }}
          />
           <label htmlFor='charInput'>Charactes</label>
        </div>
      </div>

    </div>
    
  </div>
  )
}

export default App
