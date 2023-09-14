import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import close from '../../../../assets/icons/Close.svg';
import minus from '../../../../assets/icons/Minus.svg';
import plus from '../../../../assets/icons/Plus.svg';

import { AppContext } from '../../../../components/AppContext/AppContext';
import { Phone } from '../../../../types/Phone';
import { getImgUrl } from '../../../../api/products';

type Props = {
  product: Phone;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const { changeOrderItemQuantity, toggleCartItem } = useContext(AppContext);

  const [number, setNumber] = useState(quantity);

  useEffect(() => {
    changeOrderItemQuantity(number, product.itemId);
  }, [number]);

  return (
    <li className="cart__item">
      <div className="cart__item-info">
        <button
          type="button"
          className="cart__item-delete"
          onClick={() => toggleCartItem(product.itemId)}
        >
          <img src={close} alt="Close" />
        </button>

        <Link to={`../${product.category}/${product.itemId}`}>
          <img
            className="cart__item-img"
            src={getImgUrl(product.image)}
            alt={product.name}
          />
        </Link>

        <Link to={`../${product.category}/${product.itemId}`}>
          <h3 className="cart__item-title">{product.name}</h3>
        </Link>
      </div>

      <div className="cart__item-total">
        <div className="cart__item-btns">
          <button
            type="button"
            className="cart__item-btn"
            onClick={() => setNumber((prev) => prev - 1)}
            disabled={number === 1}
          >
            <img src={minus} alt="decrement" />
          </button>

          <p className="cart__item-number">{number}</p>

          <button
            type="button"
            className="cart__item-btn"
            onClick={() => setNumber((prev) => prev + 1)}
          >
            <img src={plus} alt="increment" />
          </button>
        </div>

        <h3 className="cart__item-price">{`$${product.price}`}</h3>
      </div>
    </li>
  );
};
