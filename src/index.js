import './styles/styles.css';

const init = () =>{
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: []
    })





    //по клику на карту мы получаем координаты нажатия
    myMap.events.add('click', e => {
        //в этой переменной лежат координаты
        let coords = e.get('coords');
        console.log(coords)

        let BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="baloon">'+
        '<div class="baloon__header">'+
            '<div class="adres">'+
            '</div>'+
            '<div class="button__clear">'+
                '<img src="./IMG/remove.png" >'+
            '</div>'+
        '</div>'+
        '<div class="baloon__content">'+
            '<div class="rewiews__block">'+
                '<ul class="rewiews__block--list">'+
                    '<li class="title">'+
                        'Отзывов пока нет...'+
                    '</li>'+
                '</ul>'+
                '<div class="rewiews__inputs">'+
                    '<div class="rewiews__inputs--title">'+
                        'Ваш отзыв'+
                    '</div>'+
                    '<input type="text" class="name-input" placeholder="Ваше имя">'+
                    '<input type="text" class="place-input" placeholder="Укажите место">'+
                    '<textarea class="comment-input" placeholder="Поделитесь впечатлениями"></textarea>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<div class="baloon__footer">'+
            '<button class="add"> Добавить </button>'+
        '</div>'+
    '</div>'
            )


        let myMarker = new ymaps.Placemark(coords, {
            closeButton: false
        },
        {
            balloonContentLayout: BalloonContentLayout,
        })
            myMap.geoObjects.add(myMarker); 


        // let baloon = document.querySelector('.baloon')
        // baloon.style.display = 'block';

        // myMap.balloon.open(coords, {
        // }, {
        //     // Опция: не показываем кнопку закрытия.
        //     // closeButton: false
        // });

    });
        

        

    
}

ymaps.ready(init)