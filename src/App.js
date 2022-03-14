import './App.scss';
import DragNDrop from './components/DragNDrop';

function App() {

  const defaultData = [
    { title: 'group 1', items: ['1', '2', '3'] },
    { title: 'group 2', items: ['4', '5'] },
    { title: 'group 3', items: ['6', '7', '8'] },
    { title: 'group 4', items: ['9', '10', '11', '12'] },
    { title: 'group 5', items: ['13', '14', '15', '16', '17'] },
    { title: 'group 6', items: ['18', '19', '20'] },
  ]

  return (
    <main className="App">
      <header className="App-header">

        <DragNDrop data={defaultData} />

      </header>

    </main>
  );
}

export default App;
