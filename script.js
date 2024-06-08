// locomotive and scroll trigger together working

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locomotive();
// locomotive();
// website loading animation
function laodingAnimation() {
  let tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    delay: 0.5,
    stagger: 0.3,
    duration: 0.6,
  });

  tl.from("#loader .line .counting h5,#loader .line h2", {
    opacity: 0,
    onStart: () => {
      let count = document.querySelector("#loader .line .counting .count");
      var num = 1;
      let endCount = setInterval(function () {
        if (num <= 100) {
          count.textContent = `${num}`;
          num++;
        } else {
          clearInterval(endCount);
        }
      }, 30);
    },
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.5,
    delay: 3.3,
  });

  tl.to("#page1", { visibility: "visible" });
  tl.from("#page1", {
    opacity: 0,
    delay: 0.5,
    duration: 0.5,
    y: 1000,
    ease: Power4,
  });
  tl.to(".logo", {
    opacity: 1,
  });
  tl.to(".cursor", {
    opacity: 1,
  });

  tl.to("#loader", {
    delay: 1,
    display: "none",
  });
}
laodingAnimation();

// cursor animation
function cursorAnimation() {
  document.addEventListener("mousemove", function (evt) {
    gsap.to(".cursor", {
      left: evt.x,
      top: evt.y,
    });
  });
}
// cursorAnimation();
// ----------------------------------

// page 1 animations
function navLinkMagnet() {
  let h4Elements = document.querySelectorAll("#page1 header nav h4");
  let cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", function (evt) {
    // Check if the mouse is within any h4 element
    let isWithinH4 = Array.from(h4Elements).some(function (elm) {
      const rect = elm.getBoundingClientRect();
      return (
        evt.clientX >= rect.left &&
        evt.clientX <= rect.right &&
        evt.clientY >= rect.top &&
        evt.clientY <= rect.bottom
      );
    });

    // Adjust cursor size based on whether the mouse is within an h4 element
    if (isWithinH4) {
      cursor.style.height = "4vw";
      cursor.style.width = "4vw";
    } else {
      cursor.style.height = "2.5vw";
      cursor.style.width = "2.5vw";
    }

    // Magnet effect for h4 elements
    h4Elements.forEach(function (elm) {
      const rect = elm.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = evt.clientX - centerX;
      const distanceY = evt.clientY - centerY;

      if (
        evt.clientX >= rect.left &&
        evt.clientX <= rect.right &&
        evt.clientY >= rect.top &&
        evt.clientY <= rect.bottom
      ) {
        const newX = Math.min(
          rect.width / 2,
          Math.max(-rect.width / 2, distanceX)
        );
        const newY = Math.min(
          rect.height / 2,
          Math.max(-rect.height / 2, distanceY)
        );

        elm.style.transform = `translate(${newX}px, ${newY}px)`;
      } else {
        elm.style.transform = "none";
      }
    });
  });

  h4Elements.forEach(function (elm) {
    elm.addEventListener("mouseleave", function (evt) {
      // Reset cursor size when mouse leaves any h4 element
      cursor.style.height = "2.5vw";
      cursor.style.width = "2.5vw";
    });
  });
}
navLinkMagnet();

function heroAnimation() {
  gsap.from("#page1 .hero .hero-line h1", {
    y: 150,
    stagger: 0.2,
    opacity: 0,
    // delay: 6.8,
    delay: 7.8,
  });

  // line3 img follower effect
  var line3 = document.querySelector("#line3");
  var page1 = document.querySelector("#page1");
  var img = document.querySelector("#page1 img");

  line3.addEventListener("mouseenter", function () {
    img.style.display = "block";
  });
  line3.addEventListener("mousemove", function (event) {
    let x = event.clientX;
    let y = event.clientY;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
  });

  line3.addEventListener("mouseleave", function () {
    img.style.display = "none";
  });

  // line3 hover
  let parent = document.querySelector("#two-elm");

  parent.firstElementChild.addEventListener("mouseenter", function () {
    parent.firstElementChild.classList.add("heading-hover");
    console.log("hy");
  });
  parent.firstElementChild.addEventListener("mouseleave", function () {
    parent.firstElementChild.classList.remove("heading-hover");
  });

  parent.lastElementChild.addEventListener("mouseenter", function () {
    parent.lastElementChild.classList.add("heading-hover");
  });
  parent.lastElementChild.addEventListener("mouseleave", function () {
    parent.lastElementChild.classList.remove("heading-hover");
  });

  // gsap.from(".hero-line h1", {
  //   onStart: function () {
  //     $(
  //       ".hero-line:nth-child(1) h1,.hero-line:nth-child(2) h1,.hero-line:nth-child(4) h1"
  //     ).textillate({
  //       // in animation settings.
  //       in: {
  //         effect: "fadeIn",
  //         type: "char",
  //         delay: 100,
  //         delayScale: 1.5,
  //         sync: false,
  //         shuffle: false,
  //         reverse: false,
  //         sequence: true,
  //         // callback: function () {},
  //       },
  //       // out animation settings.
  //       out: {
  //         effect: "fadeOut",
  //         type: "char",
  //         delay: 100,
  //         delayScale: 1.5,
  //         sync: false,
  //         shuffle: false,
  //         reverse: false,
  //         // sequence: true,
  //         // callback: function () {},
  //       },
  //       loop: true,
  //     });
  //   },
  // });
}

heroAnimation();
//
// page 2 animations

function manageVideoAndCursor() {
  document.addEventListener("DOMContentLoaded", function () {
    let videoContainer = document.querySelector("#page2 .video-container");
    let video = document.querySelector("video");
    let overlay = document.getElementById("overlay");
    let videoCursor = document.getElementById("video-cursor");
    let videoCursorIcon = document.querySelector("#video-cursor i");

    let documentCursor = document.querySelector(".cursor");

    // Function to play or pause the video
    function toggleVideo() {
      if (video.paused) {
        overlay.style.display = "none";
        video.play();
        videoCursorIcon.classList.remove("fa-play");
        videoCursorIcon.classList.add("fa-pause");
        videoCursor.style.width = "5vw";
        videoCursor.style.height = "5vw";
        videoCursorIcon.style.fontSize = "1vw";
        videoCursorIcon.style.width = "3vw";
        videoCursorIcon.style.height = "3vw";
      } else {
        overlay.style.display = "initial";
        video.pause();
        videoCursorIcon.classList.remove("fa-pause");
        videoCursorIcon.classList.add("fa-play");
        videoCursor.style.width = "10vw";
        videoCursor.style.height = "10vw";
        videoCursorIcon.style.width = "6vw";
        videoCursorIcon.style.height = "6vw";
        videoCursorIcon.style.fontSize = "2vw";
      }
    }

    // Click event listener on videoCursor
    videoCursor.addEventListener("click", function (event) {
      event.stopPropagation(); // Stop the click event from propagating to the overlay
      toggleVideo(); // Play or pause the video
      console.log("play with cursor");
    });

    // Click event listener on overlay to start playing the video
    overlay.addEventListener("click", function (event) {
      event.stopPropagation(); // Stop the click event from propagating to the overlay
      toggleVideo(); // Play or pause the video
      overlay.style.display = "none"; // Hide the overlay
      console.log("play with overlay");
    });
    videoContainer.addEventListener("click", function (event) {
      event.stopPropagation(); // Stop the click event from propagating to the overlay
      toggleVideo(); // Play or pause the video
      overlay.style.display = "none"; // Hide the overlay
      console.log("play with container");
    });

    // Update cursor position on mousemove within the video container

    // videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (event) {
      // Managing document cursor
      documentCursor.style.display = "none";
      // Get the position of the mouse relative to the video container
      let cursorX = event.pageX - videoContainer.offsetLeft;
      let cursorY = event.pageY - videoContainer.offsetTop;

      videoCursor.style.left = cursorX + "px";
      videoCursor.style.top = cursorY + "px";
    });
    // });

    // Managing document cursor
    videoContainer.addEventListener("mouseleave", function () {
      documentCursor.style.display = "initial";
      gsap.to("#video-cursor", {
        left: "70%",
        top: "16%",
      });
    });
  });
}

manageVideoAndCursor();

function sherryGooeyEffect() {
  document.addEventListener("DOMContentLoaded", function () {
    Shery.imageEffect(".image-div", {
      style: 6,
      config: {
        noiseDetail: { value: 7.44, range: [0, 100] },
        distortionAmount: { value: 3.13, range: [0, 10] },
        scale: { value: 35.88, range: [0, 100] },
        speed: { value: 0.48, range: [0, 1] },
        zindex: { value: -9996999, range: [-9999999, 9999999] },
        aspect: { value: 0.7499999776482589 },
        ignoreShapeAspect: { value: true },
        shapePosition: { value: { x: 0, y: 0 } },
        shapeScale: { value: { x: 0.5, y: 0.5 } },
        shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
        shapeRadius: { value: 0, range: [0, 2] },
        currentScroll: { value: 0 },
        scrollLerp: { value: 0.07 },
        gooey: { value: true },
        infiniteGooey: { value: false },
        growSize: { value: 4, range: [1, 15] },
        durationOut: { value: 1, range: [0.1, 5] },
        durationIn: { value: 1.5, range: [0.1, 5] },
        displaceAmount: { value: 0.5 },
        masker: { value: true },
        maskVal: { value: 1.18, range: [1, 5] },
        scrollType: { value: 0 },
        geoVertex: { range: [1, 64], value: 1 },
        noEffectGooey: { value: true },
        onMouse: { value: 0 },
        noise_speed: { value: 0.53, range: [0, 10] },
        metaball: { value: 0.44, range: [0, 2] },
        discard_threshold: { value: 0.5, range: [0, 1] },
        antialias_threshold: { value: 0, range: [0, 0.1] },
        noise_height: { value: 0.44, range: [0, 2] },
        noise_scale: { value: 14.5, range: [0, 100] },
      },
      // debug: true,
      gooey: true,
    });
  });
}

sherryGooeyEffect();
