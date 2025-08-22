export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
  description: string;
  imageUrl: string;
  imageHint: string;
  inStock: boolean;
  customizable: boolean;
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  table: number;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled';
};

export type Review = {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  text: string;
  date: string;
};
