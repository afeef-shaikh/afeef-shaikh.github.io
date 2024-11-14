// Profile image functionality
document.addEventListener("DOMContentLoaded", function () {
  let iframeElement = document.querySelector("#soundcloud-player");
  let widget = SC.Widget(iframeElement);

  // Get volume control elements
  const volumeSlider = document.querySelector("#sc-volume-slider");
  const volumeValue = document.querySelector("#sc-volume-value");

  // Add volume control functionality
  if (volumeSlider && volumeValue) {
    volumeSlider.addEventListener("input", function () {
      const volume = this.value;
      widget.setVolume(volume);
      volumeValue.textContent = volume + "%";
    });

    // Initialize volume
    widget.bind(SC.Widget.Events.READY, function () {
      widget.getVolume(function (volume) {
        volumeSlider.value = volume;
        volumeValue.textContent = volume + "%";
      });
    });
  }

  // Profile image interactions
  const profileImage = document.getElementById("profile-image");
  if (profileImage) {
    profileImage.addEventListener("click", function () {
      this.style.transform = "scale(1.5)";
      this.style.transition = "transform 0.3s ease-in-out";
    });

    profileImage.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)";
    });
  }

  // Nav links hover effect
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("mouseover", function () {
      this.style.backgroundColor = "#ffd700";
      this.style.color = "#4682b4";
    });

    link.addEventListener("mouseout", function () {
      this.style.backgroundColor = "";
      this.style.color = "";
    });
  });

  // Contact form functionality
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const clearBtn = document.getElementById("clearBtn");

  if (form && submitBtn && clearBtn) {
    submitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      localStorage.setItem("contactFormData", JSON.stringify(data));
      alert("Your form has been submitted!");
    });

    clearBtn.addEventListener("click", function () {
      form.reset();
      localStorage.removeItem("contactFormData");
    });

    // Load saved form data
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach((key) => {
        const field = form.elements[key];
        if (field) field.value = data[key];
      });
    }
  }
});

// Global state for accessibility features
let isLargeText = false;
let isHighContrast = false;
let isAltTextVisible = false;

// Text size toggle function
function toggleTextSize() {
  isLargeText = !isLargeText;

  const elements = document.querySelectorAll(
    "p, h1, h2, h3, li, a, label, input, .image-caption, .media-caption"
  );
  elements.forEach((element) => {
    if (isLargeText) {
      // Store original font size if not already stored
      if (!element.dataset.originalSize) {
        element.dataset.originalSize =
          window.getComputedStyle(element).fontSize;
      }
      const originalSize = parseFloat(element.dataset.originalSize);
      element.style.fontSize = `${originalSize * 1.5}px`;
    } else {
      // Restore original font size
      element.style.fontSize = element.dataset.originalSize || "";
    }
  });

  // Update button text
  const button = document.querySelector('button[onclick="toggleTextSize()"]');
  if (button) {
    button.textContent = `${isLargeText ? "Reset" : "Increase"} Text Size`;
  }
}

// Color scheme toggle function
function toggleColorScheme() {
  isHighContrast = !isHighContrast;
  document.body.classList.toggle("high-contrast", isHighContrast);

  const elements = {
    body: document.body,
    container: document.querySelector(".container"),
    sections: document.querySelectorAll(".section"),
    links: document.querySelectorAll("a"),
  };

  if (isHighContrast) {
    elements.body.style.backgroundColor = "#000000";
    elements.body.style.color = "#ffffff";
    elements.container.style.backgroundColor = "#333333";

    elements.sections.forEach((section) => {
      section.style.backgroundColor = "#333333";
      section.style.color = "#ffffff";
    });

    elements.links.forEach((link) => {
      link.style.color = "#00ff00";
    });
  } else {
    elements.body.style.backgroundColor = "#f0f8ff";
    elements.body.style.color = "#333";
    elements.container.style.backgroundColor = "#fffff0";

    elements.sections.forEach((section) => {
      section.style.backgroundColor = "";
      section.style.color = "";
    });

    elements.links.forEach((link) => {
      link.style.color = "";
    });
  }

  // Update button text
  const button = document.querySelector(
    'button[onclick="toggleColorScheme()"]'
  );
  if (button) {
    button.textContent = `${
      isHighContrast ? "Normal" : "High Contrast"
    } Color Scheme`;
  }
}

// Alt text display function
function showAllAltText() {
  isAltTextVisible = !isAltTextVisible;
  const images = document.querySelectorAll(".gallery-image");

  images.forEach((img) => {
    const altText = img.getAttribute("alt");
    const galleryItem = img.closest(".gallery-item");

    let description = galleryItem.querySelector(".alt-text-description");

    if (!description) {
      description = document.createElement("p");
      description.className = "alt-text-description";
      description.style.cssText = `
              background-color: ${isHighContrast ? "#444444" : "#f8f9fa"};
              color: ${isHighContrast ? "#ffffff" : "#666666"};
              padding: 10px;
              margin-top: 10px;
              border-radius: 4px;
              font-size: ${isLargeText ? "1.2em" : "0.9em"};
          `;
      galleryItem.appendChild(description);
    }

    if (isAltTextVisible) {
      description.textContent = `Description: ${altText}`;
      description.style.display = "block";
    } else {
      description.style.display = "none";
    }
  });

  // Update button text
  const button = document.querySelector('button[onclick="showAllAltText()"]');
  if (button) {
    button.textContent = `${
      isAltTextVisible ? "Hide" : "Show"
    } Image Descriptions`;
  }
}

// Initialize accessibility features on page load
document.addEventListener("DOMContentLoaded", function () {
  // Reset all states
  isLargeText = false;
  isHighContrast = false;
  isAltTextVisible = false;

  // Initialize button texts
  const buttons = {
    textSize: document.querySelector('button[onclick="toggleTextSize()"]'),
    colorScheme: document.querySelector(
      'button[onclick="toggleColorScheme()"]'
    ),
    altText: document.querySelector('button[onclick="showAllAltText()"]'),
  };

  if (buttons.textSize) buttons.textSize.textContent = "Increase Text Size";
  if (buttons.colorScheme)
    buttons.colorScheme.textContent = "High Contrast Color Scheme";
  if (buttons.altText) buttons.altText.textContent = "Show Image Descriptions";
});
