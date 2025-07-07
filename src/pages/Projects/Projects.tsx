// import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { useState } from 'react';
import { HeaderPage } from '../../widgets';
import { ProjectModal } from './ProjectModal';
import { useDeleteProjects } from './service/mutation/useDeleteProjects';
import { message } from 'antd';
import { useGetProjects } from './service/query/useGetProject';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { HashLoader } from 'react-spinners';

export const Projects = () => {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<{
    id: number;
    link: string;
    name: string;
    description: string;
    skills: [];
  } | null>(null); // <{ id: number; link: string; name: string }> ga type berish
  const { mutate: deleteScial } = useDeleteProjects();

  const handelOpen = () => {
    setOpen(true);
  };

  const handelClose = () => {
    setOpen(false);
    setRecord(null);
  };

  //edit btn
  const handelEdit = (record: {
    id: number;
    link: string;
    title: string;
    description: string;
    skills: [];
  }) => {
    setOpen(false);
    setRecord(record?)
  };

  //delete btn
  const hadelDelete = (id: number) => {
    deleteScial(id, {
      onSuccess: () => {
        message.info('Social deleted');
        refetch();
      },
    });
  };

  const { data, isLoading, refetch } = useGetProjects(); // refech--- restart qilish uchun

  return (
    <div>
      <HeaderPage title="Porjects" description="" onClick={handelOpen} />

      <div>
        {isLoading ? (
          <HashLoader
            size={80}
            color="#1077ff"
            className=" absolute top-[170px]  left-[47%] h-[100vh]"
          />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {data?.socials?.map(
              (projects: {
                id: number;
                title: string;
                link: string;
                description: string;
                skills: [];
              }) => (
                <ProjectCard
                  key={projects.id}
                  title={projects.title}
                  linkOne={projects.link}
                  description={projects.description}
                  onEdit={() => handelEdit(projects)}
                  onDelete={() => hadelDelete(projects.id)}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* <div className="w-full grid grid-cols-3 gap-3 ">
        {Array.from({ length: 8 }).map(() => {
          return (
            <ProjectCard
              title=" 🚀 JustRobotics"
              description=" JustRobotics — твой проводник в мир технологий и искусства. Получите бесплатное первое
          занятие уже сегодня!"
              linkOne="https://roblox-h3gf.vercel.app/"
              linkTwo="https://github.com/Javoxirbek2408/Roblox-"
            />
          );
        })}


     
      </div> */}
      <ProjectModal record={record} refetch={refetch} open={open} onClose={handelClose} />
    </div>
  );
};
