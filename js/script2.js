// script2.js file having all javascript code for map features including marker, marker click event, button click event and some js DOM
//          -including two maps: 
//                       1. Small Map - for community and particular waterfall information
//                       2. Big Map - getting user's input and find navigation between two points
//
//
//Maps and Geolocation

//var smallMap;
var map;
var smallMap;
function initMap() {
    smallMap = new google.maps.Map(document.getElementById("commMap"),
        {
             center: { lat: 43.2557, lng: -79.8711 }, 
             zoom: 11.8 
        });

    //BIG MAP code starts from here
    map = new google.maps.Map(document.getElementById("map"),
        { 
            center: { lat: 43.2557, lng: -79.8711 }, 
            zoom: 12, 
        });
    //SMALL MAP code Starts from here

    // variable for marker/icon
    var new_icon = "";
    //global variable used for if statements according to community selected by user
    COMMUNITYNAME = "";

    //global lat&lng for multiple use of marker (add/remove)
    CENTER_LAT = 0.0;
    CENTER_LNG = 0.0;

    //Small map for information of 
    

    //Following 5 click button clicks event changes - the description text, setting up markers, re-center the map and adjust zoom level
    document.getElementById("ancaster").addEventListener("click", function () {
        //For re-center
        CENTER_LAT = 43.233197;
        CENTER_LNG = -79.979782;
        //COMMUNITYNAME = "Ancaster";
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/ltblu-blank.png";
        smallMap.zoom = 13;
        dataWaterfall();
        CommunityDetails("Ancaster");
    });
    document.getElementById("hamilton").addEventListener("click", function () {
        CENTER_LAT = 43.2366;
        CENTER_LNG = -79.8493;
        //console.log("BTN CLICKED: Hamilton <--")
        COMMUNITYNAME = "Hamilton";
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/pink-blank.png";
        smallMap.zoom = 12;
        dataWaterfall();
        CommunityDetails("Hamilton");
    });
    document.getElementById("dundas").addEventListener("click", function () {
        CENTER_LAT = 43.2906;
        CENTER_LNG = -79.9319
        //console.log("BTN CLICKED: DUNDAS <--")
        COMMUNITYNAME = "Dundas";
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/purple-blank.png";
        smallMap.zoom = 13;
        dataWaterfall();
        CommunityDetails("Dundas");
    });
    document.getElementById("stoneyCreek").addEventListener("click", function () {
        CENTER_LAT = 43.2077;
        CENTER_LNG = -79.7128;
        //console.log("BTN CLICKED: STONEY CREEK <--")
        COMMUNITYNAME = "Stoney Creek";
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/orange-blank.png";
        smallMap.zoom = 12;
        dataWaterfall();
        CommunityDetails("Stoney Creek");
    });
    document.getElementById("flamborough").addEventListener("click", function () {
        CENTER_LAT = 43.303013;
        CENTER_LNG = -79.938416;
        //console.log("BTN CLICKED: FLAMBOROUGH <--")
        COMMUNITYNAME = "Flamborough";
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
        smallMap.zoom = 12;
        dataWaterfall();
        CommunityDetails("Flamborough");
    });

    //called when marker gets clicked in event listener for INFO WINDOW details
    marker_clicked_smallMap = function () {

        //for INFO WINDOW
        connectingString = "<h5>" + this.NAME + "</h5>" +
            "<p><span style=\"font-weight: bold\"> Type: </span>" + this.TYPE + "</p>" +
            "<p><span style=\"font-weight: bold\"> Ownership: </span>" + this.OWNERSHIP + "</p>";
        infowindow.setContent(connectingString);
        infowindow.open(map, this); //'this' refer to whatever marker gets clicked

        //DESCRIPTION 
        //setting Ranking string for symbol star
        ranking = this.RANKING;
        if (ranking == "A") {
            ranking = ' &#9733; &#9733; &#9733; ';
        }
        else if (ranking == "B") {
            ranking = ' &#9733; &#9733; &ndash; ';
        }
        else if (ranking == "C") {
            ranking = ' &#9733; &ndash; &ndash; ';
        }

        let content = document.getElementById("content");
        content.innerHTML = "<h2>" + this.NAME + "</h2>" +
            "<p><span style=\"font-weight: bold\"> Ranking: </span>" + this.RANKING + " (" + ranking + ")</p>" +
            "<p><span style=\"font-weight: bold\"> Dimention(in meter): </span> Height(" + this.HEIGHT + "), Width(" + this.WIDTH + ")" + "</p>" +
            "<p><span style=\"font-weight: bold\"> Type: </span>" + this.TYPE + "</p>" +
            "<p><span style=\"font-weight: bold\"> Ownership: </span>" + this.OWNERSHIP + "</p>" +
            "<p>Available to Access from " + this.ACCESS_FROM + "</p>";


        //Info window gets close after every 4 second 
        setTimeout(function () {
            infowindow.close();
        }, 4000);

    };//marker_clicked_smallMap

    //new_marker for array of all markers
    new_marker = [];

    //variables for collect data for community description
    waterfallCounter = 0;
    waterfallList = "";

    //function getting coordinates for all watefalls using FOR LOOP from JSON data
    function dataWaterfall() {
        // Setting variables to null/empty value after everytime before use
        waterfallCounter = 0;
        waterfallList = "";

        //for loop goes from whole waterfalls JSON data
        for (i = 0; i < waterfalls.features.length; i++) {

            //checking community and then adding marker accordingly
            if (waterfalls.features[i].properties.COMMUNITY == COMMUNITYNAME) {
                waterfallCounter++;
                //For the list of waterfalls in a single community
                if (waterfallCounter > 1) {
                    waterfallList = waterfallList + ", ";
                }
                waterfallList = waterfallList + waterfalls.features[i].properties.NAME;

                //creating new marker
                new_marker = new google.maps.Marker({
                    position:
                    {
                        lng: waterfalls.features[i].geometry.coordinates[0],
                        lat: waterfalls.features[i].geometry.coordinates[1]
                    },
                    title: waterfalls.features[i].properties.NAME,
                    icon: new_icon
                });//new_marker


                //RE-CENTER map
                var position = new google.maps.LatLng(CENTER_LAT, CENTER_LNG);
                smallMap.setCenter(position);

                //Dropping marker on map
                new_marker.setMap(smallMap);

                //Assigning value to marker for Info window and description
                new_marker.NAME = waterfalls.features[i].properties.NAME;
                new_marker.TYPE = waterfalls.features[i].properties.TYPE;
                new_marker.RANKING = waterfalls.features[i].properties.RANKING;
                new_marker.HEIGHT = waterfalls.features[i].properties.HEIGHT_IN_M;
                new_marker.WIDTH = waterfalls.features[i].properties.WIDTH_IN_M;
                new_marker.OWNERSHIP = waterfalls.features[i].properties.OWNERSHIP;
                new_marker.ACCESS_FROM = waterfalls.features[i].properties.ACCESS_FROM;
                new_marker.addListener("click", marker_clicked_smallMap);     // click event calling marker clicked function

            }//if statement 
        }//for loop
    }//dataWaterfall

    //Setting details for community
    function CommunityDetails(communityName) {
        let content = document.getElementById("content");
        content.innerHTML = "<h3> " + communityName + " Community</h3>" +
            "<p> There are total " + waterfallCounter + " waterfalls in this area. </p>" +
            "<p style=\"font-size:15px\"> List of falls: " + waterfallList + "</p>";
    }

    //--------------------------------------------------------------BIG MAP------------------------------------------------------------

    

    //Geocoding - for user's inputed address
    geocoder = new google.maps.Geocoder();

    //making destination/location B 'readonly' 
    destinationB = document.getElementById("locationB");
    destinationB.setAttribute('readonly', 'true');

    //arry of new markers for big map
    new_marker2 = []

    //variable for destination B field - (It will auto-fill wehn user clickes the marker from map)
    destinationLocB = "";

    //variables for user's lat,log value 
    USERlat = 0.0;
    USERlng = 0.0;

    //For user's marker
    user_marker = null;
    //For confirmation user clicked btn or enter adddress for route destination A->B
    btnCLICKED = false;
    //For confirmation travel mode selected or not
    TRAVEL_MODE_CLICKED = false;
    userInput = "";

    //Function for find route btn -> makes it hidden until it every required factor got filled.
    findRouteBtn = document.getElementById("findRouteBtn");
    function routeConditionChecker() {
        if ((userInput == "" && btnCLICKED == false) && destinationLocB == "" && TRAVEL_MODE_CLICKED == false) {
            findRouteBtn.style.display = "none";
        }
        else {
            findRouteBtn.style.display = "inline";
        }
    }
    routeConditionChecker();

    //variable provides Travelling mode for directionRenderer
    TRAVEL_MODE = "";

    //Follow click events for travelling mode assign value for variable TRAVEL_MODE and does other css work
    let travelMode_CAR = document.getElementById("car");
    let travelMode_BICYCLE = document.getElementById("twoWheeler");
    let travelMode_WALK = document.getElementById("walking");

    travelMode_CAR.addEventListener('click', function () {
        TRAVEL_MODE_CLICKED = true;
        routeConditionChecker();
        TRAVEL_MODE = "DRIVING";
        travelMode_CAR.style.border = "2px solid black";
        travelMode_BICYCLE.style.border = "none";
        travelMode_WALK.style.border = "none";
    });
    travelMode_BICYCLE.addEventListener('click', function () {
        TRAVEL_MODE_CLICKED = true;
        routeConditionChecker();
        TRAVEL_MODE = "TWO_WHEELER";
        travelMode_BICYCLE.style.border = "2px solid black";
        travelMode_WALK.style.border = "none";
        travelMode_CAR.style.border = "none";
    });
    travelMode_WALK.addEventListener('click', function () {
        TRAVEL_MODE_CLICKED = true;
        routeConditionChecker();
        TRAVEL_MODE = "WALKING";
        travelMode_WALK.style.border = "2px solid black";
        travelMode_CAR.style.border = "none";
        travelMode_BICYCLE.style.border = "none";
    });

    // error function - (Reference Course Content)
    function showError(error) {
        // the error function is given an error object containing a code property 
        // that we can look at to determine which error occurred...
        let destinationAtext = document.getElementById("destinationA");
        destinationAtext.style.color = "red";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                destinationAtext.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                destinationAtext.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                destinationAtext.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                destinationAtext.innerHTML = "An unknown error occurred."
                break;
        }
    }

    //btnClick Event  - if user wants Destination A to thier own co-ordinates 
    let myLocBtn = document.getElementById("myLocBtn");
    myLocBtn.addEventListener('click', function () {
        btnCLICKED = true;
        console.log(btnCLICKED);
        function showPosition(position) {
            USERlat = position.coords.latitude;
            USERlng = position.coords.longitude;
            userMarker();
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
        else {
            destinationAtext.innerHTML = "Geolocation is not supported by this browser.";
        }

        document.getElementById("userLocationA").style.display = "none";
        document.getElementById("OR").innerHTML = "";
    });//myLocBtn EVENT


    //function for marker if user clickes myLocbtn button
    function userMarker() {
        user_marker = new google.maps.Marker({
            position:
            {
                lng: USERlng,
                lat: USERlat
            },
            title: "My location",
            icon: "http://maps.google.com/mapfiles/kml/paddle/A.png"
        });//new_marker2
        user_marker.setMap(map);
    }

    
    //info window
    infowindow = new google.maps.InfoWindow();

    //Marker Click EVENT
    countForHideInfoWindow2 = 1;
    marker_clicked_largeMap = function () {
        //INFO WINDOW
        connectingString = "<h5>" + this.NAME + "</h5>" +
            "<p><span style=\"font-weight: bold\"> Type: </span>" + this.TYPE + "</p>" +
            "<p><span style=\"font-weight: bold\"> Ownership: </span>" + this.OWNERSHIP + "</p>";

        infowindow.setContent(connectingString);
        infowindow.open(map, this); // this refer to whatever marker event got clicked
        //text field value updates according to user's selected pin as DestinationB
        destinationB.value = this.NAME;
        destinationLocB = this.NAME + ", " + this.COMMUNITY + ", Hamilton, Ontario";

        //Info window gets close after every 4 second
        setTimeout(function () {
            infowindow.close();
        }, 2200);

    }; //marker click event


    for (i = 0; i < waterfalls.features.length; i++) {
        //updating marker icon according to community
        if (waterfalls.features[i].properties.COMMUNITY == "Flamborough") { new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png"; }
        else if (waterfalls.features[i].properties.COMMUNITY == "Ancaster") { new_icon = "http://maps.google.com/mapfiles/kml/paddle/ltblu-blank.png"; }
        else if (waterfalls.features[i].properties.COMMUNITY == "Dundas") { new_icon = "http://maps.google.com/mapfiles/kml/paddle/purple-blank.png"; }
        else if (waterfalls.features[i].properties.COMMUNITY == "Stoney Creek") { new_icon = "http://maps.google.com/mapfiles/kml/paddle/orange-blank.png"; }
        else if (waterfalls.features[i].properties.COMMUNITY == "Hamilton") { new_icon = "http://maps.google.com/mapfiles/kml/paddle/pink-blank.png"; }
        //creating new marker 
        new_marker2 = new google.maps.Marker({
            position:
            {
                lng: waterfalls.features[i].geometry.coordinates[0],
                lat: waterfalls.features[i].geometry.coordinates[1]
            },
            title: waterfalls.features[i].properties.NAME,
            icon: new_icon
        });//new_marker2
        new_marker2.setMap(map);

        //for info video and other uses
        new_marker2.NAME = waterfalls.features[i].properties.NAME;
        new_marker2.COMMUNITY = waterfalls.features[i].properties.COMMUNITY;
        new_marker2.TYPE = waterfalls.features[i].properties.TYPE;
        new_marker2.OWNERSHIP = waterfalls.features[i].properties.OWNERSHIP;

        //marker click event 
        new_marker2.addListener("click", marker_clicked_largeMap);     // click event calling marker clicked function
    } //for loop

    //findRoutneBtn click event -> call other functions and creates route between destination A->B
    document.getElementById("findRouteBtn").addEventListener("click", function () {
        //Check conditions for all required inputs
        routeConditionChecker();
        //if user did not select their location it takes inputed address via textbox and vice-versa
        if (btnCLICKED == false) {
            document.getElementById("OR").innerHTML = "";
            myLocBtn.style.display = "none";
            userInput = document.getElementById("userLocationA").value;
            dropPinForUserAddr()
            drivingRoute();
        }
        else {
            drivingRoute();
            document.getElementById("userLocationA").style.display = "none";
            document.getElementById("OR").innerHTML = "";
        }
    });

    //Dropping marker at user's input from textbox
    marker_addr = {}
    function dropPinForUserAddr() {
        geocoder.geocode(
            { address: userInput }, function (results, status) {
                if (status = 'OK') {
                    marker_addr = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        icon: "http://maps.google.com/mapfiles/kml/paddle/A.png"
                    });
                }//if statement
            });
        routeConditionChecker();
    }

    //function for connecting destination A -> B
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    function drivingRoute() {
        routeConditionChecker();
        //DIRECTION - PATH
        DESTINATION_A = "a";
        if (btnCLICKED === false) { DESTINATION_A = userInput; }
        else { DESTINATION_A = { lat: USERlat, lng: USERlng }; }

        directionsRenderer.setMap(map);
        request = {
            origin: DESTINATION_A,
            destination: destinationLocB,
            travelMode: TRAVEL_MODE
        };
        directionsService.route(request, function (result, status) {
            if (status == "OK") {
                directionsRenderer.setDirections(result);
            }

        });
        TRAVEL_MODE = "";               //for next use
    }


    // RESET Btn - reset user's marker & Route (And other CSS related properties)
    document.getElementById("resetBtn").addEventListener("click", function () {
        //adjusting zoom level
        map.zoom = 12;
        //erasing route using null
        directionsRenderer.setMap(null);
        //re-center
        var position = new google.maps.LatLng(43.2366, -79.8493);
        map.setCenter(position);

        //removing user's marker
        if (btnCLICKED === false) {
            marker_addr.setMap(null);               //manually typed address
        } else if (btnCLICKED === true) {
            user_marker.setMap(null);               //co-ordinates taken from option button 
        }

        //Reseting CSS related properites/fields
        document.getElementById("userLocationA").value = "";
        document.getElementById("locationB").value = "";
        document.getElementById("userLocationA").style.display = "inline";
        document.getElementById("OR").innerHTML = " OR ";
        document.getElementById("myLocBtn").style.display = "inline";

        travelMode_BICYCLE.style.border = "none";
        travelMode_WALK.style.border = "none";
        travelMode_CAR.style.border = "none";

        // setting required parameters for route finder to empty/false/null
        destinationLocB = "";
        userInput = "";
        btnCLICKED = false;
        TRAVEL_MODE_CLICKED = false;
        routeConditionChecker();
    });

}//initMap