import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-feature flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/logo.png" 
              alt="AgriSmart Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-2xl text-primary">AgriSmart</span>
          </Link>
          <p className="text-muted-foreground">
            {isSignUp ? "Create your account" : "Welcome back"}
          </p>
        </div>

        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle>
              {isSignUp ? "Sign Up" : "Sign In"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSignUp ? (
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "w-full",
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                    footerActionLink: "text-primary hover:text-primary/90"
                  }
                }}
                redirectUrl="/user-profile"
              />
            ) : (
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none",
                    headerTitle: "hidden", 
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "w-full",
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                    footerActionLink: "text-primary hover:text-primary/90"
                  }
                }}
                redirectUrl="/user-profile"
              />
            )}
            
            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-muted-foreground"
              >
                {isSignUp 
                  ? "Already have an account? Sign In" 
                  : "Don't have an account? Sign Up"
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}