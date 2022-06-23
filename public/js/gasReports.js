
    
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
        //Info Window when gasleak marker is clicked
        const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
         '<h4 id="firstHeading" class="firstHeading">Gas Leak Report</h1>' +
        '<div id="bodyContent">' +
        '<p><b>GasLeak is reported by '+ data.data[i].witnessName +'</b>' +
        '<h4>Gas Leak Description </h1>'+
        data.data[i].description   +
        '<h4>Gas Leak TimeStamp </h1>'+
        data.data[i].createdAt   +
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

    
     
    

    
    