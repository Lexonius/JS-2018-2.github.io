import './styles/styles.css';
import renderFn from './templates/template.hbs'

const ymaps = window.ymaps;

ymaps.ready(function () {
    var mapCenter = [55.755381, 37.619044],
        map = new ymaps.Map('map', {
            center: mapCenter,
            zoom: 9,
            controls: []
        });

    // Создаем собственный макет с информацией о выбранном геообъекте. 
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html. 
        '<div class=ballon_header> <a href=#>{{ properties.place|raw }} </a></div>' +
        '<div class=ballon_body>{{ properties.review|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.date|raw }}</div>'
    );

    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Карусель". 
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        // Устанавливаем собственный макет. 
        clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем режим открытия балуна. 
        // В данном примере балун никогда не будет открываться в режиме панели. 
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях). 
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        // Устанавливаем максимальное количество элементов в нижней панели на одной странице 
        clusterBalloonPagerSize: 5
        // Настройка внешего вида нижней панели. 
        // Режим marker рекомендуется использовать с небольшим количеством элементов. 
        // clusterBalloonPagerType: 'marker', 
        // Можно отключить зацикливание списка при навигации при помощи боковых стрелок. 
        // clusterBalloonCycling: false, 
        // Можно отключить отображение меню навигации. 
        // clusterBalloonPagerVisible: false 
    });

    let buttonAdd = document.querySelector('.add');
    let baloon = document.querySelector('.baloon');
    let closeImage = document.querySelector('.button__image--clear');
    let nameInput = document.querySelector('.name-input');
    let placeInput = document.querySelector('.place-input');
    let commentInput = document.querySelector('.comment-input');
    let addressTitle = document.querySelector('.adres');
    let reviewList = document.querySelector('.review__list');
    let coords;
    let placemark;
    let position;
    let reviewObj;
    let allReviews = [];
    
    //по нажатию на карту
    map.events.add('click', e => {
        //получаем координаты
        coords = e.get('coords')
        //получаем позицию
        position = e.get('position')
        //обнуляем инпуты
        nameInput.value = '';
        placeInput.value = '';
        commentInput.value = '';
        reviewList.innerHTML = '';
        baloon.style.display = 'block';
        baloon.style.left = position[0] + 'px';
        baloon.style.top = position[1] + 'px';
        reviewList.innerHTML = 'Отзывов нет...'
        //получаем координаты
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            //получаем координаты в виде строки
            let adress = firstGeoObject.getAddressLine()
            //вставляем координаты в header карточки
            addressTitle.innerHTML = adress
        })
    });

    buttonAdd.addEventListener('click', () => {
        let id = function () {
            return '_' + Math.random().toString(36).substr(2, 9);
        };
        let date = new Date();
        //по нажатию на кнопку добавить создаем объект,
        //свойства которого заполняем значенями инпутов,
        //координатами и позицией, датой
        reviewObj = {
            name: nameInput.value,
            place: placeInput.value,
            review: commentInput.value,
            coordinates: coords,
            address: addressTitle.innerHTML,
            position: position,
            id: id(),
            date: date.toUTCString()
        }
        //проверяем, если какое либо из полей не заполнено,
        //прерываем работу функции
        if (!nameInput.value || !placeInput.value || !commentInput.value) {
            return
        } 
        //очищаем поля ввода
        nameInput.value = '';
        placeInput.value = '';
        commentInput.value = '';
        //создаем метку
        placemark = new ymaps.GeoObject({
            geometry: {
                type: 'Point',
                //пердаем метке координаты из объекта
                coordinates: reviewObj.coordinates
            },
            properties: {
                id: reviewObj.id,
                addressPlacemark: reviewObj.address,
                // reviews: reviewObj.review,
                coordinates: reviewObj.coordinates,
                position: position,
                name: reviewObj.name,
                place: reviewObj.place,
                review: reviewObj.review,
                date: reviewObj.date
            }
        });
        //пушим созданный объект в массив
        allReviews.push(reviewObj);
        //добавляем в кластер метку
        clusterer.add(placemark);
        //отрисовываем кластер
        map.geoObjects.add(clusterer);
        //фильтруем массив со всеми добавленными объектами:
        //если адрес у элемента массива совпадает с адресом
        //метки, то получаем новый массив с нужным элементом
        let filterReviews = allReviews.filter(i => i.address === placemark.properties._data.addressPlacemark);
        //новый массив перебираем циклом
        filterReviews.forEach(element => {
            //проверяем, что если адрес метки не совпадает с адресом элементом массива
            //то прерываем работу функции
            if (placemark.properties._data.addressPlacemark !== element.address) {
                return
            }
            //отправляем в шаблонизатор отфильтрованный массив и отрисовываем
            let _review = renderFn({ list: filterReviews })

            reviewList.innerHTML = _review
        });
    })
    //по нажатию на кластер
    clusterer.events.add('click', e =>{
        //смотрим на какой элемент пришелся клик
        let placemarkClick = e.get('target')
        //если у кликнутого элемента есть свойство
        if (!placemarkClick.hasOwnProperty('_clusterListeners')) {
            //то передвигаем и выводим на экран карточку по позиции,
            //значения которой лежат в свойстве кликнутой метки
            baloon.style.left = placemarkClick.properties._data.position[0] + 'px';
            baloon.style.top = placemarkClick.properties._data.position[1] + 'px';
            baloon.style.display = 'block';
            //фильтруем массив со всеми добавленными объектами:
            //если адрес у элемента массива совпадает с адресом
            //метки, то получаем новый массив с нужным элементом
            let filterReviews = allReviews.filter(i => i.address === placemarkClick.properties._data.addressPlacemark);
            //новый массив перебираем циклом
            filterReviews.forEach(element => {
                //проверяем, что если адрес кликнутой метки не совпадает с адресом элементом массива
                //то прерываем работу функции
                if (placemarkClick.properties._data.addressPlacemark !== element.address) {
                    return
                }
                let _review = renderFn({ list: filterReviews })
                
                reviewList.innerHTML = _review
            });

            addressTitle.innerHTML = placemarkClick.properties._data.addressPlacemark;

        } 
    })

    document.addEventListener('click', e => {
        let linkTarget = e.target;

        console.log(linkTarget)
        if (linkTarget.tagName !== 'A'){
            console.log ('34');
            return
        } else {
            baloon.style.display = 'block';
            baloon.style.left = reviewObj.position[0] + 'px';
            baloon.style.top = reviewObj.position[1] + 'px';
        }
        
    })
    closeImage.addEventListener('click', e => {
        e.preventDefault()
        baloon.style.display = 'none';
    })
    
})