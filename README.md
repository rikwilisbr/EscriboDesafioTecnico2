
# Desafio Técnico Escribo 2

Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

## Endpoints


#### Sing Up (Cadastro):
```
POST http://18.231.15.236:3000/api/singUp
```
- Input

```
{
    "nome": string,
    "email": string,
    "senha": string,
    "telefones": [{ "numero": "123456789", "ddd": "11" }]
}
```

- Output 201
```
{
    "id": user-id,
    "data_criacao": date,
    "data_atualizacao": date,
    "ultimo_login": date,
    "token": jwt
}
```

#### Sing In (Autenticação):
```
POST http://18.231.15.236:3000/api/singIn
```
- Input

```
{
    "email": string,
    "senha": string,
}
```

- Output 200
```
{
    "id": user-id,
    "data_criacao": date,
    "data_atualizacao": date,
    "ultimo_login": date,
    "token": jwt
}
```

#### Search User (Buscar usuário):
```
GET http://18.231.15.236:3000/api/getUser/userID=<user-id>
```
- Autenticação no Header da requisição

```
 "Authentication": "Bearer {token}"

```

- Output 200
```
{
    "email": string,
    "nome": string,
    "telefones": [{ "numero": "123456789", "ddd": "11" }]
    "data_criacao": date,
    "data_atualizacao": date,
    "ultimo_login": date,
}
```



## Erros


| Status Code | Route                                                       | Response Message             |
|-------------|-------------------------------------------------------------|------------------------------|
| 400         | POST http://18.231.15.236:3000/api/singUp                  | bad request                  |
| 400         | POST http://18.231.15.236:3000/api/singIn                  | bad request                  |
| 401         | POST http://18.231.15.236:3000/api/singIn                  | Usuário e/ou senha inválidos |
| 401         | GET http://18.231.15.236:3000/api/getUser/userID=<user-id> | Sessão inválida              |
| 401         | GET http://18.231.15.236:3000/api/getUser/userID=<user-id> | Não autorizado               |
| 404         | GET http://18.231.15.236:3000/api/getUser/userID=<user-id> | Usuário não encontrado       |

## Tecnologias Usadas

- Linguagem: Javascript
- Framework: Express
- Banco de dados: MongoDB
- Hospedagem com AWS EC2
- Sistema de build com gerenciamento de dependência com npm
- Task Runner com npm scripts
- Padronização de estilo com EsLint
- JWT como Token
- Testes únitarios com Jest e Supertest
- Criptografia hash na senha e token



