import styles from '../styles/Navbar.module.css';
import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useRouter } from "next/router";
import SearchProject from './SearchProject';
import { Html } from "@react-three/drei"

function Navbar() {


const router = useRouter();
//To change burger classes

const [isMenuClicked, setIsMenuClicked] = useState(false)

const [menuStyle, setMenuStyle] = useState({
  "border-left": "solid 1px #30363d",
  "width": "45%",
  "height": "92vh",
  "background-color": "#161b22",
  "position": "absolute",
  "bottom": 0,
  "right": 0,
  "zIndex": 1,
  "display": "none"})

//Toggle burger menu change
const updateMenu = () =>{
  if(!isMenuClicked){
    setMenuStyle({
      "border-left": "solid 1px #30363d",
      "width": "45%",
      "height": "92vh",
      "backgroundColor": "#161b22",
      "position": "absolute",
      "bottom": 0,
      "right": 0,
      "zIndex": 1,
      "display": "flex"})
    setIsMenuClicked(true)
  }
  else{
    setMenuStyle({
      "border-left": "solid 1px #30363d",
      "width": "45%",
      "height": "92vh",
      "backgroundColor": "#161b22",
      "position": "absolute",
      "bottom": 0,
      "right": 0,
      "zIndex": 1,
      "display": "none"})
    setIsMenuClicked(false)
  }
}

/*+-+-+-+-+-+-+ signin/signup pages +-+-+-+-+-+-+*/



const handleHome = () => {
  router.push("/");
}



  return (
    <div className={styles.main} >
      <nav className={styles.navbar}>
      <div className={styles.logoContainer} onClick={() => handleHome()}>
        <h1>&#123; CurlyBrace &#125;</h1>
        <p>Find projects around the world</p>
      </div>
        <div className={styles.burgerMenu} onClick={updateMenu}>
          <div className={styles.burgerClass}></div>
          <div className={styles.burgerClass}></div>
          <div className={styles.burgerClass}></div>
        </div>
      </nav>


      <div style={menuStyle}>

      <SearchProject />



      </div>
    </div>
  );
}

export default Navbar;