import Contact from '../components/Contact';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../components/navbar';

function ContactPage (){

const userData = useSelector((state)=> state.user.value);


let displayLogged = 
<>
  <Navbar/>
  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <p>You should SignIn or SignUp to contact someone</p>
  </div>
</>


if(userData.token !== null){
  displayLogged = <Contact/>
}

return(
  <>
      {displayLogged}
  </>
  ) 
}

export default ContactPage;