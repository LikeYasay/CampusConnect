"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { saveToken, startHeartbeat } from "@/lib/auth"
import { InputField } from "./input-field"
import { PasswordInput } from "./password-input"
import { SubmitButton } from "./submit-buttons"
import { ErrorMessage } from "./error-message"
import { SocialAuthButtons } from "./social-auth-buttons"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || ""
      const res = await fetch(`${base.replace(/\/+$/,"")}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (res.status === 401) {
        
        setError("Invalid credentials")
        return
      }

      if (!res.ok) {
        
        setError("Invalid credentials")
        return
      }

      const data = await res.json()



      if (!data?.token) {
        setError("Invalid credentials")
        return
      }

      if (data.isActive === false) {
        setError("Your account is not active. Please contact the administrator.")
        return
      }

      saveToken(data.token)
      try { startHeartbeat() } catch (_) { /* ignore */ }
      router.push("/")

    } catch (err) {
      console.error("Login error:", err)
      setError("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      <ErrorMessage message={error} />

      <InputField
        label="Student Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your student email"
        icon={<EnvelopeIcon />}
      />

      <PasswordInput
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span className="text-gray-600">Remember me</span>
        </label>
        {/* <Link href="#" className="text-[#8a252c] font-medium hover:underline">
          Forgot password?
        </Link> */}
      </div>

      <SubmitButton loading={loading} text="Sign In" />

      {/* <SocialAuthButtons /> */}

      <p className="text-center text-sm text-gray-600">
        New to Campus Connect?{" "}
        <Link href="/register" className="text-[#8a252c] font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}