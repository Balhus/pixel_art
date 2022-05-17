import './styles.css'

export default function Square({ size, color, onClick, position }) {
    return (
        <>
            <div className={`Square-${size}`} style={{ backgroundColor: color}} onClick={() => onClick(color, position)}>

            </div>
        </>
    )
}