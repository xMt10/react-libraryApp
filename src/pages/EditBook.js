import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

const EditBook = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [bookName,setBookName] = useState();
  const [author,setAuthor] = useState();
  const [isbn, setIsbn] = useState();
  const [category,setCategory] = useState();
  const [categories, setCategories] = useState(null);

  const [showModal,setShowModal] = useState(false);


  useEffect(() => {
    axios
    .get(`http://localhost:3004/books/${params.bookId}`)
    .then((res)=> {
      console.log(res.data);
      setBookName(res.data.name);
      setAuthor(res.data.author);
      setCategory(res.data.categoryId);
      setIsbn(res.data.isbn);
      axios
       .get("http://localhost:3004/categories")
       .then((res)=>{
        setCategories(res.data)
       })
       .catch((err)=> console.log(err,"cat err"))
    })
    .catch((err) => console.log(err));
  },[])

  const handleSubmit = (event) =>{
    event.preventDefault();
    setShowModal(true);
        
}

const editBook = () => {

  if(bookName === "" || author === "" || category === ""){
    return alert("Bookname, Author and Category cannot be left blank")

}
 
const updatedBook = {
  id:params.bookId,
  name:bookName,
  author:author,
  categoryId:category,
  isbn:isbn
  }
  console.log("updated book",updatedBook)
  axios
  .put((`http://localhost:3004/books/${params.bookId}`),updatedBook)
  .then((res)=>{
  console.log(res);
  setShowModal(false);
  navigate("/");
  })
  .catch((err)=>console.log("edit err",err))
  
 }


  if(categories === null){
    return <Loading/>
  }



    return(
        <div>
          <Header/>
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
      <button onClick={ () => navigate("/")}
      type="submit" 
      className="btn btn-outline-danger w-25 me-2">Cancel</button>
        <button type="submit" className="btn btn-primary w-25">Save</button>
      </div>
   </form>


  </div>

  {
   showModal === true && (
     <Modal 
     title = "Updating"
     description = {`Are you sure want to update as "${bookName}" ?`}
     onCancel = {() => setShowModal(false)}
     onConfirm = {() => editBook()}
      />
   )
  }
        </div>
    )
}
export default EditBook;