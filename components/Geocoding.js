import styles from '../styles/Geocoding.module.css';
import React, {useState} from 'react';
//import useSelector
import {useSelector } from 'react-redux';


//ATTENTION DONNEES SENSIBLES!!!!
let API_key=  'e8de5d6de1ea51d725f1ab0702b84b6c';



function SearchProject(){
const user = useSelector((state)=> state.user.value);
    
    //création des états avec long,lat et country
    const [latitude,setLatitude]= useState('');
    const [longitude,setLongitude]= useState('');
    const [country,setCountry]=useState('');
    //état relié à l'input et le fetch (lié à la location)
    const [locationName, setLocationName] = useState('');
    //état relié à l'input search project
    const[project,setProject] = useState('');
    //Création des états par rapport au projet 
    const[data,setData] = useState('');
    const [city,setCity] = useState('');
    const [language,setLanguage] = useState('');
    const [theme,setTheme] = useState('');

const Geocoding= ()=> {
    fetch(`http://api.positionstack.com/v1/forward?access_key=${API_key}&query=${locationName}&limit=1`)
    .then(response=> response.json())
    .then(data=>{
        //console.log(data.data[0]);
        setLatitude(data.data[0].latitude);
        //console.log(data.data[0].latitude);
        setLongitude(data.data[0].longitude);
        //console.log(data.data[0].longitude);
        setCountry(data.data[0].country);
        //console.log(data.data[0].country);
  });
}

// const handleProject=()=>{
    
//         fetch(`http://localhost:3000/projects/${user.token}`,{
//         method:'GET',
//         headers : {'Content-Type': 'application/json'},
//         body:JSON.stringify({user:user.token,projects:data.projects})
//     })
//     .then(response=> response.json())
//     .then ((data)=>{
//         console.log(data)

//     })

// };

// Step1: Filtrer le Country
const filterCountry = city.map((data,i) => {
 return <p>projects.filter()</p>
});

return(
    <>
    {/* Partie search Location */}
    <div className={styles.Searchbtn}>
    <input className={styles.inputLocation}type ='texte' placeholder='find Country'onChange={(e)=> setLocationName(e.target.value)} value={locationName}/>
    <button className={styles.btnLocation} onClick={()=>handleSearch()}>Search</button>
    </div>   
    </>
)

 }

 export default Geocoding;