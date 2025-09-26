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
  active: boolean
  total: number
  store: {
    id: number
    name: string
  }
  items: {
    id: number
    quantity: number
    name: string
    price: number
  }[]
}
