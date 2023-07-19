let btn = document.getElementById("search-btn");
let inputName = document.getElementById("input-name");
let apiKey = `0DsuAyGvECXLVAGtuUju6HSU98Eig6H3`;
let keyword;

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
      if (response.data.page.totalElements == "0") {
        alert("No attraction, artist, or event found.");
      } else {
        console.log(response.data._embedded.attractions);

        handleAnimation();
        handleClasses(response.data._embedded.attractions);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function handleClasses(attractions) {
  if ($(".wrapper").hasClass("move-wrapper")) {
    $(".wrapper").removeClass("move-wrapper");

    setTimeout(function () {
      renderData(attractions);
    }, 100);
  } else {
    renderData(attractions);
  }
}

function handleAnimation() {
  $(".text-intro").addClass("hide");
  $(".form-container").addClass("move-form");
  $("footer").addClass("alter-footer");

  setTimeout(function () {
    $(".results-text").empty();
    $(".results-text")
      .addClass("show-text")
      .append(
        `<p>Results related to <strong><em>"${keyword}"</em></strong>.</p>`
      );
  }, 1000);
}

function renderData(attractions) {
  $(".wrapper").addClass("move-wrapper");
  $(".wrapper").empty();

  for (let i = 0; i < attractions.length; i++) {
    $(".wrapper").append(`
    <div class="slides">
    <button id=${attractions[i].id} class="see-more-btn">See more</button>

        <img src=${attractions[i].images[0].url} alt="photo of event">
        <div class="title-text"><span style="margin-right: 10px;"></span>${attractions[i].name.toUpperCase()}
          <span><a href=${attractions[i].url} target="_blank">Tickets</a></span>
        </div>
    </div>
    `);
  }
}

function getResultsById(id) {
  console.log("Something happens here")
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${id}&apikey=${apiKey}`
    )
    .then((response) => {
      console.log(response.data._embedded);
    })
    .catch((error) => {
      console.log(error);
    });
}
// Dynamic button, get results by Id
$(document).on("click", ".see-more-btn", function (e) {
  getResultsById(e.target.id);
});

// Footer animation handler
$(window).scroll(function () {
  let content = $("footer");
  let scrollTop = $(window).scrollTop();
  content.css("opacity", 1 - scrollTop / 500);
});



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
