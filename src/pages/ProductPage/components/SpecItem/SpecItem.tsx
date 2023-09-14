type Props = {
  name: string;
  value: string;
};
export const SpecItem: React.FC<Props> = ({ name, value }) => {
  return (
    <li className="product__specs-item">
      <span className="product__specs-item--name">{name}</span>
      {value}
    </li>
  );
};
