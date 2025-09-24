export type IProduct = {
  id: number;
  name: string;
  price: number;
  storeId: number;
  embedding: number[] | null;
  store: {
    id: number;
    name: string;
  }
};

export type ICart = {
  id: number
  user_id: number
  create_at: number
  store_id: number
  active: boolean
  items: {
    id: number
    quantity: number
    name: string
    price: number
  }[]
}
