export function ErrorAlert({ errorMessage, onClick, className }) {
  return (
    <div className={`flex justify-center mb-2`}>
      <div
        className={`relative cursor-pointer flex gap-2 items-center justify-center bg-red-500 py-2 sm:py-3 px-3 sm:px-5 rounded-xl border-2 border-red-900 ${className}`}
        onClick={onClick}
      >
        <i className="fas fa-exclamation-circle text-white text-3xl"></i>
        <span className="w-full text-sm sm:text-base text-center text-white font-bold">
          {errorMessage}
        </span>
      </div>
    </div>
  );
}
