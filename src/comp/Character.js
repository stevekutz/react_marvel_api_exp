import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
import useFetch from './useFetch';

import marvelIntro from '../img/marvel_intro.gif';

const Character = (props) => {

    const {ID} = useParams();
    const history = useHistory();

    const {data, isLoading, error} = useFetch("http://gateway.marvel.com/v1/public/characters/" + ID + "/comics?limit=100&ts=1");

    // console.log("inside charData ", data.data.results);

            // <div> {data.data.results[0].name}</div>
            // <div> {data.data.results[0].description} </div>

    return (
        <div style = {{color: 'blue', marginTop: '150px'}}>
                    {isLoading ? 
            <div className = 'loader'> 
                {/* <SyncLoader className = '' color = {'red'} loading = {isLoading} size = {25}/> */}
                <img src = {marvelIntro} alt = 'marvel_loader'/>
            </div> : 

            <div className = 'results-main-container'> 
 
                {error ? 
                    <div>  Error: {error}</div>
                :
                    <div>
                        {data && data.data.count === 0 ? 
                            <div> NOTHING FOUND

                            </div>
                            : 


                            <div className = 'main-char-container'>
                            
                            {data && data.data.results

                            

                                .map ( (char, index, arr) => {
                                
                                    return (
                                        <div 
                                            key = {char.id}
                                            className= 'main-card'

                                            >
                                            
                                                <div className = 'char-name'> {char.title} {char.id}</div>
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
    )

}

export default Character;
            
            
            

            // {data && data.data.results[0].comics.items((item) => {
            //     <div>

            //         <div>
            //             {item.name}
            //         </div>
            //         <div>
            //             {item.resourceURI}
            //         </div>
            //     </div>
            
            // })}