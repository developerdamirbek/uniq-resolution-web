import { Button, Card, Typography } from 'antd';
import { DeleteIcon, Edit2Icon } from 'lucide-react';

export const SkillsCard = () => {
  return (
    <Card>
      <Typography.Title>Yuser Names</Typography.Title>
      <Typography.Paragraph>Description</Typography.Paragraph>
      <div className="flex gap-2 items-center">
        <Button className="flex items-center gap-3" >
          Edit
          <Edit2Icon size={18} />{' '}
        </Button>
        <Button className="flex items-center gap-3">
          Delet <DeleteIcon />
        </Button>
      </div>
    </Card>
  );
};
