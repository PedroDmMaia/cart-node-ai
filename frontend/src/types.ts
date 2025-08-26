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

// export types 
