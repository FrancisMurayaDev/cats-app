const factForm = document.getElementById("facts-form");
const photoForm = document.getElementById("photos-form");
const displayFacts = document.getElementById("display-facts");
const errorDisplay = document.getElementById("display-error-text");
const submitButton = document.querySelector(`.submit-btn`);
const factInput = document.querySelector(`.fact-input`);
const imageInput = document.querySelector(`.image-input`);

factForm.addEventListener(`submit`, async (e) => {
  e.preventDefault();
  displayFacts.innerHTML = ``;
  errorDisplay.textContent = '';
  const limit = parseInt(factInput.value) || 1;

  if (limit < 1 || limit > 50) {
    errorDisplay.textContent = `There was an error, please try again later`;

    return;
  }

  try {
    const response = await fetch(
      `http://meowfacts.herokuapp.com/?count=${limit}`
    );
    const data = await response.json();

    let listHTML = `<ol>`;
    data.data.forEach((fact) => {
      listHTML += `<li>${fact}</li>`;
    });

    listHTML += `</ol>`;

    setTimeout(() => {
      displayFacts.innerHTML = listHTML;
    }, 2000);
  } catch (error) {
    errorDisplay.textContent = `There was an error, please try again later`;
    console.error(error);
  }
});


photoForm.addEventListener(`submit`, async (e) => {
  e.preventDefault();
  displayFacts.innerHTML = ``;
  errorDisplay.textContent = '';


  const limit = parseInt(imageInput.value)  || 1;

  if (limit < 1 || limit > 10) {
    errorDisplay.textContent = `There was an error. Please try again later.`
    errorDisplay.style.displayFacts = 'none';
    return;
  }

  try {
    const response = await fetch (`https://api.thecatapi.com/v1/images/search?limit=${limit}`);
    const data = await response.json();


    let imagesHTML = `<div class="cat-img">`;
    data.forEach((cat) => {
      if (cat.url) {
        imagesHTML += `<img src="${cat.url}" alt="cat" width="200" style="object-fit: cover;">`;
      }
    });

    imagesHTML += "</div>";

    setTimeout(() => {
      displayFacts.innerHTML = imagesHTML;
    }, 2000);

  } catch (error) {
    errorDisplay.textContent = "There was an error, please try again later.";
    console.error(error);
  }

})



