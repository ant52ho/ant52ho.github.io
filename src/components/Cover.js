import profilepic from "./images/profilepic.jpg";
import resume from "./files/AnthonyHo.pdf";
import { IoIosArrowDown } from "react-icons/io";

const Cover = () => {
    return (
        <div className="cover-container">
            <div className="resume">
                <h3>Anthony Ho</h3>
                <a href={resume} target='blank'><h3>Resume</h3></a>
            </div>
            <div className="cover">
                <h1>Hello joules! I'm Anthony.</h1>
                <img src={profilepic} alt="profile" />
                <h2></h2>
                <h1>Scroll down to learn more about me.</h1>
                <div className="animated">
                    <IoIosArrowDown size="5%" />
                </div>
            </div>
        </div>
    );
};

export default Cover;
