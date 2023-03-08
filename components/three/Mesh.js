
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree,  useLoader } from '@react-three/fiber'
import { useSelector } from 'react-redux';
import * as THREE from "three";
import Point from './Point';
import Halo from './Halo';


function Mesh() {
  const myMesh = useRef();
  const searchedProject = useSelector((state) => state.search.value)

  const [dragging, setDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const [hovered, setHovered] = useState(false)

  const [allMyDots, setAllMyDots] = useState([])

  
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseWheel = event => {
      event.preventDefault();

      const delta = event.deltaY;

      const fov = camera.fov + delta * 0.05;
      const near = camera.near;
      const far = camera.far;

      camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
      camera.near = near;
      camera.far = far;

      camera.updateProjectionMatrix();
    };

    const canvas = document.querySelector('canvas');
    canvas.addEventListener('wheel', handleMouseWheel, false);

    return () => {
      canvas.removeEventListener('wheel', handleMouseWheel, false);
    };
  }, [camera]);

  const handleMouseDown = event => {
    setDragging(true);
    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseMove = event => {
    if (!dragging || !event.buttons) {
      return;
    }

    const { clientX, clientY } = event;

    const deltaMove = {
      x: (clientX - previousMousePosition.x),
      y: (clientY - previousMousePosition.y),
    };

    setPreviousMousePosition({
      x: clientX,
      y: clientY,
    });

    setRotation({
      x: rotation.x + deltaMove.y * Math.PI / 180,
      y: rotation.y + deltaMove.x * Math.PI / 180,
      z: rotation.z,
    });
  };

  const handleMouseUp = event => {
    setDragging(false);
  };

  useFrame(() => {
    myMesh.current.rotation.x = rotation.x;
    if(!hovered){
      myMesh.current.rotation.y += 0.0025;
    }else{
      //myMesh.current.rotation.y = rotation.y;
      myMesh.current.rotation.y = rotation.y;
    }
  });


  const handleHover = () => {
    setHovered(true)
  }

  //const pour la texture
  const base = useLoader(THREE.TextureLoader, "texture2.jpg");


  useEffect(() => {
    fetch('https://curlybrace-backend.vercel.app/projects')
    .then(response=> response.json())
    .then(data=>{
      setAllMyDots(data.projects)
    })
  }, []);


let mapOnThis = allMyDots;
if(searchedProject.isSearching){
mapOnThis = searchedProject.project;
}



  const projects = mapOnThis.length > 0 ? mapOnThis.map((data, i) => {
    return <Point key={i} lat={data.location.lat} lon={data.location.lon} title={data.title} shortDesc={data.shortDescription} projectId={data._id}/>;
  }) : null;
  




  return (
    <>
    <mesh
      ref={myMesh}
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}

      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      >
      {/*<Point lat={48} lon={ 2} title={"test"} shortDesc={"hello, this is a test"}/>*/}
      {projects}
      <sphereGeometry args={[1.7, 32, 32]}/>
      <meshStandardMaterial map={base} />
      <Halo />
    
    </mesh>

    </>
  );
}

export default Mesh;
