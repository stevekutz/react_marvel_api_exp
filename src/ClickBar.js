import React from 'react';

import {createAlphaArray} from './Helper';
import './clickbar.css';



const ClickBar = ({setStartLetter}) => {

    

    let alphaArr = createAlphaArray()
    // console.log('my Alpha Aray ', alphaArr);


    return (

    <div className = 'clickbox-container'>

        
        {alphaArr.map((ch) => {
            return (
                <p 
                    className = 'charbox'
                    onMouseEnter = {() => setStartLetter(ch.lower)}> {ch.upper} </p>
            
            
            
            )
            
            

        
        })}

        
        
    
    
    
    </div>
    
    )


}

export default ClickBar;