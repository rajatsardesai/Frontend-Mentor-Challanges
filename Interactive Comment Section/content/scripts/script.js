const comments = document.querySelector('.comments');
const upVote = document.querySelector('.upvote');
const downVote = document.querySelector('.downvote');
const vote = document.querySelector('.vote');
const currentUserImg = document.querySelector('.curentuser-image');
const replyCard = document.querySelector('.reply-card');
const replyForm = document.getElementById('reply-form');
const replyThread = document.querySelector('.reply-thread');

let id = 5;

// Fetching user comments and displaying it by calling createTemplate() function

const getUserComments = async () => {
    const res = await fetch('/content/scripts/data.json');
    const data = await res.json();
    getCurrentuserData(data);
    data.comments.forEach(comment => {
        createTemplate(comment);

        if (comment.replies) {      // Checking if replies key is present in json file
            comment.replies.forEach((reply) => {    //looping it through and passing the data into function
                createTemplate(reply);
            });
        };
    });
};

getUserComments();

// Create HTML Template for each card

const createTemplate = (comment) => {
    const card = document.createElement('div');
    const classesToAdd = ['card', 'shadow', 'p-3', 'flex-md-row', 'border-0', 'mt-3']
    card.classList.add(...classesToAdd); //spread operator for adding classes
    card.setAttribute("id", `comment-${comment.cid ? comment.cid : comment.id}`);

    card.innerHTML = `
        <div class="d-md-flex flex-md-column order-md-2 card-info">
        <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
                <img src="${comment.img ? comment.img : comment.user.image.png}" alt="${comment.name ? comment.name : comment.user.username}" class="w-75 user-image">
            </div>
            <div class="flex-grow-1">
                <span class="fw-700 text-dark user-name">${comment.name ? comment.name : comment.user.username}</span>
                <span class="badge bg-blue ms-1 ${comment.name ? 'd-inline-block' : 'd-none'}">you</span>
                <span class="fw-light ms-3 user-time">${comment.time ? comment.time : comment.createdAt}</span>
            </div>
            <div class="comment-action mt-3 d-none d-md-block">
                <button class="border-0 bg-transparent reply-btn">
                    <img src="/content/images/icon-reply.svg" alt="Reply" class="pe-2">
                    <span class="blue fw-500">Reply</span>
                </button>
            </div>
        </div>
        <div class="user-comment mt-3">
        ${comment.comment ? comment.comment : comment.content}
        </div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
        <div class="counts d-md-flex flex-md-column p-2 mt-3 p-md-3 mt-md-0 me-md-3">
            <button class="border-0 upvote"><img src="/content/images/icon-plus.svg" alt="Upvote"
                    class="ps-2 ps-md-0"></button>
            <span class="px-3 px-md-0 blue fw-500 vote">${comment.vote ? comment.vote : comment.score}</span>
            <button class="border-0 downvote"><img src="/content/images/icon-minus.svg" alt="Downvote"
                    class="pe-2 pe-md-0"></button>
        </div>
        <div class="comment-action mt-3 d-md-none">
            <button class="border-0 bg-transparent reply-btn">
                <img src="/content/images/icon-reply.svg" alt="Reply" class="pe-2">
                <span class="blue fw-500">Reply</span>
            </button>
        </div>
    </div>`;

    if (comment.img) {  // Checking if add new data is present or not
        replyCard.before(card);    // Adding card to the end of all comments
    } else {
        comments.appendChild(card); // Appending card in HTML comments container
    }

    if (comment.replyingTo) {   // Checking if replying key is present in json file and appending it to reply thread
        replyThread.appendChild(card);
    }

    replyComment(card); // Calling reply to comment form

    // replyCard.replaceWith(card);
};

// Function to open reply input after each comment

const replyComment = (card) => {
    const replyBtn = card.querySelector('.reply-btn');

    replyBtn.addEventListener('click', () => {
        // getCurrentuserData();
        replyCard.classList.toggle('active');   // Toggle class to open reply input
        card.parentNode.insertBefore(replyCard, card.nextSibling);  // Inserting reply input before each card that is replied to
        addNewReply(card);  // Calling to get input from new reply
    });
};

//Function to set image of current user in reply and add comment section

const getCurrentuserData = (data) => {
    currentUserImg.setAttribute('src', data.currentUser.image.png);
    currentUserImg.setAttribute('alt', `${data.currentUser.username}`);
}

// Function to get input from new reply

const addNewReply = () => {
    let currentObj = {};
    const replyComment = document.getElementById('reply-comment');
    replyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        currentObj.uid = `${id++}`;
        currentObj.img = currentUserImg.getAttribute('src');
        currentObj.name = currentUserImg.getAttribute('alt');
        currentObj.time = `${new Date().getMinutes()} minutes ago`;
        currentObj.reply = replyComment.value;
        currentObj.vote = `${0}`;

        addToReplyThread(currentObj);   // Passing current user data to the function

        replyComment.value = '';    // Reset reply input
    });
};

// Function to add replied card to reply thread

const addToReplyThread = (currentuser, text = '') => {
    const card = document.createElement('div');
    const classesToAdd = ['card', 'shadow', 'p-3', 'flex-md-row', 'border-0', 'mt-3']
    card.classList.add(...classesToAdd); //spread operator for adding classes
    card.setAttribute("id", `comment-${currentuser.uid}`);

    card.innerHTML = `
        <div class="d-md-flex flex-md-column order-md-2 card-info">
            <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                    <img src="${currentuser.img}" alt="${currentuser.name}" class="w-75 user-image">
                </div>
                <div class="flex-grow-1">
                    <span class="fw-700 text-dark user-name">${currentuser.name}</span>
                    <span class="badge bg-blue ms-1">you</span>
                    <span class="fw-light ms-3 user-time">${currentuser.time}</span>
                </div>
                <div class="comment-action mt-0 d-none d-md-block">
                    <button class="border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        <img src="/content/images/icon-delete.svg" alt="Reply" class="pe-1">
                        <span class="red fw-500">delete</span>
                    </button>
                    <button class="border-0 bg-transparent btn-edit ms-3">
                        <img src="/content/images/icon-edit.svg" alt="Reply" class="pe-1">
                        <span class="blue fw-500">edit</span>
                    </button>
                </div>
            </div>
            <div class="user-comment mt-3">
                <div class="main ${text ? "d-none" : ''}"></div>
                    <textarea class="form-control ${text ? '' : "d-none"} edit-comment" rows="3" placeholder="Edit comment..."></textarea>
                </div>
                <div class="mt-3 text-end ${text ? '' : "d-none"} btn-update">
                    <button class="btn-lg border-0 btn-outline-0 bg-blue text-light px-4" type="submit">UPDATE</button>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="counts d-md-flex flex-md-column p-2 mt-3 p-md-3 mt-md-0 me-md-3">
                <button class="border-0 upvote"><img src="/content/images/icon-plus.svg" alt="Upvote"
                    class="ps-2 ps-md-0"></button>
                <span class="px-3 px-md-0 blue fw-500 vote">${currentuser.vote}</span>
                <button class="border-0 downvote"><img src="/content/images/icon-minus.svg" alt="Downvote"
                    class="pe-2 pe-md-0"></button>
            </div>
            <div class="comment-action mt-3 d-md-none">
                <button class="border-0 bg-transparent">
                    <img src="/content/images/icon-delete.svg" alt="Reply" class="pe-1">
                    <span class="red fw-500">delete</span>
                </button>
                <button class="border-0 bg-transparent btn-edit ms-3">
                    <img src="/content/images/icon-edit.svg" alt="Reply" class="pe-1">
                    <span class="blue fw-500">edit</span>
                </button>
            </div>
        </div>
        `;


    replyCard.replaceWith(card); // Replacing input form with replied card

    const editBtn = card.querySelector('.btn-edit');
    const deleteBtn = document.querySelector('.btn-delete');
    const updateBtn = card.querySelector('.btn-update');
    const main = card.querySelector('.main');
    const textArea = card.querySelector('.edit-comment');

    textArea.value = currentuser.reply;
    main.innerHTML = currentuser.reply;

    // Delete replied comment

    deleteBtn.addEventListener('click', () => {
        card.remove();
    });

    // Edit replied comment

    editBtn.addEventListener('click', () => {
        main.classList.add('d-none');
        textArea.classList.remove('d-none');
        updateBtn.classList.toggle('d-none');
        editBtn.setAttribute('disabled', false);
        deleteBtn.setAttribute('disabled', false);
    });

    // Update replied comment

    updateBtn.addEventListener('click', () => {
        main.classList.remove('d-none');
        textArea.classList.add('d-none');
        updateBtn.classList.add('d-none');
        editBtn.removeAttribute('disabled', false);
        deleteBtn.removeAttribute('disabled', false);
    });

    // Getting value from textarea of editable comment

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = value;
    });
};

// Function to add new comment

const addNewComment = () => {
    let newCommentObj = {}
    const addCommentForm = document.querySelector('.add-comment-form');
    const addCommentImg = document.querySelector('.add-comment-img');
    const addCommentContent = document.querySelector('.add-comment-content');
    addCommentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentImg = addCommentImg.getAttribute('src');
        newCommentObj.cid = `${id++}`;
        newCommentObj.img = commentImg;
        newCommentObj.name = 'juliusomo';
        newCommentObj.comment = addCommentContent.value;
        newCommentObj.time = `${new Date().getHours()} Hours ago`;
        newCommentObj.vote = `${0}`;
        createTemplate(newCommentObj);
    })
};

addNewComment();