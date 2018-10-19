import './styles/styles.css';
// import { auth } from './utils'
import renderFn from './templates/template.hbs'

    let leftListArray = [];
    let rightListArray = [];

    const friendsListLeft = document.querySelector('.friends__list-left');
    const friendsListRight = document.querySelector('.friends__list-right');
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
                    resolve(data.response)
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
        // const template = document.querySelector('.friends__list').textContent
        // console.log(friends);
        // let friendsArr = friends;
        const leftListHtml = renderFn ({ my_friends: friends.items, isLeft: true });
        // console.log(leftListHtml);
        
        const rightListHtml = renderFn ({ my_friends: friends.items, ifLeft: false });
        // console.log(friends.items)
        
        // console.log(html)
        friendsListLeft.innerHTML = leftListHtml;
        
        
        // const buttonRemove = document.querySelector('.remove_friend');
        // const leftList = document.querySelector('.left');
        const rightList = document.querySelector('.right');
        const friendsList = document.querySelector('.friends__list');
        const friend = document.querySelector('.friend');
        // console.log(friend)
        
        leftListArray = friends.items;
        // console.log(leftListArray)

        friendsListLeft.addEventListener('click', (e) => {
            let targetButton = e.target;
            // console.log(targetButton)
            if(targetButton.tagName !== 'IMG'){
                return
            } else {
                let id = targetButton.getAttribute('data-id')
                // console.log(id)
                // console.log(leftListArray);
                const friendIndex = leftListArray.findIndex((friend => friend.id === Number(id)))
                rightListArray.push(leftListArray[friendIndex])
                leftListArray.splice(friendIndex, 1);
                const leftListHtml = renderFn ({ my_friends: leftListArray, isLeft: true });
                const rightListHtml = renderFn ({ my_friends: rightListArray, isLeft: false });
                friendsListLeft.innerHTML = leftListHtml;
                friendsListRight.innerHTML = rightListHtml;
                // console.log(rightListArray);
            }
        })

        friendsListRight.addEventListener('click', (e) => {
            // console.log(friendsListRight)
            let targetButton = e.target;
            // console.log(targetButton)
            // console.log(targetButton)
            if(targetButton.tagName !== 'IMG'){
                return
            } else {
                let id = targetButton.getAttribute('data-id')
                // console.log(id)
                // console.log(leftListArray);
                const friendIndex = rightListArray.findIndex((friend => friend.id === Number(id)))
                // console.log(friendIndex);
                
                leftListArray.push(rightListArray[friendIndex])
                rightListArray.splice(friendIndex, 1)
                
                const rightListHtml = renderFn ({ my_friends: rightListArray, isLeft: false });
                const leftListHtml = renderFn ({ my_friends: leftListArray, isLeft: true });
                friendsListRight.innerHTML = rightListHtml;
                friendsListLeft.innerHTML = leftListHtml;
                // console.log(rightListArray);
            }
        })

        let filterInputLeft = document.querySelector('#search_left')
        let filterInputRight = document.querySelector('#search_right')
        let filterFriendsLeftArr = [];
        filterFriendsLeftArr = leftListArray;
        let filterFriendsRightArr = [];
        filterFriendsRightArr = rightListArray;

        filterInputLeft.addEventListener('keyup',() => {
            renderFriendsListLeft();
        })
        filterInputRight.addEventListener('keyup',() => {
            renderFriendsListRight();
        })

        function renderFriendsListLeft(){
            if(filterInputLeft.value){
                filterFriendsLeftArr = leftListArray.filter((item) => isMatching (item.first_name, filterInputLeft.value) || isMatching(item.last_name, filterInputLeft.value))
            } 
            else {
                filterFriendsLeftArr = leftListArray;
            }
            // }
            const leftListHtml = renderFn ({ my_friends: filterFriendsLeftArr, isLeft: true });
            friendsListLeft.innerHTML = leftListHtml;
            renderFilterFriendLeft()
        }

        function renderFriendsListRight(){
                if(filterInputRight.value){
                    filterFriendsRightArr = rightListArray .filter((item) => isMatching (item.first_name, filterInputRight.value) || isMatching(item.last_name, filterInputRight.value))

                } else {
                    filterFriendsRightArr = rightListArray;
                }
            const rightListHtml = renderFn ({ my_friends: filterFriendsRightArr, isLeft: false });
            friendsListRight.innerHTML = rightListHtml;
            
        }

        function isMatching(full, chunk) {
            if(full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1){
              return true;
            } else {
              return false;
            }
          }

        function renderFilterFriendLeft() {
            for(let i = 0; i < filterFriendsLeftArr.length; i++){
                console.log(filterFriendsLeftArr[i].first_name)
                
            }
        }
        
        // function save(){
        //     let storage = localStorage;
        //     console.log(storage)
        //     let buttonSave = document.querySelector('.footer_submit');
        //     console.log(buttonSave)
        //     buttonSave.addEventListener('click',() =>{
        //         localStorage.setItem('friendsListLeft', JSON.stringify(filterFriendsLeftArr))
        //         localStorage.setItem('friendsListRight', JSON.stringify(filterFriendsRightArr))
        //     })
        // }
        // save()








    })




    // function dragStart(event){
    //     event.dataTransfer.effectAllowed='move';

    // }
    // dragStart();

    
    




