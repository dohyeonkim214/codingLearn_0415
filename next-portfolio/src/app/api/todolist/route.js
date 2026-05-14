import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET() {
	try {
		const client = getSupabaseClient()
		const { data, error } = await client
			.from('todolist')
			.select('*')
			.order('created_at', { ascending: false })

		if (error) throw error

		return NextResponse.json({ data: data ?? [] }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: '할 일 목록을 불러오지 못했습니다' },
			{ status: 500 },
		)
	}
}

export async function POST(request) {
	try {
		const body = await request.json()
		const title = String(body?.title ?? '').trim()

		if (!title) {
			return NextResponse.json(
				{ error: 'title은 필수입니다' },
				{ status: 400 },
			)
		}

		const client = getSupabaseClient()
		const { data, error } = await client
			.from('todolist')
			.insert([{ title, completed: false }])
			.select()
			.single()

		if (error) throw error

		return NextResponse.json({ data }, { status: 201 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: '추가에 실패했습니다' }, { status: 500 })
	}
}

export async function PATCH(request) {
	try {
		const body = await request.json()
		const id = body?.id
		const completed = body?.completed

		if (!id || typeof completed !== 'boolean') {
			return NextResponse.json(
				{ error: 'id와 completed 값이 필요합니다' },
				{ status: 400 },
			)
		}

		const client = getSupabaseClient()
		const { data, error } = await client
			.from('todolist')
			.update({ completed })
			.eq('id', id)
			.select()
			.single()

		if (error) throw error

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: '상태 변경에 실패했습니다' },
			{ status: 500 },
		)
	}
}

export async function DELETE(request) {
	try {
		const body = await request.json()
		const id = body?.id

		if (!id) {
			return NextResponse.json({ error: 'id가 필요합니다' }, { status: 400 })
		}

		const client = getSupabaseClient()
		const { error } = await client.from('todolist').delete().eq('id', id)

		if (error) throw error

		return NextResponse.json({ success: true }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: '삭제에 실패했습니다' }, { status: 500 })
	}
}
