import { AddModal } from '../../components/addModal';
import { useState } from 'react';
import { SkillsCard } from '../../components/SkillsCard';
import { HeaderPage } from '../../widgets';

export const Skills = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openBtn = () => {
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
      />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map(() => {
          return <SkillsCard />;
        })}
      </div>
    </div>
  );
};
