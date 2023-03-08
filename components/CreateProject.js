import styles from '../styles/CreateProject.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import Select from 'react-select';
import { useRouter } from "next/router";
import Location from './Location';
import { clearLocation } from '../reducers/location';


//OBLIGER LUTILISATEUR A SE CONNECTER

function CreateProject() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userToken = useSelector((state) => state.user.value.token);
  const location = useSelector((state) => state.location.value)

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');

  const [locationName, setLocationName] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [country, setCountry] = useState('');

  const [art, setArt] = useState(false);
  const [gaming, setGaming] = useState(false);
  const [food, setFood] = useState(false);
  const [finance, setFinance] = useState(false);
  const [health, setHealth] = useState(false);
  const [science, setScience] = useState(false);
  const [sport, setSport] = useState(false);

  const [javascript, setJavascript] = useState(false);
  const [python, setPython] = useState(false);
  const [cplusplus, setCPlusPlus] = useState(false);
  const [php, setPhp] = useState(false);
  const [ruby, setRuby] = useState(false);
  const [react, setReact] = useState(false);

  const [level, setLevel] = useState(null);

  const [isPaid, setIsPaid] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const [tags, setTags] = useState([])
  const [languages, setLanguages] = useState([])

  const defaultBanner = 'https://www.zupimages.net/up/23/09/c5su.jpg';
  const [bannerFile, setBannerFile] = useState(null)

  const [justCreated, setJustCreated] = useState(false)


//Sert a update la valeur de chacun de mes tags (true/false) en fonction de si ils sont stockés ou nons dans mon état tag
  useEffect (() => {
    setArt(tags.some(tag => tag.value === 'art')); //considéré comme true si il est bien dans tag
    setGaming(tags.some(tag => tag.value === 'gaming'));
    setFood(tags.some(tag => tag.value === 'food'));
    setFinance(tags.some(tag => tag.value === 'finance'));
    setHealth(tags.some(tag => tag.value === 'health'));
    setScience(tags.some(tag => tag.value === 'science'));
    setSport(tags.some(tag => tag.value === 'sport'));

    setJavascript(languages.some(language => language.value === 'javascript'))
    setPython(languages.some(language => language.value === 'python'))
    setCPlusPlus(languages.some(language => language.value === 'c++'))
    setPhp(languages.some(language => language.value === 'php'))
    setRuby(languages.some(language => language.value === 'ruby'))
    setReact(languages.some(language => language.value === 'react'))
  },[tags, languages])

//LIST INPUTS
const tagOptions = [
  { value: 'art', label: 'Art' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'food', label: 'Food' },
  { value: 'finance', label: 'Finance' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'sport', label: 'Sport' },
];

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'c++', label: 'C++' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'react', label: 'React' }
];

const levelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'expert', label: 'Expert' },
];

  const handleCancel = () => {
    router.back();
  }


//pense à ameliorer le systeme
const [checkTitle, setCheckTitle] = useState(false)
const [checkDescription, setCheckDescription] = useState(false)
const [checkShortDescription, setCheckShortDescription] = useState(false)
const [checkLevel, setCheckLevel] = useState(false)
const [checkLocation, setCheckLocation] = useState(false)

let verifTitle = <div></div>
if(title === '' && checkTitle){
  verifTitle = <div className={styles.required}>You must enter a title!</div>
}

let verifShortDescription = <div></div>
if(shortDescription === '' && checkShortDescription){
  verifShortDescription = <div className={styles.required}>You must enter a short description!</div>
}

let verifDescription = <div></div>
if(description === '' && checkDescription){
  verifDescription = <div className={styles.required}>You must enter a description!</div>
}

let verifLevel = <div></div>
if(level === null && checkLevel){
  verifLevel = <div className={styles.required}>You must chose a level!</div>
}

let verifLocation = <div></div>
if(location.lat === null && checkLocation){
  verifLocation = <div className={styles.required}>You must enter a location!</div>
}


//ATTENTION DONN2ES SENSIBLES --->> next.config.js et le mettre dans le gitignore
//https://nextjs.org/docs/basic-features/environment-variables
const uploadPreset = 'dk1wakq1'
const cloudName = 'dyjxi1isx'

  const CreateProject = () => {
    if(title === ''){
      setCheckTitle(true)
      return;
    }
    if(shortDescription === ''){
      setCheckShortDescription(true)
      return;
    }
    if(description === ''){
      setCheckDescription(true)
      return;
    }
    if(level === null){
      setCheckLevel(true)
      return;
    }
    if(location.lat === null){
      setCheckLocation(true)
      return;
    }
    if(bannerFile){
      const formData = new FormData();
      formData.append('file', bannerFile);
      formData.append('upload_preset', uploadPreset )

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        fetch('http://localhost:3000/projects/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: userToken,
            title: title,
            shortDescription: shortDescription,
            description: description,
            banner: data.secure_url,

            lat: location.lat,
            lon: location.lon,
            country: location.country,
            name: location.name,
    
            art: art,
            gaming: gaming,
            food: food,
            finance: finance,
            health: health,
            science: science,
            sport: sport,
    
            javascript: javascript, 
            python: python,
            cplusplus: cplusplus,
            php: php,
            ruby: ruby,
            react: react,
    
            level: level.value,
    
            isPaid: isPaid,
            isHelp: isHelp,
            isPro: isPro,
            isStarted: isStarted,
          }),
        }).then(response => response.json())
          .then(data => {
            if (data.result) {
              setTitle('')
              setShortDescription('')
              setDescription('')
              dispatch(clearLocation())
              setJustCreated(true)
            }
          });
      })
    }else{
      fetch('http://localhost:3000/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: userToken,
          title: title,
          shortDescription: shortDescription,
          description: description,
          banner: defaultBanner,
          //Penser a prévoir le cas ou user ne rentre pas de location, fix le quand tu verra ca ET PAS APRES !!!!!
          lat: location.lat,
          lon: location.lon,
          country: location.country,
          name: location.name,
  
          art: art,
          gaming: gaming,
          food: food,
          finance: finance,
          health: health,
          science: science,
          sport: sport,
  
          javascript: javascript, 
          python: python,
          cplusplus: cplusplus,
          php: php,
          ruby: ruby,
          react: react,
  
          level: level.value,
  
          isPaid: isPaid,
          isHelp: isHelp,
          isPro: isPro,
          isStarted: isStarted,
        }),
      }).then(response => response.json())
        .then(data => {
          if (data.result) {
            setTitle('')
            setShortDescription('')
            setDescription('')
            dispatch(clearLocation())
            setJustCreated(true)
            
          }
        });
    }
  }

  /* GEOLOCALISATION */ //!\\ intégrer au reste

// ATTENTION DONNEES SENSIBLES
const PS_API_KEY='e8de5d6de1ea51d725f1ab0702b84b6c';

const handleLocation = () => {
  fetch(`http://api.positionstack.com/v1/forward?access_key=${PS_API_KEY}&query=${locationName}&limit=1`)
  .then((response) => response.json())
  .then(data => {
    setLocationName(data.data[0].name);
    setLat(data.data[0].latitude);
    setLon(data.data[0].longitude);
    setCountry(data.data[0].country);
  });
};


let toDisplay = 
<>
  <h2 className={styles.formHeader}>Create your project</h2>
  <div className={styles.inputContainer}>
    <div>
      <p>Title:<span className={styles.required}>*</span></p>
      {verifTitle}
      <input className={styles.title} type="text" maxLength="80" placeholder="What's your project name?" id="title" onChange={(e) => setTitle(e.target.value)} value={title}  />
      <span style={{color: "white", fontSize: "14px"}}>{title.length}/80</span>
    </div>
    
    <div>
      <p>Banner:</p>
      <div className={styles.banner}>
      <input  type="file"  id="avatarFile" onChange={(e) => setBannerFile(e.target.files[0])} />
      </div>
    </div>
      
    <div>
      <p>Short description:<span className={styles.required}>*</span></p>
      {verifShortDescription}
      <input className={styles.shortDescription} type="text" maxLength="200" placeholder="Describe your project in one sentence..." id="shortdescription" onChange={(e) => setShortDescription(e.target.value)} value={shortDescription} />
      <span style={{color: "white", fontSize: "14px"}}>{shortDescription.length}/200</span>
    </div>

    <div>
    <p>Description:<span className={styles.required}>*</span></p>
    {verifDescription}
    <textarea className={styles.description} type="text" placeholder="Your project in details..." id="description" onChange={(e) => setDescription(e.target.value)} value={description} />
    </div>

    <div>
      <p>Location:<span className={styles.required}>*</span></p>
      {verifLocation}
      <Location/>
    </div>

    <div className={styles.tags}>
      <p>Theme(s):</p>
      <Select 
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: '6px',
          outline: 'none'
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: '#0d1117',
          color: '#fff',
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: '#30363d',
          borderRadius: '6px'
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: '#fff'
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: '#fff',
          ':hover': {
            backgroundColor: '#30363d',
            color: '#fff'
          }
        })
      }}
      defaultValue={tags} onChange={setTags} options={tagOptions}  closeMenuOnSelect={false} isMulti placeholder='Select Theme(s)...'  />
    </div>

    <div className={styles.languages}>
      <p>Language(s):</p>
      <Select 
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: '6px',
          outline: 'none'
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: '#0d1117',
          color: '#fff'
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: '#30363d',
          borderRadius: '6px'
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: '#fff'
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: '#fff',
          ':hover': {
            backgroundColor: '#30363d',
            color: '#fff'
          }
        })
      }}
      defaultValue={languages} onChange={setLanguages} options={languageOptions} closeMenuOnSelect={false} isMulti placeholder='Select Dev Language(s)...' />
    </div>
  
    <div>
    <p>Images:</p>
    <div className={styles.images} style={{color: "white", fontSize: "14px"}}>*upload*</div>
    </div>

    <div className={styles.level}>
      <p>Level:<span className={styles.required}>*</span></p>
      {verifLevel}
      <Select
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: '6px',
          outline: 'none'
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: '#0d1117',
          color: '#fff'
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#fff'
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: '#fff'
        })
      }}
      defaultValue={level} onChange={setLevel} options={levelOptions} closeMenuOnSelect isMulti={false} placeholder='Select Skill level...' />
    </div>

    <div className={styles.checkBoxes} >
      <label>
      <input type="checkbox" onChange={() => {setIsPaid(!isPaid)}}/>
      <span className={`checkbox ${isPaid ? "checkbox--active" : ""}`} aria-hidden="true"/>
      Paid
      </label>

      <label>
      <input type="checkbox" onChange={() => {setIsPro(!isPro)}}/>
      <span className={`checkbox ${isPro ? "checkbox--active" : ""}`} aria-hidden="true"/>
      Pro
      </label>

      <label>
      <input type="checkbox" onChange={() => {setIsHelp(!isHelp)}}/>
      <span className={`checkbox ${isHelp ? "checkbox--active" : ""}`} aria-hidden="true"/>
      I just need help
      </label>

      <label>
      <input type="checkbox" onChange={() => {setIsStarted(!isStarted)}}/>
      <span className={`checkbox ${isStarted ? "checkbox--active" : ""}`} aria-hidden="true"/>
      The project has already started
      </label>
    </div>

    <div className={styles.createBtn} >
      <button className={styles.createButton} id="create" onClick={() => CreateProject()} >CREATE</button>
    </div>
  </div>

  <div className={styles.buttonContainer}>
    <button className={styles.cancelButton} id="cancel" onClick={() => handleCancel()} >Go Back</button>
  </div>
</>

if(justCreated){
  toDisplay =
  <>
      <p>Your project has been registered</p>
      <div>
        <button onClick={() => setJustCreated(false)} >Create another ?</button>
        <button onClick={() => handleCancel()} >Home</button>
      </div>
  </>
  }

  return (
    <div className={styles.formContainer}>
      {toDisplay}
    </div>
  );
}

export default CreateProject;
