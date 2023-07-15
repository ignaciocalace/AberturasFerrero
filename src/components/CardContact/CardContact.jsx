import { Link } from "react-router-dom";

function CardContact({ image, title, description, link, className, btnMsg }) {
  return (
    <div className={`card-contact ${className}`}>
      <h3>
        <img src={image} alt={title} /> {title}
      </h3>
      {description && <p>{description}</p>}
      <Link to={`${link}`}>{btnMsg}</Link>
    </div>
  );
}

export default CardContact;
