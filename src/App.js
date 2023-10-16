import './App.css';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';


function App() {
  return(
    <>
      <Navbar title = "WC"/>
      <div className="container my-4">
        <TextForm heading = "Enter Text to Analyze"/>
      </div>
    </>
  )
}
export default App;
