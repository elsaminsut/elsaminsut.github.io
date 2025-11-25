// Parallax effect and smooth scrolling for services section
document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.getElementById("home-link");
  const welcomeSection = document.getElementById("welcome-section");
  const workLink = document.getElementById("work-link");
  const workSection = document.getElementById("work-section");
  const servicesLink = document.getElementById("services-link");
  const servicesButton = document.getElementById("services-button");
  const servicesSection = document.getElementById("services-section");
  const resumeLink = document.getElementById("resume-link");
  const resumeSection = document.getElementById("resume-section");
  const contactLink = document.getElementById("contact-link");
  const contactSection = document.getElementById("contact-section");
  const mainContainer = document.querySelector(
    ".flex.flex-col.flex-1.md\\:flex-row"
  );

  // Function to scroll to welcome section with smooth behavior
  function scrollToWelcome() {
    if (welcomeSection) {
      welcomeSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Function to scroll to work section with smooth behavior
  function scrollToWork() {
    if (workSection) {
      workSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Function to scroll to services section with smooth behavior
  function scrollToServices() {
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Function to scroll to resume section with smooth behavior
  function scrollToResume() {
    if (resumeSection) {
      resumeSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Function to scroll to contact section with smooth behavior
  function scrollToContact() {
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Add click handlers
  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToWelcome();
    });
  }

  if (workLink) {
    workLink.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToWork();
    });
  }

  if (servicesLink) {
    servicesLink.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToServices();
    });
  }

  if (servicesButton) {
    servicesButton.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToServices();
    });
  }

  if (resumeLink) {
    resumeLink.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToResume();
    });
  }

  if (contactLink) {
    contactLink.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToContact();
    });
  }

  // Function to update active navigation link based on scroll position
  function updateActiveLink() {
    const sections = [
      { element: welcomeSection, link: homeLink },
      { element: workSection, link: workLink },
      { element: servicesSection, link: servicesLink },
      { element: resumeSection, link: resumeLink },
      { element: contactSection, link: contactLink },
    ];

    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(({ element, link }) => {
      if (element && link) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    });
  }

  // Set initial active link
  updateActiveLink();

  // Update active link on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Parallax effect on scroll
  let ticking = false;

  function updateParallax() {
    if (!servicesSection) return;

    const scrolled = window.pageYOffset;
    const servicesRect = servicesSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate when services section is in view
    const servicesTop = servicesRect.top;
    const servicesBottom = servicesRect.bottom;
    const servicesInView = servicesTop < windowHeight && servicesBottom > 0;

    if (servicesInView) {
      // Apply parallax effect - move content slower than scroll
      // The effect is more subtle when the section is entering/exiting view
      const parallaxSpeed = 0.3;
      const scrollProgress =
        (windowHeight - servicesTop) /
        (windowHeight + servicesSection.offsetHeight);
      const yPos = scrollProgress * 100 * parallaxSpeed;
      servicesSection.style.transform = `translateY(0px)`;
    } else {
      // Reset transform when out of view
      servicesSection.style.transform = "translateY(0px)";
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
  // Initial call to set up the effect
  updateParallax();

  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  if (scrollToTopBtn) {
    // Function to show/hide button based on scroll position
    function toggleScrollToTopButton() {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    }

    // Function to scroll to top
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Add click event listener
    scrollToTopBtn.addEventListener("click", scrollToTop);

    // Show/hide button on scroll
    window.addEventListener("scroll", toggleScrollToTopButton);

    // Initial check
    toggleScrollToTopButton();
  }

  // Image modal functionality
  const imageModal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.querySelector(".image-modal-close");
  const modalOverlay = document.querySelector(".image-modal-overlay");
  const expandButtons = document.querySelectorAll(".expand-icon");

  // Ensure icons are initialized for expand buttons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  function openModal(imageSrc) {
    if (modalImage && imageModal) {
      modalImage.src = imageSrc;
      imageModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      // Re-initialize icons in case they need to be rendered
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }
  }

  function closeModal() {
    if (imageModal) {
      imageModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = ""; // Restore scrolling
    }
  }

  // Add click handlers to expand buttons
  expandButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const imageSrc = this.getAttribute("data-image-src");
      if (imageSrc) {
        openModal(imageSrc);
      }
    });
  });

  // Close modal when clicking close button
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close modal when clicking overlay
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      imageModal?.getAttribute("aria-hidden") === "false"
    ) {
      closeModal();
    }
  });

  // Work section horizontal scroll navigation
  const workScrollContainer = document.getElementById("work-scroll-container");
  const workScrollWrapper = workScrollContainer?.querySelector(
    ".work-scroll-wrapper"
  );
  const workScrollLeft = document.getElementById("work-scroll-left");
  const workScrollRight = document.getElementById("work-scroll-right");

  if (
    workScrollContainer &&
    workScrollWrapper &&
    workScrollLeft &&
    workScrollRight
  ) {
    const scrollAmount = 300; // Adjust this value to control scroll distance
    let currentPosition = 0;
    let maxScroll = 0;

    // Calculate max scroll on load and resize
    function calculateMaxScroll() {
      if (workScrollWrapper && workScrollContainer) {
        const wrapperWidth = workScrollWrapper.scrollWidth;
        const containerWidth = workScrollContainer.clientWidth;
        maxScroll = Math.max(0, wrapperWidth - containerWidth);
      }
    }

    calculateMaxScroll();
    window.addEventListener("resize", calculateMaxScroll);

    // Smooth scroll function using transform
    function scrollToPosition(targetPosition) {
      currentPosition = Math.max(0, Math.min(targetPosition, maxScroll));
      workScrollWrapper.style.transform = `translateX(-${currentPosition}px)`;
      workScrollWrapper.style.transition = "transform 0.4s ease-in-out";
      updateArrowButtons();
    }

    workScrollLeft.addEventListener("click", function () {
      scrollToPosition(currentPosition - scrollAmount);
    });

    workScrollRight.addEventListener("click", function () {
      scrollToPosition(currentPosition + scrollAmount);
    });

    // Update arrow button visibility based on scroll position
    function updateArrowButtons() {
      const isAtStart = currentPosition <= 0;
      const isAtEnd = currentPosition >= maxScroll - 1;

      workScrollLeft.style.opacity = isAtStart ? "0.3" : "1";
      workScrollLeft.style.pointerEvents = isAtStart ? "none" : "auto";

      workScrollRight.style.opacity = isAtEnd ? "0.3" : "1";
      workScrollRight.style.pointerEvents = isAtEnd ? "none" : "auto";
    }

    // Initial update
    updateArrowButtons();
  }
});
