import { Popover, Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { transferId } from '../../reducers/projectIdSender';
import { Html } from "@react-three/drei"
import Image from 'next/image';


const Point = ({ lat, lon, title, shortDesc, projectId }) => {
  const meshRef = React.useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false)
  const [userToken, setUserToken] = useState('')
  const [projectAvatar, setProjectAvatar] = useState('')


  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  const radius = 1.7;
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const position = [x, y, z];


  
  const projectTitle = title;
  const avatar = projectAvatar ? <Image src={projectAvatar} alt="Avatar" width={50} height={50} style={{borderRadius: "50px"}}/> : null;
  const content = shortDesc;


  useEffect (() => {
    fetch(`https://curlybrace-backend.vercel.app/projects/project/${projectId}`)
    .then(response => response.json())
    .then(data => {
      setUserToken(data.project.user)
    })
    
},[])


useEffect (()=>{
  if (userToken) {
    fetch(`https://curlybrace-backend.vercel.app/users/profile/${userToken}`)
    .then(response=> response.json())
    .then(data=>{
      setProjectAvatar(data.profile.avatar)
    });
  }
},[hovered]);


//Ouverture, fermeture du Popover
  const handleClick = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  const viewFullProject = () => {
    dispatch(
      transferId({
        id: projectId
      })
      );
    router.push("/project");
  }



  return (
    <mesh ref={meshRef} position={position} onClick={handleClick}
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshBasicMaterial color="red" />
      {visible && (
        <Html>
        {/*Penser à fix ici car déprécié*/}
          <Popover 
          title={projectTitle}
          content={
            <div>
              {avatar}
              <br />
              {content}
              <br />
              <br />
              <Button onClick={() => viewFullProject()}>View project</Button>
            </div>
          } 
          trigger="click" 
          open={visible} 
          onOpenChange={handleClose}
          />
        </Html>
      )}
    </mesh>
  );
};

export default Point;