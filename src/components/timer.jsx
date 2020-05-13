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

  incSec = (x) => {
    this.setState({ expired: false, currentTime: this.state.currentTime + x });
  };

  startClock = () => {
    console.log("starting");
    const intervalId = setInterval(() => this.decSec(1), 1000);
    this.setState({ intervalId });
  };

  stopClock = () => {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });
    const elapsedTime =
      Number(this.props.data[0].mins * 60) +
      Number(this.props.data[0].secs) -
      this.state.currentTime;
    return elapsedTime;
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

  onInc = (x) => {
    if (this.state.intervalId) return;
    this.incSec(x);
  };

  onDec = (x) => {
    if (this.state.intervalId || this.state.currentTime < x) return;
    this.decSec(x);
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
        inc={this.onInc}
        dec={this.onDec}
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

const Clock = ({ inc, dec, clock, toggle, reset, finish, name }) => {
  const { intervalId } = clock;
  return (
    <div style={{ marginBottom: 20 }}>
      <button className="btn btn-sm btn-secondary" onClick={() => dec(15)}>
        -
      </button>
      {timeOutput(clock.currentTime)}
      <button className="btn btn-sm btn-secondary" onClick={() => inc(15)}>
        +
      </button>
      <button
        className={
          intervalId ? "btn btn-sm btn-danger" : "btn btn-sm btn-success"
        }
        onClick={toggle}
      >
        {intervalId ? "Parar" : "Iniciar"}
      </button>
      {intervalId || clock.currentTime > 0 ? (
        <button className="btn btn-sm btn-warning" onClick={reset}>
          Reiniciar
        </button>
      ) : null}
      <button className="btn btn-sm btn-danger" onClick={finish}>
        Finalizar
      </button>
      <div>Tarea en curso: {name}</div>
      {/* <span className={clock.expired ? "end" : "end hidden"}>Finished!</span> */}
    </div>
  );
};

export default ClockContainer;
