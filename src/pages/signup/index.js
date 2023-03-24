import { useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from 'next/navigation';

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
        setChecked(true);
    }

    return (
        <div>
            <form method="POST" onSubmit={handleSignup}>
                <h1>Sign Up</h1>
                <input placeholder="Name" type="text" ref={name} id="name" /><br />
                <input placeholder="Email-ID" type="email" ref={email} id="email" /><br />
                <input placeholder="Enter password" type="password" id="password" ref={password} /><br />
                <input placeholder="Re-enter password" type="password" id="repassword" ref={repassword} /><br />
                <input type="submit" id="submit" /><br />
                <input type="checkbox" id="admin" checked={checked} onChange={handleCheckBox} />
                <label htmlFor="admin">Are you an admin?</label>
            </form>
        </div>
    );
}