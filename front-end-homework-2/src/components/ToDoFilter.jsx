export const ToDoFilter = ({onArr, onChange, onFilter}) => {
    return <>
        <div style={{"margin": "10px 0 10px 0"}}>
            {
                onArr.map(btn => <button key = {btn} onClick={() => onChange(btn)} className={btn == onFilter?"active": ""}>{ btn }</button>)
            }
        </div>
    </>
}