import { HashLoader } from 'react-spinners';
import { HeaderPage } from '../../widgets';
import { SocialsCard } from './components/SocialsCard';
import { useGetSocials } from './service/query/useGetSocials';
import { SocialFromModal } from './SocialFromModal';
import { useState } from 'react';
import { useDeleteSocials } from './service/mutation/useDeleteSocials';
import { message } from 'antd';

export const Socials = () => {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<{ id: number; link: string; name: string } | null>(null); // <{ id: number; link: string; name: string }> ga type berish
  const { mutate: deleteScial } = useDeleteSocials();


  const handelOpen = () => {
    setOpen(true);
  };
  
  const handelClose = () => {
    setOpen(false);
    setRecord(null);
  };


  //edit btn
  const handelEdit = (record: { id: number; link: string; name: string }) => {
    setOpen(false);
    setRecord(record);
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

  const { data, isLoading, refetch } = useGetSocials(); // refech--- restart qilish uchun

  return (
    <div>
      <HeaderPage title="Socials" description="" onClick={handelOpen} />

      <div>
        {isLoading ? (
          <HashLoader
            size={80}
            color="#1077ff"
            className=" absolute top-[170px]  left-[47%] h-[100vh]"
          />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {data?.socials?.map((social: { id: number; link: string; name: string }) => (
              <SocialsCard
                key={social.id}
                name={social.name}
                link={social.link}
                onEdit={() => handelEdit(social)}
                onDelete={() => hadelDelete(social.id)}
              />
            ))}
          </div>
        )}
      </div>
      <SocialFromModal record={record} refetch={refetch} open={open} onClose={handelClose} />
    </div>
  );
};
