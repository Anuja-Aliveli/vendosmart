import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {Oval} from "react-loader-spinner";
import MovieCard from "../MovieCard";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  progress: "PROGRESS",
  failure: "FAILURE",
  success: "SUCCESS",
};

const Movie = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [apiStatus, setStatus] = useState(apiConstants.initial);
  const [searchInput, setInput] = useState("");

  const discover = `https://api.themoviedb.org/3/discover/movie?api_key=e8ccc676e299173067a80520c1fee405`;

  useEffect(() => {
    fetchData(discover);
  }, []);

  const fetchData = async (url) => {
    try {
      setStatus(apiConstants.progress);
      const response = await fetch(url);
      if (response.ok === true) {
        const data = await response.json();
        const formattedData = data.results.map((eachMovie) => ({
          title: eachMovie.title,
          rating: eachMovie.vote_average,
          imageUrl: eachMovie.poster_path
            ? `https://image.tmdb.org/t/p/w200${eachMovie.poster_path}`
            : "",
          releaseDate: eachMovie.release_date
            ? eachMovie.release_date
            : "No Date",
          overview: eachMovie.overview ? eachMovie.overview : "No overview",
          id: eachMovie.id,
        }));
        setMoviesList(formattedData);
        setStatus(apiConstants.success);
      } else {
        setStatus(apiConstants.failure);
      }
    } catch (err) {
      setStatus(apiConstants.failure);
      console.log(err);
    }
  };

  const onInput = (event) => {
    setInput(event.target.value);
  };

  const onCommon = () => {
    const search = `https://api.themoviedb.org/3/search/movie?api_key=e8ccc676e299173067a80520c1fee405&query=${searchInput}`;
    fetchData(search);
  };

  const onEnter = (event) => {
    if (event.key === "Enter") {
      onCommon();
    }
  };

  const renderProgress = () => (
    <div className="container">
      <Oval color="blue" height={50} width={50} />
    </div>
  );

  const renderFailure = () => (
    <div className="container">
      <p>Something Happened.Try Again</p>
      <button className="fail" onClick={() => fetchData(discover)}>Retry</button>
    </div>
  );

  const renderSuccess = () => (
    <ul className="list">
      {moviesList.map((eachItem) => (
        <MovieCard movie={eachItem} key={eachItem.id}/>
      ))}
    </ul>
  );

  const renderResult = () => {
    switch (apiStatus) {
      case apiConstants.progress:
        return renderProgress();
      case apiConstants.failure:
        return renderFailure();
      case apiConstants.success:
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type="search"
          placeholder="Enter Movie"
          value={searchInput}
          onChange={onInput}
          onKeyDown={onEnter}
        />
        <AiOutlineSearch className="icon" onClick={onCommon} />
      </div>
      {renderResult()}
    </div>
  );
};

export default Movie;
