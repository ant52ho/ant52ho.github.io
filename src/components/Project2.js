import Project1 from "./Project1";

const Project2 = ({ closeProjectDetails, showProjectDetails, title }) => {
    return (
        <div className="project-template-2">
            <div className="project-summary" onClick={closeProjectDetails}>
                <h2>{title}</h2>
                <p>Summary</p>
                <p>Details</p>
            </div>
            <div
                className={`blocker ${
                    showProjectDetails ? "project-open" : "project-close"
                }`}
                onClick={closeProjectDetails}
            ></div>
            <div className="project-container" onClick={closeProjectDetails}>
                <div
                    className={`project-details ${
                        showProjectDetails ? "project-open" : "project-close"
                    }`}
                >
                    <Project1
                        name={title}
                        description="Project description text text text"
                        closeProjectDetails={closeProjectDetails}
                    />
                </div>
            </div>
        </div>
    );
};

export default Project2;
