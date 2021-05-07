import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';



function App() {

    console.log(' secret ', process.env.REACT_APP_SECRET);
    console.log(' key ', process.env.REACT_APP_KEY);

    const base_URL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&";


    const [charData, setCharData] = useState("");
    const [startLetter, setStartLetter] = useState('a');




    let url = base_URL + "nameStartsWith=" + startLetter.slice(-1) + process.env.REACT_APP_KEY + process.env.REACT_APP_HASH;
    console.log(" url >>> ", url);


    const inputHandler = (e) => {

        let ch = e.target.value;

        if (ch.match(/^[a-z]+$/i) !== null){
        
            setStartLetter(e.target.value);
    
        }

        console.log(" startLetter ", startLetter);
    }


    useEffect( () => {

        setStartLetter(startLetter);

        fetch(url)
        // fetch(`"${process.env.REACT_APP_URL}"`)
            .then(res => {
                if(!res.ok) {
                    console.log(" Status Code ", res.status);
                    throw Error(' Error with Request');
                }
            return res.json();    
            })
            .then(data => {
                setCharData(data)
            
            })
            .catch(err => {
                console.log('ERROR CAUGHT ', err)
            
            })
    
    
    
    
    }, [url, startLetter])
 

    useEffect( () => {
    
        if(charData) {
            // console.log(charData.data.results)
            console.log(charData);
        
        }

    
    }, [charData])



  return (
    <div className="App">
       <h1> Marvel API exp </h1>

    <input
        type = "text"
        // maxLength = {1}
        value = {startLetter.slice(-1)}
        onChange = { (e) => inputHandler(e)}
    ></input>


    {charData && charData.data.results.map ( (char) => {
        return (
            <div key = {char.id}>  {char.name} </div>
        
        
        )
    
    
    })}  
    

    </div>
  );
}

export default App;
