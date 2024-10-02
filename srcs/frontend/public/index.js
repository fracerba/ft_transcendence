document.addEventListener('DOMContentLoaded', function() {
	let isLoggedIn = false; // Replace with actual login status check

    function setElementById(id, status) {
        document.getElementById(id).style.display = status;
    }

	function showMainButtons() {
		setElementById('play-btn', 'block');
		setElementById('leaderboard-btn', 'block');
		setElementById('stats-btn', isLoggedIn ? 'block' : 'none');
		setElementById('profile-btn', isLoggedIn ? 'block' : 'none');
		setElementById('login-btn', isLoggedIn ? 'none' : 'block');
		setElementById('logout-btn', isLoggedIn ? 'block' : 'none');
	}

	function showLoginButtons() {
		setElementById('login2-btn','block');
		setElementById('register-btn','block');
		setElementById('back-btn','block');
	}

	function showPlayButtons() {
		setElementById('local-match-btn','block');
		setElementById('online-match-btn',isLoggedIn ? 'block' : 'none');
		setElementById('bot-match-btn','block');
		setElementById('tournament-btn',isLoggedIn ? 'block' : 'none');
		setElementById('back-btn','block');
	}

	function hideMainButtons() {
		setElementById('play-btn','none');
		setElementById('leaderboard-btn','none');
		setElementById('stats-btn','none');
		setElementById('profile-btn','none');
		setElementById('login-btn','none');
		setElementById('logout-btn','none');
	}

	function hideLoginButtons() {
		setElementById('login2-btn','none');
		setElementById('register-btn','none');
		setElementById('back-btn','none');
	}

	function hidePlayButtons() {
		setElementById('local-match-btn','none');
		setElementById('online-match-btn','none');
		setElementById('bot-match-btn','none');
		setElementById('tournament-btn','none');
		setElementById('back-btn','none');
	}

	function showMainOnly() {
		showMainButtons();
		hideLoginButtons();
		hidePlayButtons();
	}

	function showLoginOnly() {
		hideMainButtons();
		hidePlayButtons();
		showLoginButtons();
	}

	function showPlayOnly() {
		hideMainButtons();
		hideLoginButtons();
		showPlayButtons();
	}

	function hideAll() {
		hideMainButtons();
		hideLoginButtons();
		hidePlayButtons();
	}

	function showPlayingFooter() {
		setElementById('pongCanvas','block');
		setElementById('default-footer','none');
		setElementById('playing-footer','block');
    }

    function showDefaultFooterblock() {
        setElementById('pongCanvas','none');
		setElementById('default-footer','block');
		setElementById('playing-footer','none');
    }

	

	function loadPongScript() {
        const script = document.createElement('script');
		script.id = 'pong-script';
        script.src = 'pong2.js';
        script.defer = true;
        document.body.appendChild(script);
    }

	function terminatePongScript() {
		const script = document.getElementById('pong-script');
		if (script) {
			document.body.removeChild(script);
		}
	}
	
	function startPongScript() {
		if (window.pongGame) {
			window.pongGame.play();
		}
	}

	function pausePongScript() {
		if (window.pongGame) {
			window.pongGame.pause();
		}
	}

	function resetPongScript() {
		if (window.pongGame) {
			window.pongGame.reset();
		}
	}

	//main buttons
	document.getElementById('play-btn').addEventListener('click', function(event) {
		event.preventDefault();
		showPlayOnly();
	});

	document.getElementById('leaderboard-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		// showLeaderboard();
	});

	document.getElementById('stats-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		// showStats();
	});

	document.getElementById('profile-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		// showProfile();
	});

	document.getElementById('login-btn').addEventListener('click', function(event) {
		event.preventDefault();
		showLoginOnly();
	});

	document.getElementById('logout-btn').addEventListener('click', function(event) {
		event.preventDefault();
		isLoggedIn = false;
		showMainOnly();
	});


	//login buttons
	document.getElementById('login2-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		setElementById('registration-form','block');
	});

	document.getElementById('register-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		setElementById('registration-form','block');
	});

	document.getElementById('submit-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('registration-form','none');
		isLoggedIn = true;
		showMainOnly();
	});

	//play buttons
	document.getElementById('local-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		showPlayingFooter();
		loadPongScript();
		// startPongScript();
	});

	document.getElementById('online-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		// showPlayingFooter();
		// startPongScript();
		// loadPongScript();
	});

	document.getElementById('bot-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		// showPlayingFooter();
		// startPongScript();
		// loadPongScript();
	});

	document.getElementById('tournament-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		// showPlayingFooter();
		// startPongScript();
		// loadPongScript();
	});

	//playing buttons
	document.getElementById('pause-btn').addEventListener('click', function(event) {
		event.preventDefault();
		pausePongScript();
		document.getElementById('pause-btn').style.display = 'none';
		document.getElementById('resume-btn').style.display = 'block';
	});

	document.getElementById('resume-btn').addEventListener('click', function(event) {
		event.preventDefault();
		startPongScript();
		document.getElementById('pause-btn').style.display = 'block';
		document.getElementById('resume-btn').style.display = 'none';
	});

	document.getElementById('restart-btn').addEventListener('click', function(event) {
		event.preventDefault();
		resetPongScript();
	});

	document.getElementById('quit-btn').addEventListener('click', function(event) {
		event.preventDefault();
		showMainOnly();
		showDefaultFooterblock();
		terminatePongScript();
	});

	//utils buttons
	document.getElementById('home-btn').addEventListener('click', function(event) {
		event.preventDefault();
		showMainOnly();
		showDefaultFooterblock();
		terminatePongScript();
	});

	document.getElementById('back-btn').addEventListener('click', function(event) {
		event.preventDefault();
		showMainOnly();
	});
});
