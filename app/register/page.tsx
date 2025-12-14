"use client"

import { RegisterLayout } from "@/components/auth/register-layout"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <RegisterLayout>
      <RegisterForm />
    </RegisterLayout>
  )
}
