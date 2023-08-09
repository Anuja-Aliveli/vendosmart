import "./index.css";

const MovieCard = (props) => {
  const { title, overview, rating, imageUrl, releaseDate} = props.movie;
  return (
    <li className="list-container">
      {imageUrl !== '' ? <img className="image" src={imageUrl} alt={title} /> : 
      <div className="image back">
        <h1>{title}</h1>
      </div>}
      <div className="content-container">
        <p>
          <b>Title:</b> {title}
        </p>
        <p>
          <b>Release Date:</b> {releaseDate}
        </p>
        <p>
          <b>rating:</b> {rating}
        </p>
        <p>
          <b>Overview: </b>
          {overview}
        </p>
      </div>
    </li>
  );
};

export default MovieCard;
