import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMovieHandler= async ()=>{
   fetch("https://react-dummy-b2e78-default-rtdb.firebaseio.com//movies/-NPRKc1viOGPoVMM5FGq",{
       method:"DELETE"
    })
      
   
    // console.log('hi')
    //  const ele=document.getElementById('delete')
    //  ele.remove()
 
  }

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("https://react-dummy-b2e78-default-rtdb.firebaseio.com/movies.json/");
      
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
     
      let loadedData=[]

      for(const key in data){
        loadedData.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }

      
      setMovies(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No movies found</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDelete={deleteMovieHandler}/>;
  }
  let id;
  if (error) {
    content = (
      <p>
        {error} <b>...Retrying</b>
      </p>
    );

    id = setTimeout(fetchMoviesHandler, 5000);
  }

  if (isLoading) {
    content = <p>Loading..</p>;
  }

  const stopHandler = () => {
    setError(null);
    clearTimeout(id);
  };
  const addMovieHandler=async (movie)=>{
    const response=await fetch("https://react-dummy-b2e78-default-rtdb.firebaseio.com/movies.json",{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const data= await response.json();
    console.log(data)
  }

 

  // const deleteMovieHandler= ()=>{
  //   const deletekey= fetch("https://console.firebase.google.com/project/react-dummy-b2e78/database/react-dummy-b2e78-default-rtdb/data/~2Fmovies~2F-NPRN_GzoRX3o0_TlHZJ",{
  //     method:'DELETE',
    
  //   })
   
  //   console.log('hi')
  //    const ele=document.getElementById('delete')
  //    ele.remove()
 
  // }
 
  

  return (
    <React.Fragment>
      <MovieForm onAddMovie={addMovieHandler}  />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content} 
        {error && <button onClick={stopHandler}>cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
