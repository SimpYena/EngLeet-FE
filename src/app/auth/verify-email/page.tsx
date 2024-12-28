"use client";

import Image from "next/image";
import image from "@/app/public/images/verifyEmail.png";

export default function VerifyEmail() {
  return (
    <div className="container mt-40 mx-auto p-6 space-y-6 bg-white h-screen">
      <div className="mx-auto space-y-6 p-6">
        <main className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Email has been sent
          </h1>
          <h2 className="text-xl md:text-2xl mb-12">
            Please check your email inbox to verify your email
          </h2>

          <div className="relative w-full max-w-md mx-auto mb-8">
            <Image
              src={image}
              alt="Verify email"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
