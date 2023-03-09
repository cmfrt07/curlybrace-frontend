import styles from '../styles/Location.module.css';
import React, {useState} from 'react';
import { newLocation } from '../reducers/location';
import { useDispatch } from 'react-redux';


//ATTENTION DONNEES SENSIBLES!!!!




function Location(){
  let API_key=  '2d8531b40e3247ef4cefc88994fd86e0';
    const dispatch = useDispatch();

    const [locationName, setLocationName] = useState('');
    const [currentLocation, setCurrentLocation] = useState('')


const handleSearch= ()=> {

  fetch(`https://curlybrace-backend.vercel.app/users/location/${locationName}`)
  .then(response=> response.json())
  .then(data=>{
    console.log(data)
    setCurrentLocation(data.name)
      dispatch(newLocation({
        lat: data.latitude,
        lon: data.longitude,
        country: data.country,
        name: data.name,
      }))
  });
/*
    fetch(`http://api.positionstack.com/v1/forward?access_key=${API_key}&query=${locationName}&limit=1`)
    .then(response=> response.json())
    .then(data=>{
      setCurrentLocation(data.data[0].name)
      dispatch(newLocation({
        lat: data.data[0].latitude,
        lon: data.data[0].longitude,
        country: data.data[0].country,
        name: data.data[0].name,
      }))

  });
*/
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