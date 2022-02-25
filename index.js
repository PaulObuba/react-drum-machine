const { useEffect, useState } = ("react");

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


const App = () => {
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState('');

  const playReccoding = () => {
      let index = 0;
    let recordArray = recording.split(' ');
    const interval = setInterval(() => {
        const sound = document.getElementById( recordArray[index] );
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play();
        index++
    }, 300);
    setTimeout(() => {
        clearInterval(interval)
    }, 300 * recordArray.length-1)
  }
    return(
        <div className='
            bg-info 
            min-vh-100 
            text-white  
            d-flex justify-content-center '>

         <div className='
             text-center 
             border border-white rounded 
             w-50
             mx-auto
             my-auto
             shadow px-4 pt-4 pb-1 mb-4 bg-dark '>

           <h1>Drum Machine</h1>
            {audioClips.map(clip => <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} />)}   
            <h4>volume</h4>
            <input 
            type='range' 
            step='0.01'
            className="w-50" 
            value={volume} 
            onChange={e => setVolume(e.target.value)}  
            max='1'
            min='0'
            />  
            <h4>{recording}</h4>  
            <>
            <button className='btn btn-success m-1' onClick={playReccoding}>play</button>
            <button className='btn btn-danger m-1' onClick={() => setRecording('')}>clear</button>
            </>
            <p class='text-secondary mb-0 pb-0 mt-4'>by paul</p>    
          </div>
        </div>
    )
}

const Pad = ({clip, volume, setRecording}) => {

    const playSound = () => {
        const sound = document.getElementById(clip.keyTrigger);
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play();
        setRecording(prev => prev + clip.keyTrigger + ' ')
    }

 const handleKeyPress = (event) => {
   if (event.keyCode === clip.keyCode) {
     playSound()
   }
 }

React.useEffect(() => {
    addEventListener('keydown', handleKeyPress);
    return() => (
        removeEventListener('keydown',handleKeyPress)
    )
})

    return (
        <div onClick={playSound} className='btn btn-primary p-3 m-3'>
          <audio src={clip.url} id={clip.keyTrigger} />
          {clip.keyTrigger}
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))