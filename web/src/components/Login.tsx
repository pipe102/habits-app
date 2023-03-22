import React from "react";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
    </form>
  );
};

export default Login;
