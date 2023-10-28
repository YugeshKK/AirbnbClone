
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
    // console.log(parsedArray);
} else {
    dataDisplay.textContent = "No data received.";
}


const url = `https://airbnb13.p.rapidapi.com/search-location?location=${parsedArray[0]}&checkin=${parsedArray[1]}&checkout=${parsedArray[2]}&adults=${parsedArray[3]}&children=0&infants=0&pets=0&page=1&currency=USD`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f2ccce2444msh91b16b4c8616eeap138df1jsn9820ce629428',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};

async function hello(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        let row= document.getElementById('row');
        let cont= document.getElementById('cont');
        cont.innerHTML=``;

       const obj= result.results[1];
        let src;
       for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
           if(key=='images'){
             sr= obj[key][0];
           }
            
        }
       }
        row.innerHTML=`<div  class="cards">
        <img src=${sr} width="300px" height="250px" alt="">
        <div>
            <div class="heart">
                <p>Entire Home Bordeaux <br><b style="font-size: 20px;">Bordeaux Getaway</b></p>
                <img src="images/icons8-heart-50.png" id="he" width="16px" height="20px" alt="">
            </div>
            <div class="text">
                <p>4-6 guests Entire home 5 beds 3 bath <br> wifi . kitchen . Free parking</p>
            </div>
            <div id="las">
                <p>5.0</p>
                <img src="images/icons8-star-50.png" width="18px" alt="">
                <p>(318 reviews)</p>
                <p id="aa"><b>$325 /night</b></p>
            </div>
        </div>
    </div>`

    cont.appendChild(row);
    } catch (error) {
        console.error(error);
    }
}


hello();