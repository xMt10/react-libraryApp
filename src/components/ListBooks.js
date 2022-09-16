import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";


const ListBooks = (props) => {
    const [books,setBooks] = useState(null);
    const [categories,setCategories] = useState(null);
    const [didUptade,setDidUptade] = useState(false)

    useEffect(()=> {
        axios
          .get("http://localhost:3004/books")
          .then((resBook) => {
            console.log(resBook);
            setBooks(resBook.data);
          axios
            .get("http://localhost:3004/categories")
            .then((resCat) => {  
              setCategories(resCat.data)
            })
            .catch((err) => console.log("Cat Error",err));

          })
          .catch((err) => console.log("Book Error",err));

    },[didUptade] )
  
  const deleteBook = (id) => {
    console.log(`http://localhost:3004/books/${id}`);
    axios
    .delete(`http://localhost:3004/books/${id}`)
    .then((res)=> {
      setDidUptade(!didUptade);
    })
    .catch((err)=>console.log(err))

  }

    if(books === null || categories === null){
        return(
         <Loading />
        );
    }

   
   
    return(

        <div className="container my-5">

          <div className="d-flex justify-content-end">
            <Link to ="/add-book" className="btn btn-primary my-3 ">Add a book</Link>
          </div>

<table className="table">
  <thead>
    <tr>
      <th scope="col">Book Name</th>
      <th scope="col">Author</th>
      <th scope="col">Category</th>
      <th className="text-center" scope="col">ISBN</th>
      <th className="text-center" scope="col">Operation</th>
    </tr>
  </thead>
  <tbody>
  {
      books.map((book) => {
        const category = categories.find(cat => cat.id === book.categoryId)


        return(
        <tr>   
          <td >{book.name}</td>
          <td>{book.author}</td>
          <td>{category.name}</td>
          <td className="text-center">{book.isbn === "" ? "-" : book.isbn }</td>
          <td>
          <div className="btn-group" role="group">
         <button 
         type="button" 
         className="btn btn-sm btn-outline-danger"
         onClick={() => deleteBook(book.id)}>Delete</button>
          </div> 
          </td>

         </tr>
        )
    })
    }
    
      
  </tbody>
</table>

 </div>

        

    )
}

export default ListBooks;