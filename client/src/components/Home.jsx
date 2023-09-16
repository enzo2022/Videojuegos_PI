import { Link } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from "react"

import './Style/home.css'

import { getallGenres, getallVideogame, orderByName, orderByRating,filterOrigen, filterVideoGameByGenres,filterVideoGameFecha } from "../actions"
// import Card from "./Card"
import SearchBar from "./SearchBar"
import Paginado from "./Paginado"
import Card from "./Card"
import LoadingBar from "./Loading"



export default function Home(Home){
const dispatch = useDispatch()
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
const infoVideoGame = useSelector((state)=> state.videogameId)
const videogames = useSelector((state)=> state.videogames)
const genres = useSelector((state)=>state.genres) 

const [orden, setOrden]= useState('')

/*------------------------------------------------------------------------------ */
    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPage, setVideoGamesPage] = useState(15);


    const indexOfLastVideoGame = currentPage * videoGamesPage;
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPage;
    const currentVideoGames = videogames.slice(indexOfFirstVideoGame,indexOfLastVideoGame)


    const paginado = (pageNumbers) =>{
        setCurrentPage(pageNumbers)
    }
/*------------------------------------------------------------------------------ */
useEffect(()=>{
    dispatch(getallVideogame())
    dispatch(getallGenres())
},[dispatch])

 /*--------------------------------------------------------------------------------------- */ 
function handleClick(e){
    e.preventDefault();
    dispatch(getallVideogame())
    dispatch(getallGenres())
    setCurrentPage(1)
}

/*--------------------------------------------------------------------------------------- */ 
function handleSort(e){
    e.preventDefault()
    dispatch(orderByName(e.target.value));
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
}

function handleSortByRating(e){
    dispatch(orderByRating(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
    setCurrentPage(1)
}


function handleFilterGenres(e){
        
    dispatch(filterVideoGameByGenres(e.target.value))
    setCurrentPage(1)
}



function handlefilterOrigen(e) {
    e.preventDefault();
    dispatch(filterOrigen(e.target.value));
    setCurrentPage(1);
  }


    return  (
      
<div key={Home} className="fondo">

    <div className="grid-container">
{/*--------------------------------------------------------------------------------------- */ } 
      <div className="column">
      
        <div className="component"> 
            <Link to='/'><button className="option"> Homepage </button></Link>
                
        </div>
      
 {/*--------------------------------------------------------------------------------------- */ }
 
                        
        <div className="component">
        
            <Link to='/creategame'><button className="option">Create Videogame</button></Link>
        </div>
        
{/*---------------------------------------------------------------------------------------- */}        
        <div className="component">  
                <button className="option" onClick={(e)=>{handleClick(e)}}>Recharge</button>
        </div>
{ /*--------------------------------------------------------------------------------------- */ }      
</div>
<div className="column">
<div className="component">
    <select className="option" onChange={(e) => {handleSort(e)}}>
                            <option value="alpha">Alphabetically Sort</option>
                            <option value="asc">Sort:  A - Z</option>
                            <option value="des">Sort:  Z - A</option>
                        </select>
                        </div>
{/*--------------------------------------------------------------------------------------- */} 
</div>
<div className="column">
    <div className="component"> 
<select className="option"
          onChange={(e) => {
            handlefilterOrigen(e);
          }}
        >
          <option value="todos">
          Todos
          </option>
          <option value="Api">Api</option>
          <option value="DataBase">Base de Datos</option>
        </select>
        </div>
<div className="component">
<select className="option" onChange={ e => handleSortByRating(e)}>
                            <option value="Rating">Rating</option>
                            <option value="Hight">Hight Rating</option>
                            <option value="Low">Low Rating</option>
                         
                        </select>
</div>
{/*-----------------------------------------------------------------------------------------*/}

<div className="component">
<select className="option" onChange={(e)=>{handleFilterGenres(e)}}>
    <option  value='all'>todas</option>
    {
                              genres?.map(d=>{
                                    return(
                                        <>
                                            <option value={d.name} >{d.name}</option>
                                        </>
                                    )
                                })
                            }
</select>
</div>
</div>
 
</div>


{/*------------------------------------------------------------------------------------------*/ }      
         <div className="SearchBar">        <SearchBar/>        </div>
        
{ /*--------------------------------------------------------------------------------------- */ }
  <ul>                  
                <Paginado
                           
                            videoGamesPage={videoGamesPage}
                            videogames={videogames.length}
                            paginado={paginado}
                        />  
                         
                           
       </ul>
{ /*--------------------------------------------------------------------------------------- */ }

   {loading ? (
        <div className="loading-container">
        <LoadingBar />
        
      </div>
      ) : (
       
        <div>
        <div className="cardsPaginate">
     
        
               { currentVideoGames.map((el)=>{
                    return(
                     
                        <Card
                        genres={el.Genres}
                        name={el.name}
                        image={el.image}
                        genre={el.genres}
                        rating={el.rating}
                        id={el.id}
                        key={el.id}
                        />
                        
                    )
                })}
          
      
        </div> 
     
        
        </div>)}
 {/*--------------------------------------------------------------------------------------- */ }      
 
                        
      
      
                   
</div>
      
    )
}