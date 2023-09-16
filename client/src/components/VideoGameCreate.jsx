import React from "react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Link } from "react-router-dom"

import { createVideogame, getallGenres } from "../actions";
import './Style/VideoGamecreate.css'
export default function VideogameCreate(){
    const dispatch = useDispatch();
    const allGenres = useSelector((state)=>state.genres)
   
    const[input , setInput]= useState({
        name:"",
        image:"",
        description:"",
        released:"",
        rating:"",
        Genres:[],
        platforms:[]
    });
   

    useEffect(()=>{
        dispatch(getallGenres());
    },[dispatch])

    const handleInputChange = (e) => {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        })
    }
    let regexRating =/[+-]?([0-9]*[.])?\b[0-5]{1,1}\b/; //regex 1-5 decimal inclusive
    let expReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/;
    const handSumit=(e)=>{
        e.preventDefault();
        if(!input.name){
            return alert('Enter game name');
        }else if(!expReg.test(input.name)){
            return alert('The name must only have letters or numbers')
        }else if(input.image.length > 0 && !input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
            return alert("The image has to be a URL")
        }else if(!input.released){
            return alert('Enter a released date');
        }else if(!regexRating.test(input.rating)) {
            return alert('Enter a rating from 0 to 5 (Integer or Float)');
        }else if(!input.Genres.length){
            return alert('Select at least 1 genres');
        }else if(!input.platforms.length){
            return alert('Select at least 1 platform');
        }else if(!input.description.length){
            return alert('Enter description game');
        }
        dispatch(createVideogame(input))
        alert("VideoGame Created Successfully")
        setInput({
            name:"",
            image:"",
            description:"",
            released:"",
            rating:"",
            Genres:[],
            platforms:[]
        })}
        function handleSelectForGenres(e){
            setInput({
                ...input,
                Genres: [...new Set([...input.Genres, e.target.value])]
                
            })
            
        }
        function handleSelectForPlatform(e){
            setInput({
                ...input,
                platforms:[...new Set([...input.platforms, e.target.value])]
            })
        }
        
    let plataformas = ["Linux", "PC", "Xbox One", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Xbox 360", "macOS", "Nintendo Switch", "Xbox Series S/X", "Wii U", "Nintendo 3DS", "iOS", "PS Vita", "Android", "Xbox", "Web", "Dreamcast"]
       
    return(
        <div className="constexto" >
           
           
            <form onSubmit={handSumit}>
           <div className="home"> <Link to="/home"><button id="home">Home</button></Link></div> 





                
                           
                            
                       
                       

            <div className="label">
            
               <label >Name</label>
                <input
                id="name"
                autoComplete="off"
                placeholder = "Name of your game"
                type="text"
                value= {input.name}
                name= "name"
                onChange={handleInputChange}
                /> 
           
                 <label >Image: </label>
                            <input   
                 id="image"              
                type="text" 
                value={input.image}
                name="image"
                required=""
                autoComplete="off"
                placeholder="http://image_path.jpg"
                onChange={e =>handleInputChange(e)}
                />


                <label>Released: </label>
                <input 
                id="date"
                type="date" 
                value={input.released}
                name="released"
                required=""
                autoComplete="off"
                onChange={e =>handleInputChange(e)}
                />

                <label >Rating: </label>
                <input
                id="rating"
                type="text" 
                value={input.rating}
                name="rating"
                required=""
                autoComplete="off"
                placeholder="Rating"
                onChange={e =>handleInputChange(e)}
                />

                <label >Description </label>
                <textarea 
                id="discription"
                type="text" 
                value={input.description}
                name="description"
                required=""
                autoComplete="off"
                placeholder="Description"
                onChange={e =>handleInputChange(e)}
                /> 
                </div>
                <div className="check">
                
                
                
                <div>

                <label id="check1">Genres:</label>
                <div id="genres">
                {allGenres.map((e, index) =>
                <div  >
                <label id="genr">{e.name}</label><input id="chechgenr" type="checkbox" value={e.name} name="genres" onClick={handleSelectForGenres}></input>
                </div>
                )}
                </div>
                </div>




                <div>
                <label id="check2">Platforms:</label>
                <div id="plataforms">    
                {plataformas.map((e, index) =>
                <div >
                <label id="plat">{e}</label><input id="checkpla"  type="checkbox" value={e} name="platforms" onClick={handleSelectForPlatform}></input>
                </div>
                )}           
                </div> 
                </div>         
                       
                       
                       </div>  
                       <div className="create">
                        <button button id="create" type="submit"><i ></i> Create</button>
                    </div>
   
                       

            </form>
        
        </div>
    )
}