"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { z } from "zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

async function fetchUserData() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          username: "dohyeon_developer",
          email: "dohyeon@example.com",
          password: "",
          bio: "Toronto based developer",
          role: "developer",
          marketing_emails: true,
          theme: "dark",
        }),
      1500
    )
  )
}

const roleOptions = ["developer", "designer", "manager"]

const profileSchema = z.object({
  username: z
    .string()
    .min(2, { message: "닉네임은 2~20자 사이여야 합니다." })
    .max(20, { message: "닉네임은 2~20자 사이여야 합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z.string().min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
  bio: z
    .string()
    .max(160, { message: "자기소개는 160자를 초과할 수 없습니다." })
    .optional(),
  role: z
    .string()
    .min(1, { message: "직업을 선택해주세요." })
    .refine((value) => roleOptions.includes(value), { message: "직업을 선택해주세요." }),
  marketing_emails: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
})

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      role: "",
      marketing_emails: false,
      theme: "system",
    },
  })
  const { isSubmitting } = form.formState

  useEffect(() => {
    fetchUserData().then((data) => {
      form.reset(data)
      setIsLoading(false)
    })
  }, [])

  async function onSubmit(values) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))

      if (Math.random() < 0.5) throw new Error("서버 응답 지연")

      toast.success("프로필 저장 성공!", {
        description: `이메일: ${values.email} / 직업: ${values.role}`,
      })
    } catch {
      toast.error("저장 실패", {
        description: "서버에 문제가 발생했습니다. 다시 시도해주세요.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">사용자 정보를 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-12 w-full max-w-3xl px-4 pb-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">종합 프로필 설정</CardTitle>
          <CardDescription>계정 정보, 알림, 테마를 한 번에 설정하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input placeholder="닉네임을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자기소개</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="본인을 간단히 소개해 주세요 (최대 160자)"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>선택 입력 항목입니다.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>직업</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="직업을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="developer">developer</SelectItem>
                          <SelectItem value="designer">designer</SelectItem>
                          <SelectItem value="manager">manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketing_emails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>광고 수신</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                        <p className="text-sm text-muted-foreground">광고 및 이벤트 메일 수신에 동의합니다.</p>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>테마</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid gap-3 sm:grid-cols-3"
                      >
                        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                          <RadioGroupItem id="theme-light" value="light" />
                          <Label htmlFor="theme-light">light</Label>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                          <RadioGroupItem id="theme-dark" value="dark" />
                          <Label htmlFor="theme-dark">dark</Label>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                          <RadioGroupItem id="theme-system" value="system" />
                          <Label htmlFor="theme-system">system</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  "저장"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
