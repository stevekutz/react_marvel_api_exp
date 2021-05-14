import './notfound.css';


const NotFound = ({searchFullName}) => {

    return (
        <div className = 'notfound-main-container'>
            <div className = 'not-found-name-container'> 
            
                <span className = 'name'> {searchFullName} </span>  not found </div>
        
        </div>
    )

}

export default NotFound;