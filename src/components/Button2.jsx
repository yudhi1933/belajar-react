function Button2({name, id, className, hello,color}) {
    let finalColor = ""
    if (color === "red") {
        finalColor = "bg-red-500"
    } else if (color === "green") {
        finalColor = "bg-green-500"
    } else if (color === "blue") {
        finalColor = "bg-blue-500"
    } else {
        finalColor = "bg-gray-500"
    }
    return (
        <div>
            <button type="button" className={finalColor+" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "} id={id} name={name}  >{name} {hello}</button>
        </div>
    );
}

export default Button2