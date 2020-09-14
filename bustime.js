AFRAME.registerComponent('a-bustime', {
    schema: {
        'target': {
            type: 'selector'
        },
    },
    init: function() {
        let entity = document.querySelector('a-entity');
        entity.setAttribute("visible", false);

        const containerDiv = document.createElement('div');
        containerDiv.id = "containerDiv";
        containerDiv.style.cssText = 'text-align:start;';
        entity.appendChild(containerDiv);

                   getCurrentLocation();
//        navigator.geolocation.getCurrentPosition(function(position) {
//        var buffer = calculateBuffer(position.coords.longitude, position.coords.latitude, 1.50);
//
//        // call busstops api
//        //getNearestBusStops(buffer,position.coords.latitude,position.coords.latitude);
//
//        getNearestBusStops(buffer);
//        });
    
        

        function getCurrentLocation() {
            navigator.geolocation.getCurrentPosition(function(position) {
            var buffer = calculateBuffer(position.coords.longitude, position.coords.latitude, 1.50);

            // call busstops api
            //getNearestBusStops(buffer,position.coords.latitude,position.coords.latitude);

            getNearestBusStops(buffer);
                                                     setTimeout(getCurrentLocation, 5000);
        });
    }
                         
        function calculateBuffer(lon, lat, targetRadius) {
            var R = 6371;
            var x1 = lon - (function(x) {
                return x * 180 / Math.PI;
            })(targetRadius / R / Math.cos( /* toRadians */ (function(x) {
                return x * Math.PI / 180;
            })(lat)));
            var x2 = lon + (function(x) {
                return x * 180 / Math.PI;
            })(targetRadius / R / Math.cos( /* toRadians */ (function(x) {
                return x * Math.PI / 180;
            })(lat)));
            var y1 = lat + (function(x) {
                return x * 180 / Math.PI;
            })(targetRadius / R);
            var y2 = lat - (function(x) {
                return x * 180 / Math.PI;
            })(targetRadius / R);
            return [x1, x2, y1, y2];
        }

        function getNearestBusStops(buffer, lat, lon) {
            console.log("getNearestBusStops invoked");
            var request = new XMLHttpRequest()
            request.open('GET', 'https://staging.darb.ae/dotservices/api/MMJPv4/DisplayBusStops?&xMin=' + buffer[0] + '&yMin=' + buffer[2] + '&xMax=' + buffer[1] + '&yMax=' + buffer[3] + '&language=en', true)
            request.onload = function() {
                var data = JSON.parse(this.response)
                if (data.length != 0) {
                    var firstStop = data[0]
                    getDeparturesForStop(firstStop.Id, firstStop.Name, firstStop.DisplayId);
                }
            }
            request.send()
        }


        function getDeparturesForStop(stopID, stopName, stopDisplayID) {
            var request = new XMLHttpRequest()
            request.open('GET', 'https://staging.darb.ae/dotservices/api/MMJPv4/BusStopDepartureBoard?&text=' + stopID + '&info=&limit=10&direct=true&language=en', true)

            request.onload = function() {
                var data = JSON.parse(this.response)
                populateViews(data.Departures, stopName, stopDisplayID)

            }
            request.send()
        }

        function populateViews(departures, stopName, stopDisplayID) {
            var i;
               
            const rootNode = document.getElementById("containerDiv");
            while (rootNode.firstChild) {
                 rootNode.removeChild(rootNode.lastChild);
               }
               
            const stopImg = document.createElement('img');
            stopImg.id = "stopImg"
            stopImg.style.cssText = 'display: inline';
            stopImg.src = "https://img.icons8.com/emoji/96/000000/bus-stop-emoji.png";
            containerDiv.appendChild(stopImg);
               
            const stopNameText = document.createElement('h3');
            stopNameText.id = "stopNameText"
            stopNameText.style.cssText = 'font-size: 40px;color:#FFC300;display: inline-block;margin-top:-200px;margin-left:120px;';
            stopNameText.innerText = stopName;
            containerDiv.appendChild(stopNameText);
               
            const br = document.createElement('br');
            containerDiv.appendChild(br);
               
            const stopIdText = document.createElement('span');
            stopIdText.id = "stopIdText"
            stopIdText.style.cssText = 'font-size: 40px;color:#3CB914';
            stopIdText.innerText = stopDisplayID;
            containerDiv.appendChild(stopIdText);

            const dividerDiv = document.createElement('div');
            dividerDiv.style.cssText = 'width:100%;background-color:rgba(0,0,0,0.2);height: 5px;border-radius:50px;';
            containerDiv.appendChild(dividerDiv);

            for (i = 0; i <= 5; i++) {
               // filter only realtime lines
               if (departures[i].IsRealtime) {
                const lineNoText = document.createElement('span');
                lineNoText.id = "lineNoText"
                lineNoText.style.cssText = 'font-size: 32px;color:#FFC300';
                lineNoText.innerText = " " + departures[i].Line.Number + "    ";
                containerDiv.appendChild(lineNoText);

                const towardsText = document.createElement('span');
                towardsText.id = "towardsText"
                towardsText.style.cssText = 'font-size: 20px;';
                towardsText.innerText = "   towards   ";
                containerDiv.appendChild(towardsText);
               
                const destinationText = document.createElement('span');
                destinationText.id = "destinationText"
                destinationText.style.cssText = 'display: block;font-size: 35px;';
                destinationText.innerText = "  " + departures[i].Line.Destination;
                containerDiv.appendChild(destinationText);

                const timeText = document.createElement('span');
                timeText.id = "timeText"
               //Realtime
                timeText.style.cssText = 'font-size: 30px;margin-left:350px';
//                timeText.innerHTML = " at " + new Date(departures[i].Time).toLocaleTimeString('en-US', {
//                    hour: 'numeric',
//                    minute: 'numeric',
//                    hour12: true
//                }) + '&nbsp;&nbsp;';
               timeText.innerHTML = departures[i].Remaining;
                containerDiv.appendChild(timeText);

                var lineStatus;
                var cssText;
                if (departures[i].IsRealtime) {
                    lineStatus = "  LIVE  ";
                    cssText = 'font-size: 24px;background-color:#3CB914';
                } else {
                    lineStatus = " PLANNED "
                    cssText = 'font-size: 24px;background-color:#FF5733';
                }
               
                const statusText = document.createElement('span');
                statusText.id = "statusText"
                statusText.style.cssText = cssText;
                statusText.innerHTML = '&nbsp;&nbsp;' + lineStatus + '&nbsp;&nbsp;';
                containerDiv.appendChild(statusText);

                const br = document.createElement('br');
                containerDiv.appendChild(br);
            }
               }
               entity.setAttribute("visible", true);
        }

    }
});
