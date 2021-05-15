import './notfound.css';


const NotFound = ({recentSearch}) => {

    return (
        <div className = 'notfound-main-container'>
            <div className = 'not-found-name-container'> 
                The full name: 
                <span className = 'name'> {recentSearch} </span>  
                
                was not found </div>
        
        </div>
    )

}

export default NotFound;