import { FaSpinner } from "react-icons/fa";

interface FullPageSpinnerProps {
  description?: string;
}

export const FullPageSpinner = ({ description }: FullPageSpinnerProps) => (
  <div className="flex h-screen items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="text-sm text-sky-700">{description}</span>
      <FaSpinner size={32} className="animate-spin fill-sky-400" />
    </div>
  </div>
);
