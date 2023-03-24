import Navbar from "@/utils/Navbar";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Table from "@/utils/dispTable";

export default function CCM() {
    const place = useRef();
    const [result, getResult] = useState([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        const { data, error } = await supabase.from("CCM").select();
        getResult(data);
    }

    const search = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('CCM').select().eq("location", place.current.value);
        getResult(data);
    }

    return (
        <div>
            <Navbar />
            <h1>CCM Locations</h1>
            <form method="POST" onSubmit={search}>
                <input type="search" placeholder="Search Places" ref={place} />
            </form>
            <Table data={result} />
        </div>
    );
}