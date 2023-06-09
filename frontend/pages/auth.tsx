import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RegisterUserDTO } from "./../../backend/src/auth/dto/register.dto";
// import { RegisterUserDTO } from "@backend/auth/dto/register.dto";

export default function Auth() {
    const router = useRouter();
    const [isLoginPage, setIsLoginPage] = useState(router.asPath.split("#")[1] === "register" ? false : true);

    const [email] = useState("");
    const [username] = useState("");
    const [password] = useState("");
    const [confirmPassword] = useState("");

    useEffect(() => {
        window.location.href = window.location.href.split("#")[0] + (isLoginPage ? "#login" : "#register");
    }, [isLoginPage]);

    async function register() {
        const payload: InstanceType<typeof RegisterUserDTO> = {
            email,
            username,
            password,
        };

        const res = await (
            await fetch(process.env.BACKEND_ORIGIN + "/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
        ).json();
    }
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-[url(/Waves.png)]">
            <Head>
                <title>Gionify: {isLoginPage ? "Login" : "Register"}</title>
            </Head>

            {/* logo */}
            <div className="rounded-full" style={{ background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)" }}>
                <img className="aspect-square h-20" src="/logo.png" alt="" />
            </div>

            <div className=" font-Circular-Book text-4xl text-white" style={{ textShadow: "0 0 0.5rem black" }}>
                GIONIFY
            </div>

            {/* inputs */}
            {isLoginPage ? (
                <>
                    <input className="rounded-full border-2 border-black px-6 py-1 text-black" type="text" placeholder="email" value={email} />
                    <input className="rounded-full border-2 border-black px-6 py-1 text-black" type="password" placeholder="password" value={password} />
                </>
            ) : (
                <>
                    <input className="rounded-full border-2 border-black px-6 py-1 text-black" placeholder="username" value={username} />
                    <input className="rounded-full border-2 border-black px-6 py-1 text-black" placeholder="email" value={email} />
                    <input className="rounded-full border-2 border-black px-6 py-1 text-black" placeholder="password" value={password} />
                    <input className="rounded-full border-2 border-black px-6 py-1 text-black" placeholder="confirm password" value={confirmPassword} />
                </>
            )}

            {/* submit button */}
            <button className="bg-Verde rounded-full border-2 border-black px-6 py-1 text-2xl text-black shadow-lg">{isLoginPage ? "LOGIN" : "REGISTER"}</button>

            <div className="text-black">
                {isLoginPage ? "Don't you have an account? " : "Already have an account? "}
                <button className=" text-Verde bg-Gray1 rounded-full px-2" onClick={() => setIsLoginPage(!isLoginPage)}>
                    {isLoginPage ? "Register " : "Login "}
                    <i className="bi bi-box-arrow-up-right"></i>
                </button>
            </div>
            {isLoginPage && <div>Forgott Password?</div>}
        </div>
    );
}
