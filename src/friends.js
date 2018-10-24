import './styles/styles.css';
// // import { auth } from './utils'
import renderFn from './templates/template.hbs'

//         // проврка: если друзья есть и в левом и в правом списке, то я их кладу в свои массивы, если их нет, то я беру friends.items и кладу в левый список, в правый пустой массив
//         if(localStorage.getItem('store')){
//             let friendsParse = JSON.parse(localStorage.getItem('store'))
//             alert("nice")
//             leftListArray = friendsParse.leftList;
//             rightListArray = friendsParse.rightList;
//             renderFriendsListLeft();
//             renderFriendsListRight();
//         } else {
//             leftListArray = friends.items;
//             rightListArray = [];
//             renderFriendsListLeft();
//             renderFriendsListRight();
        
        
        
//         // по нажатию на кнопку внутри контейнера, выполняется поиск элемента, внутри которого лежит кнопка, после чего элемент переносится
//         // в правый контейнер и удаляется из левого
//         friendsListLeft.addEventListener('click', (e) => {
//             // смотрим, на какой элемент приходится клик
//             let targetButton = e.target;
//             // если клик пришелся не на изображение кнопки, то
//             if(targetButton.tagName !== 'IMG'){
//                 //завершаем работу функции
//                 return
//             } else {
//                 //определяем id у кнопки
//                 let id = targetButton.getAttribute('data-id')
//                 //выявляем индекс элмента через id, на которую пришелся клик (обрати внимание на то, что id приходит числом, а нужен строкой)
//                 const friendIndex = leftListArray.findIndex((friend => friend.id === Number(id)))
//                 //пушим в правый массив элемент с индексом, который нам вернул findIndex
//                 rightListArray.push(leftListArray[friendIndex])
//                 //вырезаем элемент с полученным выше индексом
//                 leftListArray.splice(friendIndex, 1);
//                 //заново отрисовываем отфильтрованные массивы
//                 renderFriendsListLeft();
//                 renderFriendsListRight();
//             }
//         })
//         // по нажатию на кнопку внутри контейнера, выполняется поиск элемента, внутри которого лежит кнопка, после чего элемент переносится
//         // в левый контейнер и удаляется из правого (логику работы смотри выше)
//         friendsListRight.addEventListener('click', (e) => {
//             let targetButton = e.target;
//             if(targetButton.tagName !== 'IMG'){
//                 return
//             } else {
//                 let id = targetButton.getAttribute('data-id')
//                 const friendIndex = rightListArray.findIndex ((friend => friend.id === Number(id)))
//                 leftListArray.push(rightListArray[friendIndex])
//                 rightListArray.splice(friendIndex, 1)
//                 renderFriendsListLeft();
//                 renderFriendsListRight();
//             }
//         })

        
//         //создаем пустой массив, в который кладем первоначальный массив. Получается массив, изменив который мы не затронем первоначальный массив.
//         let filterFriendsLeftArr = [];
//         filterFriendsLeftArr = leftListArray;
//         let filterFriendsRightArr = [];
//         filterFriendsRightArr = rightListArray;

//         // по нажатию на клавишу в поле ввода вызывается функция по отрисовке левого списка
//         filterInputLeft.addEventListener('keyup',() => {
//             renderFriendsListLeft();
//         })

//         // по нажатию на клавишу в поле ввода вызывается функция по отрисовке правого списка
//         filterInputRight.addEventListener('keyup',() => {
//             renderFriendsListRight();
//         })

//         // функция по рендерингу левого списка друзей
//         function renderFriendsListLeft(){
//             // если в левое поле ввода есть значения
//             if(filterInputLeft.value){
//                 // то фильтруем массив с друзьями из левого списка (по имени, фамилии)
//                 filterFriendsLeftArr = leftListArray.filter((item) => isMatching (item.first_name + " " + item.last_name, filterInputLeft.value))
//             } else {
//                 //если поле ввода пустое, то на отрисовку отдаем неизмененный первоначальный массив
//                 filterFriendsLeftArr = leftListArray;
//             }
//             const leftListHtml = renderFn ({ my_friends: filterFriendsLeftArr, isLeft: true });
//             friendsListLeft.innerHTML = leftListHtml;
//         }

//         //функция по рендерингу правого списка друзей (смотри выше)
//         function renderFriendsListRight(){
//             if(filterInputRight.value){
//                 filterFriendsRightArr = rightListArray.filter((item) => isMatching (item.first_name + " " + item.last_name, filterInputRight.value))
//             } else {
//                 filterFriendsRightArr = rightListArray;
//             }
//             const rightListHtml = renderFn ({ my_friends: filterFriendsRightArr, isLeft: false });
//             friendsListRight.innerHTML = rightListHtml;
            
//         }
//         // функция по проверке подстроки в строке
//         function isMatching(full, chunk) {
//             if(full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1){
//               return true;
//             } else {
//               return false;
//             }
//           }
         

//         let storage = localStorage;
//             //сохранение данных в LocalStorage
//             const buttonSave = document.querySelector('.footer_submit');
//             buttonSave.addEventListener('click',() =>{
//                 localStorage.setItem('store', JSON.stringify({
//                     leftList: filterFriendsLeftArr,
//                     rightList:filterFriendsRightArr
//                 }))
//                 alert('Data OK')
//             })

// проврка: если друзья есть и в левом и в правом списке, то я их кладу в свои массивы, если их нет, то я беру friends.items и кладу в левый список, в правый пустой массив
let nameInput = document.querySelector('.input_name')
let commentInput = document.querySelector('.input_comment')
let addButton = document.querySelector('.button__add')
let buttonSave = document.querySelector('.button-save')
let commentsArr = [];
let commentList = document.querySelector('.comments_list')


        if(localStorage.getItem('store')){
            let commentParse = JSON.parse(localStorage.getItem('store'))
            // alert("nice")
            commentsArr = commentParse.commList;
            // console.log(commentsArr)
            renderComments(commentsArr)
        } else {
            commentsArr = []
            renderComments()
        }





addButton.addEventListener('click',() => {
    if( !nameInput.value || !commentInput.value){
        return
    } else if(nameInput.value !== ' '|| commentInput.value !== ' '){
        getComments()
        // renderComments()
    }
})
addButton.addEventListener('mouseover',() => {
    console.log('5')
    addButton.style.background = '#53BBA8';
})

addButton.addEventListener('mouseout',() => {
    console.log('6')
    addButton.style.background = '#6BCBB6';
})

buttonSave.addEventListener('mouseover',() => {
    console.log('5')
    buttonSave.style.background = '#53BBA8';
})

buttonSave.addEventListener('mouseout',() => {
    console.log('6')
    buttonSave.style.background = '#6BCBB6';
})


function getComments(){
    let nameCommentator = nameInput.value;
    let commentText = commentInput.value;
    let now = new Date;
    let generateId = Math.floor(Math.random() * 1001)
    let commentObj = {
        name: nameCommentator,
        date: {
            weekDay: now.getDate(),
            month: now.getMonth(),
            year: now.getFullYear(),
            hour: now. getHours(),
            minutes: now.getMinutes()
        },             
        id: generateId,
        comment: commentText,
        remove: generateId
    }
    commentsArr.push(commentObj);
    renderComments()
}

    

function renderComments(){
    nameInput.value = " ",
    commentInput.value = " ";
    const comment = renderFn ({comments: commentsArr})
    commentList.innerHTML = comment
    
}

commentList.addEventListener('click', (e) =>{
    let targetButton = e.target;
    if(targetButton.className !== 'remove__button-img'){
        return
    } else {
        let id = targetButton.getAttribute('id')
        const commentIndex = commentsArr.findIndex((a => a.id === Number(id)))
        commentsArr.splice(commentIndex, 1)
        renderComments()

        
    }            
})


buttonSave.addEventListener('click',() => {
    localStorage.setItem('store', JSON.stringify({
        commList: commentsArr
    }))
    // alert('Data OK')
})


   

    

            // //сохранение данных в LocalStorage
            // const buttonSave = document.querySelector('.footer_submit');
            // buttonSave.addEventListener('click',() =>{
            //     localStorage.setItem('store', JSON.stringify({
            //         leftList: filterFriendsLeftArr,
            //         rightList:filterFriendsRightArr
            //     }))
            //     alert('Data OK')
            // })





