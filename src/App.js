import { DndProvider } from 'react-dnd';
import './App.css';
import './styles/board.css';
import Home from './pages/Home';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navigation from './components/navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Editor from './pages/Editor';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navigation />
        <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/editor' element={<Editor />}></Route>
        </ Routes >
        </DndProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
