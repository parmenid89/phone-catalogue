import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../../components/Button';
import { ButtonBack } from '../../components/ButtonBack';
import { AppContext } from '../../components/AppContext/AppContext';
import { AppContextType } from '../../types/AppContextType';
import { CartItem } from './components/CartItem';
import { EmptyValueComponent } from '../../components/EmptyValueComponent';
import { Modal } from '../../components/Modal';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartProducts,
    totalCartQuantity,
    totalPrice,
    cleanCart,
  } = useContext(AppContext) as AppContextType;

  const [modalIsActive, setModalIsActive] = useState(false);

  const navigate = useNavigate();

  const checkoutHandler = () => {
    setModalIsActive(true);

    setTimeout(() => {
      cleanCart();
      setModalIsActive(false);
      navigate('/home');
    }, 5000);
  };

  return (
    <div className="cart">
      {modalIsActive && <Modal />}
      <ButtonBack />

      <h1 className="cart__title">Cart</h1>

      <div className="cart__content">
        <ul className="cart__list">
          {cartProducts.length ? (
            cartProducts.map((product) => {
              const currentOrder = cart.find(
                (order) => product.itemId === order.productId,
              );

              return (
                <CartItem
                  key={product.itemId}
                  product={product}
                  quantity={currentOrder?.quantity || 1}
                />
              );
            })
          ) : (
            <EmptyValueComponent />
          )}
        </ul>

        {cart.length > 0 && (
          <div className="cart__info">
            <div className="cart__info-price">
              <h2 className="cart__info-value">{`$${totalPrice}`}</h2>

              <p className="cart__info-label">
                {`Total for ${totalCartQuantity} items`}
              </p>
            </div>

            <div className="cart__buybutton">
              <Button text="Checkout" handler={checkoutHandler} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
