import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import useFetch from './useFetch';


import HoverBar from './HoverBar';


function App() {

    // console.log(' secret ', process.env.REACT_APP_SECRET);
    // console.log(' key ', process.env.REACT_APP_KEY);

    const base_URL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&";


    // const [charData, setCharData] = useState("");
    const [startLetter, setStartLetter] = useState('a');

    let url = base_URL + "nameStartsWith=" + startLetter.slice(-1) + process.env.REACT_APP_KEY + process.env.REACT_APP_HASH;

    let {data: charData, isLoading, error} = useFetch(url)


    console.log(" url >>> ", url);
    console.log(" data ", charData);

    const inputHandler = (e) => {

        // let ch = e.target.value;
        let ch = e.target.value.slice(-1);

        console.log(" ch is >>  ", ch)
        console.log(" e.target ", e.target);

        if (ch.match(/^[a-z]+$/i) !== null){
        
            setStartLetter(e.target.value);
    
        }

        console.log(" >>>>>>>>>>>> startLetter ", startLetter);

    }


    console.log(" DATA ", charData);

  return (
    <div>
        <div className = 'header-container'>
            <h1> Marvel API exp </h1>
            {/* <div> {startLetter} </div> */}
            <HoverBar setStartLetter = {setStartLetter} />

            <input
                className = 'search-container'
                type = "text"
                // maxLength = {2}
                value = {startLetter.slice(-1)}
                onChange = { (e) => inputHandler(e)}
            ></input>
        </div>
    

        {isLoading ? <div style = {{height: '100vh'}}> LOADING ... </div> : 

        <div className = 'main-char-container'>
            {charData && charData.data.results.map ( (char) => {
                return (
                    <div 
                        key = {char.id}
                        className= 'main-card'
                        >
                        <div className = 'char-name'> {char.name} </div>
                        <img 
                            className = 'char-img'
                            src = {char.thumbnail.path + '.' + char.thumbnail.extension} 
                            alt = {char.name}/>
                    </div>
                )
            })}    
        </div>

        }

    </div>
  );
}

export default App;
