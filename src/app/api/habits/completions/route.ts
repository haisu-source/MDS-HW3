import { auth } from "@clerk/nextjs/server";
import { createServerSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, getToken } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { habit_id, completed_date } = await req.json();
  const supabase = createServerSupabase(() => getToken());

  // Check if already completed — if so, remove it (toggle)
  const { data: existing } = await supabase
    .from("habit_completions")
    .select("id")
    .eq("habit_id", habit_id)
    .eq("completed_date", completed_date)
    .eq("user_id", userId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("habit_completions")
      .delete()
      .eq("id", existing.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ action: "removed" });
  }

  const { error } = await supabase
    .from("habit_completions")
    .insert({
      habit_id,
      completed_date,
      user_id: userId,
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ action: "added" });
}
