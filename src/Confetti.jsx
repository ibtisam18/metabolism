function Confetti() {
  const pieces = Array.from({ length: 40 });

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((_, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{
            "--i": index,
            "--delay": `${(index % 10) * 0.08}s`,
            "--x": `${(index * 37) % 100}%`,
            "--rotation": `${(index * 47) % 360}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;