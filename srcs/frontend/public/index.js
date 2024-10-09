document.addEventListener('DOMContentLoaded', function() {
	let isLoggedIn = false; // Replace with actual login status check

    function setElementById(id, status) {
        document.getElementById(id).style.display = status;
    }

	function showMainButtons() {
		setElementById('play-btn','block');
		setElementById('leaderboard-btn','block');
		setElementById('stats-btn',isLoggedIn ? 'block' : 'none');
		setElementById('profile-btn',isLoggedIn ? 'block' : 'none');
		setElementById('login-btn',isLoggedIn ? 'none' : 'block');
		setElementById('logout-btn',isLoggedIn ? 'block' : 'none');
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

	function loginSuccess() {
		setElementById('login-form','none');
		document.getElementById('loginUsername').value = '';
		document.getElementById('loginPassword').value = '';
		setElementById('signup-form','none');
		document.getElementById('signupEmail').value = '';
		document.getElementById('signupUsername').value = '';
		document.getElementById('signupPassword').value = '';
		showMainOnly();
	}

	function loadPongScript() {
        const script = document.createElement('script');
		script.id = 'pong-script';
        script.src = 'pong2.js';
        script.defer = true;
        document.body.appendChild(script);
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
		setElementById('leaderboard','block');
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
		setElementById('login-form','block');
	});

	document.getElementById('register-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		setElementById('signup-form','block');
	});

	document.getElementById('back2-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('login-form','none');
		document.getElementById('loginUsername').value = '';
		document.getElementById('loginPassword').value = '';
		document.getElementById('loginUsername').classList.remove('is-invalid');
		document.getElementById('loginPassword').classList.remove('is-invalid');
		showLoginOnly();
	});

	document.getElementById('back3-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('signup-form','none');
		document.getElementById('signupEmail').value = '';
		document.getElementById('signupUsername').value = '';
		document.getElementById('signupPassword').value = '';
		document.getElementById('emailHelp').style.display = 'block';
		document.getElementById('userHelp').style.display = 'block';
		document.getElementById('passHelp').style.display = 'block';
		document.getElementById('signupEmail').classList.remove('is-invalid');
		document.getElementById('signupUsername').classList.remove('is-invalid');
		document.getElementById('signupPassword').classList.remove('is-invalid');
		showLoginOnly();
	});

	//play buttons
	document.getElementById('local-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		showPlayingFooter();
		loadPongScript();
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

	//game buttons
	document.getElementById('play2-btn').addEventListener('click', function(event) {
		event.preventDefault();
		startPongScript();
		setElementById('play2-btn','none');
		setElementById('pause-btn','block');
		setElementById('resume-btn','none');
	});

	document.getElementById('pause-btn').addEventListener('click', function(event) {
		event.preventDefault();
		pausePongScript();
		setElementById('pause-btn','none');
		setElementById('resume-btn','block');
	});

	document.getElementById('resume-btn').addEventListener('click', function(event) {
		event.preventDefault();
		startPongScript();
		setElementById('pause-btn','block');
		setElementById('resume-btn','none');
	});

	document.getElementById('restart-btn').addEventListener('click', function(event) {
		event.preventDefault();
		resetPongScript();
		setElementById('play2-btn','block');
		setElementById('pause-btn','none');
		setElementById('resume-btn','none');
	});

	document.getElementById('quit-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('play2-btn','block');
		setElementById('pause-btn','none');
		setElementById('resume-btn','none');
		showMainOnly();
		showDefaultFooterblock();
		resetPongScript();
	});

	//utils buttons
	document.getElementById('home-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('play2-btn','block');
		setElementById('pause-btn','none');
		setElementById('resume-btn','none');
		setElementById('leaderboard','none');
		showDefaultFooterblock();
		resetPongScript();
		loginSuccess();
	});

	document.getElementById('back-btn').addEventListener('click', function(event) {
		event.preventDefault();
		showMainOnly();
	});

	// // Form validation
	// const alertUsername = document.getElementById('liveAlertUsername')
	// const alertPassword = document.getElementById('liveAlertPassword')
	// const appendAlert = (message, type) => {
	// const wrapper = document.createElement('div')
	// wrapper.innerHTML = [
	// 	`<div class="alert alert-${type} alert-dismissible" role="alert">`,
	// 	`   <div>${message}</div>`,
	// 	'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
	// 	'</div>'
	// ].join('')

	// alertUsername.append(wrapper)
	// alertPassword.append(wrapper)
	// }

	// (() => {
	// 	'use strict'
	  
	// 	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	// 	const forms = document.querySelectorAll('.needs-validation')
	  
	// 	// Loop over them and prevent submission
	// 	Array.from(forms).forEach(form => {
	// 	  form.addEventListener('submit', event => {
	// 		if (!form.checkValidity()) {
	// 		  event.preventDefault()
	// 		  event.stopPropagation()
	// 		}
	  
	// 		form.classList.add('was-validated')
	// 	  }, false)
	// 	})
	//   })()

	// Form validation functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

	function validateUsername(username) {
		return (username.length <= 8 && username.length > 0);
	}

    function validatePassword(password) {
        return (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password));
    }
	
	// Form validation for Login
	document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
		const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        let isValid = true;

		//cambia con controllo sul database
        if (!validateUsername(username)) {
            isValid = false;
            document.getElementById('loginUsername').classList.add('is-invalid');
        } else {
            document.getElementById('loginUsername').classList.remove('is-invalid');
        }
		//cambia con controllo sul database
        if (!validatePassword(password)) {
            isValid = false;
            document.getElementById('loginPassword').classList.add('is-invalid');
        } else {
            document.getElementById('loginPassword').classList.remove('is-invalid');
        }
        if (isValid) {
            isLoggedIn = true;
            loginSuccess();
        }
    });

    // Form validation for Sign up
    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;

		let isValid = true;

        if (!validateEmail(email)) {
            isValid = false;
			document.getElementById('emailHelp').style.display = 'none';
            document.getElementById('signupEmail').classList.add('is-invalid');
        } else {
			document.getElementById('emailHelp').style.display = 'block';
            document.getElementById('signupEmail').classList.remove('is-invalid');
        }
		if (!validateUsername(username)) {
			isValid = false;
			document.getElementById('userHelp').style.display = 'none';
			document.getElementById('signupUsername').classList.add('is-invalid');
		} else {
			document.getElementById('userHelp').style.display = 'block';
			document.getElementById('signupUsername').classList.remove('is-invalid');
		}
        if (!validatePassword(password)) {
            isValid = false;
			document.getElementById('passHelp').style.display = 'none';
            document.getElementById('signupPassword').classList.add('is-invalid');
        } else {
			document.getElementById('passHelp').style.display = 'block';
            document.getElementById('signupPassword').classList.remove('is-invalid');
        }
        if (isValid) {
            isLoggedIn = true;
			//aggiungere utente al database
			loginSuccess();
        }
    });
});
