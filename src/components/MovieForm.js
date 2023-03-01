import React, { Fragment } from "react";
import "./MovieForm.css";

const MovieForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
    const text = document.getElementById("text").value;
    const opening = document.getElementById("description").value;
    const release = document.getElementById("release").value;
    let obj = { text: text, opening: opening, release: release };

    console.log(obj);
  };

  return (
    <Fragment>
      <section className="section">
        <form onSubmit={submitHandler}>
          <label htmlFor="text" className="form label">
            <b>Title</b>
          </label>
          <input type="text" id="text" className="title" />
          <label htmlFor="description" className="form label">
            <b>Opening Text</b>
          </label>
          <input type="text" id="description" className=" description" />
          <label htmlFor="release" className="form label">
            <b>Release Date</b>
          </label>
          <input type="text" id="release" className="release" />
          <button type="submit">Add Movie</button>
        </form>
      </section>
    </Fragment>
  );
};

export default MovieForm;
