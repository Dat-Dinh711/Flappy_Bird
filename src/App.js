import { Provider } from 'react-redux'

import './App.css';
import Game from './components/Game.js';

function App({store}) {
  return (
    <Provider store={store}>
      <Game/>
    </Provider>
  );
}

export default App;
