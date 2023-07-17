let btn = document.getElementById("search-btn");
let inputName = document.getElementById("input-name");
let apiKey = `0DsuAyGvECXLVAGtuUju6HSU98Eig6H3`;
let keyword;
let title;
let imgUrl;

btn.addEventListener("click", getInputName);

function getInputName (e) {
  e.preventDefault();
  keyword = inputName.value.trim();
  console.log(keyword)
}


function getResults() {
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?&keyword=${keyword}&apikey=${apiKey}`
    )
    .then((response) => {
      console.log(response);
      //   title = response.data.articles.title;
      //   imgUrl = response.data.articles.urlToImage;

      //renderCarousel(response.data._embedded.events);
    })
    .catch((error) => {
      console.log(error);
    });
}
//getResults();









// ===================== CAROUSEL ==============================
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   //console.log("what is n:", n);
//   showSlides((slideIndex += n));
// }

// function showSlides(n) {
//   //   console.log("Line 32, n is: ", n)
//   let i;
//   let slides = document.getElementsByClassName("slides");
//   //   console.log("slides.length: ", slides.length)
//   if (n > slides.length) {
//     // if index greater than slides.length (aka 21 > 20) then index goes back to 1
//     slideIndex = 1;
//     // console.log("new  ", slideIndex);
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//     // console.log("AAHH ", slideIndex);
//   }
//   for (i = 0; i < slides.length; i++) {
//     // console.log("slides [i]: ", slides[i]);
//     slides[i].style.display = "none";
//     slides[slideIndex - 1].style.display = "block";
//   }
// }

// function renderCarousel(events) {
//   for (let i = 0; i < events.length; i++) {
//     $(".carousel").append(`
//     <div class="slides fade">
//         <img src=${events[i].images[0].url} alt="article">
//         <div class="title-text">${events[i].name.toUpperCase()}</div>
//     </div>
//     `);
//   }
//   showSlides(slideIndex);
// }

 
