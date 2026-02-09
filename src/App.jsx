import { useCallback, useEffect, useState, useRef } from "react";
import ReturnLogo from "./assets/return.svg";
import "./App.css";

function App() {
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState("password");
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const passwordRef = useRef(null);

    const generatePassword = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numberAllowed, charAllowed, setPassword]);

    const copyPasswordToClipboard = useCallback(() => {
        window.navigator.clipboard.writeText(password);
        passwordRef?.current.select();
        setIsCopied(true);
    }, [password]);

    useEffect(() => {
        generatePassword();
    }, [length, numberAllowed, charAllowed]);

    return (
        <>
            <div className="flex flex-col items-center justify-start gap-10">
                <div className="text-8xl tracking-wide font-heading mt-30">
                    Password Generator
                </div>
                <div className="font-display w-full flex flex-col justify-center">
                    <div className="join mx-auto">
                        <div>
                            <label className="input validator join-item">
                                <svg
                                    className="h-[1em] opacity-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                        <circle
                                            cx="16.5"
                                            cy="7.5"
                                            r=".5"
                                            fill="currentColor"
                                        ></circle>
                                    </g>
                                </svg>
                                <input
                                    type="email"
                                    value={password}
                                    ref={passwordRef}
                                    readOnly
                                />
                            </label>
                        </div>
                        <button
                            className="btn btn-soft btn-primary join-item"
                            onClick={copyPasswordToClipboard}
                        >
                            {isCopied ? "Copied" : "Copy"}
                        </button>
                        <button className="btn btn-dash btn-primary join-item">
                            <img
                                src={ReturnLogo}
                                alt="Return"
                                className="size-5"
                                onClick={generatePassword}
                            />
                        </button>
                    </div>
                </div>
                <div className="my-10 mx-5 flex gap-5">
                    <div>
                        <label className="flex gap-2">
                            <input
                                type="range"
                                min={8}
                                max={100}
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                className="range range-primary"
                            />
                            Length: {length}
                        </label>
                    </div>
                    <div>
                        <label className="flex gap-2">
                            <input
                                type="checkbox"
                                defaultChecked={numberAllowed}
                                onChange={(e) =>
                                    setNumberAllowed((prev) => !prev)
                                }
                                className="checkbox checkbox-lg"
                            />
                            Numbers
                        </label>
                    </div>
                    <div>
                        <label className="flex gap-2">
                            <input
                                type="checkbox"
                                defaultChecked={charAllowed}
                                onChange={(e) =>
                                    setCharAllowed((prev) => !prev)
                                }
                                className="checkbox checkbox-lg"
                            />
                            Special Characters
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
