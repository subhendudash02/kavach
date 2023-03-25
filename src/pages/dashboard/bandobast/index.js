import Navbar from "@/utils/Navbar";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import BandobastTable from "./BandobastTable";
import style from "../../../styles/Bandobast.module.css";

export default function Bandobast() {
    const place = useRef('');
    const [result, getResult] = useState([]);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        const { data, error } = await supabase.from('police_auth').select();
        getResult(data);
    }

    const fetchPlaces = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('police_auth').select().eq("location", place.current.value);
        getResult(data);
    }

    return (
        <div>
            <Navbar />
            <div className={style.main}>
                <h1>Police Bandobast Records</h1>
                <form method="POST" onSubmit={fetchPlaces}>
                    <input className={style.search} type="search" placeholder="Search Places" ref={place} />
                </form>
                <BandobastTable data={result} />
            </div>
        </div>
    );
}