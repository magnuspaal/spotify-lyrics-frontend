import { useEffect, useRef, useState } from "react";
import axiosClient from "../config/axios";
import { ILyrics } from "../types";
import { motion } from "framer-motion";

function Lyrics(props: {
	progressMs: number;
	trackName: string;
	artist: string;
	trackId: string;
}) {
	const [lyrics, setLyrics] = useState<ILyrics[]>();
	const [position, setPosition] = useState<number>(-1);
	const currentLine = useRef<null | HTMLDivElement>(null);

	const executeScroll = () => {
		if (currentLine.current)
			currentLine.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
	};

	useEffect(() => {
		const getSongLyrics = async () => {
			axiosClient
				.post(
					`/track/lyrics`,
					{ trackId: props.trackId },
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.then((response) => {
					if (response.status === 200) {
						return setLyrics(response.data.lines);
					}
				})
		};

		setPosition(-1);
		setLyrics(undefined);
		getSongLyrics();
	}, [props.trackName, props.artist]);

	useEffect(() => {
		setPosition(-1);
	}, [props.progressMs]);

	useEffect(() => {
		executeScroll();
	}, [position]);

	const generateLyrics = () => {
		if (lyrics) {
			return lyrics.map((line, index) => {
				if (props.progressMs >= line.startTimeMs && index >= position) {
					if (index > position) setPosition(index);
					return (
						<div key={index}>
							<motion.div
								animate={{ y: [50, 0], opacity: [0.2, 1] }}
								transition={{ duration: 1 }}
								ref={currentLine}
								style={{ backgroundColor: "yellow" }}
							>
								{line.words}
							</motion.div>
							<div style={{ height: "50px" }}></div>
						</div>
					);
				} else if (index <= position)
					return <div key={index}>{line.words}</div>;
				return <div key={index}></div>;
			});
		}
		return <></>;
	};

	return <>{generateLyrics()}</>;
}

export default Lyrics;
