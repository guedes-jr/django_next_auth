"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import styles from "./Layoout.module.css"
import React, { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  SettingOutlined,
  PoweroffOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Switch } from 'antd';
import Link from "next/link";
import { Inter } from "next/font/google";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data: user } = useSWR("/auth/users/me", fetcher);
  const { logout, removeTokens } = AuthActions();
  const [collapsed, setCollapsed] = useState(false);
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [myTheme, setMyTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value: boolean) => {
    setMyTheme(value ? 'dark' : 'light');
  };

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
              theme={myTheme}
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
             <Link href="/profile">{JSON.stringify(user)}</Link>
              
              <Switch
                checked={myTheme === 'dark'}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
              <Button
                type="primary"
                icon={<PoweroffOutlined />}
                loading={loadings[2]}
                onClick={handleLogout}
              />
            </Header>
            <Content className={styles.content}>
            {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}