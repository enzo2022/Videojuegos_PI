import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById, pageDetail} from "../actions";
import { Link } from 'react-router-dom';
import './Style/delail.css'

export default function Detail(props){
const dispatch =useDispatch();
const id = props.match.params.id

useEffect(() => {
    dispatch(getVideogameById(id));
    return () => {
      dispatch(pageDetail());
    };
  }, [dispatch, id]);
  
  const infoVideoGame = useSelector((state)=> state.videogameId)
  
return(
        <div >   

                       
                        <div className='imagen' >    <img id='img' src={infoVideoGame.image} alt={infoVideoGame.name} /></div>
                       <div className='contexto'>
                       
                        <h1 id='name'>{infoVideoGame.name}</h1>
                             <div >
                            
                                <div className='label'>
                                <div><label >Released At: {infoVideoGame.released}</label></div>
                                <div><label>Genres: {infoVideoGame.Genres?.join(" | ")} </label></div>
                                <div><label>Rating: {infoVideoGame.rating}</label></div>
                                <div><label>Platforms:  {infoVideoGame.platforms?.join(" | ") }</label></div>
                                </div>
                                
                                
                                  
                              <div className='discription'>     <p id='discription'>{infoVideoGame.description}</p></div>
                            <div id='link'><Link to="/home"><button id='button'> volver </button></Link></div> </div> 
                            </div>   
                         
                            
                          
        </div>              






   
                          


)
}
