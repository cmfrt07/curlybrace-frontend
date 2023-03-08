import styles from '../styles/Searchproject.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Select from 'react-select';
import { useRouter } from "next/router";
import { logout } from '../reducers/user';
import { setSearched } from '../reducers/search';
import { resetSearch } from '../reducers/search';

function SearchProject() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userToken = useSelector((state) => state.user.value.token);
  const userData = useSelector((state) => state.user.value)

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

  const [title, setTitle] = useState('')

  const [result, setResult] = useState(null)



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
  { value: 'none', label: 'None' },
];


const handleSubmit = () => {
  let queryParams = '';
  if (art) queryParams += 'art=true&';
  if (gaming) queryParams += 'gaming=true&';
  if (food) queryParams += 'food=true&';
  if (finance) queryParams += 'finance=true&';
  if (health) queryParams += 'health=true&';
  if (science) queryParams += 'science=true&';
  if (sport) queryParams += 'sport=true&';

  if (javascript) queryParams += 'javascript=true&';
  if (python) queryParams += 'python=true&';
  if (cplusplus) queryParams += 'cplusplus=true&';
  if (php) queryParams += 'php=true&';
  if (ruby) queryParams += 'ruby=true&';
  if (react) queryParams += 'react=true&';

  if(level){ 
    if (level.value === 'beginner') queryParams += 'level=beginner&';
    if (level.value === 'confirmed') queryParams += 'level=confirmed&';
    if (level.value === 'expert') queryParams += 'level=expert&';
  }

  if (isPaid) queryParams += 'isPaid=true&';
  if (isPro) queryParams += 'isPro=true&';
  if (isHelp) queryParams += 'isHelp=true&';
  if (isStarted) queryParams += 'isStarted=true&';



  //a ameliorer
  if(title !== '') queryParams += `title=${title}&`;
  if (locationName !== '') queryParams += `name=${locationName}&`;


  if (queryParams.endsWith('&')) {
    queryParams = queryParams.slice(0, -1);
  }

  const url = `https://curlybrace-backend.vercel.app/projects/search?${queryParams}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setResult(data.projects.length)
      dispatch(setSearched({project: data.projects}))
    });
};


let displayResult = <p></p>;
if(result !== null){
  displayResult = <p style={{fontWeight: "bold", margin: "0px"}}>Result: {result}</p>;
}

const handleClear = () => {
  dispatch(resetSearch())
  setResult(null)
  setLocationName('')
  setTitle('')
}






const handleLogOut = () => {
  dispatch(logout())
  router.push("/");
}

const handleProfile = () => {
  router.push("/profile");
}

const createAProject = () => {
  router.push("/createproject")
}

let userPanel = 
<div className={styles.login} >
  <button style={{marginRight: "20px"}} onClick={() => handleSignUp()}>Sign Up</button>
  <button onClick={() => handleSignIn()}>Sign In</button>
</div>;

if(userData.isLogged){
  userPanel = 
  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "60%"}}>
    <p style={{fontWeight: "bold"}}>Welcome back {userData.username}!</p>
    <div>
      <button style={{marginRight: "20px"}} onClick={() => handleProfile()}>Profile</button>
      <button onClick={() => handleLogOut()}>Log Out</button>
    </div>
  </div>;
}

const handleSignIn = () => {
  router.push("/signin");
} 

const handleSignUp = () => {
  router.push("/signup");
} 



  return (
<>
<div className={styles.menuContent}>

{userPanel}
<button onClick={() => createAProject()} >Create a project</button>
<div className={styles.separator}></div>


<p style={{margin: 0}}>Title</p>
<input placeholder='Search...' onChange={(e) => setTitle(e.target.value)} value={title}></input>

<div className={styles.inputContainer}>
<h3 className={styles.searchHeader}>Filters</h3>
<div>
<p>Location:</p>
<input type="text" placeholder='Enter a location, a city, a country...' onChange={(e) => setLocationName(e.target.value)} value={locationName}></input>
</div>

<div className={styles.tags}>
<p>Theme(s):</p>
<Select defaultValue={tags} onChange={setTags} options={tagOptions}  closeMenuOnSelect={false} isMulti placeholder='Select Theme(s)...'  
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
    },

  })
}}/>
</div>

<div className={styles.languages}>
<p>Language(s):</p>
<Select defaultValue={languages} onChange={setLanguages} options={languageOptions} closeMenuOnSelect={false} isMulti placeholder='Select Dev Language(s)...' 
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
}}/>
</div>

<div className={styles.level}>
<p>Level:<span className={styles.required}></span></p>
<Select defaultValue={level} onChange={setLevel} options={levelOptions} closeMenuOnSelect isMulti={false} placeholder='Select Skill level...' 
styles={{
  control: (provided) => ({
    ...provided,
    backgroundColor: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: '6px',
    outline: 'none',
    color: '#fff'
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: '#0d1117',
    color: '#fff',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#30363d',
    borderRadius: '6px',
    color: '#fff'
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
}}/>
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

    <div style={{display: "flex", justifyContent: "center", paddingBottom: "50px"}} >
    <button style={{marginRight: "20px"}} id="search" onClick={() => handleSubmit()} >SEARCH</button>
    <button style={{marginRight: "20px"}} id="search" onClick={() => handleClear()} >CLEAR</button>
    {displayResult}
    </div>
</div>

</div>
</>
  );
}

export default SearchProject;
