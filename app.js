
// Variables
const auth = `${API_KEY}`;
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
        <a href= ${photo.src.large}>Download<a/>
        
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}

curatedPhotos(pageNum);