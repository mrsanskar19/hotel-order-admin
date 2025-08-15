import type { MenuItem, Order, Review } from '@/types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Risotto',
    price: 24.5,
    category: 'Main Course',
    description: 'Creamy Arborio rice with black truffle, Parmesan, and a hint of white wine.',
    imageUrl: 'https://placehold.co/100x100.png',
    inStock: true,
  },
  {
    id: '2',
    name: 'Seared Scallops',
    price: 18.0,
    category: 'Appetizer',
    description: 'Pan-seared scallops with a lemon-butter sauce and fresh parsley.',
    imageUrl: 'https://placehold.co/100x100.png',
    inStock: true,
  },
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    price: 12.0,
    category: 'Dessert',
    description: 'Warm chocolate cake with a molten center, served with vanilla bean ice cream.',
    imageUrl: 'https://placehold.co/100x100.png',
    inStock: false,
  },
  {
    id: '4',
    name: 'Classic Mojito',
    price: 14.0,
    category: 'Beverage',
    description: 'A refreshing mix of white rum, fresh lime juice, mint, and soda water.',
    imageUrl: 'https://placehold.co/100x100.png',
    inStock: true,
  },
  {
    id: '5',
    name: 'Burrata Caprese',
    price: 16.5,
    category: 'Appetizer',
    description: 'Fresh burrata, heirloom tomatoes, basil, and a balsamic glaze.',
    imageUrl: 'https://placehold.co/100x100.png',
    inStock: true,
  },
  {
    id: '6',
    name: 'Filet Mignon',
    price: 45.0,
    category: 'Main Course',
    description: '8oz center-cut filet, grilled to perfection, with asparagus and mashed potatoes.',
    imageUrl: 'https://placehold.co/100x100.png',
    inStock: true,
  },
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    table: 3,
    items: [
      { id: '1', name: 'Truffle Risotto', quantity: 1, price: 24.5 },
      { id: '2', name: 'Seared Scallops', quantity: 1, price: 18.0 },
      { id: '4', name: 'Classic Mojito', quantity: 2, price: 14.0 },
    ],
    total: 70.5,
    status: 'Preparing',
  },
  {
    id: 'ORD-002',
    table: 5,
    items: [
      { id: '6', name: 'Filet Mignon', quantity: 2, price: 45.0 },
      { id: '5', name: 'Burrata Caprese', quantity: 1, price: 16.5 },
    ],
    total: 106.5,
    status: 'Pending',
  },
  {
    id: 'ORD-003',
    table: 1,
    items: [{ id: '3', name: 'Chocolate Lava Cake', quantity: 1, price: 12.0 }],
    total: 12.0,
    status: 'Completed',
  },
  {
    id: 'ORD-004',
    table: 8,
    items: [{ id: '1', name: 'Truffle Risotto', quantity: 1, price: 24.5 }],
    total: 24.5,
    status: 'Pending',
  },
  {
    id: 'ORD-005',
    table: 3,
    items: [{ id: '2', name: 'Seared Scallops', quantity: 1, price: 18.0 }],
    total: 18.0,
    status: 'Cancelled',
  },
];

export const reviews: Review[] = [
  {
    id: 'REV-001',
    author: 'Alice Johnson',
    avatarUrl: 'https://placehold.co/40x40.png',
    rating: 5,
    text: 'Absolutely phenomenal experience! The truffle risotto was to die for, and the service was impeccable. GastronomeOS is my new favorite spot!',
    date: '2 days ago',
  },
  {
    id: 'REV-002',
    author: 'Bob Williams',
    avatarUrl: 'https://placehold.co/40x40.png',
    rating: 4,
    text: "Great food and atmosphere. The filet mignon was cooked perfectly. It was a bit busy, so service was a little slow, but overall a fantastic night out. We'll be back.",
    date: '3 days ago',
  },
  {
    id: 'REV-003',
    author: 'Charlie Brown',
    avatarUrl: 'https://placehold.co/40x40.png',
    rating: 3,
    text: "The food was decent, but unfortunately, the Chocolate Lava Cake we wanted was out of stock. It was a bit of a letdown for my wife's birthday. The rest of the meal was okay.",
    date: '1 week ago',
  },
];
