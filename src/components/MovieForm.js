import React, { Fragment, useRef } from "react";
import "./MovieForm.css";

const MovieForm = (props) => {
  const titleRef = useRef("");
  const openingRef = useRef("");
  const releaseRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    const movie = {
      id:Math.random().toString(),
      title: titleRef.current.value,
      openingText: openingRef.current.value,
      releaseDate: releaseRef.current.value,
    };

    props.onAddMovie(movie)
  };

  

  return (
    <Fragment>
      <section className="section">
        <form onSubmit={submitHandler}>
          <label htmlFor="text" className="form label">
            <b>Title</b>
          </label>
          <input type="text" id="text" className="title" ref={titleRef} />
          <label htmlFor="description" className="form label">
            <b>Opening Text</b>
          </label>
          <input type="text" id="description" className=" description" ref={openingRef} />
          <label htmlFor="release" className="form label">
            <b>Release Date</b>
          </label>
          <input type="text" id="release" className="release" ref={releaseRef} />
          <button type="submit">Add Movie</button>
        </form>
        
      </section>
    </Fragment>
  );
};

export default MovieForm;
