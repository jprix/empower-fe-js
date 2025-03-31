import { useEffect, useState } from "react";
import { LDProvider } from "launchdarkly-react-client-sdk";
import { CreditScore } from "@mui/icons-material";

const clientSideID = process.env.NEXT_PUBLIC_LD_CLIENT_ID;

export default function LaunchDarklyProvider({ children }) {
  const [context, setContext] = useState(null);

  useEffect(() => {
    console.log("Initializing LaunchDarkly...");

    const userContext = {
      kind: "user",
      key: "user-1239", //change to any other value for v1Landing
      email: "test2@example.com",
      role: "admin",
      tier: "gold",
      creditScore: 760,
      country: "US", // change to UK for v1Landing
      custom: {
        featureAccess: "admin",
      },
    };

    setContext(userContext);
  }, []);

  if (!context) {
    console.log("Waiting for LaunchDarkly context...");
    return null;
  }

  return (
    <LDProvider clientSideID={clientSideID} context={context}>
      {children}
    </LDProvider>
  );
}
