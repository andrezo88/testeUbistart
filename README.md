# TESTE TODO

This is a RESTful API para TODOs.

---

## FEATURES:

- Criar usuários;
- Login dos usuários;
- Usuários autorizados podem criar, ver, editar e deletar os próprios TODOs.
- Administrador pode verificar TODOs de todos os usuários, gerado em páginas e por filtragem do resultado de itens atrasados.

---

## TECHNOLOGIES:

Todo server utiliza:

- nodejs;
- express;
- MongoDB;
- Mongoose;
- json web token;
- bcryptjs;
- dotenv;

---

## USAGE:

Local:

- Clone o repositório;
- `npm i`;

Executar o docker para configurar a utilização da API. 

- Para navegar entre as páginas é necessário utilizar a query `pg`, como por exemplo: `/adm?pg=1`.
> A quantidade de itens listado por página foi definido por 10 itens por página, caso queira alterar a quantidade para 5 itens por página por exemplo, utilizar: `/adm?pg=1&limit=5`.
- Para retornar apenas os itens em atraso utilizar a query `isLate` como por exemplo: `/adm?isLate=true`.

## Endpoints:

| METHOD | ENDPOINT¹         | PAYLOAD                          | RESPONSE        | ACTION                                                                            |
| ------ | ----------------- | -------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| POST   | /auth/signup      | { email*, password*, role² }         | { message }     | Cria usuário no banco de dados | /auth/login       | { email*, password* }         | { user, token } | Cria token para acesso ao sistema e utilizar as funcionalidades conforme role do usuário |
| GET   | /todos/   |    -                  | [ {TODOs} ]      | Pega todos os TODOs do usuário. |
| POST    | /todos/   | {description*, dueDate*}                                | { TODO }  | Cria o TODO do usuário |
| PUT    | /todos/:id | { description, dueDate, completed }                      | { TODO }      | Edita o TODO criado |
| DELETE | /todos/:id | -                                | { message }     | Deleta o TODO |
| GET    | /adm/      | -                                | [{ TODOs }]      | Mostra os TODOs de todos os usuários.|

- ¹: Todos os endpoints com exceção dos que iniciam com `/auth` devem user o token (bearer) como autorização no cabeçalho.
- ²: Para criar o usuário deve informar o role em forma de número: Admin: 5150, User: 2001.
- *: Campo obrigatório.

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

---

### Decisões tomadas:

- Eu decidi utilizar o banco de dados MongoDB, pois tenho maior familiaridade, mas irei estudando e refazer o teste utilizando o banco de dados MySQL.
- Criei um seed para gerar um usuário Admin para os teste, e se já tiver sido criado ele irá avisar que já tem o usuário admin, porém sem travar o aplicativo. 
- Criei o docker para facilitar na execução do aplicativo.
- Na rota de criação e login do usuário, foi definido algumas verificações para finalizar o processo.
> - Signup: Como colocado os campos como requerido, a função faz a verificação e retorna o erro, faz a criptografia e retorna os dados cadastrados.
> - Login: Faz a verificação no banco de dados e as informações passadas pelo usuário, e trato o erro retornando que o usuário ou senha estão incorretos, não indicando qual informação está errada, para dificultar caso alguém queira tentar adivinhar a senha ou o e-mail.
- Na rota TODO:
> - Decidi utilizar o Id do TODO para fazer a modificação e deleção do item, e também não permitir que outro usuário faço modificações.
> - Para a postagem, é utilizado as informações do payload e Id do usuário e gera um novo item com o TODO recebendo os dados do usuário.
> - Para retornar a lista de TODO do usuário, eu busquei as informações do User no banco de dados e fiz o select das informações para retornar os detalhes solicitados.
> - OBS: Deixei os IDs pois ele é utlizado para a deleção e edição dos TODOs.
- Na rota Adm:
> - Para retornar a lista com todos os TODOs de todos os usuários, fiz o middleware para permitir apenas quem tem o role de Admin possa acesar aquela rota e assim diferenciar os usuários.
> -  Fiz a páginação direto na rota de get em forma de query, e para filtrar e retornar apenas os TODOs em atraso fiz a query isLate, onde pega a informação através do forEach que insere a variável "isLate" no TODO, calculando a partir do dueDate.

Obrigado.
André Abreu.
# backendTODOs
