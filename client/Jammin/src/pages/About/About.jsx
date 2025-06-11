const About = () => {
  return (
    <section>
      <div className="container">
        <h1 className="title is-1">About This Project</h1>
        <p className="content mb-5">
          Jammin is a project management tool built with a JAMstack architecture,
          using React, Vite, and Strapi. It allows users to manage projects,
          tasks, and backlogs efficiently.
        </p>
        <div>
          <h2 className="subtitle is-3 has-text-link mb-3">Contact</h2>
          <ul>
            <li>
              <strong>Name:</strong> Cas Verheye
            </li>
            <li>
              <strong>Email:</strong> <a href="mailto:cas.verheye@student.arteveldehs.be">cas.verheye@student.arteveldehs.be</a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/casverheye/"
                target="_blank"
                rel="noopener noreferrer"
              >
                casverheye
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default About