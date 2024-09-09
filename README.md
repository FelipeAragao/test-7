
# Vibbraneo Ecommerce Backend

<a href="https://gitmoji.dev">
  <img
    src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
    alt="Gitmoji"
  />
</a>

![Nest](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)

Projeto desenvolvido utilizado o framework [NestJS](https://nestjs.com/). Representa o backend de um ecommerce de troca e venda de equipamentos eletrônicos.

## Ferramentas necessárias

- Node 20.x
- Docker

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env.Lembrando que recomenda-se alterar algumas delas, como credenciais do banco de dados

```text
# Postgres
POSTGRES_USER="ecommerce"
POSTGRES_PASSWORD="ChangeMe!123"
POSTGRES_DB="ecommerce"

# JWT
JWT_ACCESS_TOKEN_EXP_IN_SEC=3600
JWT_PUBLIC_KEY_BASE64="gerar-chave-publica-e-converter-para-base64"
JWT_PRIVATE_KEY_BASE64="gerar-chave-privada-e-converter-para-base64"

# SSO
## Google
GOOGLE_CLIENT_ID="google-client-id"
GOOGLE_CLIENT_SECRET="google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/api/v1/authenticate/sso/callback"

# Cloudbeaver
CB_PORT=8080
CB_SERVER_NAME="Ecommerce"
CB_ADMIN_NAME="vibbraneo"
CB_ADMIN_PASSWORD="admin"
```

### Gerando chaves pública e privada

As chaves são usada para codificação e verificação do JWT. Deve-se gerar as chaves `RS256` conforme os comandos abaixo.

```bash
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048  # Chave privada
openssl rsa -in private.pem -pubout -out public.pem  # Chave pública
```

Converta as chaves para `base64`

```bash
base64 private.pem > private.base64  # Coverter chave privada para base64
base64 public.pem > public.base64  # Converer chave pública para base64
```

Copie os valores das cheves em `base64` para as respectivas variáveis de ambiente

### Credenciais SSO Google

Deve-se criar um app no console da Google Cloud Platform e gerar as credenciais. Mais informações na [documentação](https://console.cloud.google.com/apis).

## Rodando localmente

Clone o projeto

Entre no diretório do projeto

```bash
  cd vibbraneo-ecommerce-backend
```

Instale as dependências

```bash
  npm install
```

Inicie a stack do docker-compose contendo o banco de dados Postgres e o Cloudbeaver, usado para visualização do banco de dado. Pode-se usar o client de sua preferência também.

```bash
docker-compose up -d
```

Inicie o servidor

```bash
  npm run start  # Modo de desenvolvimento
  npm run start:dev  # Watch mode
  npm run start:debug  # Debug mode
  npm run start:prod  # Modo produção
```

Caso queira incluir o build do projeot na stack do docker-compose, use

```bash
docker-compose up -d --build
```


## Documentação da API

### Swagger

Para ter acesso a documentação via Swagger, rode o servidor conforme as intruções do tópico anterior e acesse http://localhost:3000/docs

### Insomnia

Foi gerada uma coleção de requests no Insomnia juntamente com alguns exemplos de teste. Para carregá-la, instale o [Insomnia](https://insomnia.rest/download) e importe o arquivo `insomnia.json` que se encontra na raiz do projeto
.
## Roadmap

- Melhorar estratégia de armazenamento de arquivos

- Melhorar cobertura de testes

- Adicionar pipeline de deploy

