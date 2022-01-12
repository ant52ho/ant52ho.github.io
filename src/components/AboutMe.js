import anthonyskating from "./images/anthonyskating.jpg";

const AboutMe = ({ text }) => {
    return (
        <div className="about-me" id="about-me">
            <div className="heading">About Me</div>
            <div className="about-me-content">
                <div className="about-me-img">
                    <img src={anthonyskating} alt="profile" />
                    <p>outdoor skating is fun</p>
                </div>

                <div className="about-me-text">
                    <p>
                        Hello! I'm Anthony. I'm a 1B CS/BBA student studying at
                        the University of Waterloo, who will (hopefully)
                        graduate in 2026. I am passionate about CS, and I hope
                        to learn more about data science and web development.
                    </p>
                    <p>
                        In my free time, I enjoy reading webcomics, playing
                        video games, practicing badminton, and listening to
                        J-pop (In particular, the rock band Yorushika). I also
                        enjoy direct contact with greenery, as well as hiking
                        and public busses.
                    </p>
                    <p>
                        As a former baseball player, I should further mention
                        I'm a Toronto Blue Jays fan. Go Jays!
                    </p>
                    <p>
                        Feel free to view my resume, check out my projects,
                        provide suggestions for this website, or contact me
                        below.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
