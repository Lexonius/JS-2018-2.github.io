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
        '<div class=ballon_header> {{ properties.place|raw }} </div>' +
        '<div class=ballon_body><a href=# data-id="{{properties.id|raw}}">{{ properties.addressPlacemark|raw }}</a><br>{{ properties.review|raw }}</div>' +
        '<div class=ballon_footer><br>{{ properties.date|raw }}</div>'
    );

    var clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedRedClusterIcons',
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
        clusterBalloonPagerSize: 5,
        hideIconOnBalloonOpen: false,
        cursor: 'pointer'
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
    let clientWidth = document.documentElement.clientWidth
    let clientHeight = document.documentElement.clientHeight
    let coords;
    let placemark;
    let position;
    let idObj;
    let reviewObj;
    let allReviews = [];
    //по нажатию на карту

    // if(localStorage.getItem('store')){
    //     let revParse = JSON.parse(localStorage.getItem('store'))
    //     let revListArr = revParse;
    //     alert("nice")
    //     console.log(revListArr);
    // }    

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
        let baloonWidth = baloon.getBoundingClientRect().width + position[0];

        let baloonHeight = baloon.getBoundingClientRect().height + position[1];
        //если ширина или высота балуна + координаты x или y больше или равны ширине или высоте окна
        if(baloonWidth >= clientWidth && baloonHeight >= clientHeight){
            //тогда вычитаем из ширины или длины окна ширину или высоту балуна
            baloon.style.left = clientWidth - baloon.getBoundingClientRect().width + 'px';
                
            baloon.style.top = clientHeight - baloon.getBoundingClientRect().height + 'px';
        } else {
            baloon.style.left = position[0] + 'px';
            baloon.style.top = position[1] + 'px';
        }
        
        reviewList.innerHTML = 'Отзывов нет...'
        //получаем координаты
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            //получаем координаты в виде строки
            let adress = firstGeoObject.getAddressLine()
            //вставляем координаты в header карточки
            addressTitle.innerHTML = adress
        })
        
        let id = function () {
            return '_' + Math.random().toString(36).substr(2, 9);
        };
        idObj = id()

            
    });

    buttonAdd.addEventListener('click', () => {
        
        let now = new Date();
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
            id: idObj,
            date: {
                weekDay: now.getDate(),
                month: now.getMonth(),
                year: now.getFullYear(),
                hour: now. getHours(),
                minutes: now.getMinutes()
            }
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
                date: reviewObj.id
            }
            },{
                preset:'islands#redCircleDotIcon',
        });
        //пушим созданный объект в массив
        allReviews.push(reviewObj);
        //добавляем в кластер метку
        clusterer.add(placemark);
        //отрисовываем кластер
        map.geoObjects.add(clusterer);
        //фильтруем массив со всеми добавленными объектами:
        //если id у элемента массива совпадает с id
        //метки, то получаем новый массив с нужным элементом
        let filterReviews = allReviews.filter(i => i.id === placemark.properties._data.id);
        
        //новый массив перебираем циклом
        filterReviews.forEach(element => {
            //проверяем, что если id метки не совпадает с id элементом массива
            //то прерываем работу функции
            // console.log(placemark.properties._data.id);
            
            if (placemark.properties._data.id !== element.id) {
                return
            }
            //отправляем в шаблонизатор отфильтрованный массив и отрисовываем
            let _review = renderFn({ list: filterReviews })

            reviewList.innerHTML = _review
        });
            // localStorage.setItem('store', JSON.stringify({
            //     revList: allReviews
            // }))
            // alert('Data OK')
    })

    let placemarkClick;
    //по нажатию на кластер
    clusterer.events.add('click', e =>{
        //смотрим на какой элемент пришелся клик
        placemarkClick = e.get('target')
        console.log(e.get('position'));
        
        //если у кликнутого элемента есть свойство
        if (!placemarkClick.hasOwnProperty('_clusterListeners')) {
            //то передвигаем и выводим на экран карточку по позиции,
            //значения которой лежат в свойстве кликнутой метки
        //отображаем блок
        baloon.style.display = 'block';
        //перменная, внутри которой дежит ширина балуна + координаты х
        let baloonWidth = baloon.getBoundingClientRect().width + placemarkClick.properties._data.position[0];
        //перменная, внутри которой дежит высота балуна + координаты у
        let baloonHeight = baloon.getBoundingClientRect().height + placemarkClick.properties._data.position[1];
            //если ширина или высота балуна + координаты x или y больше или равны ширине или высоте окна
        if(baloonWidth >= clientWidth || baloonHeight >= clientHeight){
            //тогда вычитаем из ширины или длины окна ширину или высоту балуна
            baloon.style.left = clientWidth - baloon.getBoundingClientRect().width + 'px';
                
            baloon.style.top = clientHeight - baloon.getBoundingClientRect().height + 'px';
        } else {
            baloon.style.left = placemarkClick.properties._data.position[0] + 'px';

            baloon.style.top = placemarkClick.properties._data.position[1] + 'px';
        }

            //фильтруем массив со всеми добавленными объектами:
            //если id у элемента массива совпадает с id
            //метки, то получаем новый массив с нужным элементом
            let filterReviews = allReviews.filter(i => i.id === placemarkClick.properties._data.id);
            //новый массив перебираем циклом
            filterReviews.forEach(element => {
                //проверяем, что если адрес кликнутой метки не совпадает с адресом элементом массива
                //то прерываем работу функции
                if (placemarkClick.properties._data.id !== element.id) {
                    return
                }
                //отправляем в шаблонизатор отфильтрованный массив и отрисовываем
                let _review = renderFn({ list: filterReviews })
    
                reviewList.innerHTML = _review
            });

            addressTitle.innerHTML = placemarkClick.properties._data.addressPlacemark;

        } 
    })

    document.addEventListener('click', e => {
        let linkTarget = e.target;

        if (linkTarget.tagName !== 'A'){
            return
        } else {

        baloon.style.display = 'block';
        let baloonWidth = baloon.getBoundingClientRect().width + e.pageX;

        let baloonHeight = baloon.getBoundingClientRect().height + e.pageY;


        if(baloonWidth >= clientWidth || baloonHeight >= clientHeight){
            baloon.style.left = clientWidth - baloon.getBoundingClientRect().width + 'px';
  
            baloon.style.top = clientHeight - baloon.getBoundingClientRect().height + 'px';

        } else {
            baloon.style.left = e.pageX + 'px';
            baloon.style.top = e.pageY + 'px';
        }
            
            let filterReviews = allReviews.filter(i => i.id === linkTarget.getAttribute('data-id'));
                
            filterReviews.forEach(element => {
                //проверяем, что если адрес кликнутой метки не совпадает с адресом элементом массива
                //то прерываем работу функции
                if (linkTarget.getAttribute('data-id') !== element.id) {
                    return
                }
                //отправляем в шаблонизатор отфильтрованный массив и отрисовываем
                let _review = renderFn({ list: filterReviews })
    
                reviewList.innerHTML = _review
            });
            
        }
        
    })
    closeImage.addEventListener('click', e => {
        e.preventDefault()
        baloon.style.display = 'none';
    })
    
})