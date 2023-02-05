export type IProduct = {
  id: string;
  category: string;
  frontImageUrl: string;
  backImageUrl: string;
  title: string;
  price: string;
  color: string;
  description: string;
  size: string[];
};

export type ICatalog = {
  status: string;
  filters: boolean;
  currentItem: any;
  items: IProduct[];
  filterItemByPrice: IProduct[];
  filterItemByColor: IProduct[];
  filterItemBySize: IProduct[];
  filterItemByCategory: IProduct[];
  filterItem: IProduct[];
  startPrice: number;
  finalPrice: number;
  notFoundItems: boolean;
  error: string | null;
};

export type CartProduct = {
  count: number;
  img: string;
  size?: string;
  title: string;
  price: string;
  color?: string;
  id: number;
};

export interface ICartProducts {
  cartItems: CartProduct[];
  totalPrice: number;
}

export type IUser = {
  email: string;
  name: string;
  role: string;
  avatar: string;
  basket: any;
  history: any;
  id: string | null;
};
