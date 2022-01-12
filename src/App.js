import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Cover from "./components/Cover";
import AboutMe from "./components/AboutMe";
import Project1 from "./components/Project1";
import Project2 from "./components/Project2";
import Socials from "./components/Socials";
import Projects from "./components/Projects";
import blackSquare from "./components/images/black square.jpg";
import profilepic from "./components/images/profilepic.jpg";
import skating from "./components/images/anthonyskating.jpg";

import deflation from "./components/images/deflation.jpg";
import deflationbg from "./components/images/deflation-bg.jpg";
import stereobg from "./components/images/stereo-bg.jpg";
import stereo from "./components/images/stereo imaging desc.png";
import maze from "./components/images/Maze desc.png";
import mazebg from "./components/images/maze-bg.jpg";

var body = document.body;
    body.classList.add("preload");

    setTimeout(function(){
        document.body.className="";
    },600);

function App() {
    const [showMenuBar, setShowMenuBar] = useState(false);
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Balloon Deflation Modelling",
            summary: "A self-developed method to monitor and model a balloon's deflation",
            details: "Coded in: Python",
            showProject: false,
            description: "I determined the changing volume of a balloon's frame-by deflation using image processing, integration, and curve sketching. I used the resulting graph to generalize a balloon's deflation",
            image: deflation,
            bg: deflationbg,
            link: "google.ca",
        },
        {
            id: 2,
            title: "Stereo Vision",
            summary: "Exploration and implementation of multiple stereo vision models and algorithms",
            details: "Coded in: Python",
            showProject: false,
            description: 'Researched and implemented stereo vision models from multiple research papers - notably, the greedy algorithm. Created a resulting "heat map" to determine the distance between a set of cameras and an object.',
            image: stereo,
            bg: stereobg,
        },
        {
            id: 3,
            title: "Maze Input & A* Pathfinding",
            summary: "Scans and solves mazes using the A* algorithm",
            details: "Coded in: Python",
            showProject: false,
            image: maze,
            bg: mazebg,
            description: "Implemented the A* pathfinding algorithm as part of a maze solver. Used Python's PIL imaging library to further detect maze openings and convert maze images to nodes, effectively solving mazes even when in photo format.",
        },
    ]);

    // Showing project details
    const toggleProject = (id) => {
        setProjects(
            projects.map((project) =>
                project.id === id
                    ? { ...project, showProject: !project.showProject }
                    : project
            )
        );
    };

    return (
        <div className="container">
            <Sidebar
                closeMenu={() => setShowMenuBar(!showMenuBar)}
                showMenuBar={showMenuBar}
            />
            <Cover />
            <div className="content">
                <AboutMe />
                <Projects projects={projects} onToggle={toggleProject} />
                <Socials />
            </div>
        </div>
    );
}

export default App;

/*
<Projects projects={projects} onToggle={toggleProject} />
                <p>Click on any for additional details!</p>
                <Project2
                    closeProjectDetails={() =>
                        setShowProjectDetails(!showProjectDetails)
                    }
                    showProjectDetails={showProjectDetails}
                    title="title1"
                />

                <Project2
                    closeProjectDetails={() =>
                        setShowProjectDetails(!showProjectDetails)
                    }
                    showProjectDetails={showProjectDetails}
                    title="title2"
                />
                <Project2
                    closeProjectDetails={() =>
                        setShowProjectDetails(!showProjectDetails)
                    }
                    showProjectDetails={showProjectDetails}
                    title="title3"
                />

                
                <Socials />
*/
