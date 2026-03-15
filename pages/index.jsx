import React, { useEffect } from "react";
import Head from "next/head";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import V1Landing from "/components/V1Landing";
import V2Landing from "/components/V2Landing";

export default function Home() {
  const flags = useFlags();
  const ldClient = useLDClient();

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
  console.log("userplans", flags.UserBasedLoanFilter);

  return (
    <>
      <Head>
        <title>Empower Financial Network</title>
      </Head>

      {flags.isV2Landing ? (
        <>
          <V2Landing flags={flags} />
        </>
      ) : (
        <>
          <V1Landing flags={flags} />
        </>
      )}
    </>
  );
}
