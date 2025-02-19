import { onboardingClient } from "@/lib/auth0";
import { NextRequest } from "next/server";

export const GET = onboardingClient.handleAuth({
  signup: onboardingClient.handleLogin((request) => {
    // NOTE: this is a typing issue. The request Object here is of type NextRequest (not NextApiRequest)
    // as this is a route handler.
    // See: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#url-query-parameters
    const searchParams = (request as NextRequest).nextUrl.searchParams;
    const loginHint = searchParams.get("login_hint") || "";

    console.log("loginHint", loginHint);
    return {
      authorizationParams: {
        screen_hint: "signup",
        login_hint: loginHint,
      },
      returnTo: "/onboarding/verify",
    };
  }),
});
