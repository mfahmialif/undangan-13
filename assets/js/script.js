// NEED TO RUN THIS SCRIPT AFTER LOADING JQUERY //
AOS.init({
  offset: -300, // All animations will trigger 300px before entering the viewport
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);

const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const audio = document.getElementById("background-music");
const clickArea = document.querySelector(".music-outer");
const openingVideo = document.querySelector(".opening-video");
const contentWedding = document.getElementById("content-wedding");

clickArea.addEventListener("click", () => {
  if (audio.paused) {
    // audio.play(); // Play the music if paused
  } else {
    audio.pause(); // Pause the music if playing
  }
});

$(window).on("scroll", function () {
  if ($(window).width() <= 1024) {
    var footerRight = $("#footer-right");
    var qrInvitation = $(".qr-invitation");
    var footerBottom = footerRight.offset().top + footerRight.outerHeight();
    var windowBottom = $(window).scrollTop() + $(window).height();

    if (
      windowBottom >= footerRight.offset().top &&
      windowBottom <= footerBottom
    ) {
      var opacity =
        1 -
        (windowBottom - footerRight.offset().top) / footerRight.outerHeight();
      qrInvitation.css("opacity", opacity);
    } else if (windowBottom > footerBottom) {
      qrInvitation.css("opacity", 0);
    } else {
      qrInvitation.css("opacity", 1);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  $("html, body").animate({ scrollTop: 0 }, 800); // Durasi 800ms
  contentWedding.style.display = "none"; // Hide

  var splideOurStory = new Splide("#splide-our-story", {
    perPage: 1,
    breakpoints: {
      640: {
        perPage: 1,
      },
    },
    padding: "1.3rem",
    focus: "center",
    // type: "loop", // Enable infinite loop
    pagination: true,
    arrows: false,
    gap: 5,
    lazyLoad: "sequential",
    interval: 10000,
    speed: 2000,
    autoplay: "play",
  });

  splideOurStory.mount();
  
  Fancybox.bind("[data-fancybox]", {});

  openingVideo.addEventListener("play", function () {
    setTimeout(() => {
      const elements = document.querySelectorAll(".hidden-element");

      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("fade-in");
        }, index * 300);
      });
    }, 11000);
  });

  openingVideo.addEventListener("ended", function () {
    openingVideo.remove(); // Removes the video from the DOM after it finishes
  });
});
// END NEED TO RUN THIS SCRIPT AFTER LOADING JQUERY //

// FUNCTIONS //
function openInvites() {
  // audio.play(); // Play the music if paused
  openingVideo.play(); // Play the opening video
  contentWedding.style.display = "block"; // Show
  $("#welcome").fadeOut();
  $("#header").css("opacity", 1);

  // $("body").removeClass("no-scroll");
  // $("html, body").animate(
  //   {
  //     scrollTop: $("#header").offset().top + 100,
  //   },
  //   800
  // );
}
function toggleEnvelope() {
  $(".envelope-greeting").toggleClass("expand");
  $(".envelope-info").toggleClass("expand");
}

function showQrInvitation() {
  const box = document.querySelector(".qr-invitation");
  box.classList.toggle("expanded");
}

// END FUNCTIONS //
