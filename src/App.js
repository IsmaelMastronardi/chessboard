import { DndProvider } from 'react-dnd';
import './App.css';
import Home from './pages/Home';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navigation from './components/navigation';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        <Navigation />
        <Home />
      </main>
    </DndProvider>
  );
}

export default App;
