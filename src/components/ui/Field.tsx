import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
};

type InputFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

/** A labeled input or textarea. Pass as="textarea" for the multi-line variant. */
export function Field(props: InputFieldProps | TextareaFieldProps) {
  const { label, error, as = "input", className = "", ...rest } = props as any;

  const inputClasses = `w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-teal focus:ring-1 focus:ring-teal ${
    error ? "border-red-400" : "border-charcoal/15"
  } ${className}`;

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-charcoal">{label}</span>
      {as === "textarea" ? (
        <textarea className={`${inputClasses} min-h-[100px] resize-y`} {...rest} />
      ) : (
        <input className={inputClasses} {...rest} />
      )}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
