import { ReactNode } from "react";
import { MobileHeader } from "./MobileHeader";
import { Footer } from "./Footer";
import { BottomNavigation } from "./BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileHeader />
      <main className={`flex-1 ${isMobile ? 'pb-20' : ''}`}>
        {children}
      </main>
      {!hideFooter && !isMobile && <Footer />}
      <BottomNavigation />
    </div>
  );
}