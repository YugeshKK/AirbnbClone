let btn= document.getElementById('btn');

let place= document.getElementById('loc');
let inn= document.getElementById('in');
let out= document.getElementById('out');
let guest= document.getElementById('guest');

btn.addEventListener('click', ()=>{

    const dataArray = [place.value, inn.value, out.value, guest.value];
    const dataToSend = encodeURIComponent(JSON.stringify(dataArray));
    window.location.href = `search.html?data=${dataToSend}`;

})


