import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";


const AddBookForm = () =>{
    const navigate = useNavigate();
    
    const [categories,setCategories] = useState(null);
    const [bookName,setBookName] = useState("");
    const [author,setAuthor] = useState("");
    const [isbn,setIsbn] = useState("");
    const [category,setCategory] =useState("");
    
    
    useEffect(()=>{
        axios
         .get("http://localhost:3004/categories")
         .then((res) => {
            console.log(res);
            setCategories(res.data)
         })
         .catch((err) => console.log(err))
    },[]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(bookName === "" || author === "" || category === ""){
           return alert("Bookname, Author and Category cannot be left blank")
        }
        const newBook = {
            id: new Date().getTime(),
            name: bookName,
            author: author,
            isbn: isbn ,
            categoryId: category,           
        }
        axios
          .post("http://localhost:3004/books",newBook)
          .then((res) => {
            console.log("added book",res);
            setBookName("");
            setAuthor("");
            setCategory("");
            setIsbn("");
            navigate("/");
          }
          )
          .catch((err)=>console.log(err))


    }

    if(categories === null){
        return <Loading/>
    }


   return(
  <div className="container my-5">
   <form onSubmit={handleSubmit}>
     <div className="row ">
        <div className="col">
         <input 
          type="text" 
          className="form-control" 
          placeholder="Book Name"
          value={bookName}
          onChange={(event)=>setBookName(event.target.value)}
          /> 
        </div>
        <div className="col">
         <input 
          type="text" 
          className="form-control" 
          placeholder="Author" 
          value={author}
          onChange={(event)=>setAuthor(event.target.value)}
        />
        </div>
      </div>

      <div className="row my-5">
        <div className="col">
         <input 
          type="text" 
          className="form-control" 
          placeholder="ISBN"
          value={isbn}
          onChange={(event)=> setIsbn(event.target.value)} 
          /> 
        </div>
        <div className="col">
         <select 
          className="form-select"
          value={category}
          onChange = {(event)=> setCategory(event.target.value)}>
             
             <option value="" selected>Choose category</option>
           {
            categories.map((cat) => {
               return <option key={cat.id} value={cat.id}>{cat.name}</option>
            })
           }
         </select>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary w-50">Save</button>
      </div>
   </form>


  </div>
    
   )
}
export default AddBookForm;