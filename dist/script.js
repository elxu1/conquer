var mql = window.matchMedia("(min-width: 767px)");

function closeNavbar() {
  let mediaListener = window.matchMedia("(max-width: 767px)");
  let navbar = document.getElementById("navbar");
  if (mediaListener.matches) {
    navbar.style.visibility = "hidden";
  }
}

function openNavbar() {
  let navbar = document.getElementById("navbar");
  navbar.style.visibility = "visible";
}

function toggleNav() {
  let navbar = document.getElementById("navbar");
  if (navbar.style.visibility == "visible") {
    closeNavbar();
  } else {
    openNavbar();
  }
}

// Adds the onclick handler for the nav icon
(function() {
  let navIcon = document.getElementById("nav-collapse");
  navIcon.onclick = toggleNav;
})();

function showNavbar(e) {
  let navbar = document.getElementById("navbar");
  if (e.matches) {
    navbar.style.visibility = "visible";
  } else {
    navbar.style.visibility = "hidden";
  }
}

mql.addListener(showNavbar);

function getNavOffset() {
  const mediaListener = window.matchMedia("(min-width: 767px)");

  let navbar = document.getElementById("navbar");
  if (mediaListener.matches) {
    return navbar.offsetHeight;
  } else {
    return 0;
  }
}

// Closes the navbar and goes to a bookmark location
function scrollToSection(bookmark) {
  const offset = getNavOffset();

  const element = document.getElementById(bookmark);
  const body = document.body.getBoundingClientRect().top;
  const position = element.getBoundingClientRect().top - body - offset;

  let options = {
    behavior: "smooth",
    top: position
  };
  window.scrollTo(options);
  closeNavbar();
}

// Adds onclick handlers for nav buttons
(function() {
  const buttons = document.getElementsByClassName("nav-btn");
  const navButtons = [...buttons];
  for (let i = 0; i < 4; i++) {
    let sectionName = "section" + (i + 1);
    navButtons[i].onclick = () => {
      scrollToSection(sectionName);
    };
  }

  const scrollButton = document.getElementById("scroll-top");
  scrollButton.onclick = () => {
    scrollToSection("section1");
  };
})();

function getSectionTop() {
  const sections = ["section1", "section2", "section3", "section4"];
  const body = document.body.getBoundingClientRect().top;
  const offset = getNavOffset();

  return sections.map(section => {
    return (
      document.getElementById(section).getBoundingClientRect().top -
      body -
      offset
    );
  });
}

function findCurrentSection() {
  const sections = getSectionTop();
  const position = document.documentElement.scrollTop;
  const curSection = sections.filter(section => section <= position).length - 1;

  return curSection;
}

window.onload = () => {
  document.getElementsByClassName("nav-btn")[0].classList.add("active");
};

// Since scroll events fire rapidly,
// there will be some debouncing to reduce
// the number of computations
let scheduled = null;
window.addEventListener("scroll", event => {
  if (!scheduled) {
    setTimeout(() => {
      const navButtons = document.getElementsByClassName("nav-btn");
      const currentSection = findCurrentSection();

      let siblings = [...navButtons];
      siblings.splice(currentSection, 1);
      siblings.map(button => {
        button.classList.remove("active");
      });

      navButtons[currentSection].classList.add("active");
      scheduled = null;
    }, 100);
  }
  scheduled = event;
});