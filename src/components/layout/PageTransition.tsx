import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Skip animation for initial load
    if (location.key === "default") return;
    
    setIsLoading(true);
    setShowContent(false);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(contentTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Loading overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-300",
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center animate-bounce shadow-lg">
              <Wrench className="w-8 h-8 text-primary-foreground animate-spin" style={{ animationDuration: "2s" }} />
            </div>
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-xl animate-pulse" />
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "transition-all duration-300",
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        {children}
      </div>
    </>
  );
};
