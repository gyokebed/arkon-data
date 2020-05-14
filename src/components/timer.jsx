import React from "react";
import { finishTask } from "../services/fakeTasksService";

class ClockContainer extends React.Component {
  state = {
    currentTime: 0,
    intervalId: null,
    expired: false,
  };

  componentDidMount() {
    const mins = this.props.data[0].mins;
    const secs = this.props.data[0].secs;

    this.setState({ currentTime: Number(mins * 60) + Number(secs) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      // this.stopClock();
      // Checks if array has task elements and sets the time
      let mins;
      let secs;
      if (this.props.data.length >= 1) {
        mins = this.props.data[0].mins;
        secs = this.props.data[0].secs;
      } else {
        mins = 0;
        secs = 0;
      }

      this.setState({ currentTime: Number(mins * 60) + Number(secs) });
    }
  }

  triggerExpired = () => {
    this.resetClockTime();
    this.setState({ expired: true });
    setTimeout(() => {
      this.setState({ expired: false });
    }, 8000);
  };

  decSec = (x) => {
    if (this.state.currentTime < 1) return;
    if (this.state.currentTime === 1 && this.state.intervalId) {
      return this.triggerExpired();
    }
    this.setState({ currentTime: this.state.currentTime - x });
  };

  startClock = () => {
    console.log("starting");
    const intervalId = setInterval(() => this.decSec(1), 1000);
    this.setState({ intervalId });
  };

  stopClock = () => {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });
    const timeElapsed =
      Number(this.props.data[0].mins * 60) +
      Number(this.props.data[0].secs) -
      this.state.currentTime;
    return timeElapsed;
  };

  resetClockTime = () => {
    this.stopClock();
    this.setState({ currentTime: 0 });
  };

  onToggle = () => {
    if (this.state.currentTime < 1) return;
    this.state.intervalId ? this.stopClock() : this.startClock();
  };

  onReset = () => {
    this.stopClock();
    this.resetClockTime();
    const mins = this.props.data[0].mins;
    const secs = this.props.data[0].secs;

    this.setState({ currentTime: Number(mins * 60) + Number(secs) });
  };

  onFinish = () => {
    this.props.setOnFinish([
      ...finishTask(this.props.data[0], this.stopClock()),
    ]);
  };

  render() {
    const taskName =
      this.props.data.length !== 0 ? this.props.data[0].title : "";
    return (
      <Clock
        name={taskName}
        toggle={this.onToggle}
        reset={this.onReset}
        finish={this.onFinish}
        clock={this.state}
      />
    );
  }
}

const timeOutput = (num) => {
  const twoNum = (n) => (n < 10 ? "0" + n : n);
  const hrs = twoNum(Math.floor(num / 60));
  const mins = twoNum(num % 60);
  return `${hrs}:${mins}`;
};

const Clock = ({ clock, toggle, reset, finish, name }) => {
  const { intervalId } = clock;
  return (
    <div className="container" style={{ marginBottom: 20 }}>
      <div class="row justify-content-sm-center">
        <h2>
          Tarea en curso: <em>{name}</em>
        </h2>
      </div>
      <div class="row justify-content-sm-center">
        <div class="col col-md-auto">
          <h1>{timeOutput(clock.currentTime)}</h1>
        </div>

        <div class="col col-md-auto">
          <button
            className={
              intervalId
                ? "btn btn-sm btn-danger mr-2 mt-2"
                : "btn btn-sm btn-success mr-2 mt-2"
            }
            onClick={toggle}
          >
            {intervalId ? "Detener" : "Iniciar"}
          </button>
          {intervalId || clock.currentTime > 0 ? (
            <button
              className="btn btn-sm btn-warning mr-2 mt-2"
              onClick={reset}
            >
              Reiniciar
            </button>
          ) : null}
          <button className="btn btn-sm btn-danger mt-2" onClick={finish}>
            Finalizar tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClockContainer;
