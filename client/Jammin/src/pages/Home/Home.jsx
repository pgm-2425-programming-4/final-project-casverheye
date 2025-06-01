import { useState } from "react";
import ProjectSideNav from "../../components/Elements/ProjectSideNav/ProjectSideNav";
import TaskList from "../../components/Elements/TaskList";
import styles from './Home.module.css'

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className={styles.flex}>
      <aside className={styles.aside}>
        <ProjectSideNav selectedProjectId={selectedProject?.documentId} onSelect={setSelectedProject}/>
      </aside>
      <TaskList projectId={selectedProject?.documentId} projectName={selectedProject?.name}/>
    </section>
  );
};

export default Home;