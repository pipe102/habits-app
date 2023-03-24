import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { Lock, X } from "phosphor-react";

interface RegisterProps {
  setWannaRegister: (value: boolean) => void;
}

const Register = ({ setWannaRegister }: RegisterProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !name || !password) {
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As passwords não são iguais!");
      return;
    }

    await api.post("/api/users", {
      email,
      name,
      password,
    });

    setEmail("");
    setName("");
    setPassword("");

    setWannaRegister(false);

    alert("Utilizador registado com sucesso!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/5 flex flex-col mt-6 bg-zinc-900 p-5 rounded-lg"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-10">Registar</h1>
      </div>
      {errorMessage && (
        <div
          className="bg-red-800 text-white px-4 py-3 rounded relative mt-4 mb-3 flex items-center"
          role="alert"
        >
          <span className="block sm:inline mr-10">{errorMessage}</span>
          <button
            onClick={() => setErrorMessage("")}
            className="absolute top-1/2 transform -translate-y-1/2 right-0 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 rounded-md text-white font-bold"
          >
            <X />
          </button>
        </div>
      )}
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
      <label htmlFor="email" className="font-semibold leading-tight">
        Name
      </label>
      <input
        type="text"
        id="name"
        placeholder="Jonh Doe"
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="password" className="font-semibold leading-tight">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="*********"
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <label htmlFor="password" className="font-semibold leading-tight">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="*********"
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Lock />
        Registar
      </button>
      <div className="text-center mt-4 flex items-center justify-center">
        <label className="leading-tight inline-block">Já tem conta? </label>
        <p
          className="text-blue-300 hover:cursor-pointer inline-block ml-1"
          onClick={() => setWannaRegister(false)}
        >
          Login
        </p>
      </div>
    </form>
  );
};

export default Register;
