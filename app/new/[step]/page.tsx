import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";

export default async function NewSessionStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  // 1) Await the dynamic params
  const { step } = await params;

  // 2) Auth guard
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // 3) Pick the right client component
  let Component = Step1;
  if (step === "2") Component = Step2;
  else if (step === "3") Component = Step3;
  else if (step !== "1") {
    redirect("/new/1");
  }

  // 4) Render
  return <Component />;
}
