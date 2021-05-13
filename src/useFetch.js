import React, {useState, useEffect } from 'react';


const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const [data, setData] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);


    useEffect( () => {

        // setStartLetter(startLetter);
        // const abortCont = new AbortController();
        setIsLoading(true);

        setTimeout( () => {
        
            console.log('  isLoading >>>> ', isLoading);


            fetch(url + process.env.REACT_APP_KEY + process.env.REACT_APP_HASH)
            // fetch(`"${process.env.REACT_APP_URL}"`)
                .then(res => {
                    if(!res.ok) {
                        console.log(" Status Code ", res.status);
                        throw Error(' Error with Request');
                    }
                return res.json();    
                })
                .then(data => {
                    setIsLoading(false);
                    setData(data)
                    setError(null)
                })
                .catch(err => {
                    console.log('ERROR CAUGHT ', err)
                    setError(err.message);
                    setIsLoading(false);
                })
        
        
        
        
        }, 6000);
    
    
    
    
    }, [url])

    return { data, isLoading, error };
    // return {data, isLoading, error}

}

export default useFetch;