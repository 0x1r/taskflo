export default function TaskFloLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="18"
          fill="#2563eb"
        />

        <path
          d="M28 50 L45 67 L72 35"
          stroke="white"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="text-xl font-bold text-white">
        TaskFlo
      </span>
    </div>
  );
}