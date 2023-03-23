import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

interface LoginProps {
  setWannaRegister: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
}

const Login = ({ setWannaRegister, setIsLoggedIn }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    const response = await api.post("/api/users/login", {
      email,
      password,
    });

    const { accessToken } = response.data;

    if (accessToken) {
      setEmail("");
      setPassword("");

      setIsLoggedIn(true);

      alert("Inicio de sessão realizado com sucesso!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/5 flex flex-col mt-6 bg-zinc-900 p-5 rounded-lg"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-10">Login</h1>
      </div>
      <label htmlFor="email" className="font-semibold leading-tight">
        Email
      </label>
      <input
        type="text"
        id="email"
        placeholder="something@gmail.com"
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <label htmlFor="password" className="font-semibold leading-tight">
        Password
      </label>
      <input
        type="text"
        id="password"
        placeholder="*********"
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className="text-right mt-2">
        <label className="leading-tight">Forgot password?</label>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        Login
      </button>
      <button
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-violet-600 hover:bg-violet-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        onClick={() => setWannaRegister(true)}
      >
        Register
      </button>
    </form>
  );
};

export default Login;
