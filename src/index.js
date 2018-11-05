import './styles/styles.css';
import renderFn from './templates/template.hbs'

//
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
        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
        '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
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

    // Заполняем кластер геообъектами со случайными позициями. 
    // var placemarks = []; 
    // for (var i = 0, l = 100; i < l; i++) { 
    // var placemark = new ymaps.Placemark(getRandomPosition(), { 
    // // Устаналиваем данные, которые будут отображаться в балуне. 
    // balloonContentHeader: 'Метка №' + (i + 1), 
    // balloonContentBody: getContentBody(i), 
    // balloonContentFooter: 'Мацуо Басё' 
    // }); 
    // placemarks.push(placemark); 
    // } 




    // function getRandomPosition () { 
    // return [ 
    // mapCenter[0] + (Math.random() * 0.3 - 0.15), 
    // mapCenter[1] + (Math.random() * 0.5 - 0.25) 
    // ]; 
    // } 

    var placemarkBodies;

    function getContentBody(num) {
        if (!placemarkBodies) {
            placemarkBodies = [
                ['Слово скажу -', 'Леденеют губы.', 'Осенний вихрь!'].join('<br/>'),
                ['Вновь встают с земли', 'Опущенные дождем', 'Хризантем цветы.'].join('<br/>'),
                ['Ты свечу зажег.', 'Словно молнии проблеск,', 'В ладонях возник.'].join('<br/>')
            ];
        }
        return '<br>' + placemarkBodies[num % placemarkBodies.length];
    }
    // clusterer.balloon.open(clusterer.getClusters()[0]); 

    // let contentLayoutMaket = ymaps.templateLayoutFactory.createClass( 
    // '<div class="baloon">'+ 
    // '<div class="baloon__header">'+ 
    // '<div class="adres">'+ 
    // '</div>'+ 
    // '<div class="button__clear">'+ 
    // '<img src="./IMG/remove.png" class="button__image--clear">'+ 
    // '</div>'+ 
    // '</div>'+ 
    // '<div class="baloon__content">'+ 
    // '<div class="rewiews__block">'+ 
    // '<ul class="rewiews__block--list">'+ 
    // '<li class="title">'+ 
    // 'Отзывов пока нет...'+ 
    // '</li>'+ 
    // '</ul>'+
    // '<div class="rewiews__inputs">'+ 
    // '<div class="rewiews__inputs--title">'+ 
    // 'Ваш отзыв'+ 
    // '</div>'+ 
    // '<div class="rewiewe__inputs--top">'+
    // '<input type="text" class="name-input" placeholder="Ваше имя">'+ 
    // '<input type="text" class="place-input" placeholder="Укажите место">'+ 
    // '</div>'+
    // '<textarea class="comment-input" placeholder="Поделитесь впечатлениями"></textarea>'+ 
    // '</div>'+ 
    // '</div>'+ 
    // '</div>'+ 
    // '<div class="baloon__footer">'+ 
    // `<button class="add-marker" onclick=savePlacemark()> Добавить </button>`+ 
    // '</div>'+ 
    // '</div>'
    // ) 

    // let buttonAdd = document.querySelector('.add')
    // let baloon = document.querySelector('.baloon')
    // let closeImage = document.querySelector('.button__image--clear')
    // let nameInput = document.querySelector('.name-input')
    // let placeInput = document.querySelector('.place-input')
    // let commentInput = document.querySelector('.name-input')
    // // let mape = document.querySelector('#map')
    // // let addressMarker;
    // let addressTitle = document.querySelector('.adres')
    // let points = [];
    // let markers;

    // map.events.add('click', e =>{ 
    //     let coords = e.get('coords');
    //     points.push(coords)
    //     // let coordsX = coords[0]
    //     // let coordsY =  coords[1]
    //     // console.log(coords)
    //     let position = e.get('position')
    //     // console.log(position)
    //     console.log(coords)
    //     baloon.style.display = 'block';
    //     baloon.style.left = position[0] + 'px';
    //     baloon.style.top = position[1] + 'px';
    //     getAdress(coords)
    //     for(let i = 0; i < points.length; i++){
    //         // console.log(points[i])
    //        let placemark = new ymaps.GeoObject({
    //             geometry:{
    //                 type: "Point",
    //                 coordinates:points[i]
    //             },
    //             properties:{
    //                 // address: 
    //                 // clusterCaption: 'Геообъект №2',
    //                 // balloonContentBody: 'Содержимое балуна геообъекта №2.'
    //             }
    //         });
    //         placemark.events.add('click', e => {
    //             baloon.style.display = 'block';
    //             addressTitle.innerHTML = 'загрузка...'
    //             baloon.style.left = position[0] + 'px';
    //             baloon.style.top = position[1] + 'px';
    //             getAdress(coords)
    //         })
    //         markers = placemark;
    //         // console.log(markersArr)
    //     }


    //     buttonAdd.addEventListener('click', e => {
    //         let nameText = nameInput.value
    //         let placeName = placeInput.value
    //         let commentText = commentInput.value
    //         console.log(nameText);
    //         console.log(placeName);
    //         console.log(commentText);
    //         nameInput.value = ''
    //         placeInput.value = ''
    //         clusterer.add(markers);
    //         map.geoObjects.add(clusterer); 
    //     })


    // closeImage.addEventListener('click', e =>{
    //     e.preventDefault()
    //     baloon.style.display = 'none';
    //     // coordsX = ''
    //     // console.log(coordsX)
    //     // coordsY = ''
    // })

    // function getAdress(){
    //     ymaps.geocode(coords).then(function (res) {
    //         var firstGeoObject = res.geoObjects.get(0);
    //         // var address = firstGeoObject.properties._data.balloonContent;
    //         let adress = firstGeoObject.getAddressLine()
    //         console.log(adress)
    //         addressTitle.innerHTML = adress
    //         // addressMarker = address;
    //         })
    //     }
    // })
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
    let rewiewObj;
    let allReviews = [];

    map.events.add('click', e => {

        coords = e.get('coords')

        position = e.get('position')

        baloon.style.display = 'block';
        baloon.style.left = position[0] + 'px';
        baloon.style.top = position[1] + 'px';

        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            let adress = firstGeoObject.getAddressLine()

            addressTitle.innerHTML = adress
        })
    });

    buttonAdd.addEventListener('click', e => {
        let id = function () {
            return '_' + Math.random().toString(36).substr(2, 9);
        };

        rewiewObj = {
            name: nameInput.value,
            place: placeInput.value,
            rewiew: commentInput.value,
            coordinates: coords,
            address: addressTitle.innerHTML,
            position: position,
            id: id()
        }
        if (!nameInput.value && !placeInput.value && !commentInput.value) {
            return
        } 
        nameInput.value = '';
        placeInput.value = '';
        commentInput.value = '';

        placemark = new ymaps.GeoObject({
            geometry: {
                type: 'Point',
                coordinates: rewiewObj.coordinates
            },
            properties: {
                id: rewiewObj.id,
                addressPlacemark: rewiewObj.address,
                reviews: rewiewObj.rewiew,
                coordinates: rewiewObj.coordinates,
                position: position,
                name: rewiewObj.name,
                place: rewiewObj.place,
                review: rewiewObj.review
                // balloonContentHeader: rewiewObj.address,
                // balloonContentBody: rewiewObj.rewiew
                // balloonContentFooter: i.rewiew
            }
        });

        allReviews.push(rewiewObj);
        clusterer.add(placemark);
        map.geoObjects.add(clusterer);
    })

    clusterer.events.add('click', e =>{
        
        let placemarkClick = e.get('target')

        if (!placemarkClick.hasOwnProperty('_clusterListeners')) {
            // let id = placemarkClick.properties.get('id')
            baloon.style.left = placemarkClick.properties._data.position[0] + 'px';
            baloon.style.top = placemarkClick.properties._data.position[1] + 'px';
            baloon.style.display = 'block';
            console.log(allReviews);

            let filterReviews = allReviews.filter(i => i.address === placemarkClick.properties._data.addressPlacemark);

            filterReviews.forEach(element => {
                console.log(element.address)
                console.log(placemarkClick.properties._data.addressPlacemark)
                if (placemarkClick.properties._data.addressPlacemark !== element.address) {
                    return
                } else {
                    let _review = renderFn({ list: filterReviews })
                    reviewList.innerHTML = _review
                }
            });
            
            // console.log(_review);
            // let _review = renderFn({ list: filterReviews })
            //     reviewList.innerHTML = _review
            
            addressTitle.innerHTML = placemarkClick.properties._data.addressPlacemark;

            console.log(placemarkClick)
        } else {
            console.log('FUCKING CLUSTER')
            let _geoObjects = placemarkClick.properties._data.geoObjects;

            for (let i = 0; i < _geoObjects.length; i++) {
                // let id = _geoObjects[i].properties.get('id');

                // console.log(_geoObjects[i])
            }
        }
    })

    closeImage.addEventListener('click', e => {
        e.preventDefault()
        baloon.style.display = 'none';
    })
    
})