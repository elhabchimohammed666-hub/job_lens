import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center py-stack-lg px-margin-desktop w-full max-w-container-max mx-auto border-t border-outline-variant">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-title-md font-title-md font-bold text-on-surface">
            JobLens
          </span>
          <span className="text-label-sm font-label-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} JobLens. All rights reserved.
          </span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            to="#"
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            to="#"
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Terms
          </Link>
          <Link
            to="#"
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
