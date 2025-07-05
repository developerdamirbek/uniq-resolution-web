import { Button } from 'antd';
import { DeleteIcon, Edit2Icon } from 'lucide-react';

interface SocialsProps {
  name: string;
  link: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SocialsCard = ({ name, link, onEdit, onDelete }: SocialsProps) => {
  return (
    <div className="border-2 border-gray-200 p-4 rounded-xl bg-white flex gap-4 justify-between">
      <div>
        <h1 className="mb-2">{name}</h1>
        <a href={link}>{link}</a>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={onEdit}>
          <Edit2Icon />
        </Button>
        <Button onClick={onDelete}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};
