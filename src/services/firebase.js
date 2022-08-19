import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore,
    query,
    orderBy,
    onSnapshot,
    collection,
    getDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    setDoc,
    doc, 
    serverTimestamp, 
    arrayUnion,
    deleteDoc,
    where
} from "firebase/firestore";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();



/*
------------------------------------------------------------------------------------------------------------
AUTH METHODS
------------------------------------------------------------------------------------------------------------
*/

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        // const usersRef = await collection(db, "users");
        // const query = await query(usersRef, where("uid", "==", user.uid));
        // const queryResult = await getDocs(query);
        const queryResult = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(queryResult);

        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
                profileImageUrl: user.photoURL
            });
        }
    } catch (e) {
        throw (e);
    }
}

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        throw (e);
    }
}

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email
        });
    } catch (e) {
        throw (e);
    }
}

export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e) {
        throw(e);
    }
}

export const logout = () => {
    signOut(auth);
}

/*
------------------------------------------------------------------------------------------------------------
CREATE METHODS
------------------------------------------------------------------------------------------------------------
*/

export const createGame = async (name, creator, opponent) => {
    let players = [];
    const creatorDocRef = collection(db, 'users');
    const creatorQuery = query(creatorDocRef, where('email', '==', creator));
    const creatorSnapshot = await getDocs(creatorQuery);
    creatorSnapshot.forEach((doc) => {
        players.push(doc.data());
    });
    const opponentQuery = query(creatorDocRef, where('email', '==', opponent));
    const opponentSnapshot = await getDocs(opponentQuery);
    opponentSnapshot.forEach((doc) => {
        players.push(doc.data());
    });


    const gamesCollectionRef = collection(db, 'games');
    try {
        const docRef = await addDoc(gamesCollectionRef, {
            created: serverTimestamp(),
            name,
            creatorId: players[0].uid,
            creatorName: players[0].name,
            creatorProfileImageUrl: players[0].profileImageUrl,
            opponentId: players[1].uid,
            opponentName: players[1].name,
            opponentProfileImageUrl: players[1].profileImageUrl,

        });
        createGamePlayers(docRef.id, players[0], players[1]);
    } catch (e) {
        throw (e);
    }
}

export const createGamePlayers = async (gameId, creator, opponent) => {
    const gamePlayersRefCreator = doc(db, 'games', gameId, 'players', creator.uid);
    const gamePlayersRefOpponent = doc(db, 'games', gameId, 'players', opponent.uid);
    try {
        await setDoc(gamePlayersRefCreator, {
            name: creator.name,
            score: 0,
            profileImageUrl: creator.profileImageUrl
        });
        await setDoc(gamePlayersRefOpponent, {
            name: opponent.name,
            score: 0,
            profileImageUrl: opponent.profileImageUrl
        });
    } catch (e) {
        throw (e);
    }
}

export const createEvent = async (gameId, eventData) => {
    // eventData schema:
    // string: activityName
    // string: winnerId
    // int: pointValue
    // timestamp: date
    try {
        // adding to events array
        const eventsRef = await collection(db, 'games', gameId, 'events');
        await addDoc(eventsRef, {
            activityName: eventData.activityName,
            winnerId: eventData.winnerId,
            winnerName: eventData.winnerName,
            pointValue: eventData.pointValue,
            date: eventData.date
        });

        // updating player data
        const playerRef = await doc(db, 'games', gameId, "players", eventData.winnerId);
        const snapshot = await getDoc(playerRef);
        const oldPoints = snapshot.data().score;
        await setDoc(playerRef, {
            score: oldPoints + eventData.pointValue,
            lastWin: eventData.date
        }, {
            merge: true
        })
    } catch (e) {
        throw (e);
    }
}

/*
------------------------------------------------------------------------------------------------------------
UPDATE METHODS
------------------------------------------------------------------------------------------------------------
*/

// export const updateEvent = async (gameId, oldWinner, newEventData) => {
//     const playerRef = doc(db, 'games', gameId, 'players', oldWinner);
//     const snapshot = await getDoc(playerRef);
//     const oldPoints = snapshot.data().score;
// }

/*
------------------------------------------------------------------------------------------------------------
GET METHODS
------------------------------------------------------------------------------------------------------------
*/

export const getGames = async (playerId) => {
    const gamesRef = collection(db, 'games');
    const creatorGamesQuery = query(gamesRef, where('creatorId', '==', playerId));
    const creatorSnapshot = await getDocs(creatorGamesQuery)
    const opponentGamesQuery = query(gamesRef, where('opponentId', '==', playerId));
    const opponentGamesSnapshot = await getDocs(opponentGamesQuery);
    let games = [];
    creatorSnapshot.forEach((doc) => {
        games.push({
            data: doc.data(),
            id: doc.id
        });
    });
    opponentGamesSnapshot.forEach((doc) => {
        games.push({
            data: doc.data(),
            id: doc.id
        });
    });
    return games;
}

export const getGame = async (gameId) => {
    const gameDocRef = doc(db, 'games', gameId);
    const snapshot = getDoc(gameDocRef);
    return snapshot;
}

export const getPlayers = async (gameId) => {
    const playerDocsRef = collection(db, 'games', gameId, 'players');
    const snapshot = await getDocs(playerDocsRef);
    let array = [];
    snapshot.forEach((player) => {
        array.push({
            data: player.data(),
            id: player.id
        });
    })
    return array;
}

export const getEvents = async (gameId) => {
    const eventDocsRef = collection(db, 'games', gameId, 'events');
    const snapshot = await getDocs(eventDocsRef);
    let array = [];
    snapshot.forEach((event) => {
        array.push({
            data: event.data(),
            id: event.id,
        });
    })
    return array;
}

/*
------------------------------------------------------------------------------------------------------------
STREAM METHODS
------------------------------------------------------------------------------------------------------------
*/

export const streamPlayerData = async (gameId, snapshot, error) => {
    const playerCollectionRef = collection(db, 'games', gameId, 'players');
    const playersQuery = query(playerCollectionRef, orderBy('name'));
    return onSnapshot(playersQuery, snapshot, error);
}

export const streamEventData = async (gameId, snapshot, error) => {
    const eventCollectionRef = collection(db, 'games', gameId, 'events');
    const eventsQuery = query(eventCollectionRef);
    return onSnapshot(eventsQuery, snapshot, error);
}

/*
------------------------------------------------------------------------------------------------------------
DELETE METHODS
------------------------------------------------------------------------------------------------------------
*/
export const deleteEvent = async (gameId, eventId) => {
    const eventDocRef = await doc(db, 'games', gameId, 'events', eventId);
    const eventSnapshot = await getDoc(eventDocRef);
    const playerId = eventSnapshot.data().winnerId;
    const pointValue = eventSnapshot.data().pointValue;
    await deleteDoc(eventDocRef);

    // updating player data
    const playerRef = await doc(db, 'games', gameId, "players", playerId);
    const snapshot = await getDoc(playerRef);
    const oldPoints = snapshot.data().score;
    await setDoc(playerRef, {
        score: oldPoints - pointValue,
    }, {
        merge: true
    })
}

/*
------------------------------------------------------------------------------------------------------------
EXPORTS
------------------------------------------------------------------------------------------------------------
*/
export {
    auth,
    db,
    signInWithEmailAndPassword,
    googleProvider
}