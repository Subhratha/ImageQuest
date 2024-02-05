const accessKey="_4JINz5ErOt_2V2f_GRI7P3nvd8a0c5iZ_2VkfkcBIk"; //to store api key

const formEl = document.querySelector("form");//to store the form section
const inputEl= document.getElementById("search-input");//store input section
const searchResults = document.querySelector(".search-results");//to store the boxes images and container
const showMore = document.getElementById("show-more-button");//store the value of show more button

let inputData="";//hold the keyword which user is writing
let page=1;//default page no. 1

async function searchImages(){
    inputData=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response=await fetch(url);
    const data=await response.json();

    const results=data.results;

    if(page===1){
        searchResults.innerHTML="";

    }

    results.map((result)=>{
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);




    });

    page++;
    if(page>1){
        showMore.style.display="block";
    }
}
//event listener make
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", ()=>{
    searchImages();
});