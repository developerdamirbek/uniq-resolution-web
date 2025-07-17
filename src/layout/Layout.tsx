import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Typography } from 'antd';
import {
  Building2Icon,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export const MainLayout = () => {

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <Building2Icon />,
      label: <Link to="/">Companies</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen font-poppins">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="shadow-lg fixed z-10 h-screen w-[500px] "
      >
        <div className="p-4 text-center ">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 mb-4">
            {collapsed ? (
              <Title level={4} className="!text-white !mb-0">
                UR
              </Title>
            ) : (
              <Title level={4} className="!text-white !mb-0">
                UNIQ RESOLUTION
              </Title>
            )}
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-none bg-transparent !font-poppins "
          style={{
            background: 'transparent',
          }}
        />


        {!collapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-white/80 text-xs font-poppins">By Damirbek</div>
            </div>
          </div>
        )}
      </Sider>

      <Layout>
        <Header
          className={` shadow-sm  w-full fixed z-10 px-5 flex items-center justify-between transition-all duration-300 `}
        >
          <div className="flex items-center gap-4">
            <Button
              type="text"
              onClick={() => setCollapsed(!collapsed)}
              className="!bg-white/20 !p-0 !w-9 !h-9 !flex !items-center !justify-center !text-white hover:bg-gray-100 transition-colors"
            >
              {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            </Button>
          </div>
        </Header>

        <Content className="overflow-y-auto h-[100vh]">
          <div className="min-h-[calc(100vh-150px)] mt-[65px] overflow-hidden p-4 s">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
