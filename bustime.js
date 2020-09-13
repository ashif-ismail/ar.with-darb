AFRAME.registerComponent('a-bustime', {
    schema: {
        'target': {
            type: 'selector'
        },
    },
    init: function() {
        let entity = document.querySelector('a-entity');
        entity.setAttribute("visible",false);
        navigator.geolocation.getCurrentPosition(function(position) {
            //alert("user position :" + position.coords.latitude + "," + position.coords.longitude);
            entity.setAttribute("visible",true);
            
            const stopNameText = document.createElement('span');
            stopNameText.id = "stopNameText"
            stopNameText.style.cssText = 'font-size: 40px;';
            stopNameText.innerText = "Al Khor St/DOT 097171-A";
            entity.appendChild(stopNameText);
                                                 
            const dividerDiv = document.createElement('div');
            dividerDiv.style.cssText = 'width:100%;background-color:rgba(0,0,0,0.2);height: 10px;border-radius:50px;';
            entity.appendChild(dividerDiv);
                                                 
//            const br = document.createElement('br');
//            entity.appendChild(br);
                                                 
            const containerDiv = document.createElement('div');
            containerDiv.style.cssText = 'text-align:start;';
            entity.appendChild(containerDiv);
                                                 
            var i;
            for (i = 0; i <= 10; i++) {
                                                 
                const lineNoText = document.createElement('span');
                lineNoText.id = "lineNoText"
                lineNoText.style.cssText = 'font-size: 20px;';
                lineNoText.innerText = "Line 022   ";
                containerDiv.appendChild(lineNoText);
                                                 
                const towardsText = document.createElement('span');
                towardsText.id = "towardsText"
                towardsText.style.cssText = 'font-size: 20px;';
                towardsText.innerText = "towards";
                containerDiv.appendChild(towardsText);

                const destinationText = document.createElement('span');
                destinationText.id = "destinationText"
                destinationText.style.cssText = 'font-size: 24px;';
                destinationText.innerText = "Marina Mall";
                containerDiv.appendChild(destinationText);

                const timeText = document.createElement('span');
                timeText.id = "timeText"
                timeText.style.cssText = 'font-size: 24px;';
                timeText.innerText = " on 7:44 AM";
                containerDiv.appendChild(timeText);

                const statusText = document.createElement('span');
                statusText.id = "statusText"
                statusText.style.cssText = 'font-size: 24px;background-color:#000;';
                statusText.innerText = "  LIVE  ";
                containerDiv.appendChild(statusText);

                const br = document.createElement('br');
                containerDiv.appendChild(br);
            }
                const br = document.createElement('br');
                containerDiv.appendChild(br);
        });

    }
});
