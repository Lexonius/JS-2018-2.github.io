import './styles/styles.css';
// // import { auth } from './utils'


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



let nameInput = document.querySelector('.input_name')
let commentInput = document.querySelector('.input_comment')
let addButton = document.querySelector('.button__add')

addButton.addEventListener('click',() => {
    if(nameInput.value || commentInput.value){
        getComments()
    } else {
        return
    }
})

function getComments(){

    let avatarImg = document.createElement('img')
    avatarImg.setAttribute ('src', './IMG/usuario.jpeg')
    avatarImg.setAttribute ('class', 'avatar_img')
    // console.log(avatarImg);
    let removeButton = document.createElement('img')
    removeButton.setAttribute ('src', './IMG/remove.png')
    removeButton.setAttribute ('class', 'remove__button-img')
    // console.log(removeButton)
    let nameRewiewer = nameInput.value;
    let comment = commentInput.value;
    let commentsArr = [];
    let commentObj = {
        avatar: avatarImg,
        name: nameRewiewer,
        comment: comment,
        remove: removeButton,
    }
    
    commentsArr.push(commentObj);
    renderComments(commentsArr)
}

function renderComments(commentsArr){
    let commentsList = document.querySelector('.comments_list')

    let rewiewer = document.createElement('li')
    rewiewer.setAttribute('class', 'rewiewer')
    commentsList.appendChild(rewiewer)

    let rewiewerLeftElem = document.createElement('div')
    rewiewerLeftElem.setAttribute('class', 'left')
    rewiewer.appendChild(rewiewerLeftElem)

    let rewiewerCenter = document.createElement('div')
    rewiewerCenter.setAttribute('class', 'center')
    rewiewer.appendChild(rewiewerCenter)

    let rewiewerCenterTop = document.createElement('div')
    rewiewerCenterTop.setAttribute('class', 'top')
    rewiewerCenter.appendChild(rewiewerCenterTop)

    //НЕ ЗАБУДЬ ВСТАВИТЬ ДАТУ!!!
    //НЕ ЗАБУДЬ ПОПРАВИТЬ КЛАССЫ!!!!

    let rewiewerCenterBottom = document.createElement('div')
    rewiewerCenterBottom.setAttribute('class', 'bottom')
    rewiewerCenter.appendChild(rewiewerCenterBottom)

    let commentElemRight = document.createElement('div')
    commentElemRight.setAttribute('class', 'right')
    rewiewer.appendChild(commentElemRight)
    
    commentsArr.forEach(item => {

        let commentsElem = item;
        console.log(commentsElem.name)
        rewiewerLeftElem.appendChild(commentsElem.avatar)

        let commentatorName = document.createElement('p')
        commentatorName.innerHTML = commentsElem.name
        commentatorName.setAttribute('class', 'name')
        rewiewerCenterTop.appendChild(commentatorName)

        let comment = document.createElement('p')
        comment.innerHTML = commentsElem.comment
        comment.setAttribute('class', 'comment')
        rewiewerCenterBottom.appendChild(comment)

        let removeComment = commentsElem.remove
        commentElemRight.appendChild(removeComment)
        
        commentsList.addEventListener('click', (e) =>{
            let targetButton = e.target;
            console.log(targetButton);
            if(targetButton.className !== 'remove__button-img'){
                return
            } else {
                
            }            
        })

    });
     

}


let buttonSave = document.querySelector('.save__button')
buttonSave.addEventListener('click',() => {
    
    save()
})

function save(){

}

   

    
    




