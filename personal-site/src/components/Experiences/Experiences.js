import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Experience from "components/Experience/Experience.js";
import "./Experiences.css";

import reactLogo from "logo.svg";
import uwLogo from "images/uwlogo.png";
import huawei from "images/huawei.png";
import sunlife from "images/sunlife.png";
import textnow from "images/textnow.png";

const experience = [
  {
    logo: textnow,
    title: "Backend Software Engineer",
    employer: "TextNow",
    date: "Jan 2025 ~ present",
    technologies: ["Go", "PHP"],
    body: `Preventing fraudulent activity by leveraging Go and PHP for concurrent, high-performance communication with gRPC.
	         Productionized high traffic endpoints (2k/s) using cron jobs and Kubernetes, enabling seamless rollouts with 0 downtime.`,
    link: "/comingsoon",
  },
  {
    logo: uwLogo,
    title: "NDT Research Assistant",
    employer: "University of Waterloo",
    date: "September 2024 ~ present",
    technologies: ["MATLAB"],
    body: `Developing MATLAB code to control a high-power ultrasonic system from Verasonics for nondestructive evaluation of construction materials.`,
    link: "/comingsoon",
  },
  {
    logo: sunlife,
    title: "Data Engineer",
    employer: "Sun Life Financial",
    date: "January 2024 ~ April 2024",
    technologies: ["Python", "PySpark", "SQL", "AWS"],
    body: `Played a key role in migrating the CXO department’s codebase from SAS to a DevOps pipeline built on AWS Glue by processing >50k lines of Python-converted SAS.
           Designed and optimized queries to streamline ETL operations while working on terabytes of user data using AWS-hosted PySpark and SQL in an agile environment.
           Coordinated workloads across teams and collaborated with Sunlife Engineers to develop the frameworkfor Sunlife’s future cloud environment, resulting in a feature within the company newsletter.`,
    link: "/comingsoon",
  },
  {
    logo: huawei,
    title: "Machine Learning Researcher",
    employer: "Huawei Technologies",
    date: "January 2023 ~ December 2023",
    technologies: ["Python", "R"],
    body: `Used machine learning to optimize parameter tuning for the TCP BBR congestion control algorithm, contributing to the team's final solution and paper acceptance into USENIX ATC '24 (< 15% acceptance rate).
           Researched papers and leveraged a variety of ML paradigms such as Causal Forests, HDBScan and XGBoost. 
           Generated and analyzed simulated computer network datasets using paper implementations of causal inference, clustering, and feature selection (SHAP, CovSel, PS matching), resulting in error predictions of RMSE = 4%.`,
    link: "/comingsoon",
  },
  {
    logo: uwLogo,
    title: "Full-stack Software Engineer",
    employer: "University of Waterloo",
    date: "May 2022 ~ December 2022, May 2023 ~ August 2023",
    technologies: [
      "Python",
      "Bash",
      "JavaScript",
      "AWS",
      "Redis",
      "SQLite",
      "React",
    ],
    body: `Developed a IoT sensor network for Canadian Pacific Railway capable of analytics, remote update, in-runtime configuration, and OTA updates using Raspberry Pis, cloud technologies (AWS IoT, EC2), and MQTT protocol.
           Designed system for scaling and rapid installation by using a customized IP assignment (DHCP) protocol to seamlessly integrate new sensor stations.
           Implemented a full-stack dashboard with React & Express for monitoring and data visualization.
           Extended for 8 months.`,
    link: "/comingsoon",
  },
  {
    logo: uwLogo,
    title: "Stereo / Computer Vision Research Assistant",
    employer: "University of Waterloo",
    date: "July 2019 ~ August 2019",
    technologies: ["Python", "OpenCV"],
    body: `Researched, implemented stereo vision models after analyzing multiple research papers using OpenCV, resulting in a passable "ground truth" output.
          Augmented training data using OpenCV and improved the efficacy of a colleague's CNN stereo model.`,
    link: "/comingsoon",
  },
];

const Experiences = () => {
  return (
    <>
      <Container className="py-2 experiences" id="experiences">
        <h1 className="pb-3">Experience</h1>
        {experience.map((e, i) => (
          <Experience
            logo={e.logo}
            title={e.title}
            employer={e.employer}
            date={e.date}
            technologies={e.technologies}
            body={e.body}
            link={e.link}
          />
        ))}
        {/* <Experience className="" logo={uwLogo} /> */}
      </Container>
    </>
  );
};

export default Experiences;
