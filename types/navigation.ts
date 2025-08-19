export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { 
    name: string;
    category: string;
    price: number;
    description: string; 
    imageUri?: string;
  };
};
