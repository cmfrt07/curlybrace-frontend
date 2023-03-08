import styles from '../styles/Contact.module.css';
import { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useRouter } from "next/router";
import Image from 'next/image';


function Contact() {
  const router = useRouter();
  const [message, setMessage] = useState('')
  const [displayMessage, setDisplayMessage] = useState([])
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('https://www.zupimages.net/up/23/10/c235.png')
  

  useEffect(() => {
    setUsername(router.query.username)
    setAvatar(router.query.avatar)
  }, [])

  const sendMessage = () => {
    const newMessage = {
      text: message,
      time: new Date()
    };
    setDisplayMessage(mess => [...mess, newMessage])
    setMessage('')
  }

  const date = new Date();
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

  return (
    <>
    <Navbar/>
    <main className={styles.main}>
    <div className={styles.userBox}>
    <div className={styles.contacted}>
      <Image src={avatar} alt="Avatar" width={50} height={50} style={{borderRadius: "50%"}}/>
      <p>{username}</p>
    </div>
      <button onClick={()=> handleRetour()}>Go Back</button>
    </div>
      <div className={styles.messages}>
        {allMessages}
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
