let btn = document.getElementById("search-btn");
let inputName = document.getElementById("input-name");
let apiKey = `0DsuAyGvECXLVAGtuUju6HSU98Eig6H3`;
let keyword;
let title;
let imgUrl;

btn.addEventListener("click", getInputName);

function getInputName(e) {
  e.preventDefault();

  keyword = inputName.value.trim();
  if (keyword == "") {
    alert("Enter the name of an attraction, artist, or event.");
  } else {
    getResults();
  }
}

function getResults() {
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?&keyword=${keyword}&apikey=${apiKey}`
    )
    .then((response) => {
      // console.log(response);
      if (response.data.page.totalElements == "0") {
        alert("No attraction, artist, or event found.");
      } else {
        // $(".text-intro").addClass("hide");
        // $(".form-container").addClass("move-form");
        console.log(response.data._embedded.attractions);
        renderData(response.data._embedded.attractions);
      }

      //   title = response.data.articles.title;
      //   imgUrl = response.data.articles.urlToImage;
    })
    .catch((error) => {
      console.log(error);
    });
}
function renderData(attractions) {
  $(".text-intro").addClass("hide");
  $(".form-container").addClass("move-form");
  $(".wrapper").addClass("move-wrapper");

  for (let i = 0; i < attractions.length; i++) {
    $(".wrapper").append(`
    <div class="slides">
        <img src=${attractions[i].images[0].url} alt="article">
        <div class="title-text">${attractions[i].name.toUpperCase()}</div>
    </div>
    `);
  }
}

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
