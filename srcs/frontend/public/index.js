document.addEventListener('DOMContentLoaded', function() {
	let isLoggedIn = false; // Replace with actual login status check

	function updateButtonVisibility() {
		document.getElementById('stats-btn').style.display = isLoggedIn ? 'block' : 'none';
		document.getElementById('profile-btn').style.display = isLoggedIn ? 'block' : 'none';
		document.getElementById('login-btn').style.display = isLoggedIn ? 'none' : 'block';
		document.getElementById('logout-btn').style.display = isLoggedIn ? 'block' : 'none';
	}

	updateButtonVisibility();

	document.getElementById('play-btn').addEventListener('click', function(event) {
		event.preventDefault();
		document.getElementById('gameCanvas').style.display = 'block';
		// Assuming pong2.js initializes the game on the canvas with id 'gameCanvas'
	});

	document.getElementById('login-btn').addEventListener('click', function(event) {
		event.preventDefault();
		isLoggedIn = true;
		updateButtonVisibility();
		// Assuming pong2.js initializes the game on the canvas with id 'gameCanvas'
	});

	document.getElementById('logout-btn').addEventListener('click', function(event) {
		event.preventDefault();
		isLoggedIn = false;
		updateButtonVisibility();
		// Assuming pong2.js initializes the game on the canvas with id 'gameCanvas'
	});
});

