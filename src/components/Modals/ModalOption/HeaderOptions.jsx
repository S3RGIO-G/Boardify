export default function HeaderOptions({ title, onCancel }) {
  return (
    <header className="grid grid-cols-[32px_1fr_32px] items-center h-12 px-2 py-1 font-medium border-b-2">
      <h2 className="col-start-2 w-full text-center">
        {title}
      </h2>
      <button
        onClick={onCancel}
        className="btn-light flex justify-center items-center h-8 w-8 p-1.5 rounded-lg"
      >
        <i className="fa-solid fa-xmark "></i>
      </button>
    </header>
  );
}
