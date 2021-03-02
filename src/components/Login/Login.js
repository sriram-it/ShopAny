import React, { useRef, useState } from 'react';
import './Login.css';
import {useSpring, animated} from 'react-spring';
import * as Data from '../data/data'
import {useHistory} from 'react-router-dom'
import Modal from 'react-modal'




function Login() {
  var history = useHistory()

  const [registrationFormStatus, setRegistrationFormStatus] = useState(false);
  const [userType, setUserType] = useState(0)
  let [isModalOpen ,setModelOpen] = useState(false)

  const nameNode = useRef()
  const emailNode = useRef()
  const addressNode = useRef()
  const phoneNode = useRef()
  const passwordNode = useRef()

  const storeLabelNode = useRef()
  const storeNode = useRef()
  
  const userNameNode = useRef()
  const passNode = useRef()


  const loginProps = useSpring ({
    left: registrationFormStatus ? -600 : 0
  })
  const registerProps = useSpring ({
    left: registrationFormStatus ? 0 : 600
  })
  

  const loginBtnProps = useSpring({borderBottom: registrationFormStatus ? 'solid 0px transparent' : 'solid 2px gray'})
  const registerBtnProps = useSpring({borderBottom: registrationFormStatus ? 'solid 2px gray' : 'solid 0px transparent'})
  

  function registerClicked() {  setRegistrationFormStatus(true)}
  function loginClicked() { setRegistrationFormStatus(false)}
  

  let record = [];
 
    const addData = (ev) => {
      ev.preventDefault();
      let data = {
        id: (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        name: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        rpassword: document.getElementById('rpassword').value
      }
      record.push(data);
      //document.querySelector('form').reset();

      console.log('added', {record});
      let pre = document.querySelector('#msg pre');
      if (pre){
        pre.textContent = '\n' + JSON.stringify(record, '\t', 2);
      }
      localStorage.setItem('DataList', JSON.stringify(record));
    }

    const saveUser = () => {
      createUser()
      setUserType(0)
       nameNode.current.value = ""
       emailNode.current.value = ""
       addressNode.current.value = ""
       phoneNode.current.value =""
       passwordNode.current.value = ""
       storeNode.current.value = ""
      console.log(Data.users)
      console.log(Data.sellers)
    }    

    const createUser = () => {
      let userId = 0  
      if(Data.users.length > 0) {
          userId = Data.users[Data.users.length-1].id + 1
      } 
      Data.users.push({id: userId, name: nameNode.current.value, email: emailNode.current.value, password: passwordNode.current.value, address: addressNode.current.value, phoneNumber: phoneNode.current.value, userType: userType}) 
      if(userType == 1) {
        createSeller()
      }
      setModelOpen(true)
    }

    const createSeller = () => {
      let sellerId = 0  
      if(Data.sellers.length > 0) {
        sellerId = Data.sellers[Data.sellers.length-1].id + 1
      } 
      Data.sellers.push({id: sellerId, name: nameNode.current.value, email: emailNode.current.value, password: passwordNode.current.value,  address: addressNode.current.value, phoneNumber: phoneNode.current.value, companyName: storeNode.current.value})
    }

    const onUserTypeChange = (event) => {
        let value = event.target.value 
        
        if(value == 1) {
          document.getElementById('storeNameLabel').style.display = "block !important"
          document.getElementById('storeNameInput').style.display = "block !important"
          storeLabelNode.current.style.display = "block"
        }
        setUserType(event.target.value)
    }


    const onLogin = () => {
      var userObject = getObject(userNameNode.current.value, Data.users)
      if(userObject.password == passNode.current.value) {
        console.log(Data.currentUser)
        Data.currentUser.splice(0, Data.currentUser.length, userObject)
        console.log(Data.currentUser)
        if(userObject.userType == 0) {
          history.replace(`/product`)
        } else if (userObject.userType == 1) {
          history.replace(`/statistics`)
        }
      }
    }

    function getObject(email, objects) {
      for(let i = 0; i < objects.length; i++) {
          if(objects[i].email == email) {
              return objects[i]
          }
      }
      return null
  }

  // document.addEventListener('DOMContentLoaded', ()=>{
  //   document.getElementById('btn').addEventListener('click', addData);
  // });
  
  function LoginForm() {
    return (
      <React.Fragment>
        <label htmlFor='username' className='form-group-label'>USERNAME</label>
        <input type='text' id='username' className='form-group-input' ref={userNameNode}/>
        <label htmlFor='password' className='form-group-label'>PASSWORD</label>
        <input type='password' id='lpassword'  className='form-group-input' ref={passNode}/>
        <input type='submit' value='submit' className='submitBtn' onClick={()=>onLogin()} />
      </React.Fragment>
    )}
  
  function RegisterForm() {
    return (
      <React.Fragment>
        <div id='form'>
          <label  className='form-group-label'>USER TYPE</label>
          <select className='form-group-input' value={userType} onChange={(event)=>(onUserTypeChange(event))}>
            <option value={0} className='form-group-input' >Customer</option>
            <option value={1} className='form-group-input'>Seller</option>
          </select>
          
          <label  className='form-group-label'>FULLNAME</label>
          <input type='text' id='fullname' className='form-group-input' ref={nameNode}/>
          <label  className='form-group-label'>EMAIL</label>
          <input type='text' id='email' className='form-group-input' ref={emailNode}/>
          <label  className='form-group-label'>PASSWORD</label>
          <input type='password' id='rpassword' className='form-group-input' ref={passwordNode}/>
          <label  id="storeNameLabel" className={userType == 0 ?'form-group-label-hidden' : 'form-group-label'} ref={storeLabelNode}>STORE NAME</label>
          <input type='text' id='storeNameInput' className={userType == 0 ?'form-group-input-hidden' : 'form-group-input'} ref={storeNode}/>
          
          <label  className='form-group-label'>ADDRESS</label>
          <input type='text' id='address' className='form-group-input' ref={addressNode}/>
          <label  className='form-group-label'>PHONE</label>
          <input type='text' id='phone' className='form-group-input' ref={phoneNode}/>
          <input type='submit' value='submit' className='submitBtn' id='btn' onClick={()=>(saveUser())} />
        </div>
        
      </React.Fragment>
    ) }


  return (
    <div className="login-register-wrapper">
      <div>
        <div className="nav-buttons">
          <animated.button onClick={loginClicked} id="loginBtn" className="buttons" style={loginBtnProps}>Login</animated.button>
          <animated.button onClick={registerClicked} id="registerBtn" className="buttons" style={registerBtnProps}>Register</animated.button>
        </div>
        <div className="form-group">
          <animated.div  id='loginform' className="forms" style={loginProps}><LoginForm/></animated.div> 
          <animated.div  id='registerform' className="forms" style={registerProps}><RegisterForm/></animated.div>
        </div>
      {/* <animated.div className="forgot-panel" style={loginProps}><a href="www.google.com" >Forgot password?</a></animated.div> */}
      </div>
      <Modal isOpen={isModalOpen} className="modal" style={{overlay:{backgroundColor:'grey', opacity: 0.95}}}>
          <div class="root">
              <div className="modal-header">
                <p>Message</p>
              </div>
              <div className="model-body">Regiseterd Successfully.</div>
              <div className="modal-footer">
                  <button onClick={()=>setModelOpen(false)}>Close</button>
              </div>
          </div> 
      </Modal>
    </div>
  );
}


export default Login;
