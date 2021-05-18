import React from 'react';

import {createAlphaArray} from '../Helper';
import './clickbar.css';
import banner from '../img/banner.jpg';


const ClickBar = ({setStartLetter, setSearchFullName}) => {

    

    let alphaArr = createAlphaArray()
    // console.log('my Alpha Aray ', alphaArr);


    return (

    <div className = 'clickbox-container' onClick = {() => setSearchFullName('')}>

        
        {alphaArr.map((ch) => {
            return (
                <p 
                    key = {ch.lower}
                    className = 'charbox'
                    // onMouseEnter = {() => setStartLetter(ch.lower)}
                    onClick = {() => setStartLetter(ch.lower)}
                    
                    > {ch.upper} 
                </p>
                    
            
            )
            
            

        
        })}

        
        
    
    
    
    </div>
    
    )


}

export default ClickBar;