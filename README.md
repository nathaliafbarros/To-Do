## To Do - gerenciador de tarefas
Desafios 01 e 02 da trilha Node.js - Ignite Rocketseat  

### Requisitos - Desafio 01
[x] Users should be able to create a new user whith `name` and `username`  
[x] Todos should be able to create a new todo  
[x] Todos should be able to list all user's todos  
[x] Todos should be able to update a todo(`title` and `deadline`)  
[x] Todos should be able to mark a todo as done  
[x] Todos should be able to delete a todo  

### Requisitos - Desafio 02
Dessa vez teremos um plano grátis onde o usuário só pode criar até dez *todos* e um plano Pro que irá permitir criar *todos* ilimitados, isso tudo usando middlewares para fazer as validações necessárias.  
[x] checksCreateTodosUserAvailability  
[x] checksTodoExists  
[x] findUserById  

### Regras de negócio - Desafio 01  
[x] `name` e `username` devem ser passados dentro do corpo da requisição  
[x] Users should not be able to create a new user when username already exists  
[x] A rota POST `/todos` deve receber  as propriedades  `title` e `deadline` dentro do corpo da requisição  
[x] A rota PUT `/todos/:id` deve receber as propriedades `title` e `deadline` dentro do corpo da requisição  
[x] Todos should not be able to update a non existing todo  
[x] Todos should not be able to mark a non existing todo as done  
[x] Todos should not be able to delete a non existing todo  
[x] o `username` será passado pelo header da requisição. (Esse `username` recebido pelo header da requisição vem através do Middleware. Esse Middleware repassa o `user`, que no caso contem o `username`) 

### Regras de negócio - Desafio 02  
[x] Should be able to find user by username in header and pass it to request.user  
[x] Should not be able to find a non existing user by username in header  
[x] Should be able to let user create a new todo when is in free plan and have less than ten todos  
[x] Should not be able to let user create a new todo when is not Pro and already have ten todos  
[x] Should be able to let user create infinite new todos when is in Pro plan  
[x] Should be able to put user and todo in request when both exits  
[x] Should not be able to put user and todo in request when user does not exists  
[x] Should not be able to put user and todo in request when todo id is not uuid  
[x] Should not be able to put user and todo in request when todo does not exists  
[x] Should be able to find user by id route param and pass it to request.user  
[x] Should not be able to pass user to request.user when it does not exists  
 
Obs: CRUD (Create, Read, Update, Delete) É um mnemônico para as quatro operações básicas de armazenamento persistente.  


## Instalação  
### Para liberar o yarn:  
-> Set-ExecutionPolicy -Scope CurrentUser  
-> RemoteSigned 

### Clone este repositório
-> git clone https://github.com/nathaliafbarros/desafio01-trilha-nodejs.git
### Entre na pasta do projeto clonado
-> cd desafio01-trilha-nodejs
### Instale as dependências
-> yarn ou yarn install
### Para startar o servidor (O servidor iniciará na porta:3333. Acesse http://localhost:3333)
-> yarn dev 
### Para rodar os testes
-> yarn test

### Sobre os testes automatizados
Os testes sempre vão ficar dentro de uma pasta chamada `__tests__` dentro da pasta `src`.

Dentro da pasta de testes, para cada arquivo testado na sua aplicação, existe um arquivo com o mesmo nome, com a extensão `.spec.js`.

Para começar a utilizar os testes, execute o comando `yarn test` no seu terminal, e ele irá te retornar o resultado dos testes.




