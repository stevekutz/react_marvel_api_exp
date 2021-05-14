// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
// import {css} from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
// import ClipLoader from "react-spinners/ClipLoader";

import useFetch from './useFetch';


import ClickBar from './comp/ClickBar';


function App() {

    // console.log(' secret ', process.env.REACT_APP_SECRET);
    // console.log(' key ', process.env.REACT_APP_KEY);

    const base_URL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1";


    // const [charData, setCharData] = useState("");
    const [startLetter, setStartLetter] = useState('a');
    const [searchVal, setSearchVal] = useState('');
    const [currentURL, setCurrentURL] = useState(base_URL + "&nameStartsWith=" + startLetter.slice(-1))


    const {data: charData, isLoading, error} = useFetch(currentURL);

    useEffect( () => {
        setCurrentURL(base_URL + "&nameStartsWith=" + startLetter.slice(-1))
    
    }, [startLetter])

    // let url = base_URL + "&nameStartsWith=" + startLetter.slice(-1);
    // let url = currentURL;

    // const {data: charData, isLoading, error} = useFetch(url);


    // console.log(" url >>> ", url);
    // console.log(" data ", charData);

    const inputHandler = (e) => {


        setCurrentURL('');    
        // let ch = e.target.value;
        let ch = e.target.value.slice(-1);

        // console.log(" ch is >>  ", ch)
        // console.log(" e.target ", e.target);

        if (ch.match(/^[a-z]+$/i) !== null){
            let url = ''; 
            url = base_URL + '&nameStartsWith=' + ch;
            // console.log("startLetter change ")
            setStartLetter(e.target.value);
            setCurrentURL(url);
        }


        // console.log(" >>>>>>>>>>>> startLetter ", e.target.value);

    }

    const searchHandler = (e) => {
    
        setSearchVal(e.target.value)
    
    }

    const fullNameSearch = () => {
    
        setCurrentURL(base_URL + "&name=" + searchVal);
        // setStartLetter(searchVal[0]);
        // setSearchVal("");
    }


    // useEffect ( () => {
    
    //     console.log("start letter updated")
    
    // }, [startLetter])

    console.log("currentURL >> ", currentURL);

    console.log(" DATA ", charData);

    console.log(" searchVal ", searchVal);

    console.log(" error ========> ", error);

  return (
    <div>
        <div className = 'header-container'>
            <h1> Marvel API exp </h1>


            {/* <div> {startLetter} </div> */}
            <input
                className = 'search-container'
                type = "text"
                // maxLength = {2}
                value = {startLetter.slice(-1)}
                onChange = { (e) => inputHandler(e)}
            />


            <ClickBar 
                setStartLetter = {setStartLetter} 
            />

            <input 
                className = 'full-search-container'
                value = {searchVal}
                onChange = { (e) => searchHandler(e)}
            />
            <button 
                onClick = {fullNameSearch}
            > Full Name Search </button>
        </div>
    

        {isLoading ? 
            <div className = 'loader'> 
                <SyncLoader color = {'red'} loading = {isLoading} size = {50}/>
            </div> : 

            <div> 
                {error ? 
                    <div>  Error: {error}</div>
                :
                    <div className = 'main-char-container'>
                        {charData && charData.data.count === 0 ? 
                            <div> {searchVal} NOT FOUND </div>
                            : 
                            <div>
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

                }

            
            </div>



            

        }

    </div>
  );
}

export default App;
