import './App.css';

import {
  Knob,
  Keyboard,
} from './stories';

function App() {
  return (
    <div className='synth'>
      <div className='synth__controls'>
        <div className='section'>
          <span className='section__label'>Master</span>
          <Knob
            label='Level'
            precision={2}
            initialValue={1}
            minValue={0}
            maxValue={1}
          ></Knob>
          <Knob
            label='Reverb'
            precision={2}
            initialValue={0.1}
            minValue={0}
            maxValue={1}
          ></Knob>
        </div>
        <div className='section'>
          <span className='section__label'>Amp Envelope</span>
          <Knob
            label='Attack'
            units='s'
            precision={2}
            initialValue={0}
            minValue={0}
            maxValue={10}
          ></Knob>
          <Knob
            label='Release'
            units='s'
            precision={2}
            initialValue={1.5}
            minValue={0}
            maxValue={10}
          ></Knob>
        </div>
        <div className='section'>
          <span className='section__label'>Filter Envelope</span>
          <Knob
            label='Attack'
            units='s'
            precision={2}
            initialValue={0}
            minValue={0}
            maxValue={10}
          ></Knob>
          <Knob
            label='Release'
            units='s'
            precision={2}
            initialValue={1.5}
            minValue={0}
            maxValue={10}
          ></Knob>
        </div>
        <div className='section'>
          <span className='section__label'>Filter</span>
          <Knob
            label='Gain'
            units='dB'
            precision={1}
            initialValue={0}
            minValue={-40}
            maxValue={40}
          ></Knob>
          <Knob
            label='Cutoff'
            units='Hz'
            precision={0}
            initialValue={350}
            minValue={10}
            maxValue={5000}
          ></Knob>
          <Knob
            label='Resonance'
            precision={3}
            initialValue={1}
            minValue={.001}
            maxValue={100}
          ></Knob>
        </div>
      </div>
      <Keyboard numOctaves={2}></Keyboard>
    </div>
  );
}

export default App;
