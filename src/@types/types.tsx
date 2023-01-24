export interface IProduct {
  id: string;
  category: string;
  frontImageUrl: string;
  backImageUrl: string;
  title: string;
  price: string;
  color: string;
  description: string;
  size: string[];
}

export type CartProduct = {
  count: number;
  image: string;
  selectValue: string;
  title: string;
};

export interface ICartProducts {
  cartItems: CartProduct[];
}
