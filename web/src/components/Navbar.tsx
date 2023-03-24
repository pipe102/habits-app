import { useJwt } from "react-jwt";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { SignOut } from "phosphor-react";

interface TokenPayload {
  id: number;
  name: string;
  email: string;
  iat: number;
}

const Navbar = () => {
  const authHeader = useAuthHeader();
  const signOut = useSignOut();

  const [bearer, token] = authHeader().split(" ");

  const { decodedToken } = useJwt<TokenPayload>(token);

  if (!decodedToken) {
    return <p>Loading..</p>;
  }

  return (
    <nav className="bg-transparent border-b border-violet-500 py-3 mb-6">
      <div className="container mx-auto flex justify-between items-center ml-2">
        <div className="text-white font-bold text-xl">
          Welcome {decodedToken.name}
        </div>
        <button
          onClick={() => signOut()}
          className="bg-transparent flex items-center justify-center gap-2 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded mr-2"
        >
          <SignOut size={25} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
