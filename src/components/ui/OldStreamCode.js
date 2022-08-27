
    // useEffect(() => {
    //     const streamPlayers = async () => {
    //         // subscribing to datastream for live player data
    //         if (playerList) {
    //             const unsubscribe = streamPlayerData(Game,
    //                 (querySnapshot) => {
    //                     const updatedPlayers = 
    //                     querySnapshot.docs.map(docSnapshot => {
    //                         return({
    //                             data: docSnapshot.data(),
    //                             id: docSnapshot.id
    //                         });
    //                     });
    //                     setPlayerList(updatedPlayers);
    //                 },
    //                 (error) => setPlayerError(true)
    //             );
    //             return unsubscribe;
    //         }
    //     }
    //     streamPlayers();
    // }, [playerList]);

    // useEffect(() => {
    //     const streamEvents = async () => {
    //         // subscribing to datastream for live event data
    //         if (eventList) {
    //             const unsubscribe = streamEventData(Game,
    //                 (querySnapshot) => {
    //                     const updatedEvents =
    //                     querySnapshot.docs.map(docSnapshot => { 
    //                         return({
    //                             data: docSnapshot.data(), 
    //                             id: docSnapshot.id}
    //                         );
    //                     });
    //                     setEventList(updatedEvents);
    //                 },
    //                 (error) => setEventError(true)
    //             );
    //             return unsubscribe;
    //         }
    //     }
    //     streamEvents();
    // }, [eventList])