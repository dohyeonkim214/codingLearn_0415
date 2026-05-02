import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40 px-6 py-16 text-foreground">
      <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-sky-700 shadow-sm backdrop-blur">
            Main Portfolio Page
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              도현의 포트폴리오 메인 페이지
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Next.js와 Tailwind CSS를 바탕으로 학습한 내용을 실제 화면으로 구현하고 있습니다.
              단순한 예제를 넘어서, 구조와 디자인이 함께 살아 있는 결과물을 만드는 것이 목표입니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/50 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Current Focus</p>
              <p className="mt-3 text-xl font-bold text-slate-950">React, Next.js, UI 구현</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg shadow-slate-300/40">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Goal</p>
              <p className="mt-3 text-xl font-bold">실용적이고 보기 좋은 웹 서비스 만들기</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-x-10 top-8 h-72 rounded-full bg-sky-200/50 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-4 shadow-2xl shadow-slate-300/50">
            <Image
              className="rounded-3xl object-cover"
              src="/testimage.jpg"
              alt="Test image"
              width={300}
              height={300}
              priority
            />
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">Preview</p>
              <p className="mt-2 text-base leading-7 text-slate-700">
                메인 화면에서 포트폴리오의 첫인상을 전달하는 대표 이미지입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-950">페이지 둘러보기</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/profile"
            className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/50 backdrop-blur transition-shadow hover:shadow-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</p>
            <p className="mt-3 text-xl font-bold text-slate-950 group-hover:text-sky-600 transition-colors">프로필 수정</p>
            <p className="mt-2 text-sm text-slate-500">닉네임 등 프로필 정보를 수정합니다.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
