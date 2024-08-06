import { getCookie } from '../utils/cookies';

const authUrl = `${window.location.protocol}//${window.location.host}/api/auth`

let currentForm = null;

export function handleFormVisibility() {
    const isDesktop = window.innerWidth >= 768;
    const formDesktop = document.getElementById("signin-form");
    const formMobile = document.getElementById("signin-form-sm");

    if (isDesktop) {
        if (formMobile) {
            formMobile.classList.add('d-none');
        }
        if (formDesktop) {
            formDesktop.classList.remove('d-none');
            formDesktop.classList.add('d-md-block');
        }
        if (currentForm && currentForm !== formDesktop) {
            currentForm.removeEventListener("submit", handleFormSubmit);
        }
        if (formDesktop) {
            formDesktop.addEventListener("submit", handleFormSubmit);
            currentForm = formDesktop;
        }
    } else {
        if (formDesktop) {
            formDesktop.classList.add('d-none');
            formDesktop.classList.remove('d-md-block');
        }
        if (formMobile) {
            formMobile.classList.remove('d-none');
            formMobile.classList.add('d-md-block');
        }
        if (currentForm && currentForm !== formMobile) {
            currentForm.removeEventListener("submit", handleFormSubmit);
        }
        if (formMobile) {
            formMobile.addEventListener("submit", handleFormSubmit);
            currentForm = formMobile;
        }
    }
}

export function handleFormSubmit(event) {
    event.preventDefault();

    const formData = {
        username: document.getElementById("username")?.value || document.getElementById("username-sm")?.value,
        email: document.getElementById("email")?.value || document.getElementById("email-sm")?.value,
        password: document.getElementById("password")?.value || document.getElementById("password-sm")?.value,
        confirmPassword: document.getElementById("confirmPassword")?.value || document.getElementById("confirmPassword-sm")?.value
    };

    const usernameValid = checkUsername(formData.username);
    const emailValid = checkEmail(formData.email);
    const passwordValid = checkPassword(formData.password);
    const passwordMatch = formData.password === formData.confirmPassword;

    if (!usernameValid) {
        alert("Le nom d'utilisateur peut avoir maximum 8 caractères, et ne peut contenir que des lettres et des chiffres");
        console.log('Invalid username');
        return;
    }
    if (!emailValid) {
        alert("email non conforme");
        console.log('Invalid email');
        return;
    }
    if (!passwordValid) {
        alert("mot de passe doit contenir au moins 8 caractères, une lettr majuscule, un chiffre et un caractère spécial.");
        console.log('Invalid password');
        return;
    }
    if (!passwordMatch) {
        alert("confirmation de mot de passe incorrect");
        console.log('Passwords do not match');
        return;
    }

    fetch(`${authUrl}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message) });
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        alert(data.message);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        window.location.href = '#/dashboard';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('User creation failed.');
    });
}

export function checkUsername(username) {
    const regex = /^[a-zA-Z0-9]{1,8}$/;
    return regex.test(username);
}

export function checkPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    return regex.test(password);
}

export function checkEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.+[a-zA-Z]{2,}$/;
    return regex.test(email);
}