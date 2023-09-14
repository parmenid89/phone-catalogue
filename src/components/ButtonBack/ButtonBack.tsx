import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/icons/Arrow-left.svg';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      className="back"
      onClick={() => navigate(-1)}
      type="button"
    >
      <img src={arrowLeft} alt="back" className="back-icon" />
      <span className="back-label">
        Back
      </span>
    </button>
  );
};
