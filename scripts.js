// JavaScript for Lab

// Function to prompt user's name and display it in the paragraph with id 'name-display'
document.getElementById("name-button").addEventListener("click", function () {
  const userName = prompt("Please enter your name:");
  if (userName) {
    document.getElementById(
      "name-display"
    ).textContent = `Hello, ${userName}! Welcome to my portfolio.`;
  } else {
    document.getElementById("name-display").textContent =
      "Hello! Welcome to my portfolio.";
  }
});

// Function to enlarge the image when clicked
document.getElementById("profile-image").addEventListener("click", function () {
  this.style.transform = "scale(1.5)";
  this.style.transition = "transform 0.3s ease-in-out";
});

// Function to reset the image size when mouse is moved out
document
  .getElementById("profile-image")
  .addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
  });

// Adding mouseover and mouseout effects to the navigation items
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
