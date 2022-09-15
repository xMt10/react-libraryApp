import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";


const ListBooks = (props) => {
    const [books,setBooks] = useState(null);
    const [categories,setCategories] = useState(null);

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

    },[] )

    if(books === null || categories === null){
        return(
         <Loading />
        );
    }

   
   
    return(

        <div className="container my-5">

          <div className="d-flex justify-content-end">
            <Link to ="/add-book" className="btn btn-primary ">Add a book</Link>
          </div>

<table className="table">
  <thead>
    <tr>
      <th scope="col">Book Name</th>
      <th scope="col">Author</th>
      <th scope="col">Category</th>
      <th scope="col">ISBN</th>
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
          <td>{book.isbn}</td>
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