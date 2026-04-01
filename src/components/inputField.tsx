// import { Label } from "@/src/components/ui/label";
// import { Textarea } from "./ui/textarea";
// import { Input } from "./ui/input";

// interface InputFieldProps {
//     label: string,
//     name: string,
//     placeholder?: string;
//     required: boolean;
//     value: string,
//     onChange: (
//         e:
//             | React.ChangeEvent<HTMLInputElement>
//             | React.ChangeEvent<HTMLTextAreaElement>
//     ) => void;
//     error?: string[];
//     textarea?: boolean;
// }

// export const InputField = ({ label, name, placeholder, required, value, onChange, error, textarea }: InputFieldProps) => {
//     return (
//         <div className="space-y-3">
//             <Label
//                 htmlFor={name}
//                 className="text-sm font-semibold text-gray-700"
//             >
//                 {label}
//             </Label>

//             {textarea ? (
//                 <Textarea
//                     id={name}
//                     placeholder={placeholder}
//                     required={required}
//                     value={value}
//                     onChange={
//                         onChange as (
//                             e: React.ChangeEvent<HTMLTextAreaElement>
//                         ) => void
//                     }
//                     className="min-h-40 rounded-xl border-gray-300 bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
//                 />
//             ) : (
//                 <Input
//                     id={name}
//                     placeholder={placeholder}
//                     required={required}
//                     value={value}
//                     onChange={
//                         onChange as (
//                             e: React.ChangeEvent<HTMLInputElement>
//                         ) => void
//                     }
//                     className="h-12 rounded-xl border-gray-300 bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
//                 />
//             )}

//             {error && (
//                 <p className="text-sm font-medium text-red-500">
//                     {error}
//                 </p>
//             )}
//         </div>
//     )
// }


import { Label } from "@/src/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  value?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  error?: string;
  textarea?: boolean;
  type?: string;
  accept?: string;
}

export const InputField = ({
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  error,
  textarea,
  type = "text",
  accept,
}: InputFieldProps) => {
  return (
    <div className="space-y-3">
      <Label
        htmlFor={name}
        className="text-sm font-semibold text-gray-700"
      >
        {label}
      </Label>

      {textarea ? (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={
            onChange as (
              e: React.ChangeEvent<HTMLTextAreaElement>
            ) => void
          }
          className="min-h-40 rounded-xl border-gray-300 bg-white shadow-sm"
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          accept={accept}
          placeholder={placeholder}
          required={required}
          value={type === "file" ? undefined : value}
          onChange={
            onChange as (
              e: React.ChangeEvent<HTMLInputElement>
            ) => void
          }
          className="h-12 rounded-xl border-gray-300 bg-white shadow-sm"
        />
      )}

      {error && (
        <p className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};