import { useAuthStore } from '../../store/auth';
import { HeaderPage } from '../../widgets';

export const Home = () => {
  const { userDetails } = useAuthStore();

  console.log('User Details:', userDetails);

  return (
    <div>
      {' '}
      <HeaderPage title="Home" description="asdjasd" />
    </div>
  );
};
