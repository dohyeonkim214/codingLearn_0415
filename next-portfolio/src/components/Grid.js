export default function Grid(){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:grid-cols-3 gaps-6 p-6">
            <div className="bg-white p-4 shadow-md rounded-lg">Grid Item 1</div>
            <div className="bg-white p-4 shadow-md rounded-lg">Grid Item 2</div>
            <div className="bg-white p-4 shadow-md rounded-lg">Grid Item 3</div>
            <div className="bg-white p-4 shadow-md rounded-lg">Grid Item 4</div>
            <div className="bg-white p-4 shadow-md rounded-lg">Grid Item 5</div>
            <div className="bg-white p-4 shadow-md rounded-lg">Grid Item 6</div>
        </div>
    )
}