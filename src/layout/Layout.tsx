import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Layout, Menu, Button, Typography } from "antd"
import { ChartPie, FolderOpen, PanelLeftClose, PanelLeftOpen, Share2, Smile, UserRoundCog } from "lucide-react"
import { useAuthStore } from "../store/auth"

const { Header, Sider, Content } = Layout
const { Title } = Typography

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    window.location.href = "/auth"
  }

const menuItems = [
  {
    key: "/",
    icon: <ChartPie />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "/skills",
    icon: <UserRoundCog />,
    label: <Link to="/skills">Skills</Link>,
  },
  {
    key: "/socials",
    icon: <Share2 />,
    label: <Link to="/socials">Socials</Link>,
  },
  {
    key: "/projects",
    icon: <FolderOpen />,
    label: <Link to="/projects">Projects</Link>,
  },
  {
    key: "/logo",
    icon: <Smile />,
    label: <Link to="/logo">Logo</Link>,
  },
];


  return (
    <Layout className="min-h-screen font-poppins">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="shadow-lg h-screen"

      >
        <div className="p-4 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
            {collapsed ? (
              <Title level={4} className="!text-white !mb-0">
                A
              </Title>
            ) : (
              <Title level={4} className="!text-white !mb-0">
                Admin Panel
              </Title>
            )}
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-none bg-transparent !font-poppins"
          style={{
            background: "transparent",
          }}
        />

         {!collapsed && (
          <div onClick={
            handleLogout
          } className="absolute cursor-pointer bottom-[70px] left-4 right-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-white/80 text-xs font-poppins">Logout</div>
            </div>
          </div>
        )}

        {!collapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-white/80 text-xs font-poppins">Version 1.0.0</div>
            </div>
          </div>
        )}
      </Sider>

      <Layout>
        <Header className="shadow-sm !px-5 flex items-center justify-between">
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

        <Content className="">
          <div className="min-h-[calc(100vh-95px)] overflow-hidden p-4">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
