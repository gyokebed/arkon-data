import React from "react";

class ClockContainer extends React.Component {
  state = {
    currentTime: this.props.data[0].mins,
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
      const mins = this.props.data[0].mins;
      const secs = this.props.data[0].secs;

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

  onInc = (x) => {
    if (this.state.intervalId) return;
    this.incSec(x);
  };

  onDec = (x) => {
    if (this.state.intervalId || this.state.currentTime < x) return;
    this.decSec(x);
  };

  render() {
    return (
      <Clock
        toggle={this.onToggle}
        reset={this.onReset}
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

const Clock = ({ inc, dec, clock, toggle, reset }) => (
  <div style={{ marginBottom: 20 }}>
    <button className="btn btn-sm btn-secondary" onClick={() => dec(15)}>
      -
    </button>
    {timeOutput(clock.currentTime)}
    <button className="btn btn-sm btn-secondary" onClick={() => inc(15)}>
      +
    </button>
    <button className="btn btn-sm btn-primary" onClick={toggle}>
      {clock.intervalId ? "Stop" : "Start"}
    </button>
    {clock.intervalId || clock.currentTime > 0 ? (
      <button className="btn btn-sm btn-primary" onClick={reset}>
        Reset
      </button>
    ) : null}
    {/* <span className={clock.expired ? "end" : "end hidden"}>Finished!</span> */}
  </div>
);

export default ClockContainer;
