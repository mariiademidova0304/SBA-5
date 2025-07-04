const inputTitle = document.getElementById(`input-title`);
const inputContent = document.getElementById(`input-content`);
const addPostButton = document.getElementById(`add-post`);
const postList = document.getElementById(`post-list`);
const inputForm = document.getElementById(`input-container`);
const titleError = document.getElementById(`title-error-message`);
const textError = document.getElementById(`text-error-message`);

//creating empty array and an object type
let posts = [];
function Post(title, content, timestamp) {
    this.postTitle = title;
    this.postContent = content;
    this.postTime = timestamp;
}
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
inputForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    if(!inputForm.checkValidity()){
        alert(`Please, fill in both Title and Content areas`);
    }else{
    const newPost = document.createElement(`article`);
//added unique id and date for a time stamp
    newPost.id = Date.now().toString(36)+Math.floor(Math.random()).toString(36);
    let postDate = new Date();
    const postTitle = inputTitle.value;
    const postContent = inputContent.value;
//created new object and added it to an array, saved to local storage
    const thisPost = new Post(postTitle,postContent,postDate);
    posts.push(thisPost);
    console.log(`array:`, posts);
    inputTitle.value = ``;
    inputContent.value = ``;
    localStorage.setItem("posts", JSON.stringify(posts));
    newPost.innerHTML = `<h2>${postTitle}</h2> <p>${postContent}</p> <span>${postDate.toLocaleString('en-US')}</span> <div><button class="edit">Edit</button><button class="delete">Delete</button></div>`;
    postList.appendChild(newPost);
        }
})

//delegating event to the form element to delete the article
postList.addEventListener(`click`, (event)=>{
    if(event.target.classList.contains(`delete`)){
        event.target.closest(`article`).remove();
    }
})