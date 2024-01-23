import React, { useState } from 'react'
import axios from 'axios';

function New() {

  const[name, setName] = useState("") ;
  const[domain, setDomain] = useState("") ;
  const[git, setGit] = useState("") ;
  const[link, setLink] = useState("") ;

  const handleSubmit = async(e) => {
    e.preventDefault() ;

    const userData = {
      name,
      domain,
      git,
      link,
      // photo,
    };

    try{
      const response = await axios.post('http://localhost:3001/api/persons', userData);
      console.log("account created" , response.data) ;
      alert("Account Created") ;
    }
    catch(error){
      console.log("error",error) ;
    }
  }

  return (
    <div>
      <h2 style={{color:"white"}}>New to Enigma? Create your profile now</h2>
      <form onSubmit={handleSubmit}>
      <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter your name'
        />
        <input
          type='text'
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder='Domain(s)'
        />
        <input
          type='text'
          value={git}
          onChange={(e) => setGit(e.target.value)}
          placeholder='Github url'
        />
        <input
          type='text'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder='LinkedIn url'
        />
        <input
          type='text'
          placeholder='Upload your photo'
        />
        <button type='submit'>Create Account</button>
      </form>
    </div>
  )
}

export default New
