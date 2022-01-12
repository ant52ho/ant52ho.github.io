import { IoClose } from "react-icons/io5";
import { AiFillGithub } from "react-icons/ai";

// project 1 means project template 1
const Project1 = ({ project, onToggle }) => {
    return (
        <div className="project-template-1">
            <div className="project-icons">
                <div className="close-icon">
                    <p>
                        <IoClose
                            size="40px"
                            onClick={() => onToggle(project.id)}
                            style={{ cursor: "pointer" }}
                        />
                    </p>
                </div>
                <div className="project-github">
                    {project.link ? (
                        <a href={project.link}>
                            <p>
                                <AiFillGithub size="50px" />
                            </p>
                        </a>
                    ) : null}
                </div>
            </div>
            <div className="project-contents">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.image ? (
                    <div className="image-contents">
                        <img src={project.image} alt="profile" />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Project1;
