import Link from "next/link";
import { useRef } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Login() {
    const email = useRef("");
    const password = useRef("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from("police_auth").select().eq("email_id", email.current.value);
        if (!error && data[0].password == password.current.value) {
            console.log("Done");
        }
        else {
            console.log("Error");
        }
    }

    return (
        <div>
            <form action="POST" onSubmit={handleLogin}>
                <h1>Login</h1>
                <input placeholder="Enter your email" type="email" ref={email} id="email" /><br />
                <input placeholder="ENter your password" type="password" id="password" ref={password} /><br />
                <input type="submit" id="submit" /><br />
                <Link href="/signup">No account?</Link>
            </form>
        </div>
    );
}