import './styles/styles.css';
// // import { auth } from './utils'
import renderFn from './templates/template.hbs'

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
    console.log(nameInput.value)
    console.log(commentInput.value)
    let isInvalid = false;

    if (!nameInput.value) {
        nameInput.style.border = "3px solid #BE4F4F";
        isInvalid = true;
    }

    if (!commentInput.value) {
        commentInput.style.border = "3px solid #BE4F4F";
        isInvalid = true;
    }

    if (isInvalid) {
        return;
    }

    getComments();
})

nameInput.addEventListener('keydown',() =>{
    nameInput.style.border = "3px solid #6BCBB6"
})

commentInput.addEventListener('keydown',() =>{
    commentInput.style.border = "3px solid #6BCBB6"
})

addButton.addEventListener('mouseover',() => {
    addButton.style.background = '#53BBA8';
})

addButton.addEventListener('mouseout',() => {
    addButton.style.background = '#6BCBB6';
})

buttonSave.addEventListener('mouseover',() => {
    buttonSave.style.background = '#53BBA8';
})

buttonSave.addEventListener('mouseout',() => {
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
    }
    commentsArr.push(commentObj);
    renderComments()
}

    

function renderComments(){
    nameInput.value = "",
    commentInput.value = "";
    const comment = renderFn ({comments: commentsArr})
    commentList.innerHTML = comment
    
}

commentList.addEventListener('click', (e) =>{
    let targetButton = e.target;
    if(targetButton.className !== 'remove__button-img'){
        return
    } else {
        let id = targetButton.getAttribute('data-id')
        const commentIndex = commentsArr.findIndex((a => a.id === Number(id)))
        commentsArr.splice(commentIndex, 1)
        renderComments();
    }            
})

buttonSave.addEventListener('click',() => {
    localStorage.setItem('store', JSON.stringify({
        commList: commentsArr
    }))
    // alert('Data OK')
})

window.dragStart = function(e){
    e.dataTransfer.effectAllowed='move';
    e.dataTransfer.setData("Text", e.target.getAttribute('id'));   
    return true;
}

   







