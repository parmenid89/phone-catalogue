import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { Button } from '../Button';
import { ButtonLike } from '../ButtonLike';
import { LineElement } from '../LineElement';
import { getImgUrl } from '../../api/products';

type Props = {
  phone: Phone;
};

export const CardItem: React.FC<Props> = ({ phone }) => {
  return (
    <div className="card">
      <Link
        to={`/${phone.category}/${phone.itemId}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <img
          src={getImgUrl(phone.image)}
          alt={phone.name}
          className="card__image"
        />
      </Link>

      <Link
        to={`/${phone.category}/${phone.itemId}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <h2 className="card__title">{phone.name}</h2>
      </Link>

      <div className="card__price">
        <>
          <span className="card__price--bold">{`$${phone.price}`}</span>
          {phone.fullPrice && (
            <span className="card__price--grey">{`$${phone.fullPrice}`}</span>
          )}
        </>
      </div>

      <LineElement />

      <div className="card__stats">
        <p className="card__stat">
          <span className="card__stat--name">Screen</span>
          <span className="card__stat--text">
            {phone.screen}
          </span>
        </p>
        <p className="card__stat">
          <span className="card__stat--name">Capacity</span>
          <span className="card__stat--text">
            {phone.capacity}
          </span>
        </p>
        <p className="card__stat">
          <span className="card__stat--name">RAM</span>
          <span className="card__stat--text">
            {phone.ram}
          </span>
        </p>
      </div>

      <div className="card__btns">
        <Button text="Add to cart" productId={phone.itemId} />
        <ButtonLike itemId={phone.itemId} />
      </div>
    </div>
  );
};
