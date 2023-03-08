import Profile from '../components/Profile';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../components/navbar';

function ProfilePage (){

const userData = useSelector((state)=> state.user.value);


let displayLogged = 
<>
   <Navbar/>
   <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <p>You should SignIn or SignUp to see your profile</p>
   </div>
</>


   if(userData.token !== null){
   displayLogged = <Profile/> 
   }

   return(
   <>
      {displayLogged}
   </>
   ) 
}

export default ProfilePage;