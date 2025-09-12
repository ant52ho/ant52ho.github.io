import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Experience from "components/Experience/Experience.js";
import "./Experiences.css";

import reactLogo from "logo.svg";
import uwLogo from "images/uwlogo.png";
import huawei from "images/huawei.png";
import sunlife from "images/sunlife.png";
import textnow from "images/textnow.png";
import bree from "images/bree.jpeg";

const experience = [
  {
    logo: bree,
    title: "Machine Learning Engineer",
    employer: "Bree Technologies (YC S21)",
    date: "May 2025 ~ Aug 2025",
    technologies: ["Python", "TypeScript", "React", "SQL", "AWS", "WandB"],
    body: `Upgraded the core ML pipeline using large-scale data processing optimizations, achieving >20x in speed improvements. 
           Boosted OCR results accuracy by >2x using careful experimentation, prompt engineering, and iteration. 
           Re-architected the previous ML model using a stacked ensemble, raising AUC to 0.94 and forecasted income by 5M+ / year.
           Migrated and deployed the new ML infrastructure using FastAPI and Modal, reducing cloud compute costs by ~100x.
           `,
    link: "/comingsoon",
  },
  {
    logo: textnow,
    title: "Software Engineer – Backend",
    employer: "TextNow",
    date: "Jan 2025 ~ Apr 2025",
    technologies: ["Go", "Kubernetes", "SQL", "AWS", "gRPC"],
    body: `Deployed features with no downtime on high-stake, high-traffic endpoints (5k/s) using 100% coverage tests and monitoring.
          Resolved a P0 incident by debugging improper references after working hours, unblocking teams for the next-business day.
          Jointly architected and rolled out microservices designed for scale and reuse, including a GeoIP service and a bulk disabler.
          Won the TextNow company hackathon by designing a RAG-based chatbot in Slack, resulting in a $300 company award.
          `,
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
    title: "Software Engineer – Data Engineering",
    employer: "Sun Life Financial",
    date: "January 2024 ~ April 2024",
    technologies: ["Python", "PySpark", "SQL", "AWS"],
    body: `
          Finalized a SAS-to-Python compiler using AST traversal, automating code migration and saving 200+ engineering hours. 
          Used SQL, PySpark, and query optimization to build efficient data pipelines supporting production-scale big data (TBs). 
          Migrated critical authentication services to AWS using Boto3-based automation, resulting in a company feature.
           `,
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
    title: "Software Engineer – Full-stack",
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
           Implemented a full-stack dashboard with React & Express for monitoring and data visualization.`,
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
            body={e.body.trim()}
            link={e.link}
          />
        ))}
        {/* <Experience className="" logo={uwLogo} /> */}
      </Container>
    </>
  );
};

export default Experiences;
