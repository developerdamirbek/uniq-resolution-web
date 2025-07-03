// import { useEffect, useState } from 'react';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { HeaderPage } from '../../widgets';
// import { Alert } from 'antd';
// import { ServerProject } from './servise/serverProject';

// type serverProject = string

export const Projects = () => {
  // const [serverProject, setServerProject] = useState<serverProject[]>([]);

  // const { get } = ServerProject;

  // useEffect(() => {
  //   get()
  //     .then((res) => {
  //       setServerProject(res?.data || []);
  //     })
  //     .catch((error) => {
  //       Alert(error.messege);
  //     });
  // }, []);

  return (
    <div>
      <HeaderPage title="Porjects" description="asdjasd" />

      <div className="w-full grid grid-cols-3 gap-3 ">
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


        {/* {serverProject.map((serverProject, id)=>{
           <ProjectCard key={id}
         title={serverProject}
            />
        } )
        } */}
      </div>
    </div>
  );
};
