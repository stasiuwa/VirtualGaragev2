import './App.css';
import Routing from "./routes/Routing";
import {DataProvider} from "./contexts/DataContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <DataProvider>
                <Routing/>
            </DataProvider>
        </div>
    )
}

export default App;
