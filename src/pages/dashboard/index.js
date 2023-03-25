import Navbar from "@/utils/Navbar";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Table from "@/utils/dispTable";
import style from "../../styles/CCM.module.css";

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
            <div className={style.main}>
                <h1 className={style.heading}>CCM Locations</h1>
                <form method="POST" onSubmit={search}>
                    <input className={style.searchBar} type="search" placeholder="Search Places" ref={place} />
                </form>
                <Table data={result} />
            </div>
        </div>
    );
}