
<<<<<<< Updated upstream
# Instalação
 1. **Clone do Projeto**
=======
# 🌐 Django & Next.js Project
<div align="center">
  <img src="./frontend/public/banner.png" alt="Logo do Projeto" width="200"/>
</div>

<p align="center">
  <a href="https://github.com/seu-usuario/seu-repositorio">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/guedes-jr/django_next_auth">
  </a>
  <a href="https://github.com/guedes-jr/django_next_auth/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/guedes-jr/django_next_auth">
  </a>
  <a href="https://github.com/guedes-jr/django_next_auth/network">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/guedes-jr/django_next_auth">
  </a>
  <a href="https://github.com/guedes-jr/django_next_auth/stargazers">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/guedes-jr/django_next_auth">
  </a>
  <a href="https://github.com/guedes-jr/django_next_auth/blob/main/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/github/license/guedes-jr/django_next_auth">
  </a>
</p>

## 📝 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

## 🛠️ Sobre o Projeto

Este é um projeto full-stack que combina Django para o back-end e Next.js para o front-end. A aplicação visa fornecer uma plataforma robusta para [descrição do projeto].

## 🧰 Tecnologias Utilizadas

- [Django](https://www.djangoproject.com/) - Back-end framework
- [Next.js](https://nextjs.org/) - React framework para front-end
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [Docker](https://www.docker.com/) - Contêineres

## ✨ Funcionalidades

- Autenticação de usuários
- CRUD de [funcionalidade específica]
- Integração com API externa para [descrição da integração]
- Interface responsiva e moderna

## 📋 Requisitos

- Python 3.x
- Node.js 14.x ou superior
- Docker e Docker Compose (opcional)
- PostgreSQL

## 🚀 Instalação

### Clonando o Repositório

>>>>>>> Stashed changes
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

<<<<<<< Updated upstream
 2. **Acesso o diretório `django_next_auth` e crie um ambiente virutal em python**
```bash
cd django_next_auth

python3 -m venv venv
```

 3. **Ativo o ambiente e instale os requerimentos presentes no arquivo requeriments.txt
```bash
source venv/bin/activate

pip i -r requeriments.txt
```
4. **Crie um banco de dados postgres e configure o usuário e senha no arquivo ``settings`**

```bash
# Preparar banco de dados
psql -U postgres -h localhost -c "create user django_next with password 'django_next'";
psql -U postgres -h localhost -c "create database django_next owner django_next;";
psql -U postgres -d django_next -h localhost -c "create extension unaccent";
psql -U postgres -d django_next -h localhost -c "create extension pg_trgm"; 
```
5 .**Use o makemigratios e migrate para criar a estrutura de tabelas no banco de dados
```bash
python manage.py makmigrations

python manage.py migrate
```
6. **Crie um superusuário para ter acesso a aplicação e ao djanbgo admin**
```bash
python3 manage.py createsuperuser
```

7. **Inicie o server do django**
```bash
python3 manage.py runserver
```

8. **Acesse o diretório `frontend` e instale os modulos do node**
```bash
cd frontend

npm i 
```
10. **Inicie o server do nextjs**
```bash
npm run dev
```
=======
### Configurando o Back-end (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Siga as instruções para criar um superusuário
```

### Configurando o Front-end (Next.js)

```bash
cd ../frontend
npm install
```

### Executando a Aplicação

#### Sem Docker

**Back-end:**

```bash
cd backend
source venv/bin/activate  # No Windows use `venv\Scripts\activate`
python manage.py runserver
```

**Front-end:**

```bash
cd frontend
npm run dev
```

#### Com Docker

```bash
docker-compose up --build
```

## 📦 Scripts Disponíveis

Na pasta `frontend`, você pode rodar:

- `npm run dev`: Executa a aplicação em modo de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run start`: Inicia o servidor Next.js.

Na pasta `backend`, você pode rodar:

- `python manage.py runserver`: Inicia o servidor Django.

## 📁 Estrutura de Pastas

```plaintext
.
├── backend
│   ├── manage.py
│   ├── myproject
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── app
│       ├── migrations
│       ├── models.py
│       ├── views.py
│       └── ...
├── frontend
│   ├── package.json
│   ├── pages
│   │   ├── index.js
│   │   └── ...
│   └── public
├── docker-compose.yml
└── README.md
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça o push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📧 Contato

👤 **Seu Nome**

- Github: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Nome](https://www.linkedin.com/in/seu-usuario)
- Email: seu-email@example.com

---

Desenvolvido com profissionalismo por [Seu Nome](https://github.com/seu-usuario) 🤖.
>>>>>>> Stashed changes
