let apiKey = `0DsuAyGvECXLVAGtuUju6HSU98Eig6H3`;
let title;
let imgUrl;

function getTopHeadlines() {
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`
    )
    .then((response) => {
      console.log(response);
      //   title = response.data.articles.title;
      //   imgUrl = response.data.articles.urlToImage;

      //renderCarousel(response.data.articles);
    })
    .catch((error) => {
      console.log(error);
    });
}

// let slideIndex = 1;
// // showSlides(slideIndex);

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
//     console.log("new  ", slideIndex);
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//     console.log("AAHH ", slideIndex);
//   }
//   for (i = 0; i < slides.length; i++) {
//     console.log("slides [i]: ", slides[i]);
//     slides[i].style.display = "none";
//     slides[slideIndex - 1].style.display = "block";
//   }
// }

// function renderCarousel(articles) {
//   for (let i = 0; i < articles.length; i++) {
//     $(".carousel").append(`
//     <div class="slides fade">
//         <img src=${articles[i].urlToImage} alt="article">
//         <div class="title-text">${articles[i].title}</div>
//     </div>
//     `);
//   }
//   showSlides(slideIndex);
// }

 getTopHeadlines();
