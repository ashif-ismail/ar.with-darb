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
                   
        let model = document.createElement('a-entity');
    
        model.setAttribute('htmlembed','ppu:256');
        model.setAttribute('position','{x: 0, y: 2.5, z: -5}');
        model.setAttribute('id','main');
        model.setAttribute('class','dark main');
        
        const container = document.querySelector('div');
        container.setAttribute('id', 'page1');
        const label = document.createElement('h1');
        label.innerText = "test";
        model.appendChild(label);
        document.body.appendChild(container);
                   
        
        //model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       // model.setAttribute('value', "Al Khor Street/DOT");
        
        
        scene.appendChild(model);
                   
    });
}
