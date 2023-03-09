import styles from '../styles/Navbar.module.css';
import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import SearchProject from './SearchProject';
import { useSelector } from 'react-redux';


function Navbar() {


  const defaultWidth = "45%";

  const router = useRouter();
  const [isMenuClicked, setIsMenuClicked] = useState(false)
  const [menuStyle, setMenuStyle] = useState({
    "borderLeft": "solid 1px #30363d",
    "width": defaultWidth,
    "height": "92vh",
    "backgroundColor": "#161b22",
    "position": "absolute",
    "bottom": 0,
    "right": 0,
    "zIndex": 1,
    "display": "none"
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMenuStyle({
          "borderLeft": "solid 1px #30363d",
          "width": "65%",
          "height": "92vh",
          "backgroundColor": "#161b22",
          "position": "absolute",
          "bottom": 0,
          "right": 0,
          "zIndex": 1,
          "display": "none"
        })
      } else {
        setMenuStyle({
          "borderLeft": "solid 1px #30363d",
          "width": defaultWidth,
          "height": "92vh",
          "backgroundColor": "#161b22",
          "position": "absolute",
          "bottom": 0,
          "right": 0,
          "zIndex": 1,
          "display": "none"
        })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const updateMenu = () => {
    if (!isMenuClicked) {
      setMenuStyle({
        "borderLeft": "solid 1px #30363d",
        "width": window.innerWidth < 768 ? "65%" : defaultWidth,
        "height": "92vh",
        "backgroundColor": "#161b22",
        "position": "absolute",
        "bottom": 0,
        "right": 0,
        "zIndex": 1,
        "display": "flex"
      })
      setIsMenuClicked(true)
    } else {
      setMenuStyle({
        "borderLeft": "solid 1px #30363d",
        "width": window.innerWidth < 768 ? "65%" : defaultWidth,
        "height": "92vh",
        "backgroundColor": "#161b22",
        "position": "absolute",
        "bottom": 0,
        "right": 0,
        "zIndex": 1,
        "display": "none"
      })
      setIsMenuClicked(false)
    }
  }

/*+-+-+-+-+-+-+ signin/signup pages +-+-+-+-+-+-+*/



const handleHome = () => {
  router.push("/");
}

const resultLength = useSelector((state) => state.search.value.length);

useEffect(() => {

  if(resultLength > 0){
    setMenuStyle({
      "borderLeft": "solid 1px #30363d",
      "width": window.innerWidth < 768 ? "65%" : defaultWidth,
      "height": "92vh",
      "backgroundColor": "#161b22",
      "position": "absolute",
      "bottom": 0,
      "right": 0,
      "zIndex": 1,
      "display": "none"
    })
    setIsMenuClicked(false)
  }

}, [resultLength])


  return (
    <div className={styles.main} >
      <nav className={styles.navbar}>
      <div className={styles.logoContainer} onClick={() => handleHome()}>
        <h1>&#123; CurlyBrace &#125;</h1>
        <p>Explore the world to find projects</p>
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