import React from "react";

const Modal = (props) => {
    const {setShowModal,workTodo,title,description} = props;

    
    return(

        <div
        style={{
            position:"absolute",
            width:"100vw",
            height:"100vh",
            top:0,
            left:0,
            backgroundColor:"rgba(0,0,0,0.4)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"

        }}>
            <div
            style={{
                width:"50%",
                padding:"20px",
                backgroundColor:"#fff",
                borderRadius:"10px"
            }}>

              <h1 className="text-center">{title}</h1>
              <p className="text-center">{description}</p>


              <div className="d-flex justify-content-center">
                <button onClick={() => setShowModal(false)}
                 className="btn btn-sm  btn-outline-dark me-2">Cancel</button>
                <button onClick={workTodo}
                className="btn btn-sm btn-outline-danger">Accept</button>
            </div>

            </div>

            
        </div>

    )
}

export default Modal;