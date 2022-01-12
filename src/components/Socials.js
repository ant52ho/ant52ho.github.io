import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

const Socials = () => {
    return (
        <div className="socials" id="socials">
            <div className="heading">Contact</div>
            <p>Check out any of my socials below:</p>
            <div className="social-icons">
                <a href="mailto:anthony52ho@gmail.com">
                    <AiOutlineMail size="100px" />
                </a>
                <a href="https://github.com/ant52ho">
                    <AiOutlineGithub size="100px" />
                </a>
                <a href="https://www.linkedin.com/in/ant52ho/">
                    <AiOutlineLinkedin size="100px" />
                </a>
                <a href="https://www.instagram.com/anthony.oho/">
                    <AiOutlineInstagram size="100px" />
                </a>
            </div>
        </div>
    );
};

export default Socials;
