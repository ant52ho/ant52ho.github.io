import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Cover from "./components/Cover/Cover";
import Experiences from "./components/Experiences/Experiences";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Cover />
        <hr />
        <About />
        <hr />
        <Experiences />
        <hr />
        <Projects />
        <hr />
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
