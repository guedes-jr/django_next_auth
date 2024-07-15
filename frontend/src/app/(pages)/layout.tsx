"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Layoout.module.css";
import React, { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Breadcrumb, Avatar, Dropdown, Space } from 'antd';
import Link from "next/link";
import { Inter } from "next/font/google";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });
type MenuItem = Required<MenuProps>['items'][number];

const { Header, Sider, Content } = Layout;
const menuItems: MenuItem[] = [
  {
    key: 'home',
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <AppstoreOutlined />
  },
  {
    key: 'config',
    label: ' Configurações',
    icon: <SettingOutlined />,
    children: [
      { key: '1', label: <Link href="/usuarios">Usuários</Link>, icon: <UsergroupAddOutlined /> },
    ],
  },
];

const dropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link href="/perfil">
        Ver Perfil
      </Link>
    ),
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout, removeTokens } = AuthActions();
  const [collapsed, setCollapsed] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [current, setCurrent] = useState('1');
  const pathname = usePathname();
  const router = useRouter();
  const { data, error } = useSWR("/auth/users/me", fetcher);

  if (error) return <div>Failed to load user data.</div>;
  if (!data) return <Loading />;

  let user;
  try {
    user = typeof data === 'string' ? JSON.parse(data) : data;
  } catch (e) {
    console.error('Failed to parse user data:', e);
    return <div>Failed to parse user data.</div>;
  }

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();
        router.push("/");
      })
      .catch(() => {
        removeTokens();
        router.push("/");
      });
  };

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme={user.theme}
              onClick={onClick}
              defaultOpenKeys={['sub1']}
              selectedKeys={[current]}
              mode="inline"
              items={menuItems}
              style={{ height: '100vh'}}
            />
          </Sider>
          <Layout>
            <Header style={{ 
              padding: 0, 
              background: colorBgContainer, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className={styles.button}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: '2rem'}}>
                <h3>
                 {user.first_name + ' ' + user.last_name}
                </h3>
                <Dropdown overlay={<Menu items={dropdownItems} />} placement="bottomRight" arrow>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar src={user.profile_image ? user.profile_image : '/media/profile-default.png'} />
                    </Space>
                  </a>
                </Dropdown>
                <Button
                  icon={<LogoutOutlined />}
                  loading={loadings[2]}
                  onClick={handleLogout}
                />
              </div>
            </Header>
            <Breadcrumb style={{ margin: '5px 15px 0' }}>
              <Breadcrumb.Item>{pathname}</Breadcrumb.Item>
            </Breadcrumb>
            <Content className={styles.content}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
