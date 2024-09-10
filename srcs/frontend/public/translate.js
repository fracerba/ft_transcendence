const translations = {
    en: {
    home: "Home",
    language: "Language",
    play: "Play",
    leaderboard: "Leaderboard",
    profile: "Profile",
    login: "Log in"
    },
    it: {
    home: "Casa",
    language: "Lingua",
    play: "Gioca",
    leaderboard: "Classifica",
    profile: "Profilo",
    login: "Accedi"
    },
    es: {
    home: "Inicio",
    language: "Idioma",
    play: "Jugar",
    leaderboard: "Clasificación",
    profile: "Perfil",
    login: "Iniciar sesión"
    }
};

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (event) => {
    const lang = event.target.getAttribute('data-lang');
    updateLanguage(lang);
    });
});

function updateLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[lang][key];
    });
}