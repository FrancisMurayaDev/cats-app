const factForm = document.getElementById("facts-form");
const photoForm = document.getElementById("photos-form");
const displayFacts = document.getElementById("display-facts");
const errorDisplay = document.getElementById("display-error-text");
const factInput = document.querySelector(`.number-of-cats`);
const imageInput = document.querySelector(`.image-input`);
const factButton = document.querySelector(`#submit-fact`);
const photoButton = document.querySelector(`#submit-photo`);
const displayImage = document.querySelector(`.display-image`);
let errorMessage = `Failed, try again later`;

async function getCatFacts() {
  displayFacts.innerHTML = "";
  displayImage.innerHTML = "";
  try {
    let catFacts = parseInt(factInput.value) || 1;

    // Limit input between 1 and 50
    if (catFacts > 50) catFacts = 50;
    if (catFacts < 1) catFacts = 1;

    const response = await fetch(`https://meowfacts.herokuapp.com/?count=${catFacts}`);
    const data = await response.json();

    let facts = Array.isArray(data.data) ? data.data : [data.data];
    const factList = document.createElement(`ol`);
    factList.style.paddingLeft = `4rem`;

    facts.forEach((fact) => {
      const listItem = document.createElement(`li`);
      listItem.style.lineHeight = `2.2rem`;
      listItem.style.fontSize = `1.3rem`;
      listItem.textContent = fact;
      factList.appendChild(listItem);
    });

    displayFacts.appendChild(factList);
  } catch (error) {
    errorDisplay.classList.add(`error-box`);
    errorDisplay.innerHTML = `<p class="error-message">${errorMessage}</P>`;
  }
}

factButton.addEventListener("click", getCatFacts);
