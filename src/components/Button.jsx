// Button.jsx
export function Button({ title, color,onClick }) {
    return (
        <button onClick={onClick} className={`w-48 px-8 py-3 text-lg font-bold text-white uppercase transition-all duration-300 ease-in-out transform ${color} rounded-lg shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0.5 active:shadow-md`}>
            {title}
        </button>
    );
}