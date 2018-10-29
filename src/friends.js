import './styles/styles.css';
// // import { auth } from './utils'
import renderFriends from './templates/template.hbs'
import renderInfo from './templates/info.hbs'
import renderHistory from './templates/template.hbs'
// //теккущее состояние

// let state = 0;
// let image = document.createElement('img')
// let imageListElem = document.createElement('li')
// let imageListTop = document.querySelector('.slider__block--center--top__list')
// let imageListBottom = document.querySelector('.slider__block--center--bottom__list')
// // let button = document.createElement('div')

// // button.setAttribute()
// //массив с нашими изображениями
// let data = [
//     { id: 0, src: './02.jpg'},
//     { id: 1, src: './1476283575_10437141_0.jpg'},
//     { id: 2, src: './kosmos-14.jpg'}
// ]


// //функция по перерисвке
// const renderFn = () => {
//     //в этой переменной будет лежать элемент массива по номеру, который лежит в state
//     const currentData = data[state];
//     imageListElem.setAttribute('class','image__elem--top')
//     image.setAttribute('src',`${currentData.src}`)
//     image.setAttribute('class','image')
//     imageListTop.appendChild(imageListElem);
//     imageListElem.appendChild(image);

//     // стереть старую картинку
//     // нарисовать новую с текущим src
// }
    
// if(data[state] === 0){
//     imageListElem.removeChild(image)
// } else {
//     renderFn()
// }


// //создал li для каждого элемента массива
// data.forEach(element => {
//     let buttonList = document.createElement('li')
//     buttonList.setAttribute('class', 'button__list--elem')
//     imageListBottom.appendChild(buttonList)
//     ///создать id кнопки равный id элемента
//     buttonList.setAttribute('data-id', `${element.id}`)

    
// });


// //при нажатии на кнопку
// imageListBottom.addEventListener('click', (e) =>{
//     //получаем элемент по которому нажали
//     let targetButton = e.target;
//     //получаем индекс(id) элемента
//     let indexButton = targetButton.getAttribute('data-id')
//     //если нажатие пришлось не на кнопку
//     if(targetButton.className !== 'button__list--elem'){
//         //выходим из функции
//         return
//     } else {
//         //стейт будет равен индексу(id) нажатой кнопки
//         state = Number(indexButton);
//         renderFn();
//     } 
// })

let friendsArr = []
let friendsFilterArr = []
friendsFilterArr = friendsArr;

VK.init({
    apiId: 6502079
});

function authVk(){
    return new Promise((resolve, reject) => {
        VK.Auth.login (data =>{
            if (data.session){
                resolve();
            } else {
                reject(new Error('Не удалось авторизироваться'))
            }
        }, 2) 
    })
} 
authVk().then(() => console.log('ok'))

function callAPI (method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject (data.error);
            } else {
                // на данном этапе получили массив с друзьями
                resolve(data.response)
                // console.log(data.response)
            }
        });
    })
}

authVk()

.then(() => {
    return callAPI ('users.get', {name_case: 'gen'});
})
.then(([me]) => {
    return callAPI('friends.get', {count: 20, fields: 'photo_100'} );
})
.then(friends => {
    // проврка: если друзья есть и в левом и в правом списке, то я их кладу в свои массивы, если их нет, то я беру friends.items и кладу в левый список, в правый пустой массив
    // if(localStorage.getItem('store')){
    //     let friendsParse = JSON.parse(localStorage.getItem('store'))
    //     alert("nice")
    //     leftListArray = friendsParse.leftList;
    //     rightListArray = friendsParse.rightList;
    //     renderFriendsListLeft();
    //     renderFriendsListRight();
    // } else {
    //     leftListArray = friends.items;
    //     rightListArray = [];
    //     renderFriendsListLeft();
    //     renderFriendsListRight();
    // }
    
    friendsArr = friends.items
    // console.log(friendsArr)
})

let state = 0;
// let image = document.createElement('img')
// let imageListElem = document.createElement('li')
let imageListTop = document.querySelector('.slider__block--center--top__list')
let friendsContainer = document.querySelector('.slider__block--center--top')
let friendsInputContainer = document.querySelector('.slider__block--center--bottom')
let imageListBottom = document.querySelector('.slider__block--center--bottom__list')
// let button = document.createElement('div')

// button.setAttribute()
//массив с нашими изображениями
let data = [
    { id: 0, title: 'Имя' },
    { id: 1, title: 'Друзья' },
    { id: 2, title: 'История'}
]


// console.log(data[state])
if(data.id === 0){
    // console.log(data[state])
    const infoHtml = renderInfo();
        // console.log(infoHtml)
    imageListTop.innerHTML = infoHtml
} 
else {
    // console.log('5')
}


//создал li для каждого элемента массива
data.forEach(element => {
    let buttonList = document.createElement('li')
    buttonList.setAttribute('class', 'button__list--elem')
    imageListBottom.appendChild(buttonList)
    ///создать id кнопки равный id элемента
    buttonList.setAttribute('data-id', `${element.id}`)
    buttonList.innerHTML = element.title
    // data.forEach(element => {
    //     buttonList.innerHTML = element.title
    // });
    
});
// let inputContainer = document.createElement('div')
// let friendInput = document.createElement('input')
//при нажатии на кнопку
let friendInput = document.querySelector('.search__input')
imageListBottom.addEventListener('click', (e) =>{
    //получаем элемент по которому нажали
    let targetButton = e.target;
    //получаем индекс(id) элемента
    let indexButton = targetButton.getAttribute('data-id')
    //если нажатие пришлось не на кнопку
    if(targetButton.className !== 'button__list--elem'){
        //выходим из функции
        return
    } else {
        //стейт будет равен индексу(id) нажатой кнопки
        state = Number(indexButton);
        // let sliderCenter = .querySelector('.slider__block--center--top__list')
        if(state === 0){
        const infoHtml = renderInfo();
        // console.log(infoHtml)
        imageListTop.innerHTML = infoHtml   
        friendsContainer.style.overflowY = 'hidden'
        // friendsContainer.removeChild(friendInput)
        } else if(state === 1){
            // console.log('65')
            friendsInputContainer.appendChild(friendInput)
            console.log(state)
            const friendsHtml = renderFriends({my_friends: friendsArr});
            // // console.log(friendsHtml)
            imageListTop.innerHTML = friendsHtml
            friendsContainer.style.overflowY = 'scroll'
            friendsContainer.style.overflowX = 'hidden'
        }
    } 
})

let friendInputField = document.querySelector('.search__input')

friendInputField.addEventListener('keyup', () => {
    
})

function isMatching(full, chunk) {
    if(full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1){
      return true;
    } else {
      return false;
    }
  }
 

console.log(friendInput)