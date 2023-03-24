import Table from "@/utils/dispTable";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function BandobastTable(props) {
    const [dispLocTable, setLocTable] = useState(false);
    const [showDropDown, setDropDown] = useState([]);

    const dropDown = async (place) => {
        if (dispLocTable) {
            setLocTable(false);
            return;
        }
        console.log(dispLocTable, place);
        setLocTable(true);
        const { data, error } = await supabase.from('CCM').select().eq("location", place);
        setDropDown(data);
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
                            <>
                            <tr key={i.emp_id}>
                                <td>{i.emp_id}</td>
                                <td>{i.name}</td>
                                <td>{i.location}</td>
                                <td><button key={i.emp_id} onClick={() => {dropDown(i.location)}}>Fetch</button></td>
                            </tr>
                                {
                                    dispLocTable ? <Table data={showDropDown} /> : null
                                }
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}