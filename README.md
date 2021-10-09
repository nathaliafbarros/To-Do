## To Do - gerenciador de tarefas
Desafio 01 da trilha Node.js - Ignite Rocketseat  

### Requisitos
[x] Should be able to create a new user whith `name` e `username`  
[x] Should be able to create a new todo  
[x] Should be able to list all user's todos  
[x] Should be able to update a todo(`title` e `deadline`)  
[x] Should be able to mark a todo as done  
[x] Should be able to delete a todo  


### Regras de negócio
[x] `name` e `username` devem ser passados dentro do corpo da requisição
[x] Should not be able to create a new user when username already exists
[x] A rota POST `/todos` deve receber  as propriedades  `title` e `deadline` dentro do corpo da requisição
[x] A rota PUT `/todos/:id` deve receber as propriedades `title` e `deadline` dentro do corpo da requisição 
[x] Should not be able to update a non existing todo
[x] Should not be able to mark a non existing todo as done
[x] Should not be able to delete a non existing todo
[x] o `username` será passado pelo header da requisição. (Esse `username` recebido pelo header da requisição vem através do Middleware. Esse Middleware repassa o `user`, que no caso contem o `username`)

   
Obs: CRUD (Create, Read, Update, Delete) É um mnemônico para as quatro operações básicas de armazenamento persistente.


### Comandos extras
-> Set-ExecutionPolicy -Scope CurrentUser
-> RemoteSigned
-> "yarn" na pasta do projeto clonado, para instalar todas as dependências
-> "yarn dev" para startar o server

### Sobre testes automatizados
Os testes sempre vão ficar dentro de uma pasta chamada `__tests__` dentro da pasta `src`.

Dentro da pasta de testes, para cada arquivo testado na sua aplicação, existe um arquivo com o mesmo nome, com a extensão `.spec.js`.

Para começar a utilizar os testes, execute o comando `yarn test` no seu terminal, e ele irá te retornar o resultado dos testes.




