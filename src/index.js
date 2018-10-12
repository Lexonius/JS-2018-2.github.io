/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  //console.log(seconds)
  return new Promise (function (resolve, reject) {
    setTimeout (() => {
      resolve();
    }, seconds * 1000);
  })
}
 

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {

  return new Promise ((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open ('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
    //xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('abort', (e) =>{
      reject();
    })
    xhr.addEventListener('error', (e) => {
      reject();
    })
      // console.log('before load --- ', xhr.response);
    xhr.addEventListener ('load', (e) => {
      if(xhr.status < 400 ){
      // console.log('after load --- ', xhr.response);
      //console.log(typeof xhr.response);
      const cities = JSON.parse(xhr.response);
      cities.sort(function (a, b){
        if(a.name > b.name){
          return 1;
        } else {
          return -1;
        }
      })
      resolve(cities)
    } else {
      reject();
// console.log('before load --- ', xhr.response);
    // xhr.addEventListener ('load', (e) => {
    //   // console.log('after load --- ', xhr.response);
    //   //console.log(typeof xhr.response);
    //   const cities = JSON.parse(xhr.response);
    //   cities.sort(function (a, b){
    //     if(a.name > b.name){
    //       return 1;
    //     } else {
    //       return -1;
    //     }
    //   })
    //   resolve(cities)
    // })
    }
    
    })
  })
}

export {
    delayPromise,
    loadAndSortTowns
};
