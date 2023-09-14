/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import logoImage from '../../assets/img/Logo.png';
import likeImage from '../../assets/icons/Favourites.svg';
import cartImage from '../../assets/icons/Shopping-cart.svg';
import closeImage from '../../assets/icons/Close.svg';
import { AppContext } from '../AppContext/AppContext';
import { AppContextType } from '../../types/AppContextType';

const buildClassnames = ({ isActive }: { isActive: boolean }): string => (
  cn('link', 'nav__link', {
    'nav__is-active': isActive,
  }));

export const BurgerMenu: React.FC = () => {
  const context = useContext(AppContext) as AppContextType;
  const { setIsBurgerMenuActive } = context;

  return (
    <aside className="burger">
      <div className="burger__top">
        <div className="burger__left">
          <NavLink
            to="/"
            className="header__logo"
          >
            <img
              src={logoImage}
              alt="NICE gadgets"
              className="header__logo-img header__logo-img--burger"
            />
          </NavLink>
        </div>
        <div
          onClick={() => {
            setIsBurgerMenuActive(false);
          }}
        >
          <div className="burger-icon__left icon__left--borders">
            <span className="burger-icon__logo">
              <img
                src={closeImage}
                alt="favourites"
                className="burger-icon__logo-img"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="burger__menu">
        <ul
          className="nav__list
                     nav__list--column
                     nav__list--centered
                     burger__nav"
        >
          <li>
            <NavLink
              to="home"
              className={buildClassnames}
              onClick={() => setIsBurgerMenuActive(false)}
            >
              HOME
            </NavLink>
          </li>
          <li className="nav__wraper">
            <NavLink
              to="phones"
              className={buildClassnames}
              onClick={() => setIsBurgerMenuActive(false)}
            >
              PHONES
            </NavLink>
          </li>
          <li className="nav__wraper">
            <NavLink
              to="tablets"
              className={buildClassnames}
              onClick={() => setIsBurgerMenuActive(false)}
            >
              TABLETS
            </NavLink>
          </li>
          <li className="nav__wraper">
            <NavLink
              to="accessories"
              className={buildClassnames}
              onClick={() => setIsBurgerMenuActive(false)}
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="burger__bottom">
        <div>
          <div
            className="burger-icon__left
            burger-icon__hover"
          >
            <Link
              to="favorites"
              className="burger-icon__logo"
              onClick={() => setIsBurgerMenuActive(false)}
            >
              <img
                src={likeImage}
                alt="favorites"
                className="burger-icon__logo-img icon__logo-img--burger"
              />
            </Link>
          </div>
        </div>
        <div>
          <div
            className="burger-icon__right burger-icon__cart burger-icon__hover"
          >
            <Link
              to="cart"
              className="icon__logo"
              onClick={() => setIsBurgerMenuActive(false)}
            >
              <img
                src={cartImage}
                alt="Cart"
                className="burger-icon__logo-img burger-icon__logo-img--burger"
              />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
