import { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import { AppContext } from '../AppContext/AppContext';

type Props = {
  text: string;
  productId?: string;
  handler?: () => void;
};

export const Button: React.FC<Props> = ({
  text,
  productId,
  handler = () => {},
}) => {
  const { cart, toggleCartItem } = useContext(AppContext);
  const isAdded = cart.find((order) => order.productId === productId);

  return productId ? (
    <button
      className={cn('button', {
        'button--outlined': isAdded,
      })}
      type="button"
      onClick={() => toggleCartItem(productId)}
    >
      {!isAdded ? text : 'Added'}
    </button>
  ) : (
    <button className={cn('button')} type="button" onClick={handler}>
      {text}
    </button>
  );
};
