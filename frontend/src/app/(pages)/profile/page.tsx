"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { Row, Col, Card, Typography, List, Avatar } from 'antd';

const { Title, Paragraph } = Typography;

export default function Profile() {
    const { data, error } = useSWR("/auth/users/me", fetcher);

    if (error) return <div>Failed to load user data.</div>;
    if (!data) return <div>Loading...</div>;

    let user;
    try {
        user = typeof data === 'string' ? JSON.parse(data) : data;
    } catch (e) {
        console.error('Failed to parse user data:', e);
        return <div>Failed to parse user data.</div>;
    }

    console.log('User data:', user);

    if (!user.first_name || !user.last_name) {
        console.warn('Nome não disponível. Dados do usuário:', user);
    }

    return (
        <Row justify="center" style={{ padding: 20 }}>
        <Col xs={24} sm={20} md={16} lg={24}>
          <Card>
            <Row justify="center" style={{ textAlign: 'center', marginBottom: 20 }}>
              <Avatar size={100} src="https://via.placeholder.com/150" />
              <div style={{ marginLeft: 20 }}>
                <Title level={2}>{user.first_name}</Title>
                <Title level={4}>{user.last_name}</Title>
                <Paragraph>
                    Ingressante no mundo dos investimentos, almejando alcançar a independência
                    financeira.
                </Paragraph>
              </div>
            </Row>
  
            <Title level={3}>Dados de usuário</Title>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={[user]}
              style={{ width: '100%'}}
              renderItem={item => (
                <List.Item style={{ display: 'flex', flexDirection: 'column'}}>
                    <Card>
                        <b>Usuário: </b>{item.username}  <br />
                        <b>E-mail: </b>{item.email} <br />
                        <b>Nome completo: </b>{item.first_name} {item.last_name}
                    </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      );
    };