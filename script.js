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
      // `https://app.ticketmaster.com/discovery/v2/events.json?&countryCode=AU&apikey=0DsuAyGvECXLVAGtuUju6HSU98Eig6H3`
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
  }, 100);
}

function renderData(attractions) {
  $(".wrapper").addClass("move-wrapper");
  $(".wrapper").empty();

  for (let i = 0; i < attractions.length; i++) {
    let btnDisplay = getBtnDisplayProp(attractions[i].upcomingEvents._total);

    let segmentName = getSegmentName(
      attractions[i].classifications[0].segment.name
    );
    let genre = getGenreName(attractions[i].classifications[0].genre);

    let externallinks = getExternalLinks(attractions[i].externalLinks);

    $(".wrapper").append(`
    <div class="slides">
    <div class="classifications-container">
      <p>${segmentName}</p>
    <p>${genre}</p>
    </div>
      <button id=${
        attractions[i].id
      } class="see-more-btn" style="display:${btnDisplay}">See more</button>

        <img src=${attractions[i].images[0].url} alt="photo of event">
        <div class="externalLinks-container">
          <ul class="externalLinks-ul-container">${externallinks}</ul>        
        </div>  
        <div class="title-text">       
          <span style="margin-right: 10px;"></span>${attractions[
            i
          ].name.toUpperCase()}
          <span><a href=${attractions[i].url} target="_blank">Tickets</a></span>
        </div>
    </div>
    `);
  }

  $(".fa-musicbrainz")[0].parentElement.parentElement.style.display = "none";
}

function getBtnDisplayProp(btnDisplayProp) {
  // Button display property to see more attractions
  if (btnDisplayProp == "0") {
    return "none";
  } else {
    return "block";
  }
}

function getSegmentName(segmentnames) {
  // if statement that handles "undefined" results for segment name
  if (segmentnames === "Undefined" || segmentnames === "Miscellaneous") {
    return "Other";
  } else {
    return segmentnames;
  }
}

function getGenreName(genrenames) {
  // if statement that handles "undefined" results/not found - for genre
  if (
    (genrenames && genrenames.name === "Undefined") ||
    (genrenames && genrenames.name === "Miscellaneous") ||
    (genrenames && genrenames.name === "Other")
  ) {
    return "Other";
  } else if (genrenames) {
    return genrenames.name;
  } else {
    return "Other";
  }
}

function getExternalLinks(externallinks) {
  if (externallinks) {
    let links = [];
    for (const property in externallinks) {
      let propertyClassName = "";

      if (`${property}` === "homepage") {
        propertyClassName = `fa-solid fa-house`;
      } else if (`${property}` === "wiki") {
        propertyClassName = `fa-brands fa-wikipedia-w"`;
      }  else {
        propertyClassName = `fa-brands fa-${property}`;
      }
      links.push(
        `<li class="externalLink-item"><a href=${externallinks[property][0].url} target="_blank"><i class="${propertyClassName}"></i></a></li>`
      );
    }

    links = links.toString().split(",").join(" ");
    return links;
  } else {
    return "";
  }
}



function renderResultsById(resultsById) {
  console.log(resultsById);
  $(".wrapper").css("overflow", "hidden");
  $(".wrapper-container").css("display", "block");
  $(".see-more-wrapper").css("display", "block");
  $(".see-more-wrapper").empty();
  $(".results-text-2").append(`<p>Event results: ${resultsById.length}.</p>`);
  $(".wrapper-container").append(`<i class="fa-solid fa-xmark"></i>`);

  for (let i = 0; i < resultsById.length; i++) {
    // if resultsById[i].dates.start.localTime = undefined
    // then text should read "Time to be defined"
    let localTime;
    if (resultsById[i].dates.start.localTime) {
      localTime = resultsById[i].dates.start.localTime;
    } else {
      localTime = "Hour: TBD";
    }

    let timeZone;
    if (resultsById[i].dates.timezone) {
      timeZone = resultsById[i].dates.timezone;
    } else {
      timeZone = "Place: TBD";
    }

    // if resultsById[i].dates.status.code = "cancelled"
    // then text should read "Event cancelled"

    $(".see-more-wrapper").append(`
    <div class="slides">
        <div class="title-text">
       <p>${resultsById[i].name.toUpperCase()}</p>
       <p style="font-weight:100;">${timeZone}</p>
       <p style="font-weight:100;">${resultsById[i].dates.start.localDate}</p>
    
       <p style="font-weight:100;">${localTime}</p>
       
          <p style="width: fit-content;
          padding: 5px;
          background: #000000e8;
          border-radius: 5px; float:right;"><a href=${
            resultsById[i].url
          } target="_blank">Tickets</a></p>
        </div>
    </div>
    `);
  }
}

function getResultsById(id) {
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${id}&apikey=${apiKey}`
    )
    .then((response) => {
      // console.log(response.data._embedded);
      if (response.data.page.totalElements == "0") {
        alert("No attraction, artist, or event found.");
      } else {
        //console.log(response.data._embedded.attractions);
        renderResultsById(response.data._embedded.events);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// Dynamic button, get results by Id
$(document).on("click", ".see-more-btn", function (e) {
  e.preventDefault();
  getResultsById(e.target.id);
});

// Dynamic button, x mark
$(document).on("click", ".fa-xmark", function (e) {
  e.preventDefault();
  $(".wrapper-container").css("display", "none");
  $(".wrapper").css("overflow", "initial");
  $(".results-text").empty();
  $(".results-text-2").empty();
  $(".results-text").append(
    `<p>Results related to <strong><em>"${keyword}"</em></strong>.</p>`
  );
});

// Footer animation handler
$(window).scroll(function () {
  let content = $("footer");
  let scrollTop = $(window).scrollTop();
  content.css("opacity", 1 - scrollTop / 500);
});
