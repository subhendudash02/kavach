import { useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function BandobastTable(props) {
    const [result, getResult] = useState([]);
    const loc = useRef();

    const fetch = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('CCM').select().eq("location", loc.current.value);
        getResult(data);
        console.log(result);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Police ID</th>
                        <th>Police Name</th>
                        <th>Location Assigned</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((i, j) => {
                        return (
                            <tr key={i.emp_id}>
                                <td>{i.emp_id}</td>
                                <td>{i.name}</td>
                                <td>{i.location}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

