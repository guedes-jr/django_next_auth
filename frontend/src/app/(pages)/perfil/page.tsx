"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Card, Typography, List, Avatar, Badge, Button, Modal, Form, Input, Upload, Select, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { FormProps, GetProp, UploadProps, UploadFile } from 'antd';

const { Title } = Typography;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FieldType = {
  username?: string;
  first_name?: string;
  last_name?: string;
  cpfcnpj?: string;
  phone_number?: string;
  email?: string;
  theme?: string;
  profile_image?: string;
};

const themes = {
  options: ['dark', 'light'],
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Profile() {
    const { data, error } = useSWR("/auth/users/me", fetcher);
    const { control, handleSubmit, formState: { errors }, setError } = useForm<FieldType>();

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
      console.log('Success:', values);
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    const [imageUrl, setImageUrl] = useState<string>(user.profile_image);
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
  
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    };

    const handleUploadChange: UploadProps['onChange'] = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as FileType, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    };

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
              <Button 
                type="primary" 
                style={{ position: 'absolute', top: 5,  right: 15 }}
                onClick={showModal}
                ghost
              >
                Editar <EditOutlined />
              </Button>
              <Modal 
                title="Editar perfil" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                width={800}
              >
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600, marginTop: '3rem' }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item label="Usuário" name="Usuário" rules={[{ required: true}]}>
                    <Controller
                      name="username"
                      control={control}
                      rules={{ required: 'Obrigatório informar o usuário!' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={user.username}
                          placeholder="Usuário"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="Primeiro Nome" name="Primeiro Nome" rules={[{ required: true}]}>
                    <Controller
                      name="first_name"
                      control={control}
                      rules={{ required: 'Obrigatório informar o primeiro nome!' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={user.first_name}
                          placeholder="Primeiro nome"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="Último Nome">
                    <Controller
                      name="last_name"
                      control={control}
                      rules={{ required: 'Obrigatório informar o último nome!' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={user.last_name}
                          placeholder="Último nome"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="CPF/CNPJ" name="CPF/CNPJ" rules={[{ required: true}]}>
                    <Controller
                      name="cpfcnpj"
                      control={control}
                      rules={{ required: 'Obrigatório informar o CPF/CNPJ!' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={user.cpfcnpj}
                          placeholder="CPF/CNPJ"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="Telefone">
                    <Controller
                      name="phone_number"
                      control={control}
                      rules={{ required: 'Obrigatório informar o Telefone!' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={user.phone_number}
                          placeholder="Telefone"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="E-mail">
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: 'Obrigatório informar o E-mail!' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={user.email}
                          placeholder="E-mail"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="Tema">
                    <Controller
                      name="theme"
                      control={control}
                      rules={{ required: 'Obrigatório informar o Tema' }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          defaultValue={user.theme}
                          style={{ width: 200 }}
                          onChange={handleChange}
                          options={[
                            {
                              label: <span>dark</span>,
                              title: 'dark',
                              value: 'dark'
                            },
                            {
                              label: <span>light</span>,
                              title: 'light',
                              value: 'light'
                            },
                          ]}
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item label="Upload" valuePropName="fileList">
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Obrigatório informar o E-mail!' }}
                        render={({ field }) => (
                          <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={user.profile_image}
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                            onPreview={imageUrl}
                          >
                            <Image
                              wrapperStyle={{ display: 'none' }}
                              preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                              }}
                              src={previewImage}
                            />
                          </Upload>
                        )}
                      />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
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