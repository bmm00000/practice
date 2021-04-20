// Action creator

export const selectSong = (song) => {
	// return an Action
	return {
		type: 'SONG_SELECTED',
		payload: song,
	};
};

// rather than creating a 'default export', we are creating a 'named export': a 'named export' allows us to export many different functions from the same file.
