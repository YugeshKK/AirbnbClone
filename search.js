

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Retrieve the data from the URL and display it
const dataParam = getQueryParam("data");
let  parsedArray;
if (dataParam) {
    const decodedData = decodeURIComponent(dataParam);
     parsedArray = JSON.parse(decodedData);
     console.log(parsedArray)
} else {
    dataDisplay.textContent = "No data received.";
}


const url = `https://airbnb13.p.rapidapi.com/search-location?location=${parsedArray[0]}&checkin=${parsedArray[1]}&checkout=${parsedArray[2]}&adults=${parsedArray[3]}&children=0&infants=0&pets=0&page=1&currency=INR`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '01ab9c2533msh4b2bec45b84110bp1ce9f3jsn5a91e4d0e84e',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};

var heart;

let pla= document.getElementById('place')
let dat= document.getElementById('dat');
let gue= document.getElementById('gue');
let btn= document.getElementById('btn');

pla.value= parsedArray[0];
dat.value=parsedArray[1];
gue.value=parsedArray[3]+" guests";







async function hello(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
         cont=document.getElementById('first'); 
        markerData=[[]];
        // cont.innerHTML=``;

       const objj= result.results;
       for (const key in objj) {    
        if (Object.hasOwnProperty.call(objj, key)) {
            row= document.createElement('div');
            row.setAttribute('id', 'row');
            
           const obj= objj[key];

           for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
               if(key=='images'){
                 sr= obj[key][0];
               }
               if(key=='name'){
                nam=obj[key]
               }
               if(key=='persons'){
                per=obj[key]
               }
               if(key=='beds'){
                bed=obj[key];
               }
               if(key=='bathrooms'){
                bath= obj[key];
               }
               if(key=='previewAmenities'){
                const arr= obj[key];
                 str='';
                for (let index = 0; index < arr.length; index++) {
                    str += arr[index]+" .";
                }
               }
               if(key=='rating'){
                rat= obj[key];
               }
               if(key=='reviewsCount'){
                rev= obj[key];
               }
               if(key=='price'){
                price= obj[key];
                pp=price.priceItems[0].title;
               } 
               if(key=='lat'){
                lat= obj[key]
               } 
               if(key=='lng'){
                lng= obj[key];
               }
            }
           }
         
            row.innerHTML=`<div  class="cards">
            <img src=${sr} id='imgg' width="300px" height="250px" alt="">
            <div>
                <div class="heart">
                    <p>Entire Home in ${parsedArray[0]} <br><b style="font-size: 20px;">${nam}</b></p>
                    <img src="images/icons8-heart-50.png" id="he" width="16px" height="20px" alt="">
                </div>
                <div class="text">
                    <p>${per} guests Entire home ${bed} beds ${bath} bath <br>${str}</p>
                </div>
                <div id="las">
                    <p>${rat}</p>
                    <img src="images/icons8-star-50.png" width="18px" alt="">
                    <p>(${rev})</p>
                    <p id="aa"><b>${pp}</b></p>
                </div>
            </div>
        </div>`
    
        cont.appendChild(row);
        markerData.push([lat, lng, nam]);
        }
       }
    } catch (error) {
        console.error(error);
    }
    let map= document.getElementById('map');

    map.style.display='block'
    return markerData;


}

 
let infoWindows=[];
(async ()=>{
    markerData= await hello();
(function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: markerData[1][0], lng: markerData[1][1] },
      zoom: 4
    });

    markerData.forEach(coordinate => {
      const position = new google.maps.LatLng(coordinate[0], coordinate[1]);
      const name = coordinate[2];
      const marker = addMarker(position, map, name);
    });
  })();
})();
  // Function to add markers
  function addMarker(position, map, name) {
    const marker = new google.maps.Marker({
      position,
      map
    });

    const infoWindow = new google.maps.InfoWindow({
      content: name
    });

    marker.addListener('click', function() {
      closeAllInfoWindows();
      infoWindow.open(map, marker);
    });

    infoWindows.push(infoWindow);

    return marker;
  }

  function closeAllInfoWindows() {
    infoWindows.forEach(infoWindow => {
      infoWindow.close();
    });
  }








