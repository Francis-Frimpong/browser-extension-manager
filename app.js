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
