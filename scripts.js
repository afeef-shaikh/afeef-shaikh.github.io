// JavaScript for Lab

// // Function to prompt user's name and display it in the paragraph with id 'name-display'
// document.getElementById("name-button").addEventListener("click", function () {
//   const userName = prompt("Please enter your name:");
//   if (userName) {
//     document.getElementById(
//       "name-display"
//     ).textContent = `Hello, ${userName}! Welcome to my portfolio.`;
//   } else {
//     document.getElementById("name-display").textContent =
//       "Hello! Welcome to my portfolio.";
//   }
// });

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

  // Get references to the form and buttons
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const clearBtn = document.getElementById("clearBtn");

  // Function to handle form submission
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(form); // Get form data
    const data = {};

    // Store each form input in an object and in local storage
    formData.forEach((value, key) => {
      data[key] = value;
    });
    localStorage.setItem("contactFormData", JSON.stringify(data));

    alert("Your form has been submitted!");
    console.log("Form Submitted:", data);
  });

  // Function to retrieve and populate form data from local storage
  window.addEventListener("load", function () {
    const savedData = JSON.parse(localStorage.getItem("contactFormData"));
    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        const field = form.elements[key];
        if (field) field.value = savedData[key]; // Populate each field with saved data
      });
    }
  });

  // Function to handle form clearing
  clearBtn.addEventListener("click", function () {
    form.reset(); // Reset form fields to default values
    localStorage.removeItem("contactFormData"); // Clear form data from local storage
  });
});
