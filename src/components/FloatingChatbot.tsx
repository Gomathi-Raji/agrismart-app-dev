import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function FloatingChatbot() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <Button
      onClick={() => navigate('/chatbot')}
      className={`fixed right-6 z-50 w-14 h-14 rounded-full shadow-elegant bg-gradient-primary text-primary-foreground hover:scale-110 transition-all duration-300 ${
        isMobile ? 'bottom-24' : 'bottom-6'
      }`}
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
}