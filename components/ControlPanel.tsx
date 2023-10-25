const FlagCounter = () => {
  return <span>10 💣</span>;
};

const ResetButton = () => {
  return <button className="reset-button">🎃</button>;
};

const Timer = () => {
  return <span>0:00</span>;
};

const ControlPanel = () => {
  return (
    <div className="control-panel">
      <FlagCounter />
      <ResetButton />
      <Timer />
    </div>
  );
};

export default ControlPanel;
