import { useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from 'next/navigation';
import Navbar from "@/utils/Navbar";
import style from "../../../styles/Signup.module.css";

export default function Signup() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const repassword = useRef();
    const [checked, setChecked] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password.current.value == repassword.current.value) {
            const { data, error } = await supabase.from("police_auth").insert({
                name: name.current.value,
                password: password.current.value, 
                email_id: email.current.value,
                admin: checked
            })
            router.push("/login");
        }
    }

    const handleCheckBox = () => {
        if (!checked) {
            setChecked(true);
        }
        else {
            setChecked(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className={style.main}>
                <form method="POST" onSubmit={handleSignup}>
                    <h1>Add a police</h1>
                    <input className={style.searchBar} placeholder="Name" type="text" ref={name} id="name" /><br />
                    <input className={style.searchBar} placeholder="Email-ID" type="email" ref={email} id="email" /><br />
                    <input className={style.searchBar} placeholder="Enter password" type="password" id="password" ref={password} /><br />
                    <input className={style.searchBar} placeholder="Re-enter password" type="password" id="repassword" ref={repassword} /><br />
                    <input className={style.button} type="submit" id="submit" /><br />
                    <input type="checkbox" id="admin" checked={checked} onChange={handleCheckBox} />
                    <label htmlFor="admin">Admin?</label>
                </form>
            </div>
        </div>
    );
}