import { Button, Card, Image, Tag, Typography } from 'antd';
import { Delete, Edit3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface PropsProjectCard {
  title: string;
  description: string;
  cards: string;
  linkOne: string;
  linkTwo: string;
}

export const ProjectCard = ({ title, description, cards, linkOne, linkTwo }: PropsProjectCard) => {
  return (
    <div className="w-[400px]">
      <Card className="flex flex-col ">
        <Image src="https://t3.ftcdn.net/jpg/02/91/48/88/360_F_291488885_qixkTeKtQcuov4obw7VXJ5dwjwI9LKK2.jpg" />
        <Typography.Title>{title} </Typography.Title>
        <Typography.Paragraph> ✍️ {description}</Typography.Paragraph>
        <Typography.Text>💻 Desktop View ✅ 📱 Mobile View ✅</Typography.Text>
        <br />
        {cards}
        <div className="flex gap-4 mt-4">
          <Button>
            <NavLink to={linkOne} target="_black">
              🔗 Live Demo: ✋
            </NavLink>
          </Button>
          <Button className={'!w-100px'}>
            <NavLink to={linkTwo} target="_black">
              💻 GitHub
            </NavLink>
          </Button>
        </div>
        <div className="mt-4">
          <Tag className="cursor-pointer">React</Tag>
          <Tag className="cursor-pointer">JavaScript</Tag>
          <Tag className="cursor-pointer">Shadcn</Tag>
          <Tag className="cursor-pointer">Tailwind</Tag>
        </div>
        <div className="flex gap-3 justify-end mt-4">
          <Button>
            <Edit3 size={16} />
          </Button>
          <Button>
            <Delete size={16} />
          </Button>
        </div>
      </Card>
    </div>
  );
};
