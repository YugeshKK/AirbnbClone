let searchBtn=document.getElementById('search');

searchBtn.addEventListener('click', ()=>{
    const newPageURL = "search.html"; // Change this to the desired URL

    // Navigate to the new page
    window.location.href = newPageURL;
})