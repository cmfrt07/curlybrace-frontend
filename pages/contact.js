import Contact from '../components/Contact';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar';

function ContactPage (){

const userData = useSelector((state)=> state.user.value);


let displayLogged = 
<>
  <Navbar/>
  <div style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#0d1117", height: "91.7vh"}}>
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