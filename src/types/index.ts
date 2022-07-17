export interface IPlaybackState {
	progress_ms: number;
	item: ISong;
}

export interface ISong {
	artists: IArtist[];
	name: string;
	album: { images: IImage[] };
	duration_ms: number;
	id: string;
}

export interface IDetails {
	acousticness: number;
	danceability: number;
	duration_ms: number;
	energy: number;
	id: string;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	type: string;
	valence: number;
}

export interface ILyrics {
	startTimeMs: number;
	words: string;
}

interface IArtist {
	id: number;
	name: string;
	type: string;
	genres?: string[];
}

interface IImage {
	height: number;
	url: string;
	width: number;
}
