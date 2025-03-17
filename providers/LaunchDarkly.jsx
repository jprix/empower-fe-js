import { useEffect, useState } from "react";
import { LDProvider } from "launchdarkly-react-client-sdk";

const clientSideID = process.env.NEXT_PUBLIC_LD_CLIENT_ID;

export default function LaunchDarklyProvider({ children }) {
  const [context, setContext] = useState(null);

  useEffect(() => {
    console.log("Initializing LaunchDarkly...");
    setContext({
      kind: "user", // Required for LaunchDarkly
      key: "user-1234", // Unique user key
      email: "admin@example.com", // Example email
      role: "admin", // ✅ Hardcoded admin role for testing
      custom: {
        featureAccess: "admin", // ✅ Custom attribute used for targeting rules
      },
    });
  }, []);

  if (!context) {
    console.log("Waiting for LaunchDarkly context...");
    return null; // Prevent rendering before context is ready
  }

  return (
    <LDProvider clientSideID={clientSideID} context={context}>
      {children}
    </LDProvider>
  );
}
