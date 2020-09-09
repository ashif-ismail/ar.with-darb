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
                   
        let model = document.createElement('a-text');
        model.setAttribute('value', "Al Khor Street/DOT");
                   
        let model1 = document.createElement('a-text');
        model1.setAttribute('value', "Al Khor Street/DOT");
        let model2 = document.createElement('a-text');
        model2.setAttribute('value', "Al Khor Street/DOT");
        let model3 = document.createElement('a-text');
        model3.setAttribute('value', "Al Khor Street/DOT");
        let model4 = document.createElement('a-text');
        model4.setAttribute('value', "Al Khor Street/DOT");
        let model5 = document.createElement('a-text');
        model5.setAttribute('value', "Al Khor Street/DOT");
                   

        scene.appendChild(model);
        scene.appendChild(model1);
        scene.appendChild(mode2);
        scene.appendChild(model3);
        scene.appendChild(model4);
        scene.appendChild(model5);
                   
    });
}
