import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {css} from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import ClipLoader from "react-spinners/ClipLoader";

import useFetch from './useFetch';


import ClickBar from './comp/ClickBar';


function App() {

    // console.log(' secret ', process.env.REACT_APP_SECRET);
    // console.log(' key ', process.env.REACT_APP_KEY);

    const base_URL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1";


    // const [charData, setCharData] = useState("");
    const [startLetter, setStartLetter] = useState('a');
    const [searchVal, setSearchVal] = useState('');
    const [baseURL, setBaseURL] = useState(base_URL + "&nameStartsWith=" + startLetter.slice(-1))


    const {data: charData, isLoading, error} = useFetch(baseURL);
    useEffect( () => {
        setBaseURL(base_URL + "&nameStartsWith=" + startLetter.slice(-1))
    
    }, [startLetter])

    // let url = base_URL + "&nameStartsWith=" + startLetter.slice(-1);
    // let url = baseURL;

    // const {data: charData, isLoading, error} = useFetch(url);


    // console.log(" url >>> ", url);
    console.log(" data ", charData);

    const inputHandler = (e) => {


        setBaseURL('');    
        // let ch = e.target.value;
        let ch = e.target.value.slice(-1);

        console.log(" ch is >>  ", ch)
        console.log(" e.target ", e.target);

        if (ch.match(/^[a-z]+$/i) !== null){
            let url = ''; 
            url = base_URL + '&nameStartsWith=' + ch;
            console.log("startLetter change ")
            setStartLetter(e.target.value);
            setBaseURL(url);
        }


        console.log(" >>>>>>>>>>>> startLetter ", e.target.value);

    }

    const searchHandler = (e) => {
    
        setSearchVal(e.target.value)
    
    }

    const fullNameSearch = () => {
    
        setBaseURL()
    }


    // useEffect ( () => {
    
    //     console.log("start letter updated")
    
    // }, [startLetter])

    console.log("baseURL >> ", baseURL);

    // console.log(" DATA ", charData);

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
            <button > Full Name Search </button>
        </div>
    

        {isLoading ? 
            <div className = 'loader'> 
                <SyncLoader color = {'red'} loading = {isLoading} size = {50}/>
            </div> : 



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
