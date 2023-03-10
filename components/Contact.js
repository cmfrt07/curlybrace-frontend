import styles from '../styles/Contact.module.css';
import { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import Image from 'next/image';


function Contact() {
  const router = useRouter();
  const [message, setMessage] = useState('')
  const [displayMessage, setDisplayMessage] = useState([])
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')

  const profile = useSelector((state)=> state.profileIdSender.value);
  

  useEffect (()=>{
    fetch(`https://curlybrace-backend.vercel.app/users/profile/${profile.token}`)
    .then(response=> response.json())
    .then(data=>{
        setUsername(data.profile.username)
        setAvatar(data.profile.avatar)
    });
},[avatar]);



  const allMessages = displayMessage.length > 0 ? displayMessage.map((data, i) => {
    return <div className={styles.messageBox}>
    <p key={i} className={styles.myMessages} >{data.text}</p>
    <span>{data.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    </div>
  ; 
  }) : null;
  
  const handleRetour=()=>{
    router.back();
  }

  const sendMessage = () => {
      const newMessage = {
        text: message,
        time: new Date()
      };
      setDisplayMessage(messages => [...messages, newMessage])
      setMessage('');
  }


  const avatarImage = avatar ? <Image src={avatar} alt="Avatar" width={50} height={50} style={{borderRadius: "50%"}}/> : null;

  return (
    <>
    <Navbar/>
    <main className={styles.main}>
    <div className={styles.userBox}>
    <div className={styles.contacted}>
      {avatarImage}
      <p>{username}</p>
    </div>
      <button onClick={()=> handleRetour()}>Go Back</button>
    </div>
      <div className={styles.messages}>
        <div style={{width: "40%"}}>
          {allMessages}
        </div>
      </div>
      <div className={styles.sendMessage}>
      <input placeholder='Message...' onChange={(e) => setMessage(e.target.value)} value={message}></input>
      <button onClick={() => sendMessage()} >Send</button>
      </div>
    </main>
    </>
  );
}

export default Contact;
