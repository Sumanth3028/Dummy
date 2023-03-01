import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {


  return (
    <div id='delete'>
       <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={props.onRemove}>delete</button>
    </li>
    </div>
   
  );
};

export default Movie;