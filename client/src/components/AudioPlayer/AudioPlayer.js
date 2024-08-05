import "./styles.css";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import "./styles.css"; // Importando o CSS

// const socket = io('http://localhost:3001');

// const AudioPlayer = () => {
// 	const [audios, setAudios] = useState([]);
// 	const [durations, setDurations] = useState({});
// 	const [userList, setUserList] = useState([]);
// 	const [username, setUsername] = useState("");
// 	const [currentAudio, setCurrentAudio] = useState(null);
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const audioRef = useRef(null);

// 	useEffect(() => {
// 		axios
// 			.get("http://localhost:3001/audios")
// 			.then((response) => {
// 				setAudios(response.data);
// 				response.data.forEach((audio) => {
// 					const audioUrl = `http://localhost:3001/audios/${audio}`;
// 					getAudioDuration(audio, audioUrl);
// 				});
// 			})
// 			.catch((error) => {
// 				console.error("Erro ao buscar áudios", error);
// 			});

// 			socket.on("connect", () => {
// 				console.log("Conectado ao servidor com o ID:", socket.id);
// 			});
		
// 		socket.on("play-audio", (data) => {
// 			if (data.filename === currentAudio && audioRef.current) {
// 				audioRef.current.currentTime = data.currentTime;
// 				audioRef.current
// 					.play()
// 					.then(() => {
// 						setIsPlaying(true);
// 					})
// 					.catch((error) => {
// 						console.error("Erro ao tentar reproduzir o áudio", error);
// 					});
// 			}
// 		});

// 		socket.on("pause-audio", () => {
// 			if (audioRef.current) {
// 				audioRef.current.pause();
// 				setIsPlaying(false);
// 			}
// 		});

// 		socket.on("update-user-list", (users) => {
// 			console.log("Lista de usuários atualizada:", users);
// 			setUserList(users);
// 		});

// 		return () => {
// 			socket.off("play-audio");
// 			socket.off("pause-audio");
// 			socket.off("update-user-list");
// 			socket.off("connect");
// 		};
// 	}, [currentAudio]);

// 	useEffect(() => {
// 		if (currentAudio && audioRef.current) {
// 			const playPromise = audioRef.current.play();

// 			if (playPromise !== undefined) {
// 				playPromise
// 					.then(() => {
// 						setIsPlaying(true);
// 						socket.emit("play-audio", {
// 							filename: currentAudio,
// 							currentTime: 0,
// 						});
//             socket.emit("update-audio-status", {
//               username: username,
//               audio: currentAudio
//             });
// 					})
// 					.catch((error) => {
// 						console.error("Erro ao tentar reproduzir o áudio", error);
// 					});
// 			}
// 		}
// 	}, [currentAudio]);

// 	const getAudioDuration = (filename, url) => {
// 		const tempAudio = new Audio(url);
// 		tempAudio.addEventListener("loadedmetadata", () => {
// 			setDurations((prevDurations) => ({
// 				...prevDurations,
// 				[filename]: tempAudio.duration,
// 			}));
// 		});
// 	};

// 	const formatDuration = (duration) => {
// 		const minutes = Math.floor(duration / 60);
// 		const seconds = Math.floor(duration % 60);
// 		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// 	};

// 	const playAudio = (filename) => {
// 		const audioUrl = `http://localhost:3001/audios/${filename}`;
// 		if (audioRef.current) {
// 			audioRef.current.src = audioUrl;
// 			setCurrentAudio(audioUrl);
// 		}
// 	};

// 	const togglePlay = () => {
// 		if (isPlaying) {
// 			if (audioRef.current) {
// 				audioRef.current.pause();
// 				socket.emit("pause-audio");
// 			}
// 		} else {
// 			if (audioRef.current) {
// 				const playPromise = audioRef.current.play();

// 				if (playPromise !== undefined) {
// 					playPromise
// 						.then(() => {
// 							socket.emit("play-audio", {
// 								filename: currentAudio,
// 								currentTime: audioRef.current.currentTime,
// 							});
// 						})
// 						.catch((error) => {
// 							console.error("Erro ao tentar reproduzir o áudio", error);
// 						});
// 				}
// 			}
// 		}
// 		setIsPlaying(!isPlaying);
// 	};

// 	const handleSetUsername = () => {
// 		if (username) {
// 			socket.emit("set-username", username);
// 		}
// 	};

// 	return (
// 		<div className="Container">
// 			<div className="musics">
// 				<h1 className="title">Lista de Áudios</h1>
// 				<ul className="audio-list">
// 					{audios.map((audio, index) => (
// 						<li key={index} className="audio-item">
// 							<button onClick={() => playAudio(audio)} className="audio-button">
// 								{audio.slice(0, -4)}{" "}
// 								{durations[audio] && `(${formatDuration(durations[audio])})`}
// 							</button>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 			<div className="audio-controls">
// 				<h3>{currentAudio ? currentAudio.slice(29, -4) : " "}</h3>
// 				<audio
// 					className="audio-play"
// 					ref={audioRef}
// 					onPlay={() => setIsPlaying(true)}
// 					onPause={() => setIsPlaying(false)}
// 					controls
// 				/>
// 				<button onClick={togglePlay} className="audio-button play">
// 					{isPlaying ? "Pausar" : "Reproduzir"}
// 				</button>
// 			</div>
// 			<div className="user-list">
// 				<h2 className="users-title">Usuários Conectados</h2>
// 				<input
// 					type="text"
// 					value={username}
// 					onChange={(e) => setUsername(e.target.value)}
// 					placeholder="Digite seu nome"
// 				/>
// 				<button onClick={handleSetUsername}>Entrar</button>
// 				<ul>
// 					{userList.map((user, index) => (
// 						<li key={index}>{user.username} {user.currentAudio ? `- ${user.currentAudio.slice(29, -4)}` : ""}</li>
// 					))}
// 				</ul>
// 			</div>
// 		</div>
// 	);
// };

// export default AudioPlayer;
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css';

const socket = io('http://localhost:3001');

const AudioPlayer = () => {
  const [audios, setAudios] = useState([]);
  const [durations, setDurations] = useState({});
  const [userList, setUserList] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const location = useLocation();
  const username = location.state?.username;

  useEffect(() => {
    axios
      .get('http://localhost:3001/audios')
      .then((response) => {
        setAudios(response.data);
        response.data.forEach((audio) => {
          const audioUrl = `http://localhost:3001/audios/${audio}`;
          getAudioDuration(audio, audioUrl);
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar áudios', error);
      });

    socket.on('connect', () => {
      console.log('Conectado ao servidor com o ID:', socket.id);
    });

    socket.on('play-audio', (data) => {
      if (data.filename === currentAudio && audioRef.current) {
        audioRef.current.currentTime = data.currentTime;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Erro ao tentar reproduzir o áudio', error);
          });
      }
    });

    socket.on('pause-audio', () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    });

    socket.on('update-user-list', (users) => {
      console.log('Lista de usuários atualizada:', users);
      setUserList(users);
    });

    return () => {
      socket.off('play-audio');
      socket.off('pause-audio');
      socket.off('update-user-list');
      socket.off('connect');
    };
  }, [currentAudio]);

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            socket.emit('play-audio', {
              filename: currentAudio,
              currentTime: 0,
            });
            socket.emit('update-audio-status', {
              username: username,
              audio: currentAudio,
            });
          })
          .catch((error) => {
            console.error('Erro ao tentar reproduzir o áudio', error);
          });
      }
    }
  }, [currentAudio]);

  const getAudioDuration = (filename, url) => {
    const tempAudio = new Audio(url);
    tempAudio.addEventListener('loadedmetadata', () => {
      setDurations((prevDurations) => ({
        ...prevDurations,
        [filename]: tempAudio.duration,
      }));
    });
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playAudio = (filename) => {
    const audioUrl = `http://localhost:3001/audios/${filename}`;
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      setCurrentAudio(audioUrl);
      socket.emit('update-audio-status', {
        username: username,
        audio: audioUrl,
      });
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        socket.emit('pause-audio');
      }
    } else {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              socket.emit('play-audio', {
                filename: currentAudio,
                currentTime: audioRef.current.currentTime,
              });
            })
            .catch((error) => {
              console.error('Erro ao tentar reproduzir o áudio', error);
            });
        }
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="Container">
      <div className="musics">
        <h1 className="title">Lista de Áudios</h1>
        <ul className="audio-list">
          {audios.map((audio, index) => (
            <li key={index} className="audio-item">
              <button onClick={() => playAudio(audio)} className="audio-button">
                {audio.slice(0, -4)}{' '}
                {durations[audio] && `(${formatDuration(durations[audio])})`}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="audio-controls">
        <h3>{currentAudio ? currentAudio.slice(29, -4) : ' '}</h3>
        <audio
          className="audio-play"
          ref={audioRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
        />
        <button onClick={togglePlay} className="audio-button play">
          {isPlaying ? 'Pausar' : 'Reproduzir'}
        </button>
      </div>
      <div className="user-list">
        <h2 className="users-title">Usuários Conectados</h2>
        <ul>
          {userList.map((user, index) => (
            <li key={index}>
              {user.username}{' '}
              {user.currentAudio ? `- ${user.currentAudio.slice(29, -4)}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AudioPlayer;
