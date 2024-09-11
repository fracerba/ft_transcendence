const translations = {
    en: {
    home: "Home",
    language: "Language",
    play: "Play",
    leaderboard: "Leaderboard",
    stats: "Stats",
    profile: "Profile",
    login: "Log in",
    logout: "Log out",
	footer: "Developed by fracerba, ncortigi, everonel, lgaibazz",
    },
    it: {
    home: "Homepage",
    language: "Lingua",
    play: "Gioca",
    leaderboard: "Classifica",
    stats: "Statistiche",
    profile: "Profilo",
    login: "Accedi",
    logout: "Esci",
	footer: "Sviluppato da fracerba, ncortigi, everonel, lgaibazz",
    },
    es: {
    home: "Inicio",
    language: "Idioma",
    play: "Jugar",
    leaderboard: "Clasificación",
    stats: "Estadísticas",
    profile: "Perfil",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
	footer: "Desarrollado por fracerba, ncortigi, everonel, lgaibazz",
    },
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