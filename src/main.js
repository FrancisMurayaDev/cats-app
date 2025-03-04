const factForm = document.getElementById("facts-form");
const photoForm = document.getElementById("photos-form");
const displayFacts = document.getElementById("display-facts");
const errorDisplay = document.getElementById("display-error-text");
const factInput = document.querySelector(`.number-of-cats`);
const imageInput = document.querySelector(`.image-input`);
const factButton = document.querySelector(`#submit-fact`);
const photoButton = document.querySelector(`#submit-photo`);
const displayImage = document.querySelector(`.display-image`);
let errorMessage = `Failed,try again later`;

async function getCatFacts() {
  displayFacts.innerHTML="";
  displayImage.innerHTML = ``;
  try {
    let catFacts = factInput.value || 1;

    if (catFacts > 50) {
      catFacts = 50;
    }
    const response = await fetch(`http://meowfacts.herokuapp.com/?count=${catFacts}`);
    const data = await response.json();
    console.log(data.data);

    // if (!response.ok) {
    //   throw new Error(`Failed, Please try again later.`);
    // }

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
    errorDisplay.innerHTML=`<p class="error-message">${errorMessage}</P>`;
  }
}


async function getCatsImages() {
  displayFacts.innerHTML = ``;
  displayImage.innerHTML = ``;
  try {
    let catImage = imageInput.value || 1;
    if(catImage > 10) {
      catImage = 10;
    }
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${catImage}`);
    const data=await response.json();
    data.forEach((cat) => {
      const img=document.createElement(`img`);
      img.src=cat.url;
      img.alt=`A Cat`;
      img.style.width= "19rem";
      img.style.margin= `0.5rem`;
      displayImage.appendChild(img);
    })
  } catch (error) {
    errorDisplay.classList.add(`error-box`);
    errorDisplay.innerHTML=`<p class="error-message">${errorMessage}</P>`;
        
  }
}



factButton.addEventListener(`click`, getCatFacts);
photoButton.addEventListener(`click`, getCatsImages);



