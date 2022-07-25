const comments = document.querySelector('.comments');
const upVote = document.querySelector('.upvote');
const downVote = document.querySelector('.downvote');
const vote = document.querySelector('.vote');
const currentUserImg = document.querySelector('.curentuser-image');
const replyCard = document.querySelector('.reply-card');
const replyForm = document.getElementById('reply-form');
const replyThread = document.querySelector('.reply-thread');
const edit = document.querySelector('.edit');
const deleteComment = document.querySelector('.delete-comment');
const editComment = document.querySelector('.edit-comment');
const addComment = document.querySelector('.add-comment');

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

const createTemplate = (comment, parentCard) => {
    const card = document.createElement('div');
    const classesToAdd = ['card', 'shadow', 'p-3', 'flex-md-row', 'border-0', 'mt-3']
    card.classList.add(...classesToAdd); //spread operator for adding classes
    card.setAttribute("id", `comment-${comment.uid ? comment.uid : comment.id}`);

    card.innerHTML = `
        <div class="d-md-flex flex-md-column order-md-2 card-info">
        <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
                <img src="${comment.img ? comment.img : comment.user.image.png}" alt="${comment.name ? comment.name : comment.user.username}" class="w-75 user-image">
            </div>
            <div class="flex-grow-1">
                <span class="fw-700 text-dark user-name">${comment.name ? comment.name : comment.user.username}</span>
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
        ${comment.reply ? comment.reply : comment.content}
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

    comments.appendChild(card); // Appending card in HTML comments container

    if (comment.replyingTo) {   // Checking if replying key is present in json file and appending it to reply thread
        replyThread.appendChild(card);
    }

    replyComment(card); // Calling reply to comment form

    if (comment.img) {
        console.log(parentCard);
        const createReplyThread = document.createElement('div');
        createReplyThread.classList.add('reply-thread');
        parentCard.parentNode.insertBefore(createReplyThread, parentCard.nextSibling);  // Inserting reply card before each card that is replied to
        createReplyThread.appendChild(card);
        // setTimeout(() => {
        //     replyForm.style.display = 'none';
        // }, 1000);
    }
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

const addNewReply = (card) => {
    let currentObj = {};
    let currentId = 5;
    const replyComment = document.getElementById('reply-comment');
    replyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        currentObj.uid = `${currentId++}`;
        currentObj.img = currentUserImg.getAttribute('src');
        currentObj.name = currentUserImg.getAttribute('alt');
        currentAObjtime = `${new Date().getHours()} hours ago`;
        currentObj.reply = replyComment.value;
        currentObj.vote = `${0}`;

        createTemplate(currentObj, card);
    });
};
