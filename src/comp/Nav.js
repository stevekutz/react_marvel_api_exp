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
                        <Link exact className = 'nav-link' to = '/'> Home</Link>                    
                    </div>


                    <div className = 'nav-link'>        
                        <Link exact className = 'nav-link' to = '/characters'> Characters </Link>                    
                    </div>
                   
                    <div className = 'nav-link'>
        
                        <Link className = 'nav-link' to = '/comics'> Comics </Link>
                    </div>

                    <div className = 'nav-link'>
        
                        <Link className = 'nav-link' to = '/items'> Items </Link>
                    </div>

                    <div className = 'nav-link'>        
                        <Link className = 'nav-link' to = '/about'> About </Link>                    
                    </div>

                
                </div>
            
            
            </div>
            {/*
            <img className = 'nav-banner-img' src = {banner} alt= 'banner'/>
            */}

            <div className = 'nav-login'>
                Login / Signup
            
            </div>
        
        </div>
    )

} 

export default Nav;