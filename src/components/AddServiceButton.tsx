import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddServiceButtonProps {
  onClick: () => void;
}

export const AddServiceButton = ({ onClick }: AddServiceButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg-orange hover:scale-110 transition-transform z-50 bg-emerald-500 hover:bg-emerald-600 text-white"
    >
      <Plus className="w-8 h-8" />
    </Button>
  );
};