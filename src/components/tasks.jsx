import React, { useState, useEffect } from "react";
import { getRanges } from "../services/fakeRangesService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    console.log("useEffect has been called!");

    setTasks([
      { name: "Limpiar la casa", tiempo: "1 hora" },
      { name: "Hacer ejercicio", tiempo: "1 hora y media" },
    ]);

    setRanges([{ _id: "", name: "Todas" }, ...getRanges()]);
  }, []);
  console.log(ranges);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            {ranges.map((range) => (
              <li className="list-group-item">{range.name}</li>
            ))}
          </ul>
        </div>
        <div className="col">
          <table className="table">
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
