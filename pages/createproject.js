import CreateProject from "../components/CreateProject";
import Navbar from '../components/navbar';
import { useSelector } from 'react-redux';

export default function CreateProjectPage() {

  const userData = useSelector((state)=> state.user.value);

  let displayLogged = 
  <>
    <Navbar/>
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#0d1117", height: "92vh"}}>
        <p>You should Sign In or Sign Up to see create a project</p>
    </div>
  </>

  if(userData.token !== null){
    displayLogged = <>
    <Navbar />
    <CreateProject />
    </>
  }

  return (
    <>
      {displayLogged}
    </>
  );
}
