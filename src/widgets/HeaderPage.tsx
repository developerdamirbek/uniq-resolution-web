import { Button, Typography } from 'antd';
import { Plus } from 'lucide-react';

interface HeaderPageProps {
  title: string;
  description: string;
  onClick: () => void;
  
}
// const { Title } = Typography;

export const HeaderPage = ({ title, description, onClick }: HeaderPageProps) => {
  return (
    <div className="flex w-full justify-between items-center bg-white p-4 rounded-2xl mb-4">
      <div>
        <h1 className="font-bold text-[30px] leading-[120%] tracking-[-1%]">{title}</h1>
        <Typography className="font-normal text-base leading-[120%] tracking-[15%] uppercase">
          {description}
        </Typography>
      </div>
      <Button onClick={onClick} className="rounded-2xl  w-[140px] h-[150px] p-4  outline-none">
        <Plus className="mr-2 " />
        Add Skills
      </Button>
    </div>
  );
};
