const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a5f34f842c8d4c17cfb7f8483243d7c2&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=a5f34f842c8d4c17cfb7f8483243d7c2&query=";

const main = document.querySelector('#section');
const form = document.querySelector('form');

async function getMovies() {
  const resp = await fetch(APILINK);
  const respData = await resp.json();
  console.log(respData);

  respData.results.forEach(movie => {
    const card = document.createElement('div');
    card.style.display="block";
    card.setAttribute('class', 'card');
    
    const img = document.createElement('img');
    img.setAttribute('class', 'thumbnail');
    img.src = IMG_PATH + movie.poster_path;
    img.alt = movie.title; // Set alt attribute for accessibility
    img.style.maxWidth= "100%";
    img.style.maxHeight="100%";
    
    const title = document.createElement('h3');
    title.setAttribute=("class","card-title");
    title.innerText = movie.title;
    const btn= document.createElement('button')
    btn.setAttribute('class','button');
    btn.style.width='30px';
    btn.style.height='30px';
    btn.textContent="click";
    btn.addEventListener('click',function(){
      console.log("button Clicked!");
      const movieDisplay = movie.id;
      console.log(movieDisplay);
      const currentCard=btn.closest(".card")
      getCast(movieDisplay, currentCard);
    })
    card.appendChild(btn);
    card.appendChild(img);
    card.appendChild(title);
    
    main.appendChild(card);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  main.innerHTML = ''; // Clear previous search results
  const searchValue = form.query.value;

  if (searchValue) {
    const resp = await fetch(SEARCH_API + searchValue);
    const respData = await resp.json();
    console.log(respData);
    
    respData.results.forEach(movie => {
      const card = document.createElement('div');
      card.style.display="block";
      card.setAttribute('class', 'card');
      
      const img = document.createElement('img');
      img.setAttribute('class', 'thumbnail');
      img.src = IMG_PATH + movie.poster_path;
      img.alt = movie.title;
      img.style.maxWidth= "100%";
      img.style.maxHeight="100%";
      const title = document.createElement('h3');
      title.setAttribute=("class","card-title");
      title.innerText = movie.title;
      const btn= document.createElement('button')
      btn.setAttribute('class','button');
      btn.style.width='30px';
      btn.style.height='30px';
      btn.textContent="click";
      btn.addEventListener('click',function(){
        console.log("button Clicked!");
        const movieDisplay = movie.id;
        console.log(movieDisplay);
        const currentCard=btn.closest(".card")
        getCast(movieDisplay, currentCard);
      })

      card.appendChild(btn);
      card.appendChild(img);
      card.appendChild(title);
      
      main.appendChild(card);
    });
  }
  form.query.value = ''; // Clear the search input
});

// Initial call to populate the page with popular movies
getMovies();