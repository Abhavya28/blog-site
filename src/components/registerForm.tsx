"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "./inputField";
import { Button } from "./ui/button";

interface FormValues {
    fullName: string;
    email: string;
    password: string;
    gender: string;
    dob: string;
    country: string;
    terms: boolean;
    profilePic: File | null;
}

const countries = ["India", "USA", "UK", "Australia"];

const RegisterForm = () => {
    const formik = useFormik<FormValues>({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            gender: "",
            dob: "",
            country: "",
            terms: false,
            profilePic: null,
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(3, "Name must be at least 3 characters")
                .required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 chars")
                .matches(/[A-Z]/, "Must include uppercase")
                .matches(/[a-z]/, "Must include lowercase")
                .matches(/\d/, "Must include a number")
                .matches(/[@$!%*?&#]/, "Must include a special char")
                .required("Required"),
            gender: Yup.string().oneOf(["male", "female"], "Select gender").required("Required"),
            dob: Yup.date()
                .max(new Date(), "DOB cannot be future")
                .required("Required"),
            country: Yup.string()
                .oneOf(countries, "Select a country")
                .required("Required"),
            terms: Yup.boolean().oneOf([true], "Accept Terms"),
            profilePic: Yup.mixed()
                .nullable()
                .test("fileSize", "File too large (max 2MB)", (value) => {
                    if (!value) return true;
                    return (value as File).size <= 2 * 1024 * 1024;
                })
                .test("fileType", "Unsupported file type", (value) => {
                    if (!value) return true;
                    return ["image/jpeg", "image/png"].includes((value as File).type);
                }),
        }),
        onSubmit: (values, {resetForm}) => {
            console.log("Form submitted", values);
            alert("Registration Successful!");
            resetForm();
        },
    });

    return (
        <div className="max-w-md mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Register</h1>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <InputField
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your name"
                    required
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
                )}

                {/* Email */}
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}

                {/* Password */}
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter strong password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                )}
                
                {/* Profile Picture */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Profile Picture</label>
                    <input
                        type="file"
                        name="profilePic"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                            const file = e.currentTarget.files?.[0] || null;
                            formik.setFieldValue("profilePic", file);
                        }}
                    />
                    {formik.touched.profilePic && formik.errors.profilePic && (
                        <p className="text-red-500 text-sm">{formik.errors.profilePic}</p>
                    )}
                </div>

                {/* Gender (Radio) */}
                <div>
                    <label className="font-semibold">Gender</label>
                    <div className="flex gap-4 mt-1">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formik.values.gender === "male"}
                                onChange={formik.handleChange}
                            /> Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formik.values.gender === "female"}
                                onChange={formik.handleChange}
                            /> Female
                        </label>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                        <p className="text-red-500 text-sm">{formik.errors.gender}</p>
                    )}
                </div>

                {/* DOB */}
                <InputField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    required
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                />
                {formik.touched.dob && formik.errors.dob && (
                    <p className="text-red-500 text-sm">{formik.errors.dob}</p>
                )}

                {/* Country (Dropdown) */}
                <div>
                    <label className="font-semibold">Country</label>
                    <select
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        className="w-full border rounded-xl p-2 mt-1"
                    >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    {formik.touched.country && formik.errors.country && (
                        <p className="text-red-500 text-sm">{formik.errors.country}</p>
                    )}
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={formik.values.terms}
                        onChange={formik.handleChange}
                    />
                    I accept terms and conditions
                </label>
                {formik.touched.terms && formik.errors.terms && (
                    <p className="text-red-500 text-sm">{formik.errors.terms}</p>
                )}

                <Button type="submit" className="w-full mt-4">
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegisterForm;