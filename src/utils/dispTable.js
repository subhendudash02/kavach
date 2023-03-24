import { useRef, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Table(props) {
    const location = useRef({});
    const [openChange, setOpenChange] = useState(false);

    const changeLoc = async (e, id) => {
        e.preventDefault();
        const { data, error } = await supabase.from('CCM').update({location: location.current[id].value}).eq('id', id);
        console.log(data, error);
    }
    
    return (
        <table>
            <thead>
                <tr key={100}>
                    <th>Name</th>
                    <th>Place</th>
                    <th></th>
                </tr>
            </thead>
            { props.data.map((i, j) => {
                return (
                    <tbody>
                        <tr key={i.id}>
                            <td>{i.MAC}</td>
                            <td>{i.location}</td>
                            <td>{
                                openChange ?
                                <form key={i.id} method="POST" onSubmit={e => changeLoc(e, i.id)}>   
                                    <input type="text" ref={(ele) => {location.current[i.id] = ele}} placeholder="Change Location" />
                                    <button type="submit">Change</button>
                                </form> 
                                 : null
                            }<button onClick={() => {setOpenChange(true)}}>Toggle</button></td>
                        </tr>
                    </tbody>
                )
            }) }
        </table>
    );
}