const inputTitle = document.getElementById(`input-title`);
const inputContent = document.getElementById(`input-content`);
const addPostButton = document.getElementById(`add-post`);
const postList = document.getElementById(`post-list`);
const inputForm = document.getElementById(`input-container`);
const titleError = document.getElementById(`title-error-message`);
const textError = document.getElementById(`text-error-message`);

//adding custom validity check to the title field
inputTitle.addEventListener(`blur`, () => {
    if(inputTitle.validity.valueMissing){
       inputTitle.setCustomValidity(`Please, add a title`);
    }else{
        inputTitle.setCustomValidity(``);
    }
    titleError.textContent = inputTitle.validationMessage;
})

//adding custom validity check to the main content area
inputContent.addEventListener(`blur`, () => {
    if(inputContent.validity.valueMissing){
        inputContent.setCustomValidity(`Please, add your text content`);
    } else {
        inputContent.setCustomValidity(``);
    }
    textError.textContent = inputContent.validationMessage;
})

//event listener for submitting a new post, dynamically creating a new article woth a headline, 
// a text field and two buttons
inputForm.addEventListener(`submit`, function (event) {
    event.preventDefault();
    const newPost = document.createElement(`article`);
    const postTitle = inputTitle.value;
    const postContent = inputContent.value;
    newPost.innerHTML = `<h2>${postTitle}</h2> <p>${postContent}</p> <div><button class="edit">Edit</button><button class="delete">Delete</button></div>`;
    postList.appendChild(newPost);
    inputTitle.value = ``;
    inputContent.value = ``;
})

//delegating event to the form element to delete the article
postList.addEventListener(`click`, (event)=>{
    if(event.target.classList.contains(`delete`)){
        event.target.closest(`article`).remove();
    }
})