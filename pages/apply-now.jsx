import React from "react";
import Head from "next/head";
import ApplyModal from "/components/ApplyModal";

export default function ApplyNowPage() {
  return (
    <>
      <Head>
        <title>Apply Now | Empower Financial Network</title>
      </Head>
      <main className="apply-page">
        <ApplyModal />
      </main>
    </>
  );
}
