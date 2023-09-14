import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import home from '../../assets/icons/Home.svg';
import { buildLink } from '../../utils/functions';

export const Breadcrumbs: React.FC = () => {
  const [crumbs, setCrumbs] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    setCrumbs(() => {
      const currentPath = location.pathname.split('/').filter(path => path);

      return currentPath;
    });
  }, [location]);

  return (
    <div className="breadcrumbs">
      <Link to="/home" className="breadcrumbs__home-link">
        <img
          src={home}
          alt="home"
          className="catalog-navigation__home"
        />
      </Link>

      {crumbs.map(crumb => {
        const [linkTo, title] = buildLink(crumb, crumbs);

        return (
          <span className="breadcrumbs__item" key={crumb}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.52876 3.52861C5.78911 3.26826
            6.21122 3.26826 6.47157
            3.52861L10.4716 7.52861C10.7319 7.78896
            10.7319 8.21107 10.4716 8.47141L6.47157
            12.4714C6.21122 12.7318 5.78911 12.7318
            5.52876 12.4714C5.26841 12.2111
            5.26841 11.789 5.52876 11.5286L9.05735
            8.00001L5.52876 4.47141C5.26841
            4.21107 5.26841 3.78896 5.52876 3.52861Z"
                fill="#B4BDC4"
              />
            </svg>

            <Link
              to={linkTo}
              className="breadcrumbs__link"
            >
              {title}
            </Link>
          </span>
        );
      })}
    </div>
  );
};
