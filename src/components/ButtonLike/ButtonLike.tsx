import { useContext } from 'react';
import like from '../../assets/icons/Favourites.svg';
import likeFilled from '../../assets/icons/Favourites-filled.svg';
import { AppContext } from '../AppContext/AppContext';
import { AppContextType } from '../../types/AppContextType';

type Props = {
  itemId: string;
};

export const ButtonLike: React.FC<Props> = ({ itemId }) => {
  const { toggleFavouriteArr, favouriteArr } = useContext(
    AppContext,
  ) as AppContextType;

  const isActive = favouriteArr.includes(itemId);

  const handleClick = () => {
    toggleFavouriteArr(itemId);
  };

  return (
    <button type="button" className="button__like" onClick={handleClick}>
      <img className="icon" src={!isActive ? like : likeFilled} alt="like" />
    </button>
  );
};
