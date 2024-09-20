document.addEventListener('DOMContentLoaded', function() {
	let isLoggedIn = false; // Replace with actual login status check

	function updateButtonVisibility() {
		document.getElementById('play-btn').style.display = 'block';
		document.getElementById('leaderboard-btn').style.display = 'block';
		document.getElementById('stats-btn').style.display = isLoggedIn ? 'block' : 'none';
		document.getElementById('profile-btn').style.display = isLoggedIn ? 'block' : 'none';
		document.getElementById('login-btn').style.display = isLoggedIn ? 'none' : 'block';
		document.getElementById('login2-btn').style.display = 'none';
		document.getElementById('register-btn').style.display = 'none';
		document.getElementById('logout-btn').style.display = isLoggedIn ? 'block' : 'none';
		document.getElementById('local-match-btn').style.display = 'none';
		document.getElementById('online-match-btn').style.display = 'none';
		document.getElementById('bot-match-btn').style.display = 'none';
		document.getElementById('tournament-btn').style.display = 'none';
		document.getElementById('back-btn').style.display = 'none';
	}

	function updateButtonVisibilityLogin() {
		document.getElementById('play-btn').style.display = 'none';
		document.getElementById('leaderboard-btn').style.display = 'none';
		document.getElementById('stats-btn').style.display = 'none';
		document.getElementById('profile-btn').style.display = 'none';
		document.getElementById('login-btn').style.display = 'none';

		document.getElementById('login2-btn').style.display = 'block';
		document.getElementById('register-btn').style.display = 'block';
		document.getElementById('back-btn').style.display = 'block';
	}

	function updateButtonVisibilityPlay() {
		document.getElementById('play-btn').style.display = 'none';
		document.getElementById('leaderboard-btn').style.display = 'none';
		document.getElementById('stats-btn').style.display = 'none';
		document.getElementById('profile-btn').style.display = 'none';

		document.getElementById('login-btn').style.display = 'none';
		document.getElementById('register-btn').style.display = 'none';
		document.getElementById('logout-btn').style.display = 'none';

		document.getElementById('local-match-btn').style.display = 'block';
		document.getElementById('online-match-btn').style.display = isLoggedIn ? 'block' : 'none';
		document.getElementById('bot-match-btn').style.display = 'block';
		document.getElementById('tournament-btn').style.display = isLoggedIn ? 'block' : 'none';
		document.getElementById('back-btn').style.display = 'block';
	}

	updateButtonVisibility();

	document.getElementById('play-btn').addEventListener('click', function(event) {
		event.preventDefault();
		updateButtonVisibilityPlay();
	});

	document.getElementById('local-match-btn').addEventListener('click', function(event) {
		event.preventDefault();

		document.getElementById('pongCanvas').style.display = 'block';
		// Assuming pong2.js initializes the game on the canvas with id 'gameCanvas'
	});

	document.getElementById('login-btn').addEventListener('click', function(event) {
		event.preventDefault();
		updateButtonVisibilityLogin();
	});

	document.getElementById('login2-btn').addEventListener('click', function(event) {
		event.preventDefault();
		isLoggedIn = true; // Replace with actual login logic
		updateButtonVisibility();
	});

	document.getElementById('register-btn').addEventListener('click', function(event) {
		event.preventDefault();
		isLoggedIn = true; // Replace with actual login logic
		updateButtonVisibility();
	});

	document.getElementById('logout-btn').addEventListener('click', function(event) {
		event.preventDefault();
		isLoggedIn = false;
		updateButtonVisibility();
	});

	document.getElementById('back-btn').addEventListener('click', function(event) {
		event.preventDefault();
		updateButtonVisibility();
	});
});

