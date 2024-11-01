document.addEventListener('DOMContentLoaded', function() {
	let isLoggedIn = false; // Replace with actual login status check
	let containerStatus = 0;
	let footerStatus = 'default';
	// default: default-footer
	// playing: initial playing-footer
	// pause: playing-footer showing pause-btn
	// resume: playing-footer showing resume-btn
	// online: playing-footer showing friend-btn	

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
    }

    function handleNavigation(pageId) {
        // event.preventDefault();
        history.pushState({ pageId }, '', `#${pageId}`);
        navigateTo(pageId);
    }

    // navLinks.forEach(link => {
    //     link.addEventListener('click', handleNavigation);
    // });

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
	}

	function showPlayingFooter() {
		footerStatus = 'playing';
		setElementById('pongCanvas','block');
		setElementById('containerAll','none');
		setElementById('default-footer','none');
		setElementById('playing-footer','block');
		setElementById('friend-btn','none');
	}

	function showOnlineFooter() {
		footerStatus = 'online';
		setElementById('pongCanvas','block');
		setElementById('containerAll','none');
		setElementById('default-footer','none');
		setElementById('playing-footer','block');
		setElementById('play2-btn','none');
		setElementById('friend-btn','block');
		setElementById('restart-btn','none');
	}

	function showDefaultFooter() {
		footerStatus = 'default';
		setElementById('pongCanvas','none');
		setElementById('containerAll','block');
		setElementById('default-footer','block');
		setElementById('playing-footer','none');
	}

	function resetFooterButtons() {
		setElementById('play2-btn','block');
		setElementById('pause-btn','none');
		setElementById('resume-btn','none');
		setElementById('restart-btn','block');
		setElementById('quit-btn','block');
		setElementById('quitMessage','none');
		setElementById('quitYes-btn','none');
		setElementById('quitNo-btn','none');
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
		setElementById('online-match-btn',isLoggedIn ? 'block' : 'none');
		setElementById('tournament-btn',isLoggedIn ? 'block' : 'none');
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

	document.getElementById('back-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	document.getElementById('back2-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('login');
		resetLoginInput();
	});

	document.getElementById('back3-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('login');
		resetSignupInput();
	});

	//play buttons
	document.getElementById('local-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('game','none');
		showPlayingFooter();
		loadPongScript();
	});

	document.getElementById('online-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('online');
	});

	document.getElementById('bot-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('game','none');
		showPlayingFooter();
		// loadPongScript();
	});

	document.getElementById('tournament-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('tournament');
	});

	document.getElementById('back1-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	//online mode buttons
	document.getElementById('new-online-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('online','none');
		showOnlineFooter();
		loadPongScript();
	});

	document.getElementById('join-online-match-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('online','none');
		showOnlineFooter();
		loadPongScript();
	});

	document.getElementById('back7-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('game');
	});

	//tournament mode buttons
	document.getElementById('create-tournament-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('tournament','none');
		showOnlineFooter();
		loadPongScript();
	});

	document.getElementById('join-tournament-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('tournament','none');
		showOnlineFooter();
		loadPongScript();
	});

	document.getElementById('back8-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('game');
	});

	//in-game buttons
	document.getElementById('play2-btn').addEventListener('click', function(event) {
		event.preventDefault();
		startPongScript();
		footerStatus = 'pause';
		setElementById('play2-btn','none');
		setElementById('pause-btn','block');
		setElementById('resume-btn','none');
	});

	document.getElementById('pause-btn').addEventListener('click', function(event) {
		event.preventDefault();
		pausePongScript();
		footerStatus = 'resume';
		setElementById('pause-btn','none');
		setElementById('resume-btn','block');
	});

	document.getElementById('resume-btn').addEventListener('click', function(event) {
		event.preventDefault();
		startPongScript();
		footerStatus = 'pause';
		setElementById('pause-btn','block');
		setElementById('resume-btn','none');
	});

	document.getElementById('restart-btn').addEventListener('click', function(event) {
		event.preventDefault();
		footerStatus = 'playing';
		resetPongScript();
		resetFooterButtons();
	});

	document.getElementById('quit-btn').addEventListener('click', function(event) {
		event.preventDefault();
		setElementById('play2-btn','none');
		setElementById('pause-btn','none');
		setElementById('resume-btn','none');
		setElementById('restart-btn','none');
		setElementById('friend-btn','none');
		setElementById('quit-btn','none');
		setElementById('quitMessage','block');
		setElementById('quitYes-btn','block');
		setElementById('quitNo-btn','block');
	});

	document.getElementById('quitYes-btn').addEventListener('click', function(event) {
		event.preventDefault();
		resetFooterButtons();
		showDefaultFooter();
		setElementById('game','block');
		resetPongScript();
	});

	document.getElementById('quitNo-btn').addEventListener('click', function(event) {
		event.preventDefault();
		if (footerStatus === 'playing') {
			setElementById('play2-btn','block');
		} else if (footerStatus === 'pause') {
			setElementById('pause-btn','block');
		} else if (footerStatus === 'resume') {
			setElementById('resume-btn','block');
		} else if (footerStatus === 'online') {
			setElementById('friend-btn','block');
		}
		if (footerStatus !== 'online')
			setElementById('restart-btn','block');
		setElementById('quit-btn','block');
		setElementById('quitMessage','none');
		setElementById('quitYes-btn','none');
		setElementById('quitNo-btn','none');
	});

	//utils buttons
	document.getElementById('home-btn').addEventListener('click', function(event) {
		event.preventDefault();
		resetFooterButtons();
		showDefaultFooter();
		resetPongScript();
		handleNavigation('home');
		resetLoginInput();
		resetSignupInput();
	});

	document.getElementById('back4-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	document.getElementById('back5-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
	});

	document.getElementById('back6-btn').addEventListener('click', function(event) {
		event.preventDefault();
		handleNavigation('home');
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
		if (isValid) {
			isLoggedIn = true;
			//aggiungere utente al database
			handleNavigation('home');
			resetSignupInput();
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

	document.getElementById('viewStatsBtn').addEventListener('click', function() {
		setElementById('profile','none');
		setElementById('stats','block');
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