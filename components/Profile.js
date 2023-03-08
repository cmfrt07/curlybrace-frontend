import styles from '../styles/Profile.module.css';
//import redux + useEffect
import {useEffect,useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import "useHistory" pour le bouton retour + router (pour le bouton contact)
import { useRouter } from "next/router";
import Navbar from './navbar';
import Image from 'next/image';
import { transferId } from '../reducers/projectIdSender';




function Profile(){

const dispatch = useDispatch()
const userData = useSelector((state)=> state.user.value);
const router = useRouter();

const [username, setUsername] = useState('')
const [description, setDescription] = useState('')
const [avatar, setAvatar] = useState('https://www.zupimages.net/up/23/09/mebb.jpg')
const [isEditing,setIsEditing] = useState(false)

const [avatarFile, setAvatarFile] = useState(null);

const [userProject, setUserProject] = useState([])


useEffect (()=>{
    fetch(`https://curlybrace-backend.vercel.app/users/profile/${userData.token}`)
    .then(response=> response.json())
    .then(data=>{
        //console.log(data)
        setUsername(data.profile.username)
        setDescription(data.profile.description)
        setAvatar(data.profile.avatar)
    });
},[avatarFile]);



//USE EFFECT POUR AFFICHER LES PROJETS D'UN UTILISATEUR SUR SON PROFIL
useEffect (() => {
    fetch(`https://curlybrace-backend.vercel.app/projects/find/${userData.token}`)
    .then(response => response.json())
    .then(data => {
        setUserProject(data.projects)
    })
},[])

console.log(userProject, "test")

const viewProject = (id) => {
    dispatch(
        transferId({
            id: id
        })
        );
    router.push("/project");
}

const projectsOfUser = userProject.length > 0 ? userProject.map((data, i) => {
    return <div key={i} className={styles.projectBox} >
        <div className={styles.titleBox} style={{backgroundImage: `url(${data.banner})`, borderRadius: "6px", height: "50px"}}>
            <h3 className={styles.titleBox_title} >{data.title}</h3>
        </div>
        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
            <p style={{margin: 0}}>{data.description}</p>
            <button onClick={() => viewProject(data._id)} style={{marginTop: "40px"}}>ViewProject</button>
        </div>
    </div>;
}) : null;




const handleContact=()=>{
    router.push('/')
}
const handleRetour=()=>{
    router.back();
}

const handleEdit = () => {
    setIsEditing(!isEditing)
}

//ATTENTION DONN2ES SENSIBLES --->> next.config.js et le mettre dans le gitignore
//https://nextjs.org/docs/basic-features/environment-variables
const uploadPreset = 'dk1wakq1'
const cloudName = 'dyjxi1isx'

const handleSaveChanges = () => {
    if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);
        formData.append('upload_preset', uploadPreset )

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)

            fetch('https://curlybrace-backend.vercel.app/users/edit', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: userData.token,
                    username: username,
                    description: description,
                    avatar: data.secure_url
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                setAvatarFile(data.secure_url)
                setIsEditing(!isEditing)
            });
        })

    }else{
        fetch('https://curlybrace-backend.vercel.app/users/edit', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: userData.token,
                username: username,
                description: description,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setIsEditing(!isEditing)
        });
    }
};





let switchEdit = 
<div>
    <div className={styles.userSection}>
        <div className={styles.user}>
            <Image src={avatar} alt="Avatar" width={50} height={50} style={{borderRadius: "50px"}}/>
            <h2>{username}</h2>
        </div>
        <div>
            <button onClick={()=> handleEdit()}> Edit Profile </button>
        </div>
    </div>
        <div className={styles.description}>
        <p>{description}</p>
        </div>
    <div className={styles.contentProjects} >
        <div className={styles.projectsContainer} >


        <div style={{display: "flex", flexDirection: "column",}}>
            {projectsOfUser}
        </div>
        </div>
    </div>
    <div className={styles.btnRetour}>
        <button  onClick={()=> handleRetour()}> Go back </button>
    </div>
</div>;



if (isEditing){
    switchEdit =
    <div>
        <div className={styles.userSection}>
            <div className={styles.user}>

                <input  className={styles.avatarInput} type="file"  id="avatarFile" onChange={(e) => setAvatarFile(e.target.files[0])} />

                <input className={styles.usernameInput} onChange={(e) => setUsername(e.target.value)} value={username}></input>
            </div>
            <div>
                <button onClick={()=> handleSaveChanges()}> Save changes </button>
            </div>
        </div>
        <div className={styles.descriptionEdited}>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        </div>
    </div>;
}

    return(
        <>
        <Navbar/>
        <main className={styles.main}>
            {switchEdit}
        </main>
    

        </>
    );
}
export default Profile;