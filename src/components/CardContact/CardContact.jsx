import { Link } from "react-router-dom";

function CardContact({
  image,
  title,
  description,
  description1,
  link,
  link1,
  className,
}) {
  return (
    <div
      className={`card-def card-contact ${className}`}
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <Link to={`${link}`}>{description}</Link>
      <Link to={`${link1}`}>{description1}</Link>
    </div>
  );
}

export default CardContact;
