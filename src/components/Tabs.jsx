export default function Tabs({ pageActive, setPageActive }) {
  return (
    <nav className="tabs">
      <button
        onClick={() => setPageActive("match")}
        className={pageActive === "match" ? "active" : ""}
      >
        Match
      </button>

      <button
        onClick={() => setPageActive("alignements")}
        className={pageActive === "alignements" ? "active" : ""}
      >
        Alignements
      </button>
    </nav>
  );
}