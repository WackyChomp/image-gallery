
// Variables
const auth = ;
const loadMore = document.querySelector(".loadMore");
const input = document.querySelector("input");
const searchButton = document.querySelector(".searchButton");
let pageNum = 1;
let search = false;
let query = "";


input.addEventListener("input", (e)=>{
    e.preventDefault();        // refresh doesn't remove data
    query = e.target.value;
});


// Starting images after loading
async function curatedPhotos(pageNum){
    const data = await fetch(`https://api.pexels.com/v1/curated?per_page=15&page=${pageNum}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    }    
    );
    const result = await data.json();

    // Data to render from API
    result.photos.forEach(photo =>{
        const pic = document.createElement("div");
        pic.innerHTML = `<img src=${photo.src.large}>
        <p>Photo : ${photo.photographer}</p>
        <a target="_blank" href=${photo.src.large}>Download<a/>
        
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}


// Searching Images
async function searchPhotos(query, pageNum){
    const data = await fetch(`"https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${pageNum}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    }    
    );
    const result = await data.json();

    // Data to render from API
    result.photos.forEach(photo =>{
        const pic = document.createElement("div");
        pic.innerHTML = `<img src=${photo.src.large}>
        <p>Photo : ${photo.photographer}</p>
        <a target="_blank" href=${photo.src.large}>Download<a/>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}

// Indicate that search worked
searchButton.addEventListener("click", ()=>{
    if (input.value === "") return;
    clear();
    search = true;
    searchPhotos(query, pageNum);
});

// Clearing
function clear(){
    input.value = "";
    document.querySelector(".gallery").innerHTML = "";
    pageNum = 1;
}


// Loading more images button
loadMore.addEventListener("click", ()=> {
    if (!search){
        pageNum++;
        curatedPhotos(pageNum)
    }
    else{
        if (query.value === "") return;
        pageNum++;
        searchPhotos(query, pageNum);
    }
});

curatedPhotos(pageNum);