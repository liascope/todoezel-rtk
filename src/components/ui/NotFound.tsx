import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start text-amber-50">
      <h1 className="text-4xl">404</h1>
      <p className="text-lg">Page not found</p>
      <Link to="/" className="mt-4 text-sky-400 underline">Go back</Link>
    </div>
  );
}
