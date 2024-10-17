// Get all elements with data-card attribute
const cards = document.querySelectorAll("[data-card]");
// Get all elements with data-info attribute
const infos = document.querySelectorAll("[data-info]");

if (cards.length > 0 && infos.length > 0) {
  // Add event handler for each data-card element
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove 'features__card--active' class from all cards
      cards.forEach((c) => c.classList.remove("features__card--active"));

      // Add 'features__card--active' class to the clicked card
      this.classList.add("features__card--active");

      // Remove 'features__info--active' class from all info blocks
      infos.forEach((info) => info.classList.remove("features__info--active"));

      // Get the value of data-card for the clicked card
      const cardType = this.getAttribute("data-card");

      // Find the corresponding data-info block and add 'features__info--active'
      const activeInfo = document.querySelector(`[data-info="${cardType}"]`);
      if (activeInfo) {
        activeInfo.classList.add("features__info--active");
      }
    });
  });

  let bodyLockStatus = true;

  // Toggle body lock/unlock with optional delay
  const bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains("lock")) {
      bodyUnlock(delay);
    } else {
      bodyLock(delay);
    }
  };

  // Unlock the body with optional delay
  const bodyUnlock = (delay = 500) => {
    if (bodyLockStatus) {
      const lockPaddingElements = document.querySelectorAll("[data-lp]");
      setTimeout(() => {
        lockPaddingElements.forEach((el) => (el.style.paddingRight = ""));
        document.body.style.paddingRight = "";
        document.documentElement.classList.remove("lock");
      }, delay);
      bodyLockStatus = false;
      setTimeout(() => (bodyLockStatus = true), delay);
    }
  };

  // Lock the body with optional delay
  const bodyLock = (delay = 500) => {
    if (bodyLockStatus) {
      const lockPaddingElements = document.querySelectorAll("[data-lp]");
      const lockPaddingValue = `${
        window.innerWidth - document.body.offsetWidth
      }px`;
      lockPaddingElements.forEach(
        (el) => (el.style.paddingRight = lockPaddingValue)
      );
      document.body.style.paddingRight = lockPaddingValue;
      document.documentElement.classList.add("lock");
      bodyLockStatus = false;
      setTimeout(() => (bodyLockStatus = true), delay);
    }
  };

  // Initialize menu interaction
  function menuInit() {
    const menuIcon = document.querySelector(".icon-menu");
    if (menuIcon) {
      document.addEventListener("click", function (e) {
        if (bodyLockStatus && e.target.closest(".icon-menu")) {
          bodyLockToggle();
          document.documentElement.classList.toggle("menu-open");
        }
      });
    }
  }

  // Open the menu
  function menuOpen() {
    bodyLock();
    document.documentElement.classList.add("menu-open");
  }

  // Close the menu
  function menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
  }

  menuInit();
}

$(document).ready(function () {
  $(".features__slick").slick({
    slidesToShow: 1, // Show 4 cards at a time
    slidesToScroll: 1, // Scroll 4 cards at a time
    infinite: false, // Enable infinite scrolling
    arrows: false, // Enable navigation arrows
    dots: true, // Enable dots for navigation
  });
});
