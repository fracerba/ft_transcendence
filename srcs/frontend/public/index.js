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

	function hideLeaderboard() {
		setElementById('leaderboard','none');
		setElementById('back4-btn','none');
	}

	function hideProfile() {
		setElementById('profile','none');
		setElementById('back5-btn','none');
	}

	function hideStats() {
		setElementById('stats','none');
		setElementById('back6-btn','none');
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

	function resetFooterButtons() {
		setElementById('play2-btn','block');
		setElementById('pause-btn','none');
		setElementById('resume-btn','none');
	}

	function resetLoginInput() {
		document.getElementById('loginUsername').value = '';
		document.getElementById('loginPassword').value = '';
	}

	function resetSignupInput() {
		document.getElementById('signupEmail').value = '';
		document.getElementById('signupUsername').value = '';
		document.getElementById('signupPassword').value = '';
	}

	function loginSuccess() {
		setElementById('login-form','none');
		resetLoginInput();
		setElementById('signup-form','none');
		resetSignupInput();
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
		setElementById('back4-btn','block');
	});
	
	document.getElementById('profile-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		setElementById('profile','block');
		setElementById('back5-btn','block');
		// showProfile();
	});

	document.getElementById('stats-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideAll();
		setElementById('stats','block');
		setElementById('back6-btn','block');
		// showStats();
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
		resetLoginInput();
		document.getElementById('loginUsername').classList.remove('is-invalid');
		document.getElementById('loginPassword').classList.remove('is-invalid');
		showLoginOnly();
	});

	document.getElementById('back3-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('signup-form','none');
		resetSignupInput();
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
		resetFooterButtons();
	});

	document.getElementById('quit-btn').addEventListener('click', function(event) {
		event.preventDefault();
		resetFooterButtons();
		showMainOnly();
		showDefaultFooterblock();
		resetPongScript();
	});

	//utils buttons
	document.getElementById('home-btn').addEventListener('click', function(event) {
		event.preventDefault();
		resetFooterButtons();
		hideLeaderboard();
		hideProfile();
		hideStats();
		showDefaultFooterblock();
		resetPongScript();
		loginSuccess();
	});

	document.getElementById('back-btn').addEventListener('click', function(event) {
		event.preventDefault();
		showMainOnly();
	});

	document.getElementById('back4-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideLeaderboard();
		showMainOnly();
	});

	document.getElementById('back5-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideProfile();
		showMainOnly();
	});

	document.getElementById('back6-btn').addEventListener('click', function(event) {
		event.preventDefault();
		hideStats();
		showMainOnly();
	});
	  
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

	// Gestione del caricamento dell'immagine del profilo
	document.getElementById('uploadImageBtn').addEventListener('click', function() {
		document.getElementById('uploadImage').click();
	});

	document.getElementById('uploadImage').addEventListener('change', function(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function(e) {
				document.getElementById('profileImage').src = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	});

	// Gestione della modifica della descrizione del profilo
	document.getElementById('editDescriptionBtn').addEventListener('click', function() {
		const descriptionField = document.getElementById('profileDescription');
		descriptionField.removeAttribute('readonly');
		document.getElementById('editDescriptionBtn').style.display = 'none';
		document.getElementById('saveDescriptionBtn').style.display = 'inline-block';
	});

	document.getElementById('saveDescriptionBtn').addEventListener('click', function() {
		const descriptionField = document.getElementById('profileDescription');
		descriptionField.setAttribute('readonly', true);
		document.getElementById('editDescriptionBtn').style.display = 'inline-block';
		document.getElementById('saveDescriptionBtn').style.display = 'none';
		// Salva la descrizione (puoi aggiungere logica per salvare la descrizione nel backend)
		console.log('Descrizione salvata:', descriptionField.value);
	});

	// Esempio di lista di amici (puoi popolare dinamicamente questa lista dal backend)
	const friendsList = [
		{ name: 'Friend01', online: true },
		{ name: 'Friend02', online: false },
		// Aggiungi altri amici qui
	];

	const friendsListElement = document.getElementById('friendsList');
	friendsList.forEach(friend => {
		const listItem = document.createElement('li');
		listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
		listItem.textContent = friend.name;

		const statusBadge = document.createElement('span');
		statusBadge.className = `badge ${friend.online ? 'bg-success' : 'bg-secondary'}`;
		statusBadge.textContent = friend.online ? 'Online' : 'Offline';

		listItem.appendChild(statusBadge);
		friendsListElement.appendChild(listItem);
	});

	// Esempio di richieste di amicizia (puoi popolare dinamicamente questa lista dal backend)
	const friendRequests = [
		{ name: 'Request01' },
		{ name: 'Request02' },
		// Aggiungi altre richieste qui
	];

	const friendRequestsElement = document.getElementById('friendRequestsList');
	friendRequests.forEach(request => {
		const listItem = document.createElement('li');
		listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
		listItem.textContent = request.name;

		const actionsDiv = document.createElement('div');
		const acceptButton = document.createElement('button');
		acceptButton.className = 'btn btn-success btn-sm';
		acceptButton.textContent = 'Accept';
		acceptButton.addEventListener('click', function() {
			// Logica per accettare la richiesta
			console.log('Accepted:', request.name);
		});

		const rejectButton = document.createElement('button');
		rejectButton.className = 'btn btn-danger btn-sm';
		rejectButton.textContent = 'Reject';
		rejectButton.addEventListener('click', function() {
			// Logica per rifiutare la richiesta
			console.log('Rejected:', request.name);
		});

		actionsDiv.appendChild(acceptButton);
		actionsDiv.appendChild(rejectButton);
		listItem.appendChild(actionsDiv);
		friendRequestsElement.appendChild(listItem);
	});

	// Esempio di richieste di amicizia inviate (puoi popolare dinamicamente questa lista dal backend)
	const sentRequests = [
		{ name: 'SentRequest01' },
		{ name: 'SentRequest02' },
		// Aggiungi altre richieste inviate qui
	];

	const sentRequestsElement = document.getElementById('sentRequestsList');
	sentRequests.forEach(request => {
		const listItem = document.createElement('li');
		listItem.className = 'list-group-item';
		listItem.textContent = request.name;
		sentRequestsElement.appendChild(listItem);
	});

	// Esempio di lista di partite (puoi popolare dinamicamente questa lista dal backend)
	const matchesList = [
		{ opponent: 'Opponent01', result: 'Win' },
		{ opponent: 'Opponent02', result: 'Loss' },
		// Aggiungi altre partite qui
	];

	const matchesListElement = document.getElementById('matchesList');
	matchesList.forEach(match => {
		const listItem = document.createElement('li');
		listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
		listItem.textContent = match.opponent;

		const resultBadge = document.createElement('span');
		resultBadge.className = `badge ${match.result === 'Win' ? 'bg-success' : 'bg-danger'}`;
		resultBadge.textContent = match.result;

		listItem.appendChild(resultBadge);
		matchesListElement.appendChild(listItem);
	});

	// Esempio di statistiche (puoi popolare dinamicamente queste statistiche dal backend)
	const stats = {
		totalMatches: 10,
		wins: 5,
		losses: 3,
	};

	document.getElementById('totalMatches').textContent = stats.totalMatches;
	document.getElementById('wins').textContent = stats.wins;
	document.getElementById('losses').textContent = stats.losses;
});