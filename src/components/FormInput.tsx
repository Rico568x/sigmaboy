import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon: LucideIcon;
  error?: string;
}

export function FormInput({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = true,
  icon: Icon,
  error,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          className={clsx(
            "appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
            error ? "border-red-300" : "border-gray-300"
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}