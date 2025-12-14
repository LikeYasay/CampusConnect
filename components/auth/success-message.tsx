interface SuccessMessageProps {
  message: string
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  if (!message) return null
  return <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">{message}</div>
}
