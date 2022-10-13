import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import MyNavbar from "./components/MyNavbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Cover from "./components/Cover";
import Experiences from "./components/Experiences";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <div className="content">
        <Cover />
        <About />
        <Experiences />
        <Projects />
        <Cover />
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
