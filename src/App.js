import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {css} from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import ClipLoader from "react-spinners/ClipLoader";

import useFetch from './useFetch';


import ClickBar from './comp/ClickBar';

const override = css`
    border: 1px solid blue;
    display: flex;
    height: 100vh;
    justifyContent: center;
    margin: calc(100vh/4) auto;
    alignContent: center;
    // padding: 0 calc((100vw/2) + 500)px
    width; 100px;
`;

function App() {

    // console.log(' secret ', process.env.REACT_APP_SECRET);
    // console.log(' key ', process.env.REACT_APP_KEY);

    const base_URL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&";


    // const [charData, setCharData] = useState("");
    const [startLetter, setStartLetter] = useState('a');

    let url = base_URL + "nameStartsWith=" + startLetter.slice(-1);

    const {data: charData, isLoading, error} = useFetch(url, startLetter)


    console.log(" url >>> ", url);
    // console.log(" data ", charData);

    const inputHandler = (e) => {

        // let ch = e.target.value;
        let ch = e.target.value.slice(-1);

        console.log(" ch is >>  ", ch)
        console.log(" e.target ", e.target);

        if (ch.match(/^[a-z]+$/i) !== null){
        
            console.log("startLetter change ")
            setStartLetter(e.target.value);

        }

        console.log(" >>>>>>>>>>>> startLetter ", startLetter);

    }

    // useEffect ( () => {
    
    //     console.log("start letter updated")
    
    // }, [startLetter])


    // console.log(" DATA ", charData);

  return (
    <div>
        <div className = 'header-container'>
            <h1> Marvel API exp {isLoading.toString()}</h1>
            {/* <div> {startLetter} </div> */}
            <ClickBar 
                setStartLetter = {setStartLetter} 
            />

            <input
                className = 'search-container'
                type = "text"
                // maxLength = {2}
                value = {startLetter.slice(-1)}
                onChange = { (e) => inputHandler(e)}
            ></input>
        </div>
    

        {isLoading ? 
            <div> 
                <SyncLoader css = {override} color = {'red'} loading = {isLoading} size = {50}/>
                Loading ....
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
