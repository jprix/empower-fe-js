import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/verification");
  };

  return (
    <div>
      <Head>
        <title>Empower Financial Network</title>
      </Head>
      <main className="bg-blue-50">
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold ">Empower Financial Network</h1>
            <p className="text-lg mt-4">
              Get your verified Proof of Funds in minutes. No more screenshots
              or waiting on your bank—instant, secure, and ready when you need
              it.{" "}
            </p>
            <button
              className="mt-6 px-8 py-4 bg-text text-white rounded-md font-bold text-lg"
              onClick={handleButtonClick}
              type="button"
            >
              Check my rate
            </button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 text-center ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary">
                Knowledgeable Experts
              </h3>
              <p className="mt-4 text-gray-600">
                Our team of financial experts is here to guide you every step of
                the way, ensuring you make informed decisions about your
                financial future.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">
                Rapid Response
              </h3>
              <p className="mt-4 text-gray-600">
                We understand that time is of the essence. That's why we
                prioritize quick and efficient responses to all your inquiries.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">
                No Cost to You
              </h3>
              <p className="mt-4 text-gray-600">
                There is no cost to speak with an expert and understand what
                your opportunities are. We are committed to helping you achieve
                financial freedom.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary">
              Why Choose Us Empire Financial Network?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary">
                  Personal Loans
                </h3>
                <p className="mt-4">
                  Apply online, get instant offers, and receive your funds.
                  Simple!
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary">
                  Loan Consolidation
                </h3>
                <p className="mt-4">
                  Consolidate what you owe, then make one monthly payment. It's
                  that easy!
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary">HELOC</h3>
                <p className="mt-4">
                  Our reports are trusted by top lenders and real estate
                  agencies across the country.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
