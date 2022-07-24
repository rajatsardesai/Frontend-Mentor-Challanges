const comments = document.querySelector('.comments');
const upVote = document.querySelector('.upvote');
const downVote = document.querySelector('.downvote');
const vote = document.querySelector('.vote');
const replyBtn = document.querySelector('.reply-btn');
const replyThread = document.querySelector('.reply-thread');
const replyCard = document.querySelector('.reply-card');
const replyComment = document.querySelector('.reply-comment');
const replyCardInfo = document.querySelector('.reply-card-info');
const edit = document.querySelector('.edit');
const deleteComment = document.querySelector('.delete-comment');
const editComment = document.querySelector('.edit-comment');
const addComment = document.querySelector('.add-comment');

const createTemplate = (comment) => {
    const card = document.createElement('div');
    const classesToAdd = ['card', 'shadow', 'p-3', 'flex-md-row', 'border-0', 'mt-3']
    card.classList.add(...classesToAdd);
    card.setAttribute("id", `comment-${comment.id}`);

    card.innerHTML = `
        <div class="d-md-flex flex-md-column order-md-2 card-info">
        <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
                <img src="${comment.user.image.png}" alt="${comment.user.username}" class="w-75 user-image">
            </div>
            <div class="flex-grow-1">
                <span class="fw-700 text-dark user-name">${comment.user.username}</span>
                <span class="fw-light ms-3 user-time">${comment.createdAt}</span>
            </div>
            <div class="comment-action mt-3 d-none d-md-block">
                <button class="border-0 bg-transparent reply-btn">
                    <img src="/content/images/icon-reply.svg" alt="Reply" class="pe-2">
                    <span class="blue fw-500">Reply</span>
                </button>
            </div>
        </div>
        <div class="user-comment mt-3">
        ${comment.content}
        </div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
        <div class="counts d-md-flex flex-md-column p-2 mt-3 p-md-3 mt-md-0 me-md-3">
            <button class="border-0 upvote"><img src="/content/images/icon-plus.svg" alt="Upvote"
                    class="ps-2 ps-md-0"></button>
            <span class="px-3 px-md-0 blue fw-500 vote">${comment.score}</span>
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

    comments.appendChild(card);

    if (comment.replyingTo) {
        replyThread.appendChild(card);
    }
};

// const createReplyTemplate = (reply) => {
//     const card = document.createElement('div');
//     const classesToAdd = ['card', 'shadow', 'p-3', 'flex-md-row', 'border-0', 'mt-3']
//     card.classList.add(...classesToAdd);

//     card.innerHTML = `
//         <div class="d-md-flex flex-md-column order-md-2 card-info">
//         <div class="d-flex align-items-center">
//             <div class="flex-shrink-0">
//                 <img src="${reply.user.image.png}" alt="${reply.user.username}" class="w-75 user-image">
//             </div>
//             <div class="flex-grow-1">
//                 <span class="fw-700 text-dark user-name">${reply.user.username}</span>
//                 <span class="fw-light ms-3 user-time">${reply.createdAt}</span>
//             </div>
//             <div class="comment-action mt-3 d-none d-md-block">
//                 <button class="border-0 bg-transparent reply-btn">
//                     <img src="/content/images/icon-reply.svg" alt="Reply" class="pe-2">
//                     <span class="blue fw-500">Reply</span>
//                 </button>
//             </div>
//         </div>
//         <div class="user-comment mt-3">
//         ${reply.content}
//         </div>
//     </div>
//     <div class="d-flex justify-content-between align-items-center">
//         <div class="counts d-md-flex flex-md-column p-2 mt-3 p-md-3 mt-md-0 me-md-3">
//             <button class="border-0 upvote"><img src="/content/images/icon-plus.svg" alt="Upvote"
//                     class="ps-2 ps-md-0"></button>
//             <span class="px-3 px-md-0 blue fw-500 vote">${reply.score}</span>
//             <button class="border-0 downvote"><img src="/content/images/icon-minus.svg" alt="Downvote"
//                     class="pe-2 pe-md-0"></button>
//         </div>
//         <div class="comment-action mt-3 d-md-none">
//             <button class="border-0 bg-transparent reply-btn">
//                 <img src="/content/images/icon-reply.svg" alt="Reply" class="pe-2">
//                 <span class="blue fw-500">Reply</span>
//             </button>
//         </div>
//     </div>`;;

//     replyThread.appendChild(card);
// };

const getUserComments = async () => {
    const res = await fetch('/content/scripts/data.json');
    const data = await res.json();
    data.comments.forEach(comment => {
        createTemplate(comment);

        if (comment.replies) {
            comment.replies.forEach((reply) => {
                createTemplate(reply);
            });
        };
    });

};

getUserComments();
