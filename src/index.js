import "./styles/styles.css";
import renderFn from "./templates/template.hbs";

const ymaps = window.ymaps;

let revListArr;

if (localStorage.getItem("store")) {
  let revParse = JSON.parse(localStorage.getItem("store"));
  revListArr = revParse.revList;
} else {
  revListArr = [];
}

ymaps.ready(function() {
  var mapCenter = [55.755381, 37.619044],
    map = new ymaps.Map("map", {
      center: mapCenter,
      zoom: 9,
      controls: []
    });

  // Создаем собственный макет с информацией о выбранном геообъекте.
  var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
    // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
    "<div class=ballon_header> {{ properties.place|raw }} </div>" +
      '<div class=ballon_body><a href=# data-id="{{properties.id|raw}}">{{ properties.addressPlacemark|raw }}</a><br>{{ properties.review|raw }}</div>' +
      "<div class=ballon_footer><br>{{ properties.date.weekDay|raw }}.{{properties.date.month|raw}}.{{properties.date.year|raw}} {{properties.date.hour|raw}}:{{properties.date.minutes|raw}}</div>"
  );

  let clusterer = new ymaps.Clusterer({
    preset: "islands#invertedRedClusterIcons",
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    // Устанавливаем стандартный макет балуна кластера "Карусель".
    clusterBalloonContentLayout: "cluster#balloonCarousel",
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
    cursor: "pointer"
  });

  let buttonAdd = document.querySelector(".add");
  let baloon = document.querySelector(".baloon");
  let closeImage = document.querySelector(".button__image--clear");
  let nameInput = document.querySelector(".name-input");
  let placeInput = document.querySelector(".place-input");
  let commentInput = document.querySelector(".comment-input");
  let addressTitle = document.querySelector(".adres");
  let reviewList = document.querySelector(".review__list");
  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;
  let coords;
  let placemark;
  let placemark1;
  let position;
  let idObj;
  let reviewObj;
  let allReviews = [];
  let elem;

  function openBaloon(position) {
    baloon.style.display = "block";

    let baloonWidth = baloon.getBoundingClientRect().width + position[0];

    let baloonHeight = baloon.getBoundingClientRect().height + position[1];

    if (baloonWidth >= clientWidth) {
      baloon.style.left =
        clientWidth - baloon.getBoundingClientRect().width + "px";
    } else {
      baloon.style.left = position[0] + "px";
    }

    if (baloonHeight >= clientHeight) {
      baloon.style.top =
        clientHeight - baloon.getBoundingClientRect().height + "px";
    } else {
      baloon.style.top = position[1] + "px";
    }
  }

  function writeAddress() {
    ymaps.geocode(coords).then(function(res) {
      let firstGeoObject = res.geoObjects.get(0);

      //получаем координаты в виде строки
      let adress = firstGeoObject.getAddressLine();

      //вставляем координаты в header карточки
      addressTitle.innerHTML = adress;
    });
  }

  function renderReview(elem) {
    let filterReviews = allReviews.filter(i => i.id === elem);

    let _review = renderFn({ list: filterReviews });

    reviewList.innerHTML = _review;
  }

  revListArr.forEach(element => {
    placemark = new ymaps.GeoObject(
      {
        geometry: {
          type: "Point",
          coordinates: element.coordinates
        },

        properties: {
          id: element.id,
          addressPlacemark: element.address,
          coordinates: element.coordinates,
          name: element.name,
          place: element.place,
          review: element.review,
          date: element.date
        }
      },
      {
        preset: "islands#redCircleDotIcon"
      }
    );

    allReviews.push(element);
    clusterer.add(placemark);
  });

  map.geoObjects.add(clusterer);

  //по нажатию на карту
  map.events.add("click", e => {
    //получаем координаты
    coords = e.get("coords");

    //получаем позицию
    position = e.get("position");

    //обнуляем инпуты
    nameInput.value = "";
    placeInput.value = "";
    commentInput.value = "";
    reviewList.innerHTML = "";

    openBaloon(position);

    reviewList.innerHTML = "Отзывов нет...";

    //получаем координаты
    writeAddress();

    let id = function() {
      return (
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9)
      );
    };

    idObj = id();
  });

  buttonAdd.addEventListener("click", e => {
    let now = new Date();
    console.log(coords);
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
        hour: now.getHours(),
        minutes: now.getMinutes()
      }
    };

    //проверяем, если какое либо из полей не заполнено,
    //прерываем работу функции
    if (!nameInput.value || !placeInput.value || !commentInput.value) {
      return;
    }

    //очищаем поля ввода
    nameInput.value = "";
    placeInput.value = "";
    commentInput.value = "";

    //создаем метку
    placemark1 = new ymaps.GeoObject(
      {
        geometry: {
          type: "Point",
          coordinates: reviewObj.coordinates
        },

        properties: {
          id: reviewObj.id,
          addressPlacemark: reviewObj.address,
          coordinates: reviewObj.coordinates,
          position: position,
          name: reviewObj.name,
          place: reviewObj.place,
          review: reviewObj.review,
          date: reviewObj.date
        }
      },
      {
        preset: "islands#redCircleDotIcon"
      }
    );

    //пушим созданный объект в массив
    allReviews.push(reviewObj);

    //добавляем в кластер метку
    clusterer.add(placemark1);

    elem = placemark1.properties._data.id;

    renderReview(elem);

    localStorage.setItem(
      "store",
      JSON.stringify({
        revList: allReviews
      })
    );
  });

  let placemarkClick;
  //по нажатию на кластер

  clusterer.events.add("click", e => {
    //смотрим на какой элемент пришелся клик
    placemarkClick = e.get("target");
    position = e.get("position");
    coords = e.get("coords");
    console.log(coords);

    //если у кликнутого элемента есть свойство
    if (!placemarkClick.hasOwnProperty("_clusterListeners")) {
      //отображаем блок
      openBaloon(position);

      elem = placemarkClick.properties._data.id;

      renderReview(elem);
      // coords = filterReviews[0].coordinates;
      addressTitle.innerHTML = placemarkClick.properties._data.addressPlacemark;
    }
  });

  document.addEventListener("click", e => {
    let linkTarget = e.target;
    position = [e.pageX, e.pageY];

    if (linkTarget.tagName !== "A") {
      return;
    } else {
      openBaloon(position);

      let filterReviews = allReviews.filter(
        i => i.id === linkTarget.getAttribute("data-id")
      );

      coords = filterReviews[0].coordinates;
      idObj = filterReviews[0].id;

      writeAddress();

      let _review = renderFn({ list: filterReviews });
      reviewList.innerHTML = _review;
    }
  });

  closeImage.addEventListener("click", e => {
    e.preventDefault();
    baloon.style.display = "none";
  });
});
