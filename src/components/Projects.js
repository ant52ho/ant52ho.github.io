import Project from "./Project";

const Projects = ({ projects, onToggle }) => {
    return (
        <div id="projects">
            <div className="heading">Projects</div>
            {projects.map((project) => (
                <Project
                    key={project.id}
                    project={project}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default Projects;
