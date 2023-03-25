export default function NestedBandobast(props) {
    return (
        <>
            <thead>
                <tr key={100}>
                    <th>Name</th>
                    <th>Place</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { props.data.map((i, j) => {
                    <tr key={i.id}>
                        <td>{i.MAC}</td>
                    </tr>
                }) }
            </tbody>
        </>
    );
}