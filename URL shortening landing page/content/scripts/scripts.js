const API_URL = 'https://api.shrtco.de/v2/shorten?url=';
const urlInput = document.querySelector('.form-input');
const submitBtn = document.querySelector('.form-btn');
const main = document.querySelector('.link-card');
const invalidFeedback = document.querySelector('.invalid-feedback');

//shorten CTA action

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formValidation();
    getUrl();
});

// Function to get shortened link

const getUrl = async () => {
    if (urlInput.value === '') {
        invalidFeedback.innerText = 'Please add a link';
    } else {
        try {
            const res = await fetch(API_URL + urlInput.value);
            const data = await res.json();
            showUrl(data.result);
        } catch (e) {
            urlInput.classList.add('is-invalid');
            invalidFeedback.innerText = 'Please add a valid link';
        }
    }
};

// Function to display shortened link

const showUrl = (url) => {
    const linkCard = document.createElement('div');
    const linkCls = ['card', 'p-4', 'border-0', 'mb-3', 'shadow', 'flex-md-row', 'align-items-md-center'];
    linkCls.forEach(element => linkCard.classList.add(element));

    linkCard.innerHTML = `<span class="mr-md-auto url pr-0 pr-md-5">${urlInput.value}</span>
                <hr class="d-block d-md-none">
                <span class="pb-3 pb-md-0 mr-md-3 short-url">${url.short_link}</span>
                <button class="btn text-white py-2 py-md-1 px-md-4 shadow-none copy-btn">Copy</button>`;

    main.appendChild(linkCard);
    copyUrl(linkCard);
    urlInput.value = '';
};

// Function for copy to clipboard

const copyUrl = (linkCard) => {
    const url = linkCard.querySelector('.short-url');
    const copyBtn = linkCard.querySelector('.copy-btn');

    copyBtn.addEventListener('click', () => {
        /* Copy the text */
        navigator.clipboard.writeText(url.innerText);

        copyBtn.style.backgroundColor = 'hsl(257, 27%, 26%)';
        copyBtn.innerText = 'Copied!';

        setTimeout(() => {
            copyBtn.style.backgroundColor = 'hsl(180, 66%, 49%)';
            copyBtn.innerText = 'Copy';
        }, 1000);
    });
};

// Function for validation

const formValidation = () => {
    if (urlInput.value === '') {
        urlInput.classList.add('is-invalid');
    } else {
        urlInput.classList.remove('is-invalid');
    }
};