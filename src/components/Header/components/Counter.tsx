type Props = {
  num: number;
};

export const Counter: React.FC<Props> = ({ num }) => {
  return (
    <div className="counter">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <circle cx="7" cy="7" r="6.5" fill="#F447AF" stroke="white" />
      </svg>
      <span className="counter__value">{num}</span>
    </div>
  );
};
