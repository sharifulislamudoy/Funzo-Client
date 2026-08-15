export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};