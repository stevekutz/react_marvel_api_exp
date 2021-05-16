// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
// import {css} from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
// import ClipLoader from "react-spinners/ClipLoader";

import useFetch from './useFetch';


import ClickBar from './comp/ClickBar';
import NotFound from './comp/NotFound';


function App() {


    // console.log(' secret ', process.env.REACT_APP_SECRET);
    // console.log(' key ', process.env.REACT_APP_KEY);

    const base_URL = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1";
    
    // const [charData, setCharData] = useState("");
    const [startLetter, setStartLetter] = useState('a');
    const [searchFullName, setSearchFullName] = useState('');
    const [recentSearch, setRecentSearch] = useState('');
    const [includeImageNotFound, setIncludeImageNotFound] = useState('true');
    // const [currentURL, setCurrentURL] = useState(base_URL + "&nameStartsWith=a");
    const [currentURL, setCurrentURL] = useState(base_URL + "&nameStartsWith=" + startLetter.slice(-1));
    const [charCount, setCharCount] = useState(0)

    const countItems = useRef(0);
    const countRenders = useRef(0);
    const [filteredResults, setFilteredResults] = useState('');

    

    const {data: charData, isLoading, error} = useFetch(currentURL, startLetter);

    const inputHandler = (e) => {


        let ch = e.target.value.slice(-1);

        // console.log(" ch is >>>>>>>>>>>>>>>>>  ", ch)
        // // // console.log(" e.target ", e.target);

        if (ch.match(/^[a-z]+$/i) !== null){
            setStartLetter(e.target.value);
        }


    }

    const filterResultsHandler = (e) => {
        setFilteredResults(e.target.value)
    
    }

    const searchHandler = (e) => {
    
        setSearchFullName(e.target.value);
    }

    const fullNameSearch = () => {

        setRecentSearch(searchFullName);
        setCurrentURL(base_URL + "&name=" + searchFullName);
        // setStartLetter(searchFullName[0]);
        // setSearchFullName("");
    }

    const toggleIncludeNoImageFound = () => {
        setIncludeImageNotFound(!includeImageNotFound)
    
    }

    useEffect( () => {
        setCurrentURL(base_URL + "&nameStartsWith=" + startLetter.slice(-1))
    
    }, [startLetter])

    useEffect( () => {
        countRenders.current = countRenders.current + 1;
    } )

    // console.log("currentURL >> ", currentURL);

    console.log(" DATA ", charData);

    // console.log(" searchFullName ", searchFullName);

    // console.log(" error ========> ", error);

    // console.log("Total  ", charCount );


    useEffect( () => {
        if(countItems.current){
            setCharCount(countItems.current.childElementCount)
        }
    })

    console.log("RENDER COUNT ", countRenders.current)

  return (
    <div>
        <div className = 'header-container'>
            <h1> Marvel API exp  </h1>
            <h2> renders: {countRenders.current} </h2>


            
            <input
                className = 'search-input'
                type = "text"
                // maxLength = {2}
                value = {startLetter.slice(-1)}
                onChange = { (e) => inputHandler(e)}
            />
            
            
            <ClickBar 
                setStartLetter = {setStartLetter} 
            />
            

            <label htmlFor  = 'no_image'>
                <input 
                    className = 'checkbox_not_found'
                    id = 'no_image'
                    htmlFor = 'no_image'
                    type = 'checkbox'
                    value = {includeImageNotFound}
                    onChange = {toggleIncludeNoImageFound}
                    
                />

            Include Image Not Found
            </label>


            <div className = 'edit-results-container'>
                <label htmlFor = 'filter'> Filter Results
                    <input 
                        id = 'filter'
                        type = 'text'
                        className = 'filtered-results-input'
                        value = {filteredResults}
                        onChange = {filterResultsHandler}
                    />            
                
                
                
                </label>
            
            
                <input 
                    type = 'text'
                    className = 'full-search-input'
                    value = {searchFullName}
                    onChange = { (e) => searchHandler(e)}
                />

                <button 
                    onClick = {fullNameSearch}
                > Full Name Search </button>
            </div>


            <div className = 'char-count'> Total Located: {charCount} </div>
        </div>
    


        {isLoading ? 
            <div className = 'loader'> 
                <SyncLoader color = {'red'} loading = {isLoading} size = {50}/>
            </div> : 

            <div className = 'results-main-container'> 
 
                {error ? 
                    <div>  Error: {error}</div>
                :
                    <div>
                        {charData && charData.data.count === 0 ? 
                            <NotFound 
                                recentSearch = {recentSearch} 

                            />
                            : 


                            <div className = 'main-char-container' ref = {countItems}>
                            
                            {charData && charData.data.results

                                .filter( (char) => {
                                    if(char.thumbnail.path.toString().includes('not') && includeImageNotFound) {
                                        // console.log(" char name with NO IMAGE  ", char.name);
                                    } else {
                                        // console.log(" char IMAGE EXISTS >>>>" , char.thumbnail.path.toString().includes('not'));
                                        return char
                                    }

                                })

                                .filter( (char) => {
                                    if(filteredResults === '') {
                                        return char
                                    }
                                    else if(char.name.toLowerCase().includes(filteredResults.toLowerCase())){
                                        return char
                                    }
                                                                
                                })
                            

                                .map ( (char, index, arr) => {
                                
                                    return (
                                        <div 
                                            key = {char.id}
                                            className= 'main-card'

                                            > {arr.index}
                                            <div className = 'char-name'> {char.name} {arr.length}</div>
                                            <div className = 'image-container'> 
                                                <img 
                                                    className = 'char-img'
                                                    src = {char.thumbnail.path + '.' + char.thumbnail.extension} 
                                                    alt = {char.name}
                                                />
                                            </div>
                                        </div>
                                    )
                                
                                })
                                   
                            }
                            
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
