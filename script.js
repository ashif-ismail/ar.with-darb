window.onload = () => {
     let places = staticLoadPlaces();
     renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Al Khor Street/DOT',
            location: {
                lat: 24.4126,
                lng: 54.4923,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
                   
        let model = document.createElement('htmlembed');
        //model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       // model.setAttribute('value', "Al Khor Street/DOT");
        
        scene.appendChild(model);
                   
    });
}
