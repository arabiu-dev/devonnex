export default function AuthenticationLayout({ children }) {
  return (
    <section className="section">
      <div className="container">
        <div
          className="jobDescription"
          style={{
            gap: "0rem",
            width: "480px",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
