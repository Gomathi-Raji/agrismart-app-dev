export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'seeds' | 'fertilizers' | 'tools' | 'pesticides' | 'equipment' | 'other';
  image: string;
  stock: number;
  rating?: number;
  seller: string;
  unit: string; // kg, piece, litre, etc.
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: 'cod' | 'online' | 'upi';
  paymentStatus: 'pending' | 'completed' | 'failed';
  trackingId?: string;
}