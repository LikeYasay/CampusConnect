interface SuccessPopupProps {
  show: boolean;
}

export function SuccessPopup({ show }: SuccessPopupProps) {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm transition-opacity">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center w-[300px] animate-popup border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#16A34A" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xl font-bold text-gray-900">Success!</p>
          <p className="text-gray-500 mt-2">Your discussion has been posted.</p>
        </div>
      </div>
      <style jsx>{`
        .animate-popup { animation: popupAnim 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes popupAnim { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </>
  );
}