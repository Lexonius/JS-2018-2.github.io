import './styles/styles.css';
// import { auth } from './utils'
import renderFn from './templates/template.hbs'

    let leftListArray = [];
    let rightListArray = [];
    
    const friendsListLeft = document.querySelector('.friends__list-left');
    const friendsListRight = document.querySelector('.friends__list-right');
    let filterInputLeft = document.querySelector('#search_left')
    let filterInputRight = document.querySelector('#search_right')
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
                    console.log(data.response)
                }
            });
        })
    }

    authVk()
    
    .then(() => {
        return callAPI ('users.get', { name_case: 'gen'});
    })
    .then(([me]) => {
        const headerInfo = document.querySelector('.header__title');
        headerInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`;
        return callAPI('friends.get', {fields: 'photo_100'});
    })
    .then(friends => {
        // проврка: если друзья есть и в левом и в правом списке, то я их кладу в свои массивы, если их нет, то я беру friends.items и кладу в левый список, в правый пустой массив
        if(localStorage.getItem('store')){
            let friendsParse = JSON.parse(localStorage.getItem('store'))
            alert("nice")
            console.log(friendsParse)
            leftListArray = friendsParse.leftList;
            rightListArray = friendsParse.rightList;
            console.log(leftListArray)
            console.log(rightListArray)
            renderFriendsListLeft();
            renderFriendsListRight();
        } else {
            leftListArray = friends.items;
            rightListArray = [];
            renderFriendsListLeft();
            renderFriendsListRight();
        }
        
        leftListArray = friends.items;
        
        // по нажатию на кнопку внутри контейнера, выполняется поиск элемента, внутри которого лежит кнопка, после чего элемент переносится
        // в правый контейнер и удаляется из левого
        friendsListLeft.addEventListener('click', (e) => {
            // смотрим, на какой элемент приходится клик
            let targetButton = e.target;
            // если клик пришелся не на изображение кнопки, то
            if(targetButton.tagName !== 'IMG'){
                //завершаем работу функции
                return
            } else {
                //определяем id у кнопки
                let id = targetButton.getAttribute('data-id')
                //выявляем индекс элмента через id, на которую пришелся клик (обрати внимание на то, что id приходит числом, а нужен строкой)
                const friendIndex = leftListArray.findIndex((friend => friend.id === Number(id)))
                //пушим в правый массив элемент с индексом, который нам вернул findIndex
                rightListArray.push(leftListArray[friendIndex])
                //вырезаем элемент с полученным выше индексом
                leftListArray.splice(friendIndex, 1);
                //заново отрисовываем отфильтрованные массивы
                renderFriendsListLeft();
                renderFriendsListRight();
            }
        })
        // по нажатию на кнопку внутри контейнера, выполняется поиск элемента, внутри которого лежит кнопка, после чего элемент переносится
        // в левый контейнер и удаляется из правого (логику работы смотри выше)
        friendsListRight.addEventListener('click', (e) => {
            let targetButton = e.target;
            if(targetButton.tagName !== 'IMG'){
                return
            } else {
                let id = targetButton.getAttribute('data-id')
                const friendIndex = rightListArray.findIndex((friend => friend.id === Number(id)))
                leftListArray.push(rightListArray[friendIndex])
                rightListArray.splice(friendIndex, 1)
                renderFriendsListLeft();
                renderFriendsListRight();
            }
        })

        
        //создаем пустой массив, в который кладем первоначальный массив. Получается массив, изменив который мы не затронем первоначальный массив.
        let filterFriendsLeftArr = [];
        filterFriendsLeftArr = leftListArray;
        let filterFriendsRightArr = [];
        filterFriendsRightArr = rightListArray;

        // по нажатию на клавишу в поле ввода вызывается функция по отрисовке левого списка
        filterInputLeft.addEventListener('keyup',() => {
            renderFriendsListLeft();
        })

        // по нажатию на клавишу в поле ввода вызывается функция по отрисовке правого списка
        filterInputRight.addEventListener('keyup',() => {
            renderFriendsListRight();
        })

        // функция по рендерингу левого списка друзей
        function renderFriendsListLeft(){
            // если в левое поле ввода есть значения
            if(filterInputLeft.value){
                // то фильтруем массив с друзьями из левого списка (по имени, фамилии)
                filterFriendsLeftArr = leftListArray.filter((item) => isMatching (item.first_name + " " + item.last_name, filterInputLeft.value))
            } else {
                //если поле ввода пустое, то на отрисовку отдаем неизмененный первоначальный массив
                filterFriendsLeftArr = leftListArray;
            }
            const leftListHtml = renderFn ({ my_friends: filterFriendsLeftArr, isLeft: true });
            friendsListLeft.innerHTML = leftListHtml;
        }

        //функция по рендерингу правого списка друзей (смотри выше)
        function renderFriendsListRight(){
            if(filterInputRight.value){
                filterFriendsRightArr = rightListArray.filter((item) => isMatching (item.first_name + " " + item.last_name, filterInputRight.value))
            } else {
                filterFriendsRightArr = rightListArray;
            }
            const rightListHtml = renderFn ({ my_friends: filterFriendsRightArr, isLeft: false });
            friendsListRight.innerHTML = rightListHtml;
            
        }
        // функция по проверке подстроки в строке
        function isMatching(full, chunk) {
            if(full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1){
              return true;
            } else {
              return false;
            }
          }
        let storage = localStorage;
            //сохранение данных в LocalStorage
            const buttonSave = document.querySelector('.footer_submit');
            buttonSave.addEventListener('click',() =>{
                localStorage.setItem('store', JSON.stringify({
                    leftList: filterFriendsLeftArr,
                    rightList:filterFriendsRightArr
                }))
                alert('Data OK')
            })
            
        







    })




    // function dragStart(event){
    //     event.dataTransfer.effectAllowed='move';

    // }
    // dragStart();

    
    




