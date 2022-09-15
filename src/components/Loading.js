import React from "react";


const Loading = (props) => {


   return(

    <div style={{width:"100vw",
                height:"100vh",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"}}>
 
 
 <div style={{width:"60px" , height:"60px"}} class="spinner-border text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
    </div>


    </div>
    
    
   


   )

}

export default Loading;