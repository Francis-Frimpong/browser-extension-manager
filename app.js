const extensionContainer = document.querySelector(".extension-cards");

// fetch json data and create cards to display it data

//  <div class="card">
//           <div class="icon-text">
//             <img src="assets/images/logo-devlens.svg" alt="icon" />
//             <div class="text">
//               <h4>DevLens</h4>
//               <p>
//                 Quickly inspect page layouts and visualize element boundaries.
//               </p>
//             </div>
//           </div>
//           <div class="btn-checkbox">
//             <button class="remove">Remove</button>
//             <label class="switch">
//               <input type="checkbox" name="checkBtn" class="checkBtn" />
//               <span class="slider"></span>
//             </label>
//           </div>
//         </div>

async function getExtensions() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    data.forEach((element) => {
      // create card element
      const card = document.createElement("div");
      card.classList.add("card");
      const iconText = document.createElement("div");
      iconText.classList.add("icon-text");
      const logo = document.createElement("img");
      logo.src = element.logo;
      const text = document.createElement("div");
      text.classList.add("text");
      const cardTitle = document.createElement("h4");
      cardTitle.textContent = element.name;
      const cardDescription = document.createElement("p");
      cardDescription.textContent = element.description;

      const btnCheckbox = document.createElement("div");
      btnCheckbox.classList.add("btn-checkbox");
      const button = document.createElement("button");
      button.classList.add("remove");
      button.textContent = "Remove";
      const label = document.createElement("label");
      label.classList.add("switch");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = "checkBtn";
      input.checked = element.isActive;
      input.classList.add("checkBtn");
      const span = document.createElement("span");
      span.classList.add("slider");

      iconText.appendChild(logo);
      text.appendChild(cardTitle);
      text.appendChild(cardDescription);
      iconText.appendChild(text);
      btnCheckbox.appendChild(button);
      label.appendChild(input);
      label.appendChild(span);
      btnCheckbox.appendChild(label);
      card.appendChild(iconText);
      card.appendChild(btnCheckbox);

      extensionContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getExtensions();

//Tab switch functionality
const tabSwitch = document.querySelectorAll(".tabSwitch");

tabSwitch.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove 'active' class from all tabs
    tabSwitch.forEach((t) => t.classList.remove("active-tab"));

    // Add 'active' class to the clicked tab
    tab.classList.add("active-tab");
  });
});

// Tab function
function switchTab(e) {
  let everyExtension = [...extensionContainer.children];
  everyExtension.forEach((item) => {
    item.style.display = "block";
  });

  if (e.target.classList.contains("active")) {
    everyExtension.forEach((extension) => {
      let activeExtension = extension.querySelector("input[type = checkbox]");
      if (!activeExtension.checked) {
        extension.style.display = "none";
      }
    });
  } else if (e.target.classList.contains("inactive")) {
    everyExtension.forEach((extension) => {
      let checkedExtension = extension.querySelector("input[type = checkbox]");
      if (checkedExtension.checked) {
        extension.style.display = "none";
      }
    });
  } else if (e.target.classList.contains("all")) {
    everyExtension.forEach((extension) => {
      extension.style.display = "block";
    });
  }
}

// Start of Theme switch function
const toggleButton = document.querySelector(".sun-icon");

// Check Local Storage on page load
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  toggleButton.src = "assets/images/icon-moon.svg";
} else {
  document.body.classList.remove("light");
  toggleButton.src = "assets/images/icon-sun.svg";
}

// Toggle on click and save to Local Storage
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    toggleButton.src = "assets/images/icon-moon.svg"; // Light mode => moon icon
    localStorage.setItem("theme", "light");
  } else {
    toggleButton.src = "assets/images/icon-sun.svg"; // Dark mode => sun icon
    localStorage.setItem("theme", "dark");
  }
});
// End of Theme switch function

const tabs = document.querySelector(".tabs");

tabs.addEventListener("click", switchTab);
