/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import like from '../../assets/icons/Favourites-filled.svg';
import logo from '../../assets/img/Logo.png';

export const Modal: React.FC = () => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div className="modal">
      <div className="modal__content">
        <img className="modal__content-logo" src={logo} alt="logo" />

        <h1 className="modal__content-main">
          Thanks so much for your recent purchase!
        </h1>

        <img className="modal__content-img" src={like} alt="like" />

        <h2 className="modal__content-second">
          We appreciate you and hope you enjoy your new items.
        </h2>

        <p className="modal__content-redirection">
          {`You will be automaticaly redirected to Home page for ${seconds} sec...`}
        </p>
      </div>
    </div>
  );
};
