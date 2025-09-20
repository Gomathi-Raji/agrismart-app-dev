import { Product, CartItem, Order } from '@/types/marketplace';

// Cart Management
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Product, quantity: number = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const updateCartItem = (productId: string, quantity: number) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};

// Order Management
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

export const createOrder = (orderData: Omit<Order, 'id' | 'orderDate'>) => {
  const orders = getOrders();
  const newOrder: Order = {
    ...orderData,
    id: `ORD${Date.now()}`,
    orderDate: new Date().toISOString(),
  };
  
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  clearCart(); // Clear the cart after successful order
  return newOrder;
};

export const updateOrder = (orderId: string, updates: Partial<Order>) => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex >= 0) {
    orders[orderIndex] = { ...orders[orderIndex], ...updates };
    localStorage.setItem('orders', JSON.stringify(orders));
    return orders[orderIndex];
  }
  return null;
};

export const cancelOrder = (orderId: string) => {
  return updateOrder(orderId, { 
    status: 'cancelled',
    deliveryDate: undefined 
  });
};

// Cart Calculations
export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Order Status
export const getOrderStatus = (order: Order) => {
  const statusColors = {
    pending: 'bg-yellow-500',
    confirmed: 'bg-blue-500',
    shipped: 'bg-purple-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500'
  };

  return {
    color: statusColors[order.status],
    label: order.status.charAt(0).toUpperCase() + order.status.slice(1)
  };
};