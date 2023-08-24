import { useState } from "react";
import { Button, Card, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const CardExpandable = ({ image, title, text, info }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="card-def card-job"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <img src={image} alt={title} loading="lazy" />
      <h3>{title}</h3>
      <p>{text}</p>
      <Button variant="link" onClick={() => setOpen(!open)}>
        {open ? (
          <FontAwesomeIcon
            icon={faChevronUp}
            bounce
            size="2x"
            transform="grow-5"
            style={{ color: "#e69600c6" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            bounce
            size="2x"
            transform="grow-5"
            style={{ color: "#e69600c6" }}
          />
        )}
      </Button>

      {open && (
        <Card.Body>
          <Accordion defaultActiveKey="0">
            {info.map((item, index) => {
              const key = Object.keys(item)[0];
              const value = item[key];

              if (value.description && value.details) {
                return (
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>{key}</Accordion.Header>
                    <Accordion.Body>
                      <p>{value.description}</p>
                      <ul>
                        {value.details.map((detail, dIndex) => (
                          <li key={dIndex}>{detail}</li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              } else if (value.description) {
                return (
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>{key}</Accordion.Header>
                    <Accordion.Body>
                      <p>{value.description}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              }

              return null;
            })}
          </Accordion>
        </Card.Body>
      )}
    </div>
  );
};

export default CardExpandable;
