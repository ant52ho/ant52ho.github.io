import { FiMenu } from "react-icons/fi";
import resume from "./files/AnthonyHo.pdf";

const Sidebar = ( { closeMenu, showMenuBar } ) => {
    return (
        <div className={`side-menu ${showMenuBar ? 'active-menu' : ''}`} id="side-menu">
            <div className={`sidebar ${showMenuBar ? 'fade-in' : ''}`}>
                <h1>Contents</h1>
                <a href={resume} target='blank'>Resume</a>
                <a href="#about-me">About Me</a>
                <a href="#projects">Projects</a>
                <a href="#socials">Socials</a>
            </div>
            <div className="menu-icon" id="menu-icon">
                <FiMenu 
                size="40px"
                style={{ cursor: 'pointer' }}
                onClick={closeMenu}/>
            </div>
        </div>
    );
};

export default Sidebar;
