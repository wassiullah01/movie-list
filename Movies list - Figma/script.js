// const movieCards = document.querySelectorAll(".card")
// let movies = JSON.parse(localStorage.getItem("movies")) || [];

// movieCards.forEach((card, index) => {
//     card.addEventListener('click', () => {
//         const img = card.querySelector('img').src;
//         const text = card.querySelector(".text-1").innerText;
//         const year = card.querySelector(".year-1").innerText;

//         const data = {
//             index: index,
//             img: img,
//             text: text,
//             year: year
//         };

//         movies.push(data)
//         // let key = `movie_${index}`
//         localStorage.setItem("movies", JSON.stringify(movies));
//         window.location.href = `view-movie.html?id=${index}`
//     })
// })


document.addEventListener("DOMContentLoaded", () => {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    const addIcon = document.getElementById("addIcon")
    const movieContainer = document.querySelector(".d-flex.flex-wrap");

    function renderMovies() {
        movieContainer.innerHTML = "";

        movies.forEach((movie, index) => {
            const movieCard = document.createElement("div");
            movieCard.className = "card";
            movieCard.style.width = "18rem";
            movieCard.style.backgroundColor = "#092C39";
            movieCard.dataset.index = index;

            movieCard.innerHTML = `
                <a href="view-movie.html?id=${index}">
                    <img src="${movie.img}" class="card-img-top" height="300px">
                </a>
                <div class="card-body d-flex flex-column">
                    <a href="view-movie.html?id=${index}" class="card-text text-white text-decoration-none">${movie.text}</a>
                    <a href="view-movie.html?id=${index}" class="card-text text-white text-decoration-none">${movie.year}</a>
                    <button class="edit-movie btn btn-primary mt-2" data-index="${index}">Edit</button>
                    <button class="delete-movie btn btn-danger mt-2" data-index="${index}">Delete</button>
                </div>
            `;

            movieContainer.appendChild(movieCard);
        });
    }

    renderMovies();

    addIcon.addEventListener("click",()=>{
        window.location.href = "add-movie.html"
    })

    movieContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-movie")) {
            const index = event.target.dataset.index;
            window.location.href = `update-movie.html?id=${index}`
        }
    });

    movieContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-movie")) {
            const index = event.target.dataset.index;
            movies.splice(index, 1);
            localStorage.setItem("movies", JSON.stringify(movies));
            renderMovies();
        }
    });
});
