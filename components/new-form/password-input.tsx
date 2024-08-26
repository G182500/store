"use client";
import { UseFormRegisterReturn } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface PassInputProps {
  className: string;
  register: UseFormRegisterReturn;
}

export default function PasswordInput({ className, register }: PassInputProps) {
  const [type, setType] = useState("password");

  const changeType = () =>
    type === "text" ? setType("password") : setType("text");

  return (
    <div className="flex items-center space-x-2">
      <input
        className={className}
        placeholder="Password"
        type={type}
        {...register}
      />

      <div
        className="flex items-center justify-center space-x-1 w-32"
        onClick={changeType}
      >
        {type === "password" ? (
          <>
            <EyeIcon size={32} />
            <p className="font-medium">Show</p>
          </>
        ) : (
          <>
            <EyeOffIcon size={32} />
            <p className="font-medium">Hide</p>
          </>
        )}
      </div>
    </div>
  );
}
