import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const AudioPlayer = () => {
  const[audios, setAudios] = useState([]);
  const[currentAudio, setCurrentAudio] = useState(null);
  const[isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() =>{
    axios.get('http://localhost:3001/audios')
    .then(response => {
      setAudios(response.data);
    })
    .catch(error => {
      console.log('Erro ao buscar áudios', error);
    });
  }, []);

  const playAudio = (filename) => {
    setCurrentAudio(`http://localhost:3001/audio/${filename}`);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if(isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return(
    <div>
      <h1>Lista de Áudios</h1>
      <ul>
        {audios.map((audio, index) => {
          <li key={index}>
            <button onClick={() => playAudio(audio)}>
              {audio}
            </button>
          </li>
        })}
      </ul>
      {currentAudio && (
        <div>
          <audio 
          ref={audioRef}
          src={currentAudio}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
          />
          <button onClick={togglePlay}>
            {isPlaying? 'Pausar' : 'Reproduzir'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
