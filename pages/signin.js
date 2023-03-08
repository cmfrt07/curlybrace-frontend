import styles from "../styles/SignIn.module.css";
//utilisation de la Hook 'useRoute' vers Home
import { useRouter } from "next/router";
// Utilisation reducers
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { login } from "../reducers/user";
import Navbar from "../components/navbar";

//import {googleLogout, useGoogleLogin} from '@react-oauth/google';
//import axios from "axios";


function SignIn() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userTest = useSelector((state) => state.user.value)
    //console.log(userTest)

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

    function handleConnection () {
        fetch('https://curlybrace-backend.vercel.app/signin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: signInUsername,
                password: signInPassword,
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
            dispatch(
            login({
                token: data.token,
                username: data.username,
              })
            );
            //setSignInUsername("");
            //setSignInPassword("");
            router.push("/");
          }
        });
    }

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
            axios.post('http://localhost:3000/users/signinGoogle', {
              username: res.data.name,
            })
            .then((res) => {
              if(res.data.result){
                console.log("utilisateur existe, tu est connecté")
                dispatch(login({token: res.data.token}))
                setProfile(res.data)
                router.push("/");
              }else{
                console.log("message d'erreur, user doesnt exist") 
              }
            })
            .catch((error) => {
              console.error(error);
            });
            
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
        <div className={styles.container}>
        <p>Sign-in</p>

        {/*<button onClick={() => login()}>Sign in with Google 🚀 </button> */}
        <h3>Username</h3>
            <input
              type="text"
              placeholder="Username"
              id="signInUsername"
              onChange={(e) => setSignInUsername(e.target.value)}
              value={signInUsername}
            />
        <h3>Password</h3>    
            <input
              type="password"
              placeholder="Password"
              id="signInPassword"
              onChange={(e) => setSignInPassword(e.target.value)}
              value={signInPassword}
            />


          <button
            className={styles.SignInBtn}
            onClick={() => handleConnection()}>
            Sign in
          </button>
        </div>
    </main>
  </>
);
}

export default SignIn;