# TESTE TODO Ubistart

This is a RESTful API para o teste de desenvolvedor back-end da empresa Ubistart.

---

[Teste Ubistart](https://github.com/andrezo88/testeUbistart)

---

## FEATURES:

- Criar usuários;
- Login dos usuários;
- Usuários autorizados podem criar, ver, editar e deletar os próprios TODOs;
- Administrador pode verificar TODOs de todos os usuários, gerado em páginas e por filtragem do resultado de itens atrasados;

---

## TECHNOLOGIES:

Todo server utiliza:

- nodejs;
- express;
- MongoDB
- Mongoose
- json web token;
- bcryptjs.
- dotenv

---

## USAGE:

Local:

- Clone o repositório;
- `npm i`;

Executar o docker para configurar a utilização da API. 

- Para navegar entre as páginas é necessário utilizar a query `pg`, como por exemplo: `/adm?pg=1`
- 
-- A quantidade de itens listado por página foi definido por 10 itens por página, caso queira alterar a quantidade para 5 itens por página por exemplo, utilizar: `/adm?pg=1&limit=5`

-Para retornar apenas os itens em atraso utilizar a query `isLate` como por exemplo: `/adm?isLate=true`

## Endpoints:

| METHOD | ENDPOINT¹         | PAYLOAD                          | RESPONSE        | ACTION                                                                            |
| ------ | ----------------- | -------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| POST   | /auth/signup      | { email*, password*, role² }         | { message }     | Cria usuário no banco de dados | /auth/login       | { email*, password* }         | { user, token } | Cria token para acesso ao sistema e utilizar as funcionalidades conforme role do usuário |
| GET   | /todos/   |    -                  | [ {TODOs} ]      | Pega todos os TODOs do usuário. |
| POST    | /todos/   | {description*, dueDate*}                                | { TODO }  | Cria o TODO do usuário |
| PUT    | /todos/:id | { description, dueDate, completed }                      | { TODO }      | Edita o TODO criado |
| DELETE | /todos/:id | -                                | { message }     | Deleta o TODO |
| GET    | /adm/      | -                                | [{ TODOs }]      | Mostra os TODOs de todos os usuários.|

¹: Todos os endpoints com exceção dos que iniciam com `/auth` devem user o token (bearer) como autorização no cabeçalho.
²: Para criar o usuário deve informar o role em forma de número: Admin: 5150, User: 2001.
*: Campo obrigatório.

### Payload fields:

Todos os campos mostrados são Strings

### Response fields:

```javascript
message: String;

User: {
  id: ObjectId,
  name: String
  email: String
  password: String
  role: Number
  todos: [ ObjectId ]
};

token: String;

Todo: {    
    title: String
    dueDate: Date
    completed: Boolean
    user: ObjectId
}
```
