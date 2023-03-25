import { useRef, useState } from "react";
import { supabase } from "./supabaseClient";
import style from "../styles/CCM.module.css";

export default function Table(props) {
    const location = useRef({});
    const [openChange, setOpenChange] = useState(false);

    const changeLoc = async (e, id) => {
        e.preventDefault();
        console.log(id);

        const { data, error } = await supabase.from('CCM').update({location: location.current[id].value}).eq("id", id);
        console.log(data, error);
    }

    if (props.data.length === 0) {
        return (<></>);
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
                                    <input className={style.search} type="text" ref={(ele) => {location.current[i.id] = ele}} placeholder="Change Location" />
                                    <input className={style.button} type="submit" value="Change" />
                                </form> 
                                 : null
                            }<button className={style.toggle} onClick={() => {setOpenChange(true)}}>+</button></td>
                        </tr>
                    </tbody>
                )
            }) }
        </table>
    );
}