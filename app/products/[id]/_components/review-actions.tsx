import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";

interface ReviewActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ReviewActions({ onEdit, onDelete }: ReviewActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button size="sm" variant="outline" onClick={onEdit}>
        <PencilIcon className="size-3" />
      </Button>
      <Button size="sm" variant="destructive" onClick={onDelete}>
        <Trash2Icon className="size-3" />
      </Button>
    </div>
  );
}