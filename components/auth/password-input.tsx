import type React from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

interface PasswordInputProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  required?: boolean
}

export function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = true,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-[#8a252c] focus:outline-none"
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8a252c]"
        >
          {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}
