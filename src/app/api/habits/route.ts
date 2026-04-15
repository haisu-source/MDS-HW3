import { auth } from "@clerk/nextjs/server";
import { createServerSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { userId, getToken } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabase(() => getToken());

  // Fetch habits with their completions
  const { data: habits, error: habitsError } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (habitsError) return NextResponse.json({ error: habitsError.message }, { status: 500 });

  const { data: completions, error: compError } = await supabase
    .from("habit_completions")
    .select("*")
    .eq("user_id", userId);

  if (compError) return NextResponse.json({ error: compError.message }, { status: 500 });

  // Merge completions into habits
  const habitsWithCompletions = (habits || []).map((habit) => ({
    ...habit,
    completedDates: (completions || [])
      .filter((c) => c.habit_id === habit.id)
      .map((c) => c.completed_date),
  }));

  return NextResponse.json(habitsWithCompletions);
}

export async function POST(req: NextRequest) {
  const { userId, getToken } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = createServerSupabase(() => getToken());

  const { data, error } = await supabase
    .from("habits")
    .insert({
      user_id: userId,
      name: body.name,
      description: body.description || "",
      identity_tags: body.identity_tags || [],
      is_suggested: body.is_suggested || false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ...data, completedDates: [] });
}

export async function DELETE(req: NextRequest) {
  const { userId, getToken } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const supabase = createServerSupabase(() => getToken());

  const { error } = await supabase
    .from("habits")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
