const form = document.querySelector('.needs-validation');
const inputs = document.querySelectorAll('input');
const select = document.getElementById('teams');
const alert = document.querySelector('.alert');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach(input => {
        if (input.value === '') {
            form.classList.add('was-validated');
            alert.classList.add('d-none');
        } else {
            form.classList.remove('was-validated');
            alert.classList.remove('d-none');
        }
        input.value = '';
        select.value = '';
    });
});


