/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { AppContextType } from '../../types/AppContextType';
import logoImage from '../../assets/img/Logo.png';
import likeImage from '../../assets/icons/Favourites.svg';
import cartImage from '../../assets/icons/Shopping-cart.svg';
import menuImage from '../../assets/icons/Burger-menu.svg';
import { AppContext } from '../AppContext/AppContext';
import { BurgerMenu } from '../BurgerMenu';
import { Counter } from './components';

const buildClassnames = ({ isActive }: { isActive: boolean }): string => {
  return cn('link', 'nav__link', {
    'nav__is-active': isActive,
  });
};

export const Header: React.FC = () => {
  const context = useContext(AppContext) as AppContextType;
  const { isBurgerMenuActive, setIsBurgerMenuActive } = context;

  if (isBurgerMenuActive) {
    return <BurgerMenu />;
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container--left">
          <NavLink to="/" className="header__logo">
            <img
              src={logoImage}
              alt="NICE gadgets"
              className="header__logo-img "
            />
          </NavLink>

          <nav>
            <div className="nav">
              <ul className="nav__list">
                <li>
                  <NavLink to="home" className={buildClassnames}>
                    Home
                  </NavLink>
                </li>
                <li className="nav__wraper">
                  <NavLink to="phones" className={buildClassnames}>
                    Phones
                  </NavLink>
                </li>
                <li className="nav__wraper">
                  <NavLink to="tablets" className={buildClassnames}>
                    Tablets
                  </NavLink>
                </li>
                <li className="nav__wraper">
                  <NavLink to="accessories" className={buildClassnames}>
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="icon">
          <NavLink
            to="favorites"
            className={({ isActive }) => {
              return cn(
                'icon__left',
                'icon__left--borders',
                'icon__left--invisible',
                {
                  'icon__left--active': isActive,
                },
              );
            }}
          >
            <span className="icon__logo">
              <img
                src={likeImage}
                alt="favourites"
                className="icon__logo-img icon__logo-img--margins"
              />
              {context.favouriteArr.length !== 0 && (
                <Counter num={context.favouriteArr.length} />
              )}
            </span>
          </NavLink>

          <NavLink
            to="cart"
            className={({ isActive }) => {
              return cn('icon__right', 'icon__right--invisible', {
                'icon__left--active': isActive,
              });
            }}
          >
            <span className="icon__logo">
              <img
                src={cartImage}
                alt="Cart"
                className="icon__logo-img icon__logo-img--margins"
              />
              {context.totalCartQuantity !== 0 && (
                <Counter num={context.totalCartQuantity} />
              )}
            </span>
          </NavLink>

          <div
            className="icon__burger"
            onClick={() => setIsBurgerMenuActive(true)}
          >
            <button type="button" className="icon__logo">
              <img src={menuImage} alt="Menu" className="icon__logo-img" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
