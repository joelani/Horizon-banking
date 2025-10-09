"use client";
import React from "react";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInputs = ({ control, name, label, placeholder }: CustomInput) => {
  // 1. Define your form.

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={name === "password" ? "password" : "text"}
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message" />
            </div>
          </div>
        )}
      />
    </>
  );
};

export default CustomInputs;
