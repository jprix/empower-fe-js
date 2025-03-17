import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useRouter } from "next/router";
import ApplyModal from "/components/ApplyModal";
import V1Landing from "/components/V1Landing";
import V2Landing from "/components/V2Landing";
import { useLDClient } from "launchdarkly-react-client-sdk";
export default function Home() {
  const flags = useFlags();
  const ldClient = useLDClient();

  const speakWithSpecialist = flags["speak-with-specialist"] ?? false;
  const isV2Landing = flags["v2Landing"] ?? false;

  useEffect(() => {
    if (ldClient) {
      console.log("Refreshing LaunchDarkly flags...");
      const updatedFlags = ldClient.allFlags();
      console.log("Updated Flags:", updatedFlags);
    }
  }, [ldClient]);

  console.log("LaunchDarkly Flags:", flags);
  console.log("Using V2 Layout:", isV2Landing);

  return (
    <>
      <Head>
        <title>Empower Financial Network</title>
      </Head>

      {flags.v2Landing ? (
        <V2Landing flags={flags} />
      ) : (
        <V1Landing flags={flags} />
      )}
    </>
  );
}
