import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { HeaderPage } from '../../widgets';

export const Projects = () => {
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
          
            />
          );
        })}
      </div>
    </div>
  );
};
