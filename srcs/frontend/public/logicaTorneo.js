// Lista dei giocatori
const players = [
    { id: 1, name: "Player 1", score: 0, playedAgainst: [] },
    { id: 2, name: "Player 2", score: 0, playedAgainst: [] },
    { id: 3, name: "Player 3", score: 0, playedAgainst: [] },
    { id: 4, name: "Player 4", score: 0, playedAgainst: [] },
    { id: 5, name: "Player 5", score: 0, playedAgainst: [] }, // Aggiungi fino a 8 giocatori
    { id: 6, name: "Player 6", score: 0, playedAgainst: [] },
    { id: 7, name: "Player 7", score: 0, playedAgainst: [] },
    { id: 8, name: "Player 8", score: 0, playedAgainst: [] },
];

// Funzione per calcolare il numero di round
function calculateRounds(playerCount) {
    return Math.ceil(Math.log2(playerCount)) + 1;
}

// Funzione per accoppiare i giocatori
function pairPlayers(players) {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const pairs = [];
    const unmatched = [];

    while (sortedPlayers.length > 1) {
        const player1 = sortedPlayers.shift();
        let foundOpponent = false;

        for (let i = 0; i < sortedPlayers.length; i++) {
            const player2 = sortedPlayers[i];

            if (!player1.playedAgainst.includes(player2.id)) {
                pairs.push([player1, player2]);
                player1.playedAgainst.push(player2.id);
                player2.playedAgainst.push(player1.id);
                sortedPlayers.splice(i, 1);
                foundOpponent = true;
                break;
            }
        }

        if (!foundOpponent) {
            unmatched.push(player1);
        }
    }

    if (sortedPlayers.length === 1) {
        unmatched.push(sortedPlayers.shift());
    }

    return { pairs, unmatched };
}

// Funzione per aggiornare i punteggi
function updateScores(results) {
    results.forEach(({ winnerId, loserId }) => {
        const winner = players.find(p => p.id === winnerId);
        const loser = players.find(p => p.id === loserId);

        if (winner) winner.score += 1;
        if (loser) loser.score += 0;
    });
}

// Funzione principale del torneo
function runTournament() {
    const playerCount = players.length;
    if (playerCount < 3 || playerCount > 8) {
        console.log("Il torneo è supportato solo per 3-8 giocatori.");
        return;
    }

    const totalRounds = calculateRounds(playerCount);
    console.log(`Il torneo avrà ${totalRounds} round.\n`);

    for (let round = 1; round <= totalRounds; round++) {
        console.log(`Round ${round}`);
        const { pairs, unmatched } = pairPlayers(players);

        console.log("Coppie:");
        pairs.forEach(([p1, p2]) => {
            console.log(`${p1.name} vs ${p2.name}`);
        });

        if (unmatched.length > 0) {
            console.log("Giocatori senza avversari (bye):");
            unmatched.forEach(p => console.log(p.name));
            unmatched.forEach(p => p.score += 1); // Assegna 1 punto per il bye
        }

        // Simula i risultati (puoi sostituire con input utente)
        const results = pairs.map(([p1, p2]) => ({
            winnerId: Math.random() > 0.5 ? p1.id : p2.id,
            loserId: Math.random() > 0.5 ? p2.id : p1.id,
        }));
        updateScores(results);

        console.log("Risultati del round:");
        results.forEach(({ winnerId, loserId }) => {
            const winner = players.find(p => p.id === winnerId);
            const loser = players.find(p => p.id === loserId);
            console.log(`${winner.name} ha vinto contro ${loser.name}`);
        });

        console.log("\nPunteggi attuali:");
        players.forEach(p => console.log(`${p.name}: ${p.score} punti`));
        console.log("\n---\n");
    }

    // Determina il vincitore
    const sortedPlayers = players.sort((a, b) => b.score - a.score);
    console.log("Classifica finale:");
    sortedPlayers.forEach((p, index) => {
        console.log(`${index + 1}. ${p.name} - ${p.score} punti`);
    });

    console.log(`\nVincitore del torneo: ${sortedPlayers[0].name}`);
}

// Esegui il torneo
runTournament();
