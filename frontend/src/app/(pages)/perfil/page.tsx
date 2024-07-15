"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { Row, Col, Card, Typography, List, Avatar, Badge } from 'antd';

const { Title } = Typography;

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
        <Row style={{ padding: 20 }}>
        <Col xs={24} sm={20} md={16} lg={24}>
          <Card>
            <Row style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Avatar size={100} src={user.profile_image} style={{ textAlign: 'left'}}/>
              <div style={{ marginLeft: 20 }}>
              
              <Badge.Ribbon text={user.is_active ? (user.is_superuser ? "Super usuário": "Ativo") : "Desativado"} color={user.is_active ? (user.is_superuser ? "cyan": "gree") : "red"}>
                <Card title={"# "+user.id} size="small">
                  <Title level={2}>{user.first_name +' '+user.last_name}</Title>
                </Card>
              </Badge.Ribbon>
              </div>
            </Row>
            <hr style={{ marginBottom: '1rem' }} />
            <Title level={3}>Dados de usuário</Title>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={[user]}
              style={{ width: '100%'}}
              renderItem={item => (
                <List.Item>
                  <p><b>Usuário: </b>{item.username}</p>
                  <p><b>Nome completo: </b>{item.first_name} {item.last_name}</p>
                  <p><b>{/^\d+$/.test(item.cpfcnpj) && item.cpfcnpj.length > 11 ? "CNPJ" : "CPF"}: </b>{item.cpfcnpj}</p>
                  <p><b>Telefone: </b>{item.phone_number}</p>
                  <p><b>Tema padrão: </b>{item.theme}</p>                    
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      );
    };