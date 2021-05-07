import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';



function App() {

    console.log(' secret ', process.env.REACT_APP_SECRET);
    console.log(' key ', process.env.REACT_APP_KEY);

    const base_URL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&";


    const [charData, setCharData] = useState("")

    let url = base_URL + process.env.REACT_APP_KEY + process.env.REACT_APP_HASH;
    console.log(" url >>> ", url);

    useEffect( () => {
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
    
    
    
    
    }, [url])
 

    useEffect( () => {
    
        if(charData) {
            // console.log(charData.data.results)
            console.log(charData);
        
        }

    
    }, [charData])





  return (
    <div className="App">
       <h1> Marvel API exp </h1>

    {charData && charData.data.results.map ( (char) => {
        return (
            <div key = {char.id}>  {char.name} </div>
        
        
        )
    
    
    })}  
    

    </div>
  );
}

export default App;
