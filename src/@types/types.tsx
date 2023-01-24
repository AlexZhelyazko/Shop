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
export interface ICatalog {
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
}

export type CartProduct = {
  count: number;
  img: string;
  selectValue: string;
  title: string;
};

export interface ICartProducts {
  cartItems: CartProduct[];
}
