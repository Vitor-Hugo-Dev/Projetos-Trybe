const botao = document.getElementById('criar-tarefa');
const inputValue = document.getElementById('texto-tarefa');
const pegaOl = document.getElementById('lista-tarefas');

// desafio 7
function liCinza(event) {
  //   console.log('ta funcionando');
  for (let index = 0; index < pegaOl.children.length; index += 1) {
    // esse for é referente ao desafio 8
    pegaOl.children[index].classList.remove('cinzou');
  }
  const liEvent = event.target;
  liEvent.classList.add('cinzou');
}

// desafio 9
function concluido(event) {
  console.log('funciona');
  console.log(event.target);
  event.target.classList.toggle('completed');
}
// desafio 5
function criaItem() {
  const criaLi = document.createElement('li');
  criaLi.innerText = inputValue.value;
  criaLi.addEventListener('click', liCinza); //  evento do desafio 7
  criaLi.addEventListener('dblclick', concluido); //    evento do desafio 9
  pegaOl.appendChild(criaLi);
  inputValue.value = '';
}
botao.addEventListener('click', criaItem);

//  desafio 10
const botaoApagar = document.createElement('button');
botaoApagar.id = 'apaga-tudo';
botaoApagar.innerText = 'Apaga Tudo!';
const botoesDeApagar = document.getElementById('botoes-de-apagar');
botoesDeApagar.appendChild(botaoApagar);
const todasLi = document.getElementsByTagName('li');
function apagaTudo() {
  for (let index = 0; index < todasLi.length; index += 1) {
    todasLi[index].remove();
    index -= 1;
  }
}
botaoApagar.addEventListener('click', apagaTudo);

// desafio 11
const botaoApagarComplete = document.createElement('button');
botaoApagarComplete.id = 'remover-finalizados';
botaoApagarComplete.innerText = 'Remove os finalizados';
botoesDeApagar.appendChild(botaoApagarComplete);
function removeFinalizados() {
  for (let index = 0; index < todasLi.length; index += 1) {
    if (todasLi[index].classList.contains('completed')) {
      todasLi[index].remove();
      index -= 1;
    }
  }
}
botaoApagarComplete.addEventListener('click', removeFinalizados);

const buttonSaveList = document.createElement('button');
buttonSaveList.id = 'salvar-tarefas';
buttonSaveList.innerText = 'Save';
const saveItens = () => {
  const arrayLi = [];
  for (let index = 0; index < todasLi.length; index += 1) {
    const style = getComputedStyle(todasLi[index]);
    const objectLi = {
      text: todasLi[index].innerText,
      completed: style.textDecoration.includes('line-through'),
      cinzou: style.backgroundColor.includes('rgb(128, 128, 128)'),
    };
    arrayLi.push(objectLi);
  }
  localStorage.setItem('arrayLi', JSON.stringify(arrayLi));
};

buttonSaveList.addEventListener('click', saveItens);
botoesDeApagar.appendChild(buttonSaveList);

const createElementLi = (obj) => {
  const newLi = document.createElement('li');
  newLi.innerText = obj.text;
  newLi.classList.add(obj.completed ? 'completed' : null);
  newLi.classList.add(obj.cinzou ? 'cinzou' : null);
  newLi.addEventListener('click', liCinza); //  evento do desafio 7
  newLi.addEventListener('dblclick', concluido); //    evento do desafio 9
  pegaOl.appendChild(newLi);
};

const getLocalStorage = () => {
  const objectArray = JSON.parse(localStorage.getItem('arrayLi'));
  for (let index = 0; index < objectArray.length; index += 1) {
    createElementLi(objectArray[index]);
  }
};

window.onload = () => {
  localStorage.arrayLi ? getLocalStorage() : null;
};
