"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css"
import React, { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Switch, Flex } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

const { Header, Sider, Content } = Layout;
const menuItems: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];


export default function Home() {
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
          <h3>{user?.username}</h3>
          {user?.email}
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
