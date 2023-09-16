import React from "react";
import loading from "./Style/pacman.gif"
import "./Style/loading.css"

export default function LoadingBar(){
    return(
        <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    )
}