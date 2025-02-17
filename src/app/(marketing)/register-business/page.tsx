"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, FormEvent } from "react";

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RegisterBusinessContent() {
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "Basic"; // Fallback plan name if query param isn't available

  const createBusinessAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (organization.trim() === "") {
      setMessage("Error. All fields are required.");
      return;
    }

    console.log("Organization:", organization);
    try {
      const res = await fetch(`/api/subscription/organization?` + new URLSearchParams({ org_name: organization }));

      if (res.ok) {
        setOrganization("");
        const organizationData = await res.json();
        const route = `/api/auth/login?prompt=none&organization=${organizationData.id}&returnTo=/home`;
        router.push(route);
      } else {
        const errorResponse = await res.json();
        setMessage(errorResponse.msg || `Error: ${res.statusText}`);
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <main className="bg-white p-4">
      <div className="mx-auto max-w-7xl bg-white px-4 pt-24 sm:px-6 lg:px-8 py-2">
        <div className="text-3xl font-extrabold text-black sm:text-3xl sm:leading-tight sm:tracking-tight">
          Congratulations! You subscribed to a <span className="underline">{plan}</span> plan.
        </div>
        <div className="text-2xl font-bold text-black sm:text-3xl sm:leading-tight sm:tracking-tight">Register your organization identifier.</div>
        <p>
          Choose a unique name for your organization. All users of your organization will use this identifier to sign in to your business account.
        </p>

        <p className="mt-4 max-2-3xl text-lg text-[#EC0B5C] font-bold p-2 min-w-[90px] rounded-md">{message}</p>

        <form className="space-y-4" onSubmit={createBusinessAccount}>
          <div className="relative mb-4 flex w-1/3 flex-wrap items-stretch rounded-md bg-gray-50 px-0 ring-2 ring-gray-200 focus-within:ring-[#EC0B5C]">
            <input
              type="text"
              id="organization"
              name="organization"
              placeholder="companyid"
              value={organization}
              onChange={({ target }) => setOrganization(target.value)}
              className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-md px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition ease-in-out focus:z-[3]"
            />
            <span
              className="flex items-center whitespace-nowrap bg-transparent rounded-md outline-none focus:outline-none px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]"
              id="basic-addon2"
            >
              .mylearning.app
            </span>
          </div>
          <button
            type="submit"
            className="w-1/6 text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] hover:text-gray-100"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}

// TODO: Remove the fallback div and replace it with a loading spinner
export default function RegisterBusinessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterBusinessContent />
    </Suspense>
  );
}
