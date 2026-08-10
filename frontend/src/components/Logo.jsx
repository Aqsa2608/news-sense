function Logo({ large = false }) {
  return (
    <div className={`logo-container ${large ? "large-logo" : ""}`}>
      <div className="logo-icon">
        <svg
          width={large ? "58" : "34"}
          height={large ? "58" : "34"}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="13"
            width="43"
            height="38"
            rx="5"
            fill="#0DB9F2"
          />

          <rect
            x="13"
            y="18"
            width="33"
            height="28"
            rx="3"
            fill="#1688E8"
          />

          <rect
            x="18"
            y="23"
            width="13"
            height="10"
            rx="1"
            fill="white"
          />

          <path
            d="M18 39L24 34L29 38L34 34L42 40"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M36 9H42"
            stroke="#0DB9F2"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M44 5H48"
            stroke="#0DB9F2"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M51 12H54"
            stroke="#0DB9F2"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M4 20V43"
            stroke="#0DB9F2"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="logo-text">
        <h2>News-Sense</h2>

        {large && (
          <p>Classify. Discover. Understand.</p>
        )}
      </div>
    </div>
  );
}

export default Logo;