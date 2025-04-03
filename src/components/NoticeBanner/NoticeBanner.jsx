import React, { useState, useEffect } from "react";
import "./NoticeBanner.scss";

const NoticeBanner = ({ startDate, endDate }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const twoWeeksBefore = new Date(start);
    twoWeeksBefore.setDate(start.getDate() - 14);

    if (now >= twoWeeksBefore && now <= end) {
      setVisible(true);
    }
  }, [startDate, endDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  };

  if (!visible) return null;

  return (
    <div className="notice-banner">
      <p>
        Estaremos de licencia desde el <strong>{formatDate(startDate)}</strong>{" "}
        hasta el <strong>{formatDate(endDate)} inclusive</strong>.
      </p>
      <button onClick={() => setVisible(false)} className="close-btn">
        ✖
      </button>
    </div>
  );
};

export default NoticeBanner;
