import { Order } from './Order';
import { Phone } from './Phone';
import { Quantities } from './Quantities';

export interface AppContextType {
  activeLink: string;
  isBurgerMenuActive: boolean;
  setIsBurgerMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
  products: Phone[];
  setProducts: React.Dispatch<React.SetStateAction<Phone[]>>;
  cart: Order[];
  toggleCartItem: (id: string) => void;
  changeOrderItemQuantity: (value: number, prodId: string) => void;
  favouriteArr: string[];
  setFavouriteArr: (value: string[]) => void;
  toggleFavouriteArr: (id: string) => void;
  quantities: Quantities | null;
  totalCartQuantity: number;
  totalPrice: number;
  cartProducts: Phone[];
  cleanCart: () => void;
}
