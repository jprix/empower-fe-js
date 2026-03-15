import React from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";

export default function PrivacyPage({ policyText }) {
  return (
    <>
      <Head>
        <title>Privacy Policy | Empower Financial Network</title>
      </Head>
      <main className="legal-page-wrap">
        <article className="legal-page-card">
          <pre className="legal-pre">{policyText}</pre>
        </article>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "content", "privacy-policy.txt");
  const policyText = fs.readFileSync(filePath, "utf8");
  return { props: { policyText } };
}
