import Project1 from "./Project1";

const Project = ({ project, onToggle }) => {
    return (
        <div className="project-template-2">
            <div
                className="project-summary"
                style={{ backgroundImage: `url(${project.bg})` }}
                onClick={() => onToggle(project.id)}
            >
                <div className="tint">
                    <h2>{project.title}</h2>
                    <p>{project.summary}</p>
                    <p>{project.details}</p>
                </div>
            </div>

            <div
                className={`popup ${
                    project.showProject ? "project-open" : "project-close"
                }`}
                onClick={() => onToggle(project.id)}
            >
                <div className="project-container">
                    <Project1 project={project} onToggle={onToggle} />
                </div>
            </div>
        </div>
    );
};

export default Project;

/*
<Project1 project={project} onToggle={onToggle} />
<div
                className={`project-container ${
                    project.showProject ? "elevate" : ""
                }`}
            >
                <div
                    className={`project-details ${
                        project.showProject ? "project-open" : "project-close"
                    }`}
                >
                    <Project1 project={project} onToggle={onToggle} />
                </div>
            </div>

<div
                className={`blocker ${
                    project.showProject ? "project-open" : "project-close"
                }`}
                onClick={() => onToggle(project.id)}
            ></div>
            <div className="project-container">
                <div
                    className={`project-details ${
                        project.showProject ? "project-open" : "project-close"
                    }`}
                >
                    <Project1 project={project} onToggle={onToggle} />
                </div>
            </div>
            */
