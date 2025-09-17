import Link from "next/link";
import { GiStopSign } from "react-icons/gi";

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-700 p-6">
      <div className="max-w-md w-full text-center">
        <GiStopSign className="text-9xl text-white mx-auto mb-6" />

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Access Denied!
        </h1>

        <div className="bg-black/50 p-6 rounded-lg">
          <p className="text-lg text-white mb-3">
            You lacked authorization to access the requested resource.
          </p>
          <Link
            href="/home"
            className="inline-block text-sm font-medium text-white underline hover:text-gray-300 transition"
          >
            Sorry, take me home.
          </Link>
        </div>
      </div>
    </div>
  );
}
