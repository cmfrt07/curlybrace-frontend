import styles from '../styles/Signup.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { login } from '../reducers/user';
import { useDispatch } from 'react-redux';
import Navbar from "../components/navbar";
//import {googleLogout, useGoogleLogin} from '@react-oauth/google';
//import axios from "axios";

function Signup() {
const dispatch = useDispatch();
const router = useRouter();

const [signUpEmail, setSignUpEmail] = useState('');
const [signUpUsername, setSignUpUsername] = useState('');
const [signUpPassword, setSignUpPassword] = useState('');

const [ user, setUser ] = useState([]);
const [ profile, setProfile ] = useState([]);
const [validEmail, setValidEmail] = useState('')



//Register
const handleRegister = () => {
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailPattern.test(signUpEmail)) {
    // Si l'email n'est pas valide, affichez une erreur ou empêchez l'envoi de la demande POST
    console.log('Adresse e-mail invalide');
    setValidEmail('Veuillez entrer une adresse email valide')
    return;
  }
    fetch('https://curlybrace-backend.vercel.app/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signUpEmail, username: signUpUsername, password: signUpPassword }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ token: data.token, username: data.username }));
          router.push("/");
        }
      });
};


/* GOOGLE CONNECT DESACTIVE TEMPORAIREMENT CAR TROP DE PROBLEMES + FONCTIONNALITE NON PRIORITAIRE, VOIR A LA FIN
const login = useGoogleLogin({
  onSuccess: (codeResponse) => setUser(codeResponse),
  onError: (error) => console.log('Login Failed:', error)
});

useEffect(() => {
  if (user) {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        // Envoi des informations récupérées depuis Google vers la route de signup
        axios.post('http://localhost:3000/users/signupGoogle', {
          email: res.data.email,
          username: res.data.name,
        })
        .then((res) => {
          console.log(res.data + "hello");
        })
        .catch((error) => {
          console.error(error);
        });
        setProfile(res.data)
        dispatch(login({token: res.data.token}))
        router.push("/");
      })
      .catch((err) => console.log(err));
  }
}, [ user ]);


const logOut = () => {
  googleLogout();
  setProfile(null);
};
*/

  return(
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container} >
          <p>Sign-up</p>

          {/*<button onClick={() => login()}>Sign up with Google 🚀 </button>*/}
          <h3>Email</h3>
          <input type="text" placeholder="Email" id="signUpEmail" onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} />
          {validEmail}
          <h3>Username</h3>
          <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
          <h3>Password</h3>
          <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
          <button id="register" onClick={() => handleRegister()}>Register</button>
        </div>
      </main>
    </>
  );
}

export default Signup;