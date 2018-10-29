const init = () =>{
    const map = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 7,
        controls: []
    })
    map.events.add('click', e => {
        console.log('click')
    })
}
ymaps.ready(init)