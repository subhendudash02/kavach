export default function PoliceTable(props) {
    <div>
        <table>
            <thead>
                <tr key={100}>
                    <th>CCM</th>
                    <th>Location</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((i, j) => {
                    return (
                        <tr>
                            <td>{i.MAC}</td>
                            <td>{i.locaion}</td>
                            <td>{i.crated_at}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
}