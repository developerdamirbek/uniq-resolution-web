import { AddModal } from '../../components/addModal';
import { useState } from 'react';
import { SkillsCard } from '../../components/SkillsCard';
import { HeaderPage } from '../../widgets';
import { useGetSkills } from './services/query/useGetSkills';
import { HashLoader } from 'react-spinners';
import type { SkillType } from '../../types/skills';

export const Skills = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [record, setRecord] = useState();

  console.log(record);

  const { data, isLoading } = useGetSkills();

  const openBtn = () => {
    setIsOpen(true);
  };

  const handleEdit = (record: any) => {
    setRecord(record);
    setIsOpen(true);
  };

  return (
    <div>
      <HeaderPage title="Skils" description="asdjasd" onClick={openBtn} />
      <AddModal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        record={record}
      />
      <div>{isLoading && <HashLoader loading={isLoading} />}</div>
      <div>
        {data?.map((skill: SkillType) => (
          <SkillsCard
            key={skill.id}
            name={skill.skill.name}
            description={skill.skill.description}
            onDelete={() => {}}
            onEdit={() => handleEdit(skill)}
          />
        ))}
      </div>
    </div>
  );
};
