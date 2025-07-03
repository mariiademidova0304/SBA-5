let inputTitle = document.getElementById(`input-title`);
let inputContent = document.getElementById(`input-content`);
let addPostButton = document.getElementById(`add-post`);
let postList = document.getElementById(`post-list`);
let inputForm = document.getElementById(`input-container`);

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

postList.addEventListener(`click`, (event)=>{
    if(event.target.classList.contains(`delete`)){
        event.target.closest(`article`).remove();
    }
})