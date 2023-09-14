import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  capacity: string;
  prodCapacity: string;
  prodColor: string;
  changedId: (...arr: string[]) => string;
};

export const CapacityLink: React.FC<Props> = ({
  capacity,
  prodCapacity,
  prodColor,
  changedId,
}) => {
  return (
    <Link to={`../${changedId(capacity, prodColor)}`}>
      <div
        className={classNames('product__capacity-item', {
          active: prodCapacity === capacity,
        })}
      >
        {capacity}
      </div>
    </Link>
  );
};
