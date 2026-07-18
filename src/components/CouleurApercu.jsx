export default function CouleurApercu({ nom, code }) {
  return (
    <div className="color-preview-row">
      <div
        className="color-preview-box"
        style={{ backgroundColor: code }}
      />
      <span>{nom}</span>
    </div>
  );
}