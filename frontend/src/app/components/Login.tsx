import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from '@/app/components/Login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import Image from "next/image";
import logo from "../../../public/next.svg";
import logo2 from "../../../public/vercel.svg";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const { login, storeToken } = AuthActions();

  const onSubmit = async (data: FormData) => {
    setAuthError(null);
    try {
      const response = await login(data.email, data.password);
       const resposta = (await response._fetchReq.then())
      // Verifique se a resposta tem o status esperado
      if (response && resposta) {
         if (resposta.status === 200) {
          const data = await response.json();
          storeToken(data.access, "access");
          storeToken(data.refresh, "refresh");
          router.push("dashboard");
        } else if (resposta.status === 401) {
        setAuthError("Usuário ou senha incorretos!");
        } else {
          throw new Error("Algo deu errado. Por favor, tente novamente.");
        }
      } else {
          throw new Error("Algo deu errado. Por favor, tente novamente.");
      }
    } catch (err) {
      setAuthError(err.message || "Erro desconhecido.");
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image 
          src={logo}
          alt="Descrição da imagem"
          layout="responsive"
          width={700}
          height={475}
        />
      </div>
      
      <Form
        name="normal_login"
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item>
          <Image 
            src={logo2}
            alt="Descrição da imagem"
            layout="responsive"
          />
          <h1 style={{ fontSize: '25px', margin: '1rem 0 1rem 0' }}>Acessar o Sistema</h1>
        </Form.Item>
        
        {authError && (
          <Form.Item>
            <Alert message={authError} type="error" showIcon />
          </Form.Item>
        )}

        <Form.Item
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email ? errors.email.message : ''}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Obrigatório informar o usuário!' }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined className={styles.site_form_item_icon} />}
                placeholder="Usuário"
              />
            )}
          />
        </Form.Item>
        
        <Form.Item
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password ? errors.password.message : ''}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Obrigatório informar a senha!' }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<LockOutlined className={styles.site_form_item_icon} />}
                type="password"
                placeholder="Senha"
              />
            )}
          />
        </Form.Item>
        
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lembre-me</Checkbox>
          </Form.Item>

          <Link
            href="/auth/password/reset-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            Entrar
          </Button>
          <Button type="default" htmlType="reset" className={styles.login_form_button}>
            Limpar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
