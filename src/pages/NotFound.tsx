import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Leaf } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <Card className="max-w-md w-full shadow-elegant">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <img 
            src="/lovable-uploads/logo.png" 
            alt="AgriSmart Logo" 
            className="w-16 h-16 object-contain mx-auto mb-6"
          />
          
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The agricultural resource you're looking for seems to have wandered off to the fields.
          </p>
          
          <div className="space-y-4">
            <Button 
              variant="hero" 
              className="w-full" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = "/"}
            >
              <Home className="mr-2 h-4 w-4" />
              Return to AgriSmart Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
