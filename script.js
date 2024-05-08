let tl = gsap.timeline();
tl.to("body", {
  overflow: "hidden",
});
tl.from(".line h1", {
  y: 100,
  delay: 0.5,
  stagger: 0.3,
  duration: 0.6,
});

tl.from("#loader .line .counting h5,#loader .line h2", {
  opacity: 0,
  onStart: () => {
    let count = document.querySelector("#loader .line .counting .count");
    console.log(count);
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

tl.from("#page1", {
  opacity: 0,
  delay: 0.5,
  duration: 0.5,
  y: 1000,
  ease: Power4,
});

tl.to("#loader", {
  delay: 1,
  display: "none",
});
