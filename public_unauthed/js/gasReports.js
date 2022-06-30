
    
      var map;
      var features;
      var autocomplete;
      var myStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        }
    ];

    function zeroPad(num) {
      return num.toString().padStart(2, "0");
    }

    function initMap() {
        autocomplete= new google.maps.places.Autocomplete(
          document.getElementById('gasLeak-address'),
          {
            types: ['address'],
            componentRestrictions: {'country': ['us']},
            fields: ['place_id','geometry', 'name']
          }
        );
        autocomplete.addListener('place_changed' , onPlaceChanged);
        function onPlaceChanged(){
          var place = autocomplete.getplace();
          document.getElementById('gasLeak-address').value = place.name;
        }

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7454486, lng: -73.8951494},
          zoom: 12,
          styles: myStyles,
          mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
    
    }, 
    
    // here´s the array of controls
    disableDefaultUI: true, // a way to quickly hide all controls
    mapTypeControl: false,
    scaleControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE 
    },
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    //gas leak icon marker 
    const gasLeak = "images/gasleak1.jpg"; 

    const icon = {
        url: gasLeak, // url
        scaledSize: new google.maps.Size(35, 35), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0), // anchor
        labelOrigin: new google.maps.Point(75, 40)
    };

    var data;
    var features;
    var dataLength;

    async function getGasReports(){
        const res = await fetch('/api/v1/gasReports');
        data = await res.json();
        dataLength = data.data.length;
        features = [
                 
                {position: new google.maps.LatLng(data.data[0].location.coordinates[1],data.data[0].location.coordinates[0])
        }
        ]

        //LoopThrough data to add to feature object array
        
        for (var i = 1 ; i < dataLength; i++)
      {
        features.push({position: new google.maps.LatLng(data.data[i].location.coordinates[1] , data.data[i].location.coordinates[0]) });
      }


      //Gas leaker Marker info window
      
      for (let i = 0; i < features.length; i++) {
        //cutting timestamp into date and time.
        const year = data.data[i].createdAt.slice(0,4);
        const month = data.data[i].createdAt.slice(5,7);
        let day = data.data[i].createdAt.slice(8,10);
        let hour = data.data[i].createdAt.slice(11,13);
        let ampm = 'AM';
        hour = hour - 4;
        // hour = zeroPad(hour);
        if (hour > 12){
          hour = hour - 12;
          ampm = 'PM';
        } else if ( hour < 0){
          hour = hour + 12;
          ampm = 'PM';
          day = day - 1;
        }
        hour = zeroPad(hour);
        const minute = data.data[i].createdAt.slice(14,16);
        const second = data.data[i].createdAt.slice(17,19);

        //Info Window when gasleak marker is clicked
        const contentString =
        '<div id="content" class="container">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<div id="bodyContent"><table><tr><td>' +
        '<h5>Witness </td><td><h5> : '+ data.data[i].witnessName +'</h5></td></tr>' +
        '<tr><td><h5>Description </h5></td><td><h5> : ' + data.data[i].description + '</h5></td></tr>'+
        '<tr><td><h5>Date</h5></td><td><h5> : ' + month + '/' + day + '/' + year + '</h5></td></tr> ' +
        '<tr><td><h5>Time</h5></td><td><h5> : ' + hour+ ':' + minute + ':' + second + ' ' + ampm +'</h5></td></tr> '
        // data.data[i].createdAt   +
        "</div>" +
        "</div>";
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });   

        const marker = new google.maps.Marker({
          position: features[i].position,
          icon: icon,
          map: map,
          label: {
            text: "Reported By " + data.data[i].witnessName,
            color: "black",
            textWeight: "bold"
          },
          disableDefaultUI: true,
        });
         marker.addListener("click", () => {
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: true,
            });
          });

      }

    }
    
    getGasReports();
     
    
   }

    
     
    

    
    