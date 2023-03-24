import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { X, SignIn } from "phosphor-react";
import { useSignIn } from "react-auth-kit";

interface LoginProps {
  setWannaRegister: (value: boolean) => void;
}

const Login = ({ setWannaRegister }: LoginProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const response = await api.post("/api/users/login", {
        email,
        password,
      });

      signIn({
        token: response.data.accessToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email },
      });

      setEmail("");
      setPassword("");

      alert("Inicio de sessão realizado com sucesso!");
    } catch (error) {
      setErrorMessage("Email ou password erradas! Tente de novo...");
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
        <label className="leading-tight hover:cursor-pointer">
          Forgot password?
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <SignIn size={20} />
        Login
      </button>
      <div className="text-center mt-4 flex items-center justify-center">
        <label className="leading-tight inline-block">
          Ainda não tem conta?{" "}
        </label>
        <p
          className="text-blue-300 hover:cursor-pointer inline-block ml-1"
          onClick={() => setWannaRegister(true)}
        >
          Criar Conta
        </p>
      </div>
    </form>
  );
};

export default Login;
