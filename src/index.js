/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for(let i = 0; i < array.length; i++){
   fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let arr = [];
  for (let i = 0; i < array.length; i++){
      arr.push(fn(array[i], i ,array));
  }
  return arr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  let result;
  let i;
  if( initial !== undefined){
    result = initial;
    i = 0;
  } else {
    result = array[0];
    i = 1;
  }
  for (i; i < array.length; i++){
    result = fn(result, array[i], i, array);
  }
  return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let arr = [];
  for(const prop in obj){
  arr.push(prop.toUpperCase());
  }
  return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
  let arr = [];

  if (from < 0) {
    from = from + array.length;
  }
  if (from < 0) {
    from = 0;
  }
  if(to > array.length){
    to = array.length;
  }
  if(to < 0){
    to = to + array.length;
  }

  for(from; from < to; from++){
    arr.push(array[from]);
  }

  return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};

function filter(array, fn){
  let arr = [];

  for (let i = 0; i < array.length; i++){
    if (fn(array[i]) === true) {
      arr.push(array[i]);
    }
  }
  
  return arr;
}
