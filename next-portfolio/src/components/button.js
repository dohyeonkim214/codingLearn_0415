export default function Button({children}){
    return(
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none">
            {children}
        </button>
    )
}