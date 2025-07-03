import { Button, Card, Typography } from 'antd';
import { DeleteIcon, Edit2Icon } from 'lucide-react';

interface Props {
  skill_id?: number;
  name: string;
  description?: string;
  onEdit: (record) => void;
  onDelete: () => void;
}

export const SkillsCard = ({ name, description, onDelete, onEdit }: Props) => {
  return (
    <Card>
      <Typography.Title>{name}</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
      <div className="flex gap-2 items-center">
        <Button onClick={onEdit} className="flex items-center gap-3" >
          Edit
          <Edit2Icon size={18} />{' '}
        </Button>
        <Button onClick={onDelete} className="flex items-center gap-3">
          Delet <DeleteIcon />
        </Button>
      </div>
    </Card>
  );
};
