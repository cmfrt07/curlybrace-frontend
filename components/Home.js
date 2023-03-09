import styles from '../styles/Home.module.css';
import Navbar from "../components/navbar";
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import Mesh from "../components/three/Mesh"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';



function Home() {

  const resultLength = useSelector((state) => state.search.value.length);

  const [rotation, setRotation] = useState(0);
  const [isOpen, setIsOpen] = useState(false)

  
  const handleClick = () => {
    setIsOpen(!isOpen)
  };

  useEffect(() => {
    if(isOpen){
      setRotation(45);
    } else {
      setRotation(0);
    }
  }, [isOpen])


  const modalFooter = [
    <p></p>
  ];

  let displayResult = <p></p>
  if(resultLength > 0){
    displayResult= <div className={styles.result}>
    <p>🚀 Result: {resultLength}</p>
    </div>
  }

  return (
    <main className={styles.main}>
    <Navbar />
      <div>
      <Canvas style={{ width: "100vw", height: "92vh", backgroundColor: "#0d1117"}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Mesh/>
      </Canvas>
        <div className={styles.popup}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.2s ease-out"
        }}
        onClick={handleClick}>
        <FontAwesomeIcon style={{color: "white", fontSize: "22px", margin: 0}} icon={faPlus}/>
        </div>
        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          title="Welcome to {CurlyBrace}"
          footer={modalFooter}
          maskStyle={{
            backgroundColor: 'transparent'
          }}
          >
          <p style={{color: "black"}}>Browse, explore and find the right project for you!
          Select your search criteria to view only the projects that interest you or just browse. Post your projects to find other like-minded developers to collaborate with. <br/> Break the boundaries with CurlyBrace!</p>
        </Modal>
        <p></p>
      </div>
          {displayResult}
    </main>
  );
}

export default Home;
