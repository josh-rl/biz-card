import React from "react";

const face = `${process.env.PUBLIC_URL}/assets/face.jpg`;

const Home = () => {
	return (
		<div className="app-container-home">
			<div className="app-bio-card">
				<img src={face} alt="Josh portrait" />
				<h1>Joshua Lawrinenko</h1>
				<p className="lead" id="app-bio-card-info1">Iowa State University</p> 
				<p className="lead" id="app-bio-card-info2">Computer Science - 2023</p>
				<span>
					<a href="mailto:joshualawrinenko@gmail.com" target="_blank" rel="noreferrer"><i className="fas fa-envelope"></i></a>
				</span>
			</div>

			<div className="app-home-contents">
				<h3>Info:</h3>
				<p className="lead">
					Seeking employment! Hit the email envelope to get in contact. 
				</p>
				<h3>Skills: </h3>
				<p className="lead">Languages: C/C++, C#, Python, Java, JavaScript, TypeScript, HTML, CSS.</p>
				<p className="lead">Frontend: React, Tkinter, Swing, Android Studio.</p>
				<p className="lead">Backend: Express, Mongoose, MongoDB, Node, Springboot, appSQL.</p>
				<p className="lead">
					Other: Git, CI/CD, Docker, AWS (hosting/cloud services), JWT, Bootstrap, Selenium/BeautifulSoup, ... and others.
				</p>
				<p className="lead">
					Courses: Algorithm Design/Analysis, Discrete Computer Structures, Database Management, Computer Architecture,
					Principles of AI, Junior/Senior Semester Projects, Operating Systems.
				</p>
			</div>
		</div>
	);
}

export default Home;
