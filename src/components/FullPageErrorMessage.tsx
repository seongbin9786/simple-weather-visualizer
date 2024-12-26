import { FaExclamationCircle } from "react-icons/fa";

interface FullPageErrorMessageProps {
  description?: string;
}

export const FullPageErrorMessage = ({
  description,
}: FullPageErrorMessageProps) => (
  <div className="flex h-screen items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-300 bg-red-50 p-4 text-gray-600">
      <FaExclamationCircle size={32} className="fill-red-600" />
      <span className="whitespace-pre-wrap text-center text-sm">
        {description}
      </span>
    </div>
  </div>
);
