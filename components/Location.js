import styles from '../styles/Location.module.css';
import React, {useState} from 'react';
import { newLocation } from '../reducers/location';
import { useDispatch } from 'react-redux';


//ATTENTION DONNEES SENSIBLES!!!!




function Location(){
    const dispatch = useDispatch();

    const [locationName, setLocationName] = useState('');
    const [currentLocation, setCurrentLocation] = useState('')


const handleSearch= ()=> {

  fetch(`https://curlybrace-backend.vercel.app/users/location/${locationName}`)
  .then(response=> response.json())
  .then(data=>{
    console.log(data)
    setCurrentLocation("✅ " + data.name)
      dispatch(newLocation({
        lat: data.lat,
        lon: data.lon,
        country: data.country,
        name: data.name,
      }))
  });

}

return(
  <div>
    <div className={styles.Searchbtn}>
    <input className={styles.inputLocation}type ='texte' placeholder='find Country'onChange={(e)=> setLocationName(e.target.value)} value={locationName}/>
    <button className={styles.btnLocation} onClick={()=>handleSearch()}>Search</button>
    </div>
    <p>{currentLocation}</p>
  </div>
)

}

export default Location;