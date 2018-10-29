// console.log('hello!')


const mapModule = {
    init: () => {
        console.log('init!!')
        ymaps.ready(init);    
        function init(){ 
            myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
            });   
        }
       
    },

    addMarker: () =>{
        myMap.events.add('click', () =>{
            console.log('66')
            var coords = e.get('coords');
            alert(coords.join(', '));

        })
    }

    
    
}
window.onload = mapModule.init();
window.onload = mapModule.addMarker();

