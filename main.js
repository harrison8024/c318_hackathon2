
$(document).ready(initializeApp);

var map;
var storeIconOn = false;
var markerArray = [];
var beachesArray = [];
var yelpMarkerArray = [];
var beachInfoArray = [];
var beachArray = [
    "Cameo Cove",
    "Emerald Bay",
    "Crescent Bay",
    "Shaws Cove",
    "Fishermans Cove",
    "Divers Cove",
    "Heisler Park Beach",
    "Main Beach",
    "Thalia Street Beach",
    "Woods Cove Beach",
    "Moss Cove",
    "Victoria Beach",
    "Treasure Island Beach",
    "Aliso Beach",
    "West Street Beach",
    "Table Rock Beach",
    "1000 Steps Beach"
];

var beachIdArray= [
    "ChIJebS6-Rzk3IARQjvVK17E-H4",
    "ChIJGwIiwBjk3IAR_KeQzuCxMDA",
    "ChIJiR_-gDvk3IARJvNOyNe6nqs",
    "ChIJN44pRjrk3IAR7UHsqYmz59g",
    "ChIJ0cOR_znk3IARGq0Veobn4tw",
    "ChIJdct2SDfk3IAR30_IxuG-S4Q",
    "ChIJKSemcTbk3IARS9eQ4c_fJcY",
    "ChIJH4Y5okrk3IAR2siC9QLVqCY",
    "ChIJh77BF7Ll3IARvW4krXcoTic",
    "ChIJ7UfHk6fl3IARn2CG_pg08cY",
    "ChIJ24QSxQnl3IAR6NkD-jHsJRg",
    "ChIJE76HsRLl3IARM9c5begLxOg",
    "ChIJtxPwxWzl3IARgHe-w_aL1AM",
    "ChIJU3TgxGnl3IAR26h3tmJHpSA",
    "ChIJe58-Flvl3IARcLNCkfMFFt0",
    "ChIJN2AXi1rl3IARndYdtkSYiRo",
    "ChIJJ50s6lXl3IARJr8oXjZjiL8"

];

var beachLongLat = [
    [33.55391, -117.8161],
    [33.55163, -117.80913],
    [33.54665, -117.80159],
    [33.54569, -117.79804],
    [33.54545, -117.79587],
    [33.54466, -117.79398],
    [33.54341, -117.79074],
    [33.54172, -117.78477],
    [33.5359, -117.77948],
    [33.52704, -117.77098],
    [33.5254, -117.76906],
    [33.51941, -117.76292],
    [33.51449, -117.75946],
    [33.50995, -117.75245],
    [33.50537, -117.74861],
    [33.50198, -117.7464],
    [33.49776, -117.74143]
];

var imageArray = [
    "./assets/Images/cameoCove.jpg",
    "./assets/Images/emeraldBay.jpg",
    "./assets/Images/cresentBay.jpg",
    "./assets/Images/shawsCove.jpg",
    "./assets/Images/fishermansCove.jpg",
    "./assets/Images/diversCove.jpg",
    "./assets/Images/HeislerParkBeach.jpg",
    "./assets/Images/mainBeach.jpg",
    "./assets/Images/thaliaStreet.jpg",
    "./assets/Images/woodsCove.jpg",
    "./assets/Images/mossCove.jpg",
    "./assets/Images/victoria.jpg",
    "./assets/Images/treasureIsland.jpg",
    "./assets/Images/alisoCreek.jpg",
    "./assets/Images/coastRoyale.jpg",
    "./assets/Images/tableRock.jpg",
    "./assets/Images/thousandStepsBeach.jpg",
    "./assets/Images/cameoCove.jpg"
];
var yelpStars = {
    "0":"./assets/small/small_0@2x.png",
    "1":"./assets/small/small_1@2x.png",
    "1.5":"./assets/small/small_1_half@2x.png",
    "2":"./assets/small/small_2@2x.png",
    "2.5":"./assets/small/small_2_half@2x.png",
    "3": "./assets/small/small_3@2x.png",
    "3.5": "./assets/small/small_3_half@2x.png",
    "4":"./assets/small/small_4@2x.png",
    "4.5":"./assets/small/small_4_half@2x.png",
    "5":"./assets/small/small_5@2x.png"
};
function initializeApp() {
    getWeatherFomDarkSky();
    constructBeachObjects();
    beachInfoBarConstructor();
    addClickHandlerToStoreIcon();
}

function getWeatherFomDarkSky(){
    var ajaxConfig = {
        'dataType': 'jsonp',
        'url': ' https://api.darksky.net/forecast/7c03619a4eb88722f133d0a7878f1503/33.51941, -117.76292',
        'method': 'GET',
        success: function (result) {
            let currentTemp = `${Math.round(result.currently.temperature)} ${String.fromCharCode(176)}F`;
            let currentWeatherIcon = result.currently.icon;
            let feelsLikeTemp = `Feels Like: ${Math.round(result.currently.apparentTemperature)} ${String.fromCharCode(176)}F`;
            let humidity = `Humidity: ${Math.round(result.currently.humidity)*100}%`;
            let dailyHighTemp = `High: ${Math.round(result.daily.data[0].temperatureMax)} ${String.fromCharCode(176)}F`;
            let dailyLowTemp = `Low: ${Math.round(result.daily.data[0].temperatureMin)} ${String.fromCharCode(176)}F`;
            let dailyWeatherSummary = result.daily.data[0].summary;
            let sunriseTime = `Sunrise: ${convertTimeToPacificDaylight(result.daily.data[0].sunriseTime)}`;
            let sunsetTime = `Sunset: ${convertTimeToPacificDaylight(result.daily.data[0].sunsetTime)}`;
            let localWeatherObject = {currentTemp, currentWeatherIcon, feelsLikeTemp, humidity, dailyHighTemp, dailyLowTemp, dailyWeatherSummary, sunriseTime, sunsetTime};
            appendWeatherInfoToDom(localWeatherObject);
        },
        error: function(){
        }
    };
    $.ajax(ajaxConfig);
}

function convertTimeToPacificDaylight(time){
    let newTime = new Date(time*1000);
    let hours = newTime.getHours();
    let minutes = "0" + newTime.getMinutes();
    if (hours > 12){
        hours -=12;
        let convertedTime = `${hours}:${minutes.substr(-2)} PM`;
        return convertedTime;
    }
    let convertedTime = `${hours}:${minutes.substr(-2)} AM`;
    return convertedTime;
}

function appendWeatherInfoToDom (obj){
    let currentTemp = $("<span>").text(obj.currentTemp)
    let currentWeatherDiv = $("<div>").addClass("weather-temp");
    let currentWeatherIcon = $("<canvas>").attr({"id": "weather-icon","height": 100, "width": 100});
    currentWeatherDiv.append(currentTemp);
    let feelsLikeTemp =  $("<p>").text(obj.feelsLikeTemp);
    let humidity =  $("<p>").text(obj.humidity);
    let dailyHighTemp =  $("<p>").text(obj.dailyHighTemp);
    let dailyLowTemp =  $("<p>").text(obj.dailyLowTemp);
    let dailyWeatherSummary = $("<p>").text(obj.dailyWeatherSummary);
    let sunriseTime = $("<p>").text(obj.sunriseTime);
    let sunsetTime = $("<p>").text(obj.sunsetTime);
    $(".weather").append(currentWeatherIcon);
    $(".weather").append(currentWeatherDiv);
    chooseWeatherIcon(obj.currentWeatherIcon);
    $(".marquee-inner-1").append(feelsLikeTemp, humidity, dailyHighTemp, dailyLowTemp, sunriseTime, sunsetTime, dailyWeatherSummary);
    $(".marquee-inner-2").append(feelsLikeTemp.clone(), humidity.clone(), dailyHighTemp.clone(), dailyLowTemp.clone(), sunriseTime.clone(), sunsetTime.clone(), dailyWeatherSummary.clone());

}

function chooseWeatherIcon(icon){
    let skycons = new Skycons({color: "white"});
    switch(icon){
        case "clear-day":
            skycons.add("weather-icon", Skycons.CLEAR_DAY);
        case "clear-night":
            skycons.add("weather-icon", Skycons.CLEAR_NIGHT);
        case "partly-cloudy-day":
            skycons.add("weather-icon", Skycons.PARTLY_CLOUDY_DAY);
        case "partly-cloudy-night":
            skycons.add("weather-icon", Skycons.PARTLY_CLOUDY_NIGHT);
        case "cloudy":
            skycons.add("weather-icon", Skycons.CLOUDY);
        case "rain":
            skycons.add("weather-icon", Skycons.RAIN);
        case "sleet":
            skycons.add("weather-icon", Skycons.SLEET);
        case "snow":
            skycons.add("weather-icon", Skycons.SNOW);
        case "wind":
            skycons.add("weather-icon", Skycons.WIND);
        case "fog":
            skycons.add("weather-icon", Skycons.FOG);
    }
    skycons.play();
}

function initMap() {
    var lagunaCenter = {lat: 33.522759, lng: -117.773314};
    map = new google.maps.Map(document.getElementById('map-container'), {
        center: lagunaCenter,
        zoom: 13,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "saturation": -35
                    },
                    {
                        "lightness": 15
                    }
                
                ]
            },
            {
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": 3
                    }
                ]
            },
            {
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fd6771"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#f39b5b"
                    },
                    {
                        "weight": 3
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f39b5b"
                    },
                    {
                        "weight": 5
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    });
    setTimeout(function () {
        dropMarker();
    }, 500);
}

function constructBeachObjects(){
    for(var i = 0; i < beachLongLat.length; i++){
        var beach = {
            name: beachArray[i],
            location: beachLongLat[i],
            picture : imageArray[i],
            id: beachIdArray[i],
        };
        beachesArray.push(beach);
    }
}

function dropMarker() {
    var image = {
        url: 'assets/Images/beach-marker-original.png',
        size: new google.maps.Size(40, 40),
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };
    for(var latlngArrayIndex = 0; latlngArrayIndex < beachLongLat.length; latlngArrayIndex++) {
        var marker = new google.maps.Marker({

            position: {
                lat: beachesArray[latlngArrayIndex].location[0],
                lng: beachesArray[latlngArrayIndex].location[1]
            },
            map: map,
            icon: image,
            label: "",
            animation: google.maps.Animation.DROP,
        });

        beachClickHandler(marker, beachesArray[latlngArrayIndex],latlngArrayIndex);
        markerArray.push(marker)

    }
}

var lastBeachClicked = null;

function beachInfoBarConstructor(){
    for (let beachIndex = 0; beachIndex < beachesArray.length; beachIndex++){
        let beachInfo = $("<div>").addClass("beach-content pointer").on("mouseover", function(){
            if(lastBeachClicked === beachIndex){
                return;
            }
            markerArray[beachIndex].setIcon({
                    url: 'assets/Images/beach-marker-highlight.png',
                    size: new google.maps.Size(40, 40),
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(0, 0),
                    origin: new google.maps.Point(0, 0),
                });
            $(this).addClass("selected");
        }).on("mouseout", function(){
            if(lastBeachClicked === beachIndex){
                return;
            }
            markerArray[beachIndex].setIcon({
                url: 'assets/Images/beach-marker-original.png',
                size: new google.maps.Size(40, 40),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(0, 0),
                origin: new google.maps.Point(0, 0),
            });
            $(this).removeClass("selected");
        }).on("click", function(){
            if(lastBeachClicked === beachIndex){
                return;
            }
            // beachInfo.off("mouseout");
            google.maps.event.trigger(markerArray[beachIndex], "click");
            $(".beach-info").addClass("hidden");
        });
        let beachImg = $(`<img src = "${beachesArray[beachIndex].picture}">`);
        let beachName = $("<p>").text(beachesArray[beachIndex].name);
        beachInfo.append(beachImg, beachName);
        $(".beach-info").append(beachInfo);
        beachInfoArray.push(beachInfo);
    }
}

function beachClickHandler(markerClicked, beachObj, index){
    var storeType = ["bar", "coffee", "food", "hotel"];
    let = markerHoverListener = markerClicked.addListener("mouseover", function(){
        if(lastBeachClicked === index){
            return;
        }
        markerClicked.setIcon({
            url: 'assets/Images/beach-marker-highlight.png',
            size: new google.maps.Size(40, 40),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(0, 0),
            origin: new google.maps.Point(0, 0),
        });
        $(`div[beach-number=${index}]`).addClass("selected");
    });
    let = markerUnhoverListener = markerClicked.addListener("mouseout", function(){
        if(lastBeachClicked === index){
            return;
        }
        markerClicked.setIcon({
            url: 'assets/Images/beach-marker-original.png',
            size: new google.maps.Size(40, 40),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(0, 0),
            origin: new google.maps.Point(0, 0),
        });
        $(`div[beach-number=${index}]`).removeClass("selected");
    });
    let markerClickListener = markerClicked.addListener('click', function() {
        if(lastBeachClicked === index){
            return;
        }
        lastBeachClicked = index;
        $(".info-content").empty();
        for (var typeIndex = 0; typeIndex < storeType.length; typeIndex++) {
             yelpRatingandPictures(beachObj, storeType[typeIndex]);
        }
        removeMarkerAnimation();
        markerClicked.setIcon({
            url: 'assets/Images/beach-marker-highlight.png',
            size: new google.maps.Size(40, 40),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(0, 0),
            origin: new google.maps.Point(0, 0),
        });
        map.panTo(markerClicked.getPosition());
        map.setZoom(15.5);
        markerClicked.setAnimation(google.maps.Animation.BOUNCE);
        $(".image").empty();
        $(".beachName").empty();
        $(".reviewRating").empty();
        displayComment(beachObj);
        $(".info-button").remove();
        addBeachInfoButton();
        removeMarkers(yelpMarkerArray);
        $(".food-icon").addClass("highlight");
        $(".beach-info").addClass("hidden");
        addResetButton();
    });
}

function addBeachInfoButton(){
    let infoButton = $("<div>").addClass("info-button pointer left-arrow");
    infoButton.on("click", function(){
        $(".beach-info-box").toggle();
        $(".info-button").toggleClass("left-arrow");
    })
    $(".beach-title-container").append(infoButton);
}

function removeMarkerAnimation(){
    for(var i = 0; i < markerArray.length; i++){
        markerArray[i].setIcon({
            url: 'assets/Images/beach-marker-original.png',
            size: new google.maps.Size(40, 40),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(0, 0),
            origin: new google.maps.Point(0, 0),
        });
        markerArray[i].setAnimation(null);
    }
}

function displayImage(clickedObj){
    let beachImage = $(`<img src="${clickedObj.picture}" alt = "beach">`).addClass("beach-image");
    $('.image').append(beachImage);
}

function displayComment(clickedObj){
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: clickedObj.id
    }, function(place) {
        $('.reviewText').text(place.reviews[0].text);
        $('.reviewRating').text(place.reviews[0].rating + ' Stars');
        // $('.beachName').text(clickedObj.name);
        $('.beach-title').text(clickedObj.name);
    });
    $(".beach-info-box").removeClass("hidden");
}

function yelpRatingandPictures(beachObject, type) {
    let latLng = {lat:beachObject.location[0], lng:beachObject.location[1]};
    let ajaxConfig = {
        dataType: "json",
        url: "http://danielpaschal.com/yelpproxy.php",
        method: "GET",
        data: {
            latitude: latLng.lat,
            longitude: latLng.lng,
            term: type,
            radius: 400,
            api_key:
                "VFceJml03WRISuHBxTrIgwqvexzRGDKstoC48q7UrkABGVECg3W0k_EILnHPuHOpSoxrsX07TkDH3Sl9HtkHQH8AwZEmj6qatqtCYS0OS9Ul_A02RStw_TY7TpteWnYx"
        },
        success: function(response) {
            yelpObjectConstructor(response, type, beachObject);
        },
        error: function() {
            console.log("The server returned no information.");
        }
    };
    $.ajax(ajaxConfig)
}


function yelpObjectConstructor(yelpData, type, beach){
    var storeObjectArray = [];
    if(yelpData.businesses.length ===0){
        $("."+type).text("No results Found...");
        return
    }
    for (var storeIndex = 0; storeIndex < yelpData.businesses.length; storeIndex++) {
        let businesses_Name = yelpData.businesses[storeIndex].name;
        let businesses_Img = yelpData.businesses[storeIndex].image_url;
        let businesses_Rating = yelpData.businesses[storeIndex].rating;
        let businesses_Coordinates = yelpData.businesses[storeIndex].coordinates;
        let businesses_Distance = yelpData.businesses[storeIndex].distance;
        let businesses_Review_count = yelpData.businesses[storeIndex].review_count;
        let businesses_url = yelpData.businesses[storeIndex].url;
        var storeObject = {
            businesses_Name,
            businesses_Img,
            businesses_Rating,
            businesses_Coordinates,
            businesses_Distance,
            businesses_Review_count,
            businesses_url
        };
        storeObjectArray.push(storeObject);
        append_Yelp_Data_To_Dom(storeObject, type, storeIndex);
    }
    beach[type] = storeObjectArray;
}

function append_Yelp_Data_To_Dom( storeObject, type, storeIndex){
    if(storeObject.businesses_Img){
        var image = $("<img>").attr('src', storeObject.businesses_Img);
    } else {
        var image = $("<img>").attr('src', "./assets/Images/no-image.svg");
    }
    image.addClass('yelp_img');
    let infoDiv = $("<div>").addClass("yelp-info");
    let name = $("<p>").text(storeObject.businesses_Name);
    let ratingNumber = storeObject.businesses_Rating.toString();
    let yelp_star = $("<img>").attr("src", yelpStars[ratingNumber]);
    yelp_star.addClass("yelpStars");
    let reviewCount =  $("<p>").text( storeObject.businesses_Review_count + " reviews");
    let linkButton = $("<a>").attr({"href":storeObject.businesses_url, "target": "_blank"}).text("visit");
    infoDiv.append(name, yelp_star, reviewCount, linkButton);
    let yelp_data_content = $("<div>");
    yelp_data_content.addClass('yelp pointer').append(image, infoDiv);
    $("." + type).append(yelp_data_content);
    let yelpMarker = plot_Yelp_Data_On_Map(storeObject, type);
    google.maps.event.addListener(yelpMarker, "click", function(){
        for(let markerIndex = 0; markerIndex < yelpMarkerArray.length; markerIndex++){
            yelpMarkerArray[markerIndex].setAnimation(null);
        }
        yelpMarker.setAnimation(google.maps.Animation.BOUNCE);
        $(".store-icon").removeClass("highlight");
        $(`.${type}-icon`).addClass("highlight");
        $(".info-content").addClass("hidden");
        $(`.${type}`).removeClass("hidden");
        $(".selected").removeClass("selected");
        yelp_data_content.addClass("selected");
    });
    yelp_data_content.on("click", function(){
        $(".selected").removeClass("selected");
        yelp_data_content.addClass("selected");
    });
    yelp_data_content.on("click", yelpMarker, function(){
        for(let markerIndex = 0; markerIndex < yelpMarkerArray.length; markerIndex++){
            yelpMarkerArray[markerIndex].setAnimation(null);
        }
        yelpMarker.setAnimation(google.maps.Animation.BOUNCE);
    });
}

function scrolling() {
    $('.info-content').scrollTop(300);
}

function plot_Yelp_Data_On_Map(yelpPlace, type){
    let imgUrl;
    switch (type) {
        case "food":
            imgUrl = "assets/Images/restaurant-marker.png"
            break;
        case "hotel":
            imgUrl = "assets/Images/hotel-marker.png"
            break;
        case "coffee":
            imgUrl = "assets/Images/coffee-marker.png"
            break;
        case "bar":
            imgUrl = "assets/Images/bar-marker.png"
            break;
    
        default:
            break;
    }
    let image = {
        url: imgUrl,
        size: new google.maps.Size(30, 30),
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0,32)
    };
    let yelpMarker = new google.maps.Marker({
        position: {
            lat: yelpPlace.businesses_Coordinates.latitude,
            lng: yelpPlace.businesses_Coordinates.longitude
        },
        icon: image,
        map: map,
        type: type,
        label: "",
        animation: google.maps.Animation.DROP,
    });
    yelpMarkerArray.push(yelpMarker);
    return yelpMarker;
}

function removeMarkers(markers){
    for(let i=0; i<markers.length; i++){
        markers[i].setMap(null);
    }
}

function addClickHandlerToStoreIcon(){
    $(".store-icon").bind("click", storeIconEventListener);
}

function storeIconEventListener(){
    $(".store-icon").removeClass("highlight");
    $(this).addClass("highlight");
    let type = $(this).attr("type");
    $(".info-content").addClass("hidden");
    $("."+type).removeClass("hidden");
}

function addResetButton(){
   $(".back").removeClass("hidden");
   $(".back").on("click", resetMap);
   $(".text-title").on("click", resetMap);
}

function resetMap(){
    removeMarkers(yelpMarkerArray);
    yelpMarkerArray = [];
    removeMarkerAnimation();
    map.setCenter({lat: 33.522759, lng: -117.763314});
    map.setZoom(13);
    lastBeachClicked = null;
    $(".selected").removeClass("selected")
    $(".beach-info").removeClass("hidden");
    $(".back").addClass("hidden");
    $(".info-content").empty();
    $(".info-content").addClass("hidden");
    $(".info-button").remove();
    $(".food").removeClass("hidden");
    $(".store-icon").removeClass("highlight");
    $(".image").empty();
    $(".beachName").empty();
    $(".reviewRating").empty();
    $(".beach-info-box").addClass("hidden");
    $(".reviewText").empty();
    $(".text-title").off("click");
    $(".beach-title").text("Laguna Beach");
}