import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async function request () {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    })();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Mobile",
      url: "https://github.com/Rocketseat/unform",
      techs: ["TypeScript", "JavaScript", "React"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            <h2>{repo.title}</h2>

            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
