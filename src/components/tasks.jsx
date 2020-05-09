import React, { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("useEffect has been called!");

    setTasks([
      { name: "Limpiar la casa", tiempo: "1 hora" },
      { name: "Hacer ejercicio", tiempo: "1 hora y media" },
    ]);
  }, []);
  console.log(tasks);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3">
          <ul class="list-group">
            <li class="list-group-item active">Todas las tareas</li>
            <li class="list-group-item">Duración Corta</li>
            <li class="list-group-item">Duración Media</li>
            <li class="list-group-item">Duración Larga</li>
          </ul>
        </div>
        <div className="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
