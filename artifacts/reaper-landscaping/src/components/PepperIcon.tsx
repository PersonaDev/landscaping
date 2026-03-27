export function PepperIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 6C12 4 13.5 2 15.5 2.5C17 3 17 5 15.5 5.5C14.5 5.8 13.5 6 12 6Z" />
      <path d="M9.5 7.5C8.5 9 8 11.5 8.5 14C9 17 10.5 19.5 12 21C13.5 19.5 15 17 15.5 14C16 11.5 15.5 9 14.5 7.5C13.5 6.5 12.8 6 12 6C11.2 6 10.5 6.5 9.5 7.5Z" />
      <path d="M10.5 9.5C10.5 8.5 11 8 11.5 7.5" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}
