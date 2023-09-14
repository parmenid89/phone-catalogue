import React, { useEffect, useState } from 'react';
import { AppContextType } from '../../types/AppContextType';
import { Phone } from '../../types/Phone';
import { useLocalStarage } from '../../hooks/useLocalStorage';
import { Order } from '../../types/Order';
import { getQuantities } from '../../api/products';
import { Quantities } from '../../types/Quantities';
import { getDetailsByIdsArr } from '../../api/details';

export const AppContext = React.createContext<AppContextType>({
  activeLink: '',
  setActiveLink: () => {},
  isBurgerMenuActive: false,
  setIsBurgerMenuActive: () => {},
  products: [],
  setProducts: () => {},
  cart: [],
  toggleCartItem: () => {},
  changeOrderItemQuantity: () => {},
  favouriteArr: [],
  setFavouriteArr: () => {},
  toggleFavouriteArr: () => {},
  quantities: null,
  totalCartQuantity: 0,
  totalPrice: 0,
  cartProducts: [],
  cleanCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [activeLink, setActiveLink] = useState('');
  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);
  const [products, setProducts] = useState<Phone[]>([]);
  const [favouriteArr, setFavouriteArr] = useLocalStarage<string[]>(
    'favPhone',
    [],
  );

  const [quantities, setQuantities] = useState<Quantities | null>(null);
  const [cart, setCart] = useLocalStarage<Order[]>('cart', []);
  const [cartProducts, setCartProducts] = useState<Phone[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  function calculateTotalPrice() {
    let total = 0;

    cart.forEach((order) => {
      const product = cartProducts.find(
        (prod) => prod.itemId === order.productId,
      );

      if (product) {
        total += order.quantity * (product.price || product.fullPrice);
      }
    });

    return total;
  }

  useEffect(() => {
    getQuantities<Quantities>().then(setQuantities);
  }, [products]);

  useEffect(() => {
    const idsArr = cart.map((order) => order.productId);

    getDetailsByIdsArr<Phone[]>(idsArr)
      .then(setCartProducts)
      .then(() => setTotalPrice(calculateTotalPrice()));
  }, [cart]);

  const toggleFavouriteArr = (id: string) => {
    if (!favouriteArr.includes(id)) {
      setFavouriteArr([...favouriteArr, id]);
    } else {
      setFavouriteArr(favouriteArr.filter((phoneId: string) => id !== phoneId));
    }
  };

  const toggleCartItem = (id: string) => {
    const findedProduct = cart.find((order) => order.productId === id);

    if (findedProduct) {
      setCart(cart.filter((order) => order.productId !== id));

      return;
    }

    setCart([...cart, { productId: id, quantity: 1 }]);
  };

  const changeOrderItemQuantity = (value: number, prodId: string) => {
    setCart(
      cart.map((orderItem) => {
        const { productId } = orderItem;

        if (productId === prodId) {
          return {
            productId,
            quantity: value,
          };
        }

        return orderItem;
      }),
    );
  };

  const cleanCart = () => setCart([]);

  const totalCartQuantity
    = cart.reduce((a: number, b: Order) => a + b.quantity, 0) || 0;

  return (
    <AppContext.Provider
      value={{
        isBurgerMenuActive,
        setIsBurgerMenuActive,
        activeLink,
        setActiveLink,
        products,
        setProducts,
        favouriteArr,
        setFavouriteArr,
        toggleFavouriteArr,
        cart,
        toggleCartItem,
        changeOrderItemQuantity,
        quantities,
        totalCartQuantity,
        totalPrice,
        cartProducts,
        cleanCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
