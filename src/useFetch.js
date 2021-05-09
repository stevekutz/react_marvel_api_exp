import React, {useState, useEffect } from 'react';


const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect( () => {

        // setStartLetter(startLetter);


        setTimeout( () => {
        
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
                    setData(data)
                    setIsLoading(false);
                    setError(null)
                })
                .catch(err => {
                    console.log('ERROR CAUGHT ', err)
                    setError(err.message);
                    setIsLoading(false);
                })
        
        
        
        
        
        }, 4000);
    
    
    
    
    }, [url])


    return {data, isLoading, error}

}

export default useFetch;