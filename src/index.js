const express = require('express');
const app = express();
app.use(express.json());

//Criado pelo template
const cors = require('cors');
app.use(cors());

//Essa parte o template colocou separado dentro do arquivo server.js
/* Conteúdo do server.js
const app = require('./');
app.listen(3333);
*/
/* Meu conteúdo que costumo usar no index.js mesmo
app.listen(3333);
console.log("servidor rodando"); 
*/

////Importando o uuid, determinando uma versão específica. A versão v4 gera o id com números randômicos.
//const {v4} = require("uuid");
//Renomeando a função para uuidv4, para ficar mais fácil de trabalhar
const { v4: uuidv4, validate } = require('uuid');
const { request } = require('express');

const users = [];

//Middlewares 
function checksExistsUserAccount(request, response, next) { 
  const {username} = request.headers;
  //const {cpf} = request.headers;

  //const customer = customers.find((customer) => customer.cpf === cpf);
  //Vou procurar dentro do meu array "customers = []" e vou comparar se o customer.cpf que eu acabei de criar aqui mesmo nessa função((customer) => customer.cpf) é igual ao cpf(cpf) passado pelo usuário no insomnia
  //Obs: Como estamos trabalhando em memória salvando tudo num array, toda alteração feita no array(usar find por exemplo) não é retornado um novo array e sim uma referência fazendo com que qualquer alteração reflita diretamente no mesmo array original. Por isso não é preciso ficar atualizando o objeto "todo" por exemplo e devolvendo ele pra lista. Por isso também não é preciso ficar procurando o índice do todo, apagar e depois ainda atualizar ele no mesmo lugar.
  //O método find retorna o valor(a informação)do primeiro elemento de um array que retornar true para uma função de teste fornecida.Se não houver alguma, retorna undefined.
  const user = users.find((user) => user.username === username); 
  //O método some retorna v ou f de uma busca e testa se ao menos um dos elementos no array passa na condição e retorna v ou f de acordo com a condição passada.    
  
  if(!user){
      return response.status(404).json({error: "User not found!"});
  };  

  //Repassando informações de dentro do middleware para demais rotas(que estão chamando o middleware). 
  request.user = user;  
  //request.customer = customer;

  //Se não existir o user, segue adiante com o next
  return next(); 

};

function checksCreateTodosUserAvailability(request, response, next){ 
  //Recuperando o user de dentro do middleware
  const {user} = request; 

  if(!user.pro && user.todos.length >= 10){
    return response.status(403).json({error: "User is not Pro and already have ten todos"})
  } 
  
  return next();
};

function checksTodoExists(request, response, next){    
  const {username} = request.headers;
  const {id} = request.params;

  const user = users.find((user) => user.username === username); //O find retorna o valor(a informação)do primeiro elemento de um array que retornar true para uma função de teste fornecida.

  if(!user){
    return response.status(404).json({error: "User not found!"});
  };
  
  if(!validate(id)){
    return response.status(400).json({error: "The provided id is not a uuid"})
  };

  const todo = user.todos.find((todo) => todo.id === id);

  if(!todo){
    return response.status(404).json({error: "User's todo not found"})
  };

  request.todo = todo;
  request.user = user;

  return next();
};

function findUserById(request, response, next) {
  const {id} = request.params;
  
  const user = users.find((user) => user.id === id);

  if(!user){
    return response.status(404).json({error: "Id not found!"});
  }

  //Repassando informações de dentro do middleware para demais rotas(que estão chamando o middleware). 
  request.user = user;  

  return next();
   
};


//Rotas
//Criar usuários
app.post('/users', (request, response) => { 
  const {name, username} = request.body;

  const usernameAlreadyExists = users.find((user) => user.username === username);

  if(usernameAlreadyExists){
    return response.status(400).json({error: "Username already exists!"});
  }; 

  const user = {
    id:uuidv4(),
    name,
    username,
    pro: false,
    todos: []    
  }
  
  //Guardando dentro do array os dados
  users.push(user);

  return response.status(201).json(user);
});

//Listar users pelo id
app.get('/users/:id', findUserById, (request, response) => {  
  //Recuperando o user de dentro do middleware
  const {user} = request;

  return response.json(user);
});

//Listar todos de um usuário  
app.get('/todos', checksExistsUserAccount, (request, response) => {   
  //Recuperando o user de dentro do middleware
  const {user} = request; 
  //const {customer} = request; 

  return response.json(user.todos); 
  
});

//Criar todo 
app.post('/todos', checksExistsUserAccount, checksCreateTodosUserAvailability, (request, response) => {
  const {title, deadline} = request.body;
  
  //Recuperando o user de dentro do middleware
  const {user} = request; 

  const todo = {
    id:uuidv4(),
    title,
    deadline: new Date(deadline), //o deadline está vindo do usuário como string e aqui ele está fazendo um parse para uma data válida
    created_at: new Date(),
    done: false
  }
  //Usar new Date(deadline) irá realizar a transformação da string "ANO-MÊS-DIA" (por exemplo "2021-02-25") para uma data válida do JavaScript.
  
  user.todos.push(todo);

  return response.status(201).json(todo);

});

//Alterar título e deadline do todo 
app.put('/todos/:id', checksExistsUserAccount, checksTodoExists, (request, response) => {
  //Recuperando o user de dentro do middleware
  const {user} = request;

  const {id} = request.params;
  console.log(id);
  const {title, deadline} = request.body;

  const todo = user.todos.find((todo) => todo.id === id);

  if(!todo){
    return response.status(404).json({error: "Todo not found"});
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);

  //Para testar no insomnia: {{ _.baseURL }}/todos/6e1a8513-8187-4e5e-88fe-cdfe0518150c
});

//Update done no todo 
app.patch('/todos/:id/done', checksExistsUserAccount, checksTodoExists, (request, response) => {
  //Recuperando o user de dentro do middleware
  const {user} = request;

  const {id} = request.params;
  
  const todo = user.todos.find((todo) => todo.id === id);  
  
  if(!todo){
    return response.status(404).json({error: "This todo no exists"});  
  }
  
  todo.done = true;
  
  return response.json(todo);  

  //Para testar no insomnia: /todos/ceacc535-1904-4e5c-9067-bd59b90e4fc6/done
});

//Deletar todo 
app.delete('/todos/:id', checksExistsUserAccount, checksTodoExists, (request, response) => {
  //Recuperando o user de dentro do middleware
  const {user} = request;

  const {id} = request.params;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);
  //O findIndex vai pegar a posição do resultado da verificação. Se estiver na posição 0, 1, ou 2 e assim por diante, mas se não existir vai retornar -1

  //Se o todoIndex for igual a -1, ele não existe
  if(todoIndex === -1){
    return response.status(404).json({error: "This todo no exists"});  
  }

  //splice - O splice recebe dois parâmetros: primeiro parâmetro(onde vai iniciar a remoção), segundo parâmetro(onde vai terminar a remoção, aqui nesse caso, só customer)
  user.todos.splice(todoIndex, 1); //Então a partir da posição 2, por exemplo, exclua 1 elemento. No caso, somente o todoIndex

  return response.status(204).json();
});

//Plano pro
app.patch('/users/:id/pro', checksExistsUserAccount, (request, response) => { 
  //Colocar o findUserById aqui como middleware não adianta, pois somente o user é requisitado e não o id
  //Recuperando o user de dentro do middleware
  const {user} = request;

  if(user.pro){
    return response.status(400).json({error: 'Pro plan is already activated!'});
  }

  user.pro = true;

  return response.json(user);
});

module.exports = app;