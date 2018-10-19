import { rejects } from "assert";

// export const auth = () => {

//     VK.init({
//         apiId: 6502079
//     });

//     function authVk(){
//         return new Promise((resolve, reject) => {
//             VK.Auth.login (data =>{
//                 if (data.session){
//                     resolve();
//                 } else {
//                     reject(new Error('Не удалось авторизироваться'))
//                 }
//             }, 2) 
//         })
//     } 
//     authVk().then(() => console.log('ok'))

//     function callAPI (method, params) {
//         params.v = '5.76';

//         return new Promise((resolve, reject) => {
//             VK.api(method, params, (data) => {
//                 if (data.error) {
//                     reject (data.error);
//                 } else {
//                     resolve(data.response)
//                 }
//             });
//         })
//     }

//     authVk().then(() => {
//         return callAPI ('users.get', { name_case: 'gen'});
//     })
//     .then(([me]) => {
//         const headerInfo = document.querySelector('.header__title');
//         headerInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`;

//         return callAPI('friends.get', {fields: 'sity, country, photo__100'});
//     })
//     .then(friends => {
//         console.log(friends);
//         // const template = document.querySelector('.friends__list')
//         // // import renderFn from './templates/template.hbs'
//         const html = renderFn ({ items: friends, flag: true });
//         const container = document.querySelector('.friends__list')
//     })








    
