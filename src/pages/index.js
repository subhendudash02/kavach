import Head from 'next/head';
import Link from 'next/link';
import { useRef } from "react";
import { supabase } from "@/utils/supabaseClient";
import homeStyle from "../styles/Home.module.css";
import bg from "../assets/homebg.png";
import { useRouter } from 'next/navigation';

export default function Home() {
    const email = useRef("");
    const password = useRef("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from("police_auth").select().eq("email_id", email.current.value);
        if (!error && data[0].password == password.current.value) {
            if (data[0].admin === true) {
                router.push("/dashboard");
            }
            else {
                router.push(`/dashboard/police?name=${data[0].name}`);
            }
        }
        else {
            alert("Wrong Credentials! Try again");
        }
    }
    return (
        <div style={{
            backgroundImage: `url(${bg.src})`,
            height: "515px",
            color: "white",
            padding: "4%",
            backgroundRepeat: "no-repeat"}}>
            <Head>
                <title>Bandobast</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <form action="POST" onSubmit={handleLogin} className={homeStyle.Form}>
                    <input className={homeStyle.inputBox} placeholder="Enter your email" type="email" ref={email} id="email" /><br />
                    <input className={homeStyle.inputBox} placeholder="Enter your password" type="password" id="password" ref={password} /><br />
                    <input className={homeStyle.submit} type="submit" id="submit" /><br />
                </form>
            </main>
        </div>
    )
}
