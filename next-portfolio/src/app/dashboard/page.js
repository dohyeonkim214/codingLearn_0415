"use client";

import { useState } from "react";
import {
	BarChart3,
	Bell,
	CalendarClock,
	CheckCircle2,
	Clock3,
	MoreHorizontal,
	Rocket,
	Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const kpiCards = [
	{
		title: "오늘 방문자",
		value: "1,284",
		delta: "+12.4%",
		icon: Users,
	},
	{
		title: "활성 프로젝트",
		value: "8",
		delta: "+2",
		icon: Rocket,
	},
	{
		title: "전환율",
		value: "4.8%",
		delta: "+0.6%p",
		icon: BarChart3,
	},
	{
		title: "알림",
		value: "17",
		delta: "-3",
		icon: Bell,
	},
];

const activityItems = [
	{
		id: "ACT-1024",
		title: "Landing Hero 카피 업데이트",
		owner: "Design Team",
		status: "완료",
		due: "오늘 18:00",
	},
	{
		id: "ACT-1025",
		title: "회원가입 퍼널 A/B 테스트 시작",
		owner: "Growth Team",
		status: "진행중",
		due: "내일 11:00",
	},
	{
		id: "ACT-1026",
		title: "프로필 폼 유효성 검증 리팩터링",
		owner: "Frontend Team",
		status: "리뷰대기",
		due: "5월 10일",
	},
];

export default function DashboardPage() {
	const [showOnlyMine, setShowOnlyMine] = useState(false);

	return (
		<main className="min-h-screen bg-background px-6 py-10 text-foreground">
			<div className="mx-auto w-full max-w-6xl space-y-8">
				<section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-sm text-muted-foreground">Overview</p>
						<h1 className="text-2xl font-bold tracking-tight md:text-3xl">프로젝트 대시보드</h1>
						<p className="mt-1 text-sm text-muted-foreground">오늘의 지표와 작업 흐름을 한 화면에서 관리하세요.</p>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						<Button variant="secondary" size="sm">리포트 다운로드</Button>
						<Button size="sm">새 작업 만들기</Button>
					</div>
				</section>

				<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{kpiCards.map((card) => {
						const Icon = card.icon;
						return (
							<Card key={card.title}>
								<CardHeader>
									<CardDescription>{card.title}</CardDescription>
									<CardAction>
										<Icon className="size-4 text-muted-foreground" />
									</CardAction>
									<CardTitle className="text-2xl">{card.value}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-xs text-muted-foreground">지난주 대비 {card.delta}</p>
								</CardContent>
							</Card>
						);
					})}
				</section>

				<section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
					<Card>
						<CardHeader className="border-b">
							<CardTitle>작업 리스트</CardTitle>
							<CardDescription>필터를 적용해 우선순위 작업을 빠르게 확인하세요.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4 pt-4">
							<div className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto] md:items-center">
								<Input placeholder="작업명 또는 팀 검색" />

								<Select defaultValue="all">
									<SelectTrigger className="w-full">
										<SelectValue placeholder="상태" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">전체 상태</SelectItem>
										<SelectItem value="progress">진행중</SelectItem>
										<SelectItem value="done">완료</SelectItem>
										<SelectItem value="review">리뷰대기</SelectItem>
									</SelectContent>
								</Select>

								<Select defaultValue="week">
									<SelectTrigger className="w-full">
										<SelectValue placeholder="기간" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="today">오늘</SelectItem>
										<SelectItem value="week">이번 주</SelectItem>
										<SelectItem value="month">이번 달</SelectItem>
									</SelectContent>
								</Select>

								<div className="flex items-center justify-end gap-2 rounded-md border border-border px-3 py-2">
									<Switch checked={showOnlyMine} onCheckedChange={setShowOnlyMine} id="only-mine" />
									<label htmlFor="only-mine" className="text-sm text-muted-foreground">
										내 작업만
									</label>
								</div>
							</div>

							<div className="space-y-2">
								{activityItems.map((item) => (
									<div
										key={item.id}
										className="flex flex-col gap-3 rounded-lg border border-border p-3 md:flex-row md:items-center md:justify-between"
									>
										<div className="flex items-start gap-3">
											<Checkbox id={item.id} className="mt-1" />
											<div>
												<p className="text-sm font-medium">{item.title}</p>
												<p className="text-xs text-muted-foreground">
													{item.id} · {item.owner}
												</p>
											</div>
										</div>

										<div className="flex items-center gap-2">
											<span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
												<Clock3 className="size-3" />
												{item.due}
											</span>
											<span className="rounded-full border border-border px-2 py-1 text-xs">{item.status}</span>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button size="icon-sm" variant="ghost" aria-label="작업 메뉴">
														<MoreHorizontal className="size-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>작업 액션</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem>상세 보기</DropdownMenuItem>
													<DropdownMenuItem>담당자 변경</DropdownMenuItem>
													<DropdownMenuItem>마감일 수정</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>
								))}
							</div>
						</CardContent>
						<CardFooter className="justify-between">
							<p className="text-xs text-muted-foreground">총 24개 작업 중 3개 표시 중</p>
							<Button size="sm" variant="outline">전체 보기</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle>오늘의 일정</CardTitle>
							<CardDescription>중요한 일정을 놓치지 않도록 요약했습니다.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3 pt-4">
							<div className="rounded-lg border border-border p-3">
								<p className="text-sm font-medium">09:30 주간 스탠드업</p>
								<p className="mt-1 text-xs text-muted-foreground">Frontend Team · 30분</p>
							</div>
							<div className="rounded-lg border border-border p-3">
								<p className="text-sm font-medium">14:00 UX 리뷰 세션</p>
								<p className="mt-1 text-xs text-muted-foreground">Design Team · 1시간</p>
							</div>
							<div className="rounded-lg border border-border p-3">
								<p className="text-sm font-medium">17:30 릴리즈 체크</p>
								<p className="mt-1 text-xs text-muted-foreground">Core Team · 40분</p>
							</div>
						</CardContent>
						<CardFooter className="justify-between">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<CalendarClock className="size-4" />
								다음 일정까지 42분
							</div>
							<Button size="sm" variant="secondary">
								<CheckCircle2 className="size-4" />
								완료 정리
							</Button>
						</CardFooter>
					</Card>
				</section>
			</div>
		</main>
	);
}
