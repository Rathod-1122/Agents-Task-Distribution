import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginPage() {

  let emailRef=useRef();
  let passwordRef=useRef();

  axios.defaults.baseURL='http://localhost:4444';
  let navObject = useNavigate();

  let userLogin = async()=>{

    if(emailRef.current.value.trim()==''){
        alert('enter the email');
        return;
    }
        
    else if(passwordRef.current.value==''){
      alert('enter the password');
      return;
    }
      

    let response = await axios.get(`/login/${emailRef.current.value}/${passwordRef.current.value}`)

    alert(response.data.message)
    if(response.data.status=='success')
      navObject('/DashBoard',{state:{message:'Welcome to Admin Dashboard'}})

  }
  return (
    <div className='App'>
      <form>
        <fieldset>
          <legend>Login Form</legend>
          <div>
            <label>Email</label>
            <input type='email' ref={emailRef} onChange={()=>{
              
            }}></input>
          </div>
          <div>
            <label>Password</label>
            <input type='text' ref={passwordRef}></input>
          </div>
          <div>
            <button type='button' onClickCapture={()=>{
              userLogin();
            }}>Login</button>
          </div>
        </fieldset>
      </form>
      <Link to='/Register'>Register here if you have not Registerd</Link>
    </div>
  )
}

export default LoginPage