import { Link } from 'react-router-dom';
import logo from '../../assets/img/Logo.png';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <Link
                to="https://github.com/fe-may23-scriptsquad"
                className="footer__nav-link"
              >
                Github
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="footer__nav-link">
                Contacts
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="footer__nav-link">
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="footer__button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          type="button"
        >
          <div className="footer__button-content">Back to top</div>

          <div className="footer__botton-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="15.5"
                stroke="#B4BDC4"
                fill="#FFFFFF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line
                d="M13.5286 11.5286C13.789 11.2683 14.2111 11.2683 14.4714 11.5286L18.4714 15.5286C18.7318 15.789 18.7318 16.2111 18.4714 16.4714L14.4714 20.4714C14.2111 20.7318 13.789 20.7318 13.5286 20.4714C13.2683 20.2111 13.2683 19.789 13.5286 19.5286L17.0572 16L13.5286 12.4714C13.2683 12.2111 13.2683 11.789 13.5286 11.5286Z"
                fill="#0F0F11"
              />
            </svg>
          </div>
        </button>
      </div>
    </footer>
  );
};
