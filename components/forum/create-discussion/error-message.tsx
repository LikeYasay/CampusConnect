interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;
  return (
    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="text-sm font-medium">{error}</p>
    </div>
  );
}