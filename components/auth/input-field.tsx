import type React from "react"

interface InputFieldProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  icon?: React.ReactNode
  required?: boolean
}

export function InputField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  icon,
  required = true,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-[#8a252c] focus:outline-none"
          required={required}
        />
        {icon && <div className="absolute right-3 top-3.5 w-5 h-5 text-gray-400">{icon}</div>}
      </div>
    </div>
  )
}
