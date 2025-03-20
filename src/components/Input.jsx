// const InputText = ({name}) => {
//     return (
//         <div className="flex flex-col p-2 border">
//             <label htmlFor="name">{name}:</label>
//             <input className="border border-gray-300" type="text" id={name} name={name} />
//         </div>
//     );
// }
function InputText({name, onChange}) {
    return (
        <div className="flex flex-col p-2 border">
            <label htmlFor="name">{name}:</label>
            <input onChange={onChange} className="border border-gray-300" type="text" id={name} name={name} />
        </div>
    )
}

export default InputText