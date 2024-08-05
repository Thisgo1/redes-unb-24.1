// import React, {useState, useEffect, useRef} from 'react';
import './styles.css'
// import io from 'socket.io-client'

// const socket = io('http://localhost:3001')

// const AudioPlayer = () => {
//   const[audios, setAudios] = useState([]);
//   const[currentAudio, setCurrentAudio] = useState('');
//   const[isPlaying, setIsPlaying] = useState(false);
//   const[error, setError] = useState(null);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     fetch('http://localhost:3001/audios')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => setAudios(data))
//     .catch(error => setError(error.message));
  

//     socket.on('play-audio',(data) => {
//       if(data.filename === currentAudio){
//         audioRef.current.currentTime = data.currentTime;
//         audioRef.current.play();
//         setIsPlaying(true);
//       }
//     })
    
//     socket.compress('pause-audio', () => {
//       audioRef.current.pause();
//       setIsPlaying(false)
//     });

//     return () => {
//       socket.off('play-audio');
//       socket.off('pause-audio')
//     };
//   }, [currentAudio]);

//   const playAudio = (filename) => {
//     setCurrentAudio(`http://localhost:3001/audios/${filename}`);
//     audioRef.current.currentTime = 0;
//     socket.emit('play-audio', {filename, currentTime: 0})
//   };

//   const togglePlay = () => {
//     if(isPlaying) {
//       audioRef.current.pause();
//       socket.emit('pause-audio')
//     } else {
//       audioRef.current.play();
//       socket.emit('play-audio', { filename: currentAudio, currentTime: audioRef.current.currentTime 
//       });
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return(
//     <div className='Container'>
//       <h1 className='item'>Lista de Áudios</h1>
//       <ul className='AudioContainer'>
//         {audios.map((audio, index) => (
//           <li onClick={() => playAudio(audio)} key={index}>
//             <p>{audio.slice(0, -4)}</p>
//           </li>
//         )
//       )}
//       </ul>
//       <audio 
//           ref={audioRef}
//           src={currentAudio}
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//           controls
//           />

//       {currentAudio && (
//         <div>
//           <p>{currentAudio.slice(29, -4)}</p>
          
//           <button onClick={togglePlay}>
//             {isPlaying? 'Pausar' : 'Reproduzir'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioPlayer
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');

// const AudioPlayer = () => {
//   const [audios, setAudios] = useState([]);
//   const [currentAudio, setCurrentAudio] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     axios.get('http://localhost:3001/audios')
//       .then(response => {
//         setAudios(response.data);
//       })
//       .catch(error => {
//         console.error('Erro ao buscar áudios', error);
//       });

//     socket.on('play-audio', (data) => {
//       if (data.filename === currentAudio && audioRef.current) {
//         audioRef.current.currentTime = data.currentTime;
//         audioRef.current.play()
//           .then(() => {
//             setIsPlaying(true);
//           })
//           .catch(error => {
//             console.error('Erro ao tentar reproduzir o áudio', error);
//           });
//       }
//     });

//     socket.on('pause-audio', () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       }
//     });

//     return () => {
//       socket.off('play-audio');
//       socket.off('pause-audio');
//     };
//   }, [currentAudio]);

//   const playAudio = (filename) => {
//     setCurrentAudio(filename)
//     const audioUrl = `http://localhost:3001/audios/${filename}`;
//     if (audioRef.current) {
//       // Atualiza a fonte do áudio
//       audioRef.current.src = audioUrl;
//       setCurrentAudio(audioUrl);
//       const playPromise = audioRef.current.play();

//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setIsPlaying(true);
//             socket.emit('play-audio', { filename, currentTime: 0 });
//           })
//           .catch(error => {
//             console.error('Erro ao tentar reproduzir o áudio', error);
//           });
//       }
//     }
//   };

//   const togglePlay = () => {
//     if (isPlaying) {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         socket.emit('pause-audio');
//       }
//     } else {
//       if (audioRef.current) {
//         const playPromise = audioRef.current.play();

//         if (playPromise !== undefined) {
//           playPromise
//             .then(() => {
//               socket.emit('play-audio', { filename: currentAudio, currentTime: audioRef.current.currentTime });
//             })
//             .catch(error => {
//               console.error('Erro ao tentar reproduzir o áudio', error);
//             });
//         }
//       }
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div>
//       <h1>Lista de Áudios</h1>
//       <ul>
//         {audios.map((audio, index) => (
//           <li key={index}>
//             <button onClick={() => playAudio(audio)}>
//               {audio}
//             </button>
//           </li>
//         ))}
//       </ul>
//       {currentAudio && (
//         <div>
//           <audio
//             ref={audioRef}
//             onPlay={() => setIsPlaying(true)}
//             onPause={() => setIsPlaying(false)}
//             controls
//           />
//           <button onClick={togglePlay}>
//             {isPlaying ? 'Pausar' : 'Reproduzir'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioPlayer;
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');

// const AudioPlayer = () => {
//   const [audios, setAudios] = useState([]);
//   const [currentAudio, setCurrentAudio] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     axios.get('http://localhost:3001/audios')
//       .then(response => {
//         setAudios(response.data);
//       })
//       .catch(error => {
//         console.error('Erro ao buscar áudios', error);
//       });

//     socket.on('play-audio', (data) => {
//       if (data.filename === currentAudio && audioRef.current) {
//         audioRef.current.currentTime = data.currentTime;
//         audioRef.current.play()
//           .then(() => {
//             setIsPlaying(true);
//           })
//           .catch(error => {
//             console.error('Erro ao tentar reproduzir o áudio', error);
//           });
//       }
//     });

//     socket.on('pause-audio', () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       }
//     });

//     return () => {
//       socket.off('play-audio');
//       socket.off('pause-audio');
//     };
//   }, [currentAudio]);

//   useEffect(() => {
//     if (currentAudio && audioRef.current) {
//       const playPromise = audioRef.current.play();

//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setIsPlaying(true);
//             socket.emit('play-audio', { filename: currentAudio, currentTime: 0 });
//           })
//           .catch(error => {
//             console.error('Erro ao tentar reproduzir o áudio', error);
//           });
//       }
//     }
//   }, [currentAudio]);

//   const playAudio = (filename) => {
//     const audioUrl = `http://localhost:3001/audios/${filename}`;
//     if (audioRef.current) {
//       // Atualiza a fonte do áudio e o estado currentAudio
//       audioRef.current.src = audioUrl;
//       setCurrentAudio(audioUrl);
//     }
//   };

//   const togglePlay = () => {
//     if (isPlaying) {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         socket.emit('pause-audio');
//       }
//     } else {
//       if (audioRef.current) {
//         const playPromise = audioRef.current.play();

//         if (playPromise !== undefined) {
//           playPromise
//             .then(() => {
//               socket.emit('play-audio', { filename: currentAudio, currentTime: audioRef.current.currentTime });
//             })
//             .catch(error => {
//               console.error('Erro ao tentar reproduzir o áudio', error);
//             });
//         }
//       }
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className='Container'>
//       <h1>Lista de Áudios</h1>
//       <ul className='AudioContainer'>
//         {audios.map((audio, index) => (
//           <li key={index} className='item'>
//             <button onClick={() => playAudio(audio)}>
//               {audio}
//             </button>
//           </li>
//         ))}
//       </ul>
//       <audio ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} controls />
//       <button onClick={togglePlay}>
//         {isPlaying ? 'Pausar' : 'Reproduzir'}
//       </button>
//     </div>
//   );
// };

// export default AudioPlayer;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css'; // Importando o CSS

const socket = io('http://localhost:3001');

const AudioPlayer = () => {
  const [audios, setAudios] = useState([]);
  const [durations, setDurations] = useState({});
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3001/audios')
      .then(response => {
        setAudios(response.data);
        response.data.forEach(audio => {
          const audioUrl = `http://localhost:3001/audios/${audio}`;
          getAudioDuration(audio, audioUrl);
        });
        
      })
      .catch(error => {
        console.error('Erro ao buscar áudios', error);
      });

    socket.on('play-audio', (data) => {
      if (data.filename === currentAudio && audioRef.current) {
        audioRef.current.currentTime = data.currentTime;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
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

    return () => {
      socket.off('play-audio');
      socket.off('pause-audio');
    };
  }, [currentAudio]);

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            socket.emit('play-audio', { filename: currentAudio, currentTime: 0 });
          })
          .catch(error => {
            console.error('Erro ao tentar reproduzir o áudio', error);
          });
      }
    }
  }, [currentAudio]);

  const getAudioDuration = (filename, url) => {
    const tempAudio = new Audio(url);
    tempAudio.addEventListener('loadedmetadata', () => {
      setDurations(prevDurations => ({
        ...prevDurations,
        [filename]: tempAudio.duration
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
              socket.emit('play-audio', { filename: currentAudio, currentTime: audioRef.current.currentTime });
            })
            .catch(error => {
              console.error('Erro ao tentar reproduzir o áudio', error);
            });
        }
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='Container'>
      <h1>Lista de Áudios</h1>
      <ul className="audio-list">
        {audios.map((audio, index) => (
          <li key={index} className="audio-item">
            <button onClick={() => playAudio(audio)} className="audio-button">
              {audio.slice(0, -4)} {durations[audio] && `(${formatDuration(durations[audio])})`}
            </button>
          </li>
        ))}
      </ul>
      <div className="audio-controls">
        <audio className='audio-play' ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} controls />
        <button onClick={togglePlay} className="audio-button">
          {isPlaying ? 'Pausar' : 'Reproduzir'}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
