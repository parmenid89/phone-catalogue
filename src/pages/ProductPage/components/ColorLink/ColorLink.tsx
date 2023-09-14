import { Link } from 'react-router-dom';

interface ColorsHex {
  spacegray: '#4c4c4c';
  gold: '#fcdbc1';
  silver: '#f0f0f0';
  midnightgreen: '#5f7170';
  black: '#1F2020';
  green: '#5bc236';
  yellow: '#ffe983';
  white: '#F9F6EF';
  purple: '#B8AFE6';
  red: '#BA0C2E';
}

const colorsHex: ColorsHex = {
  spacegray: '#4c4c4c',
  gold: '#fcdbc1',
  silver: '#f0f0f0',
  midnightgreen: '#5f7170',
  black: '#1F2020',
  green: '#5bc236',
  yellow: '#ffe983',
  white: '#F9F6EF',
  purple: '#B8AFE6',
  red: '#BA0C2E',
};

const setHexColor = (color: string) => {
  if (color in colorsHex) {
    return colorsHex[color as keyof ColorsHex];
  }

  return color;
};

type Props = {
  color: string;
  prodColor: string;
  changedId: (newColor: string) => string;
};

export const ColorLink: React.FC<Props> = ({
  color,
  prodColor,
  changedId,
}) => {
  return (
    <Link to={`../${changedId(color)}`}>
      <div className="product__colors-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            rx="14"
            fill={`${setHexColor(color)}`}
            stroke="white"
            strokeWidth="2"
          />
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="15.5"
            stroke={prodColor === color ? '#0F0F11' : 'E2E6E9'}
          />
        </svg>
      </div>
    </Link>
  );
};
