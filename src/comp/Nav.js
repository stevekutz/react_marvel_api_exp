import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css';
import banner from '../img/banner.jpg';

const Nav = () => {

    return (
        <div className = 'nav-main-container'>
            

            <div className = 'nav-left-container'>
                <div className = 'nav-title'> Marvel API exp </div>
                <div className = 'nav-link-container'> 
                    <div className = 'nav-link'>
        
                    Characters    
                    </div>

                    <div className = 'nav-link'>
        
                    Link 2                    
                    </div>

                    <div className = 'nav-link'>
        
                    Link 3                    
                    </div>

                
                </div>
            
            
            </div>

            <img className = 'nav-banner-img' src = {banner} alt= 'banner'/>
            
            <div className = 'nav-login'>
                Login / Signup
            
            </div>
        
        </div>
    )

} 

export default Nav;