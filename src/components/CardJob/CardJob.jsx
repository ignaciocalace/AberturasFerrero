import { Link } from "react-router-dom";

function CardJob({ image, title, type, link }) {
  return (
    <div
      className="card-def card-job"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <p>{type}</p>
      <Link to={`/trabajos/${link}`}>Ver más</Link>
    </div>
  );
}

export default CardJob;
