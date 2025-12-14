"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/outline"
import { userAPI } from "@/lib/api"
import { InputField } from "./input-field"
import { PasswordInput } from "./password-input"
import { SubmitButton } from "./submit-buttons"
import { ErrorMessage } from "./error-message"
import { SuccessMessage } from "./success-message"
import { SocialAuthButtons } from "./social-auth-buttons"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!formData.agree) {
      setError("You must agree to the Terms of Service")
      return
    }
    if (!formData.email.endsWith("@cit.edu")) {
      setError("Please use your student email")
      return
    }

    setLoading(true)
    try {
      await userAPI.register(formData.name, formData.email, formData.password)
      setSuccess(true)
      setTimeout(() => router.push("/login"), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ErrorMessage message={error} />
      <SuccessMessage message={success ? "Registration successful! Redirecting to login..." : ""} />

      <InputField
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        icon={<UserIcon />}
      />

      <InputField
        label="Student Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your student email"
        icon={<EnvelopeIcon />}
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
      />

      <div className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="rounded border-gray-300"
          required
        />
        <span className="text-gray-600">
          I agree to the{" "}
          <Link href="#" className="text-[#8a252c] hover:underline">
            Terms of Service
          </Link>
        </span>
      </div>

      <SubmitButton loading={loading} text="Create Account" />

      {/* <SocialAuthButtons /> */}

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-[#8a252c] font-medium hover:underline">
          Sign in here
        </Link>
      </p>
    </form>
  )
}
