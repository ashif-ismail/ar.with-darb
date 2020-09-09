window.onload = () => {
     let places = staticLoadPlaces();
     renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: 24.4135978,
                lng: 54.4918734,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
                   
        let model = document.createElement('a-text');
        model.setAttribute('value', "AR on Darb");
        model.setAttribute('scale', '0.5 0.5 0.5');

        scene.appendChild(model);
    });
}
