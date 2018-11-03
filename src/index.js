import './styles/styles.css'; 
import renderFn from './templates/template.hbs'

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
    function getContentBody (num) { 
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
    let buttonAdd = document.querySelector('.add')
    let baloon = document.querySelector('.baloon')
    let closeImage = document.querySelector('.button__image--clear')
    let nameInput = document.querySelector('.name-input')
    let placeInput = document.querySelector('.place-input')
    let commentInput = document.querySelector('.comment-input')
    let addressTitle = document.querySelector('.adres')

    map.events.add('click', e =>{
        let coords = e.get('coords')
        console.log(coords)
        let position = e.get('position')
        baloon.style.display = 'block';
        baloon.style.left = position[0] + 'px';
        baloon.style.top = position[1] + 'px';
        let markers = [];
        // let geoObj = [];
        let placemarks;
        
        
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            // var address = firstGeoObject.properties._data.balloonContent;
            let adress = firstGeoObject.getAddressLine()
            console.log(adress)
            addressTitle.innerHTML = adress
            })
        

        buttonAdd.addEventListener('click', e => {
            console.log('6')
            let rewiewObj = {
                name: undefined,
                place: undefined,
                rewiew: undefined,
                coordinates: undefined,
                address: undefined
            }
            
            let nameRewiewer = nameInput.value;
            let placeName = placeInput.value;
            let commentText = commentInput.value;
            nameInput.value = '';
            placeInput.value = '';
            commentInput.value = '';
            
            rewiewObj.coordinates = coords;
            rewiewObj.name = nameRewiewer;
            rewiewObj.place = placeName;
            rewiewObj.rewiew = commentText;
            if(!nameRewiewer && !placeName && !commentText){
                return
            } else {
                markers.push(rewiewObj);
                
                console.log(markers);
            }

            markers.forEach( i => {
                console.log(i.address);
                let placemark = new ymaps.GeoObject({
                    geometry:{
                       type: "Point",
                       coordinates: i.coordinates
                    },
                    properties:{
                        balloonContentHeader: i.address,
                        balloonContentBody: 'Содержимое балуна геообъекта №2.',
                        balloonContentFooter: 'dsfsd'
                    }
                });
                placemarks = placemark;
            });
            clusterer.add(placemarks);
            map.geoObjects.add(clusterer);
            // console.log(markers);
            // console.log(placemark);
        })

        closeImage.addEventListener('click', e => {
            e.preventDefault()
            baloon.style.display = 'none';
        })

        
    })



});
