"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const clearFeedback = () => {
    setError("");
    setMessage("");
  };

  useEffect(() => {
    if (!supabase) return;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/profile");
      }
    };

    checkSession();
  }, [router]);

  const handleSignUp = async () => {
    clearFeedback();

    if (!supabase) {
      setError("Supabase 설정이 되어 있지 않습니다.");
      return;
    }

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setMessage("가입 성공! 이메일을 확인해주세요.");
    } catch (err) {
      setError(err?.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    clearFeedback();

    if (!supabase) {
      setError("Supabase 설정이 되어 있지 않습니다.");
      return;
    }

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      setMessage("로그인 성공!");
      router.replace("/profile");
      router.refresh();
    } catch (err) {
      setError(err?.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">
            로그인 / 회원가입
          </h1>
          <p className="mb-6 text-center text-sm text-slate-500">
            이메일과 비밀번호를 입력해 계정에 접속하세요.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "처리 중..." : "로그인"}
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "처리 중..." : "회원가입"}
            </button>
          </div>

          {error ? (
            <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
          ) : null}
          {message ? (
            <p className="mt-2 text-sm font-medium text-emerald-600">{message}</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
