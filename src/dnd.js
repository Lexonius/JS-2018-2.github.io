import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let elem = document.createElement('div');
    elem.className = "draggable-div";
    elem.style.width = widthGenerate();
    elem.style.height = heightGenerate();
    elem.style.backgroundColor = colorGenerate();
    //elem.setAttribute('draggable', 'true');
    elem.style.position = 'relative';
    elem.style.left = positionHorizontal();
    elem.style.top = positionVertical();
    return elem;

  }
  
  function colorGenerate(){
    const a = parseInt(Math.random()*255);
    const b = parseInt(Math.random()*255);
    const c = parseInt(Math.random()*255);
    return `rgb(${a}, ${b}, ${c})`;
  }

  function widthGenerate() {
    let d = parseInt(Math.random()*450);
    return `${d}px`
  }

  function heightGenerate() {
    let e = parseInt(Math.random()*450);
    return `${e}px`
  }

  function positionHorizontal(){
    let f = parseInt(Math.random()*450);
    return `${f}px`
  }

  function positionVertical(){
    let g = parseInt(Math.random()*450);
    return `${g}px`
  }

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(div) {
  document.getElementsByClassName('draggable-div')
  //console.log(document.getElementsByClassName('draggable-div'));
  div.addEventListener('mousedown',function (e){
    console.log(1)
    moveAt(e);
  })

  
  function moveAt(e) {
    div.addEventListener('mousemove', function(e){
      console.log('2')
      div.style.left = e.pageX - div.offsetWidth / 2 + 'px';
      div.style.top = e.pageY - div.offsetHeight / 2 + 'px';
    })
  }

  div.addEventListener('mouseup', function(e) {
    console.log('3')
  })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

 