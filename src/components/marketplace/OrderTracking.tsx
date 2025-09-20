import { useEffect, useState } from 'react';
import { Order } from '@/types/marketplace';
import { getOrders, getOrderStatus, cancelOrder } from '@/lib/marketplace';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  Truck,
  CalendarClock,
  MapPin,
  Phone,
  XCircle,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function OrderTracking() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = () => {
      const savedOrders = getOrders();
      setOrders(savedOrders.sort((a, b) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      ));
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId: string) => {
    const updatedOrder = cancelOrder(orderId);
    if (updatedOrder) {
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      toast({
        title: "Order cancelled",
        description: `Order ${orderId} has been cancelled`,
      });
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
        <p className="text-muted-foreground">
          Your order history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Order #{order.id}</CardTitle>
                <CardDescription>
                  Placed on {new Date(order.orderDate).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge
                className={getOrderStatus(order).color}
              >
                {getOrderStatus(order).label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-2 text-sm">
                <div className="font-medium">Delivery Details</div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {order.shippingAddress.address}, {order.shippingAddress.city},
                      {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                  {order.deliveryDate && (
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4" />
                      <span>Expected delivery by {new Date(order.deliveryDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {order.status === 'pending' && (
                <Button
                  variant="destructive"
                  onClick={() => handleCancelOrder(order.id)}
                  className="w-full sm:w-auto"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Order
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}