const inputTitle = document.getElementById(`input-title`);
const inputContent = document.getElementById(`input-content`);
const addPostButton = document.getElementById(`add-post`);
const postList = document.getElementById(`post-list`);
const inputForm = document.getElementById(`input-container`);
const titleError = document.getElementById(`title-error-message`);
const textError = document.getElementById(`text-error-message`);

//creating empty array and an object type
let posts = [];
function Post(title, content, timestamp, id) {
    this.postTitle = title;
    this.postContent = content;
    this.postTime = timestamp;
    this.postId = id;
}

//checking localStorage on load and rendering existing posts
window.addEventListener(`load`, () => {
    let existingPostsFromStorage = JSON.parse(localStorage.getItem("existingPosts"));
    if (existingPostsFromStorage) {
        //need to save posts from local storage into my posts array where i could add new posts on submit
        posts = existingPostsFromStorage;
        //need to change the string that's currently the value of postTime property to a Date object
        posts.forEach(post => {
            convertedPostTime = new Date(post.postTime);
            post.postTime = convertedPostTime;
        })
        //need to create a render posts function
        renderPosts(posts);
    }
})

//creating a function that renders an array of posts
function renderPosts(arr) {
    for (let i = 0; i < arr.length; i++) {
        let existingPost = document.createElement(`article`);
        const post = arr[i];
        //adding id to a post while rendering
        existingPost.id = post.postId;
        existingPost.innerHTML = `<h2>${post.postTitle}</h2> <p>${post.postContent}</p> <span>${post.postTime.toLocaleString('en-US')}</span> <div><button class="edit">Edit</button><button class="delete">Delete</button></div>`;
        postList.appendChild(existingPost);
    }
}



//adding custom validity check to the title field
inputTitle.addEventListener(`blur`, () => {
    if (inputTitle.validity.valueMissing) {
        inputTitle.setCustomValidity(`Please, add a title`);
    } else {
        inputTitle.setCustomValidity(``);
    }
    titleError.textContent = inputTitle.validationMessage;
})

//adding custom validity check to the main content area
inputContent.addEventListener(`blur`, () => {
    if (inputContent.validity.valueMissing) {
        inputContent.setCustomValidity(`Please, add your text content`);
    } else {
        inputContent.setCustomValidity(``);
    }
    textError.textContent = inputContent.validationMessage;
})

//event listener for submitting a new post, dynamically creating a new article woth a headline, 
// a text field and two buttons


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////saving this code to try things in a copy of it/////////////////
//////////////////////////////////////////////////////////////////////////////////////
inputForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const actionData = inputForm.getAttribute(`data-action`);
    if (actionData === `add`) {
        if (!inputForm.checkValidity()) {
            alert(`Please, fill in both Title and Content areas`);
        } else {
            const newPost = document.createElement(`article`);
            //added unique id and date for a time stamp
            newPost.id = Date.now().toString(36) + Math.floor(Math.random() * 100).toString(36);
            let postDate = new Date();
            const postTitle = inputTitle.value;
            const postContent = inputContent.value;
            //created new object and added it to an array, saved to local storage
            const thisPost = new Post(postTitle, postContent, postDate, newPost.id);
            posts.push(thisPost);
            inputTitle.value = ``;
            inputContent.value = ``;
            localStorage.setItem("existingPosts", JSON.stringify(posts));
            newPost.innerHTML = `<h2>${postTitle}</h2> <p>${postContent}</p> <span>${postDate.toLocaleString('en-US')}</span> <div><button class="edit">Edit</button><button class="delete">Delete</button></div>`;
            postList.appendChild(newPost);
        }
    //if the data-action is not set to add, it's set to edit, so we're writing actions for that
    } else {
        if (!inputForm.checkValidity()) {
            alert(`Please, fill in both Title and Content areas`);
        } else {
            //saving values from the fields again
            const updatedTitle = inputTitle.value;
            const updatedContent = inputContent.value;
            const updatedTime = new Date();
            //getting the id of the post that we've been editing - from the form where we saved it temporarily
            const editingPostId = inputForm.getAttribute(`data-post-id`);
            //finding the object we're working on and updating its properties
            const editingPost = posts.find((post) => post.postId === editingPostId);
            editingPost.postTitle = updatedTitle;
            editingPost.postContent = updatedContent;
            editingPost.postTime = updatedTime;
            //updating local storage after we changed the properties
            localStorage.setItem("existingPosts", JSON.stringify(posts));
            //findinf the article we need to edit
            const editingPostEl = document.getElementById(`${editingPostId}`);
            editingPostEl.innerHTML = `<h2>${updatedTitle}</h2> <p>${updatedContent}</p> <span>Updated: ${updatedTime.toLocaleString('en-US')}</span> <div><button class="edit">Edit</button><button class="delete">Delete</button></div>`;
            inputTitle.value = ``;
            inputContent.value =``;
            addPostButton.innerText = `Add Post`;
            inputForm.dataset.action = `add`;
        }

    }
})

//delegating event to the form element to delete the article
postList.addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`delete`)) {
        //finding the article with delete clicked, then getting it's id
        const deletingPost = event.target.closest(`article`);
        const idToDelete = deletingPost.id;
        //filtering to make a new array that doesn't contain a post with the specified id
        const updatedPosts = posts.filter((post) => post.postId !== idToDelete);
        posts = updatedPosts;
        localStorage.setItem("existingPosts", JSON.stringify(posts));
        deletingPost.remove();
    }
})
//delegating event to the form to listen for edit click/////////////////////////////////////
///not really working, i need to understand how to make submit button act 2 different ways//
postList.addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`edit`)) {
        //grabbing the article clicked, getting its id and finding the object in the array
        const editingPostEl = event.target.closest(`article`);
        const idToEdit = editingPostEl.id;
        const editingPost = posts.find((post) => post.postId === idToEdit);
        inputTitle.value = editingPost.postTitle;
        inputContent.value = editingPost.postContent;
        addPostButton.innerText = "Save Changes";
        //adding data to form so that we could switch from adding to editing and keep the id of the post
        inputForm.dataset.action = `edit`;
        inputForm.setAttribute(`data-post-id`, `${idToEdit}`);
    }
})