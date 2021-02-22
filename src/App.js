import './App.css';
import {leads} from './API/Data.js'
import {LeadsTable} from "./Components/Table";

function App() {
  return (
    <div className="App">
      <LeadsTable leads={leads} />
    </div>
  );
}

export default App;
