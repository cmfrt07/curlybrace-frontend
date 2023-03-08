import styles from '../styles/Project.module.css';
import Navbar from "../components/navbar";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { transferToken } from '../reducers/profileIdSender';



function Project() {
  const dispatch = useDispatch()
  const router = useRouter();
  const projectId = useSelector((state)=> state.projectId.value.id);
  console.log("Project ID:", projectId);
  const [projectData, setProjectData] = useState({})
  const [defaultBanner, setDefaultBanner] = useState('https://www.zupimages.net/up/23/09/c5su.jpg')
  const [myTags, setMyTags] = useState([])
  const [projectOwner, setProjectOwner] = useState('')
  const [projectOwnerAvatar, setProjectOwnerAvatar] = useState('https://www.zupimages.net/up/23/09/mebb.jpg')
  const [projectOwnerToken, setProjectOwnerToken] = useState('token')

  const [userProject, setUserProject] = useState('user')


  console.log('this is project owner', userProject)


  useEffect (() => {
    fetch(`http://localhost:3000/projects/project/${projectId}`)
    .then(response => response.json())
    .then(data => {
        setProjectData(data.project)
        setDefaultBanner(data.project.banner)
        setProjectOwner(data.project.user) 
    })
},[])

//Find owner project
useEffect (()=>{
  fetch(`http://localhost:3000/users/profile/${projectOwner}`)
  .then(response=> response.json())
  .then(data=>{
    setUserProject(data.profile.username)
    setProjectOwnerAvatar(data.profile.avatar)
    setProjectOwnerToken(data.profile.token)
  });
},[projectOwner]);


useEffect(() => {
  if (projectData.isHelp) {
    setMyTags((prevTags) => [...prevTags, "Quick help"]);
  }
  if (projectData.isPaid) {
    setMyTags((prevTags) => [...prevTags, "Paid"]);
  }
  if (projectData.isStarted) {
    setMyTags((prevTags) => [...prevTags, "Has already started"]);
  }
  if (projectData.isPro) {
    setMyTags((prevTags) => [...prevTags, "Professional project"]);
  }

}, [projectData.isHelp, projectData.isPaid, projectData.isStarted, projectData.isPro]);



const goBack = () => {
  router.back();
}

//CONTINUER ICI CE POINT LA

const displayTags = myTags.length > 0 ? myTags.map((data, i) => {
    return (
        <div key={i} className={styles.tag}>
            <p>{data}</p>
        </div>
    );
}) : null;



const viewProfile = () => {
  dispatch(
    transferToken({
      token: projectOwnerToken
    })
    );
  router.push("/projectprofile")
}


  return (
    <>
    <Navbar/>
      <main className={styles.main}>

        <div className={styles.headerContent}>
        <div className={styles.userOfProject} style={{backgroundImage: `url(${defaultBanner})`, borderRadius: "6px"}}>
          <div className={styles.userOfProjectSection}>
          <div style={{borderRadius: "25px", boxShadow: "1px 1px 3px #30363d"}}>
          <Image className={styles.titleBox_image} src={projectOwnerAvatar} alt="avatar" width={50} height={50} style={{borderRadius: "25px"}}/>
          </div>

            <p>{userProject}</p>
            <button onClick={() => viewProfile()} >View Profile</button>
            </div>
            <h3 className={styles.headerContentText}>{projectData.title}</h3>
          </div>

        <div className={styles.tags}>
            {displayTags}
          </div>
          <p>{projectData.shortDescription}</p>
        </div>

        <div className={styles.descriptionContainer}>
          <p>{projectData.description}</p>
        </div>

        <div className={styles.buttonBack}>
          <button onClick={() => goBack()} >Go back</button>
        </div>

      </main>


    </>
  );
}

export default Project;
