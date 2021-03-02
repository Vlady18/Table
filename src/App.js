import {leads} from './API/Data.js'
import {LeadsTable} from "./Components/Table";

function App() {
  return (
    <div className="App">
      <LeadsTable
          leads={leads}
          visibleCol={["number", "country"]}
      />
    </div>
  );
}

export default App;
