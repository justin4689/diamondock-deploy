function validateLoginForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validation email
    if (!isValidEmail(email)) {
        alert('Veuillez entrer une adresse email valide');
        return false;
    }
    
    // Validation mot de passe
    if (password.length < 6) {
        alert('Le mot de passe doit contenir au moins 6 caractères');
        return false;
    }
    
    return true;
}

function validateRegisterForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation nom d'utilisateur
    if (username.length < 3) {
        alert('Le nom d\'utilisateur doit contenir au moins 3 caractères');
        return false;
    }
    
    // Validation email
    if (!isValidEmail(email)) {
        alert('Veuillez entrer une adresse email valide');
        return false;
    }
    
    // Validation mot de passe
    if (password.length < 6) {
        alert('Le mot de passe doit contenir au moins 6 caractères');
        return false;
    }
    
    // Validation confirmation mot de passe
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 