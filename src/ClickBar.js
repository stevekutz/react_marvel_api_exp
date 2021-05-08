import React from 'react';

import {createAlphaArray} from './Helper';




const ClickBar = ({setStartLetter}) => {

    

    let alphaArr = createAlphaArray()
    console.log('my Alpha Aray ', alphaArr);


    return (

    <div>

        
 

        <p onMouseOver = {() => setStartLetter('a')}> A </p>
        
        
    
    
    
    </div>
    
    )


}

export default ClickBar;