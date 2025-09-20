import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/marketplace';
import { addToCart } from '@/lib/marketplace';
import { useCart } from '@/contexts/CartContext';
import { Star, ShoppingCart, MinusCircle, PlusCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { setCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const updatedCart = addToCart(product, quantity);
    setCart(updatedCart);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
    setQuantity(1);
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">₹{product.price}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="text-sm text-muted-foreground">
          Seller: {product.seller}
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-accent/50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="flex-1"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}