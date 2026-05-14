import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request) {
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.limit(1)
		.single()

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json({ data })
}

export async function POST(request) {
	const body = await request.json()

	const { data, error } = await supabase.from("profiles").upsert(body).select()

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json({ data }, { status: 200 })
}

export async function DELETE(request) {
	const { id } = await request.json()

	if (!id) {
		return NextResponse.json({ error: "id is required" }, { status: 400 })
	}

	const { data, error } = await supabase.from("profiles").delete().eq("id", id).select()

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	return NextResponse.json({ data }, { status: 200 })
}
