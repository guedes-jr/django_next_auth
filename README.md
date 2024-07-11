# Descrição do projeto
Projeto voltado para servir de base para outros projetos que visem a utilização de backup em Django Rest API e frontend com Nextjs 14, além de comunicação com banco de dados PostgreSQL.

# Instalação
 1. **Clone do Projeto**
```bash
git clone https://github.com/guedes-jr/django_next_auth.git
```

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
