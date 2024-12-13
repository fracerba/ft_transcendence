document.addEventListener('DOMContentLoaded', function() {
	let isLoggedIn = false; // Replace with actual login status check
	let current = 'home';

	function setElementById(id, status) {
		document.getElementById(id).style.display = status;
	}

	// const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    function navigateTo(pageId) {
        pages.forEach(page => {
            page.style.display = page.id === pageId ? 'block' : 'none';
        });
		if (pageId === 'home') {
			showHome();
		}
		if (pageId === 'game') {
			showGame();
		}
		if (pageId === 'pong') {
			showPlayingFooter();
		}
		if (pageId !== 'pong' && current === 'pong') {
			showDefaultFooter();
			resetPongScript();
		}
		current = pageId;
    }

    function handleNavigation(pageId) {
        history.pushState({ pageId }, '', `#${pageId}`);
        navigateTo(pageId);
    }

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.pageId) {
            navigateTo(event.state.pageId);
        }
    });

	const initialPage = window.location.hash.replace('#', '') || 'home';
	handleNavigation(initialPage);

	function showHome() {
		setElementById('stats-btn',isLoggedIn ? 'block' : 'none');
		setElementById('profile-btn',isLoggedIn ? 'block' : 'none');
		setElementById('login-btn',isLoggedIn ? 'none' : 'block');
		setElementById('logout-btn',isLoggedIn ? 'block' : 'none');
		setSearchingPlayers(false);
	}

	function returnToHome() {
		resetFooterButtons();
		showDefaultFooter();
		resetPongScript();
		const descriptionField = document.getElementById('profileDescription');
		descriptionField.setAttribute('readonly', true);
		document.getElementById('editDescriptionBtn').style.display = 'inline-block';
		document.getElementById('saveDescriptionBtn').style.display = 'none';
		handleNavigation('home');
		resetLoginInput();
		resetSignupInput();
		resetTournamentInput();
	}


	function showGame() {
		setElementById('online-match-btn',isLoggedIn ? 'block' : 'none');
		setElementById('tournament-btn',isLoggedIn ? 'block' : 'none');
	}

	function showPlayingFooter() {
		setElementById('pongCanvas','block');
		setElementById('containerAll','none');
		setSearchingPlayers(true);
		setElementById('default-footer','none');
		setElementById('playing-footer','block');
		resetFooterButtons();
		setElementById('friend-btn','none');
	}

	function showOnlineFooter() {
		setElementById('play2-btn','none');
		setElementById('friend-btn','block');
		setElementById('restart-btn','none');
	}

	function showDefaultFooter() {
		setElementById('pongCanvas','none');
		setElementById('containerAll','block');
		setSearchingPlayers(false);
		setElementById('default-footer','block');
		setElementById('playing-footer','none');
		setElementById('quit-footer','none');
	}

	function resetFooterButtons() {
		setElementById('play2-btn','block');
		setElementById('pause-btn','none');
		setElementById('resume-btn','none');
		setElementById('restart-btn','block');
	}

	function resetLoginInput() {
		document.getElementById('loginUsername').value = '';
		document.getElementById('loginPassword').value = '';
		document.getElementById('loginUsername').classList.remove('is-invalid');
		document.getElementById('loginPassword').classList.remove('is-invalid');
	}

	function resetSignupInput() {
		document.getElementById('signupEmail').value = '';
		document.getElementById('signupUsername').value = '';
		document.getElementById('signupPassword').value = '';
		document.getElementById('emailHelp').style.display = 'block';
		document.getElementById('userHelp').style.display = 'block';
		document.getElementById('passHelp').style.display = 'block';
		document.getElementById('signupEmail').classList.remove('is-invalid');
		document.getElementById('signupUsername').classList.remove('is-invalid');
		document.getElementById('signupPassword').classList.remove('is-invalid');
	}

	function resetTournamentInput() {
		document.getElementById('tournamentName').value = '';
		document.getElementById('tournamentSelect').value = '-';
		document.getElementById('tournamentName').classList.remove('is-invalid');
		document.getElementById('tournamentSelect').classList.remove('is-invalid');
	}

	function setSearchingPlayers(inGame) {
		if (isLoggedIn && !inGame) {
			document.getElementById('search-players-btn').classList.remove('disabled');
		}
		else {
			document.getElementById('search-players-btn').classList.add('disabled');
		}
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
		handleNavigation('game');
	});

	document.getElementById('leaderboard-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('leaderboard');
	});
	
	document.getElementById('profile-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('profile');
	});

	document.getElementById('stats-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('stats');
	});
	
	document.getElementById('login-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('login');
	});

	document.getElementById('logout-btn').addEventListener('click', function(event) {
		event.preventDefault();
		isLoggedIn = false;
		handleNavigation('home');
	});

	//login buttons
	document.getElementById('login2-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('login-form');
	});

	document.getElementById('login42-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('login','none');
		//aggiungere login con 42
	});

	document.getElementById('register-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('signup-form');
	});

	document.getElementById('backLogin-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	document.getElementById('backLoginForm-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('login');
		resetLoginInput();
	});

	document.getElementById('backSignupForm-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('login');
		resetSignupInput();
	});

	//play buttons
	document.getElementById('local-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('pong');
		loadPongScript();
	});

	document.getElementById('online-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('online');
	});

	document.getElementById('bot-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('pong');
		// loadPongScript();
	});

	document.getElementById('tournament-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('tournament');
	});

	document.getElementById('backGame-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	//online mode buttons
	document.getElementById('new-online-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		// setElementById('online','none');
		// showPlayingFooter();
		// showOnlineFooter();
		// loadPongScript();
	});

	document.getElementById('join-online-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('onlinematches');
	});

	document.getElementById('backOnline-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('game');
	});

	document.getElementById('join-online-match-btn2').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('pong');
		showOnlineFooter();
		loadPongScript();
	});

	document.getElementById('backOnlineMatches-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('online');
	});

	//tournament mode buttons
	document.getElementById('create-tournament-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('tournament-form');
	});

	document.getElementById('join-tournament-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('tournamentmatches');
	});

	document.getElementById('backTournament-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('game');
	});

	document.getElementById('backTournamentForm-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('tournament');
		resetTournamentInput();
	});

	document.getElementById('tournamentStart').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('pong');
		showOnlineFooter();
		loadPongScript();
	});

	document.getElementById('backTournamentRoom').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('tournament');
	});

	document.getElementById('join-tournament-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('tournamentroom');
	});

	document.getElementById('backTournamentMatches-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('tournament');
	});

	//in-game buttons
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
		setElementById('playing-footer','none');
		setElementById('quit-footer','block');
	});

	document.getElementById('quitYes-btn').addEventListener('click', function(event) {
		event.preventDefault();
		resetFooterButtons();
		showDefaultFooter();
		handleNavigation('game');
		resetPongScript();
	});

	document.getElementById('quitNo-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('playing-footer','block');
		setElementById('quit-footer','none');
	});

	//utils buttons
	document.getElementById('pong2-btn').addEventListener('click', function(event) {
		event.preventDefault();
		returnToHome();
	});

	document.getElementById('home-btn').addEventListener('click', function(event) {
		event.preventDefault();
		returnToHome();
	});

	document.getElementById('backLeaderboard-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	document.getElementById('backProfile-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	document.getElementById('backStats-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	document.getElementById('backSearchPlayers-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	document.getElementById('backProfileOther-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('search');
	});

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
	
	function validateName(name) {
		return (name.length > 0);
	}

	function validateNumber(number) {
		return (number !== '-');
	}

	function isNicknameInUse(nickname) {
		// Logica per controllare se il nickname è già in uso
		if (nickname === 'AM') {
			return true;
		}
		return false;
	}

	function showNicknameModal() {
		const nicknameModal = new bootstrap.Modal(document.getElementById('nicknameModal'));
		nicknameModal.show();
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
			handleNavigation('home');
			resetLoginInput();
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
		if (isValid && isNicknameInUse(username)) {
			isValid = false;
			showNicknameModal();
			document.getElementById('userHelp').style.display = 'none';
			document.getElementById('signupUsername').classList.add('is-invalid');
		}
		if (isValid) {
			isLoggedIn = true;
			//aggiungere utente al database
			handleNavigation('home');
			resetSignupInput();
		}
	});

	// Form validation for Tournament
	document.getElementById('tournament-form').addEventListener('submit', function(event) {
		event.preventDefault();
		const name = document.getElementById('tournamentName').value;
		const number = document.getElementById('tournamentSelect').value;

		let isValid = true;

		if (!validateName(name)) {
			isValid = false;
			document.getElementById('tournamentName').classList.add('is-invalid');
		} else {
			document.getElementById('tournamentName').classList.remove('is-invalid');
		}
		if (!validateNumber(number)) {
			isValid = false;
			document.getElementById('tournamentSelect').classList.add('is-invalid');
		} else {
			document.getElementById('tournamentSelect').classList.remove('is-invalid');
		}
		if (isValid) {
			handleNavigation('tournamentroom');
			resetTournamentInput();
		}
	});

	// Ricerca giocatori
	document.getElementById('navbarSearch').addEventListener('submit', function(event) {
		event.preventDefault();
		// const searchInput = document.getElementById('searchInput').value;
		// Logica per cercare i giocatori
		handleNavigation('search');
	});

	document.getElementById('viewProfile').addEventListener('click', function() {
		handleNavigation('profileOther');
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
				document.getElementById('profileImageStats').src = e.target.result;
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
		// Salva la descrizione (aggiungere logica per salvare la descrizione nel backend)
		console.log('Descrizione salvata:', descriptionField.value);
	});

	document.getElementById('viewStatsBtn').addEventListener('click', function() {
		handleNavigation('stats');
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
		listItem.className = 'list-group-item d-flex justify-content-between align-items-center bg-dark text-white';
		listItem.textContent = friend.name;

		if (friend.online) {
			const statusBadge = document.createElement('span');
			statusBadge.className = 'badge bg-success';
			statusBadge.setAttribute('data-translate', 'online');
			statusBadge.textContent = 'Online';
			listItem.appendChild(statusBadge);
		}
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
		listItem.className = 'list-group-item d-flex justify-content-between align-items-center bg-dark text-white';
		listItem.textContent = request.name;

		const actionsDiv = document.createElement('div');
		const acceptButton = document.createElement('button');
		acceptButton.className = 'btn btn-success btn-sm me-1';
		acceptButton.setAttribute('data-translate', 'accept');
		acceptButton.textContent = 'Accept';
		acceptButton.addEventListener('click', function() {
			// Logica per accettare la richiesta
			console.log('Accepted:', request.name);
		});

		const rejectButton = document.createElement('button');
		rejectButton.className = 'btn btn-danger btn-sm';
		rejectButton.setAttribute('data-translate', 'reject');
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
		listItem.className = 'list-group-item bg-dark text-white';
		listItem.textContent = request.name;
		sentRequestsElement.appendChild(listItem);
	});

	// Esempio di lista di partite (puoi popolare dinamicamente questa lista dal backend)
	const matchesList = [
		{ player1: 'Player01', player2: 'Player02', score1: '11', score2:'8', result: 'Win', mode: 'Online', date: '02/10/2023' },
		{ player1: 'Player01', player2: 'AM', score1: '5', score2:'11', result: 'Loss', mode: 'Bot', date: '01/10/2023' },
		// Aggiungi altre partite qui
	];

	const matchesListElement = document.getElementById('recentGamesList');
	const matchesListElement2 = document.getElementById('recentGamesList2');
	matchesList.forEach(match => {
		const listItem = document.createElement('li');
		listItem.className = 'list-group-item d-flex justify-content-between align-items-center bg-dark text-white';

		const actionsDiv = document.createElement('div');
		const player1Div = document.createElement('div');
		player1Div.textContent = match.player1;
		actionsDiv.appendChild(player1Div);
		const player2Div = document.createElement('div');
		player2Div.textContent = match.player2;
		actionsDiv.appendChild(player2Div);
		listItem.appendChild(actionsDiv);

		const actions2Div = document.createElement('div');
		actions2Div.className = 'text-center';
		const score1Div = document.createElement('div');
		score1Div.textContent = match.score1;
		actions2Div.appendChild(score1Div);
		const score2Div = document.createElement('div');
		score2Div.textContent = match.score2;
		actions2Div.appendChild(score2Div);
		listItem.appendChild(actions2Div);

		const resultBadge = document.createElement('span');
		resultBadge.className = match.result === 'Win' ? 'badge bg-success' : 'badge bg-danger';
		resultBadge.setAttribute('data-translate', match.result.toLowerCase());
		resultBadge.textContent = match.result;
		listItem.appendChild(resultBadge);

		const modeBadge = document.createElement('span');
		modeBadge.className = 'badge bg-secondary';
		modeBadge.textContent = match.mode;
		modeBadge.setAttribute('data-translate', match.mode.toLowerCase());
		listItem.appendChild(modeBadge);

		const dateBadge = document.createElement('span');
		dateBadge.textContent = match.date;
		listItem.appendChild(dateBadge);

		matchesListElement.appendChild(listItem);
		matchesListElement2.appendChild(listItem.cloneNode(true));
	});

	// // Esempio di statistiche (puoi popolare dinamicamente queste statistiche dal backend)
	// const stats = {
	// 	totalMatches: 10,
	// 	wins: 5,
	// 	losses: 3,
	// };

	// document.getElementById('games').textContent = stats.totalMatches;
	// document.getElementById('wins').textContent = stats.wins;
	// document.getElementById('losses').textContent = stats.losses;
});