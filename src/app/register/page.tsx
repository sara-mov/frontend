"use client";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import sara from "../../../public/sara.png";
import saraDark from "../../../public/sara-dark.png";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";
import EyeIcon from "../../../public/eye.svg";
import EyeOffIcon from "../../../public/eye-off.svg";

const Register = () => {
  // ??????????????????????????????????????????????????????????????????????
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.01) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Regular expressions for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  const isPasswordValid =
    validations.length &&
    validations.uppercase &&
    validations.number &&
    validations.specialChar;

  const isFormValid =
    first_name.trim().length > 0 &&
    last_name.trim().length > 0 &&
    emailRegex.test(email) &&
    isPasswordValid &&
    password === confirmPassword;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isFormValid) {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, email, password }),
      });
      if (res.ok) {
        alert("Registration Successful");
        redirect("/sign-in");
      } else {
        alert("Invalid credentials");
      }
    }
  }

  return (
    <SplashScreen duration={2000}>
      <div className="bg-gradient-to-br transition duration-200 text-black dark:text-white from-neutral-100 dark:from-neutral-800 dark:to-neutral-900 to-neutral-200">
        <div className="mx-16">
          {/* Header */}
          <div className="fixed top-0 left-0 w-full pt-5 px-16 mr-0 py-4 z-20">
            {/* Default Background */}

            <div
              className={` -z-10 absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isScrolled ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: isScrolled
                  ? theme === "light"
                    ? "linear-gradient(to bottom, #e5e5e5, rgba(229,229,229,0.8), transparent)"
                    : "linear-gradient(to bottom, #262626, rgba(38,38,38,0.8), transparent)"
                  : theme === "light"
                  ? "linear-gradient(to bottom, #e5e5e5,  transparent)"
                  : "linear-gradient(to bottom, #262626, transparent)",
              }}
            ></div>
            <Navbar />
          </div>
          <div className="pt-7">
            <div className="element">
              <div className="absolute h-full w-full left-0 top-0 overflow-hidden"></div>
              <div className="w-full m-auto">
                <div className="flex flex-col items-center">
                  <Link href="/" className="pb-5">
                    <Image
                      src={theme === "light" ? sara : saraDark}
                      alt="sara-logo"
                      height={24}
                    />
                  </Link>
                  <div className="overflow-hidden opacity-100 scale-100">
                    <div className="w-[26rem] px-1">
                      <div className="flex w-full items-center justify-center">
                        <div className=" pb-5 text-center text-base font-normal text-[#6b84ff] dark:text-[#d6e1ff] ">
                          Sign up with Google or your email
                        </div>
                      </div>
                      <div className="flex h-9 w-full items-center justify-center">
                        <button
                          onClick={() => signIn("google", { callbackUrl: "/" })}
                          className="transition-all duration-200 ease-in-out rounded-[8px] relative overflow-hidden flex items-center justify-center w-full h-9 hover:scale-[98%] active:scale-100 bg-transparent hover:bg-[#4098ff]"
                        >
                          <div className="flex w-full h-full items-center justify-center space-x-2 text-sm transition-all duration-200 ease-in-out bg-[#1f78ff] hover:bg-[#4891ff] text-white">
                            <svg
                              width="16px"
                              height="16px"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2"
                            >
                              <g clipPath="url(#clip0_2220_139439)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M11.2289 4.36529C10.4029 3.57749 9.30053 3.14831 8.15999 3.16595C6.07291 3.16595 4.30036 4.57399 3.66835 6.46999C3.33324 7.46355 3.33324 8.53947 3.66835 9.53304H3.67129C4.30623 11.4261 6.07584 12.8342 8.16293 12.8342C9.24028 12.8342 10.1652 12.5586 10.882 12.0719V12.0699C11.7257 11.5114 12.3018 10.6325 12.4811 9.63888H8.15999V6.55823H15.7058C15.7999 7.09323 15.844 7.63998 15.844 8.1838C15.844 10.617 14.9744 12.6742 13.4614 14.0676L13.4629 14.0688C12.1372 15.2916 10.3176 16.0001 8.15999 16.0001C5.13518 16.0001 2.36906 14.2951 1.01099 11.5937C-0.123673 9.33316 -0.12367 6.66992 1.011 4.4094C2.36907 1.70501 5.13518 5.08294e-05 8.15999 5.08294e-05C10.1471 -0.0234656 12.0667 0.723182 13.5129 2.08126L11.2289 4.36529Z"
                                  fill="#D6E1FF"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_2220_139439">
                                  <rect
                                    width="16"
                                    height="16"
                                    fill="white"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                            Sign up with Google
                          </div>
                        </button>
                      </div>
                      <div className="flex w-full items-center justify-center">
                        <hr className="my-6 w-60 border-[#181a1c] dark:border-white text-center text-white text-opacity-50" />
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="flex flex-row gap-2">
                          <div className="_FormInput flex w-full items-center justify-start space-x-2 flex-col">
                            <input
                              type="text"
                              id="first-name"
                              name="first-name"
                              placeholder="First Name"
                              value={first_name}
                              onChange={(e) => setFirstName(e.target.value)}
                              autoComplete="off"
                              className="w-full rounded-[8px] text-[#333333] h-9 dark:text-[#686868] text-[12px] font-medium bg-[#e0e1e5] dark:bg-[#222327] appearance-none outline-none border-[1px] border-transparent focus:border-[#4891ff] dark:focus:text-white "
                              style={{ padding: "0px 12px" }}
                              required
                            />
                          </div>{" "}
                          <div className="_FormInput flex w-full items-center justify-start space-x-2 flex-col">
                            <input
                              type="text"
                              id="last-name"
                              name="last-name"
                              placeholder="Last Name"
                              value={last_name}
                              onChange={(e) => setLastName(e.target.value)}
                              autoComplete="off"
                              className="w-full rounded-[8px] text-[#333333] h-9 dark:text-[#686868] text-[12px] font-medium bg-[#e0e1e5] dark:bg-[#222327] appearance-none outline-none border-[1px] border-transparent focus:border-[#4891ff] dark:focus:text-white "
                              style={{ padding: "0px 12px" }}
                              required
                            />
                          </div>
                        </div>{" "}
                        <div className="_FormInput flex w-full items-center justify-start space-x-2 flex-col">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                            className="w-full rounded-[8px] text-[#333333] h-9 dark:text-[#686868] text-[12px] font-medium bg-[#e0e1e5] dark:bg-[#222327] appearance-none outline-none border-[1px] border-transparent focus:border-[#4891ff] dark:focus:text-white "
                            style={{ padding: "0px 12px" }}
                            required
                          />
                        </div>{" "}
                        <div className="flex flex-row gap-2">
                          <div className="relative w-full">
                            <div className="_FormInput flex w-full items-center justify-start space-x-2 flex-col">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  setShowValidation(true);
                                }}
                                onBlur={() => setShowValidation(false)}
                                autoComplete="off"
                                className="w-full rounded-[8px] text-[#333333] h-9 dark:text-[#686868] text-[12px] font-medium bg-[#e0e1e5] dark:bg-[#222327] appearance-none outline-none border-[1px] border-transparent focus:border-[#4891ff] dark:focus:text-white "
                                style={{ padding: "0px 12px" }}
                                required
                              />
                            </div>
                            <button
                              type="button"
                              className="absolute inset-y-0 right-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Image src={EyeIcon} alt="eye" width={20} />
                              ) : (
                                <Image
                                  src={EyeOffIcon}
                                  alt="eye-off"
                                  width={20}
                                />
                              )}
                            </button>
                          </div>
                          <div className="relative w-full">
                            <div className="_FormInput flex w-full items-center justify-start space-x-2 flex-col">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                autoComplete="off"
                                className="w-full rounded-[8px] text-[#333333] h-9 dark:text-[#686868] text-[12px] font-medium bg-[#e0e1e5] dark:bg-[#222327] appearance-none outline-none border-[1px] border-transparent focus:border-[#4891ff] dark:focus:text-white "
                                style={{ padding: "0px 12px" }}
                                required
                              />
                            </div>
                            <button
                              type="button"
                              className="absolute inset-y-0 right-3"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <Image src={EyeIcon} alt="eye" width={20} />
                              ) : (
                                <Image
                                  src={EyeOffIcon}
                                  alt="eye-off"
                                  width={20}
                                />
                              )}
                            </button>
                          </div>
                        </div>
                        <div
                          className={`mt-2 text-xs ${
                            showValidation ? `block` : `hidden`
                          }`}
                        >
                          <p
                            className={
                              validations.length
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {validations.length ? "✔" : "✘"} Minimum 8
                            characters
                          </p>
                          <p
                            className={
                              validations.uppercase
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {validations.uppercase ? "✔" : "✘"} At least 1
                            uppercase letter
                          </p>
                          <p
                            className={
                              validations.number
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {validations.number ? "✔" : "✘"} At least 1 number
                          </p>
                          <p
                            className={
                              validations.specialChar
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {validations.specialChar ? "✔" : "✘"} At least 1
                            special character
                          </p>
                        </div>
                        <div className="flex h-9 w-full items-center justify-center">
                          <button
                            disabled={!isFormValid}
                            className={`transition-all duration-200 ease-in-out rounded-[8px] relative overflow-hidden flex items-center justify-center w-full h-9 hover:scale-[98%] active:scale-100
                                ${
                                  isFormValid
                                    ? "bg-blue-500 text-white cursor-pointer"
                                    : "bg-white/[9%] text-[#20202066] dark:text-[#e8e8e866] cursor-not-allowed"
                                }
                                `}
                          >
                            {/** Disabled Overlay */}
                            {!isFormValid && (
                              <div className="absolute z-[2] h-full w-full cursor-not-allowed bg-black/20 transition-all duration-200 ease-in-out" />
                            )}

                            {/** Button Content */}
                            <div
                              className={`flex w-full h-full items-center justify-center space-x-2 text-[14px] transition-all duration-200 ease-in-out
                                ${
                                  isFormValid
                                    ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                                    : "bg-transparent hover:bg-[#2c2c2c] active:bg-[#686868]"
                                }
                                `}
                            >
                              <span className="font-semibold">
                                {isFormValid ? "Continue" : "Continue"}
                              </span>
                            </div>
                          </button>
                        </div>
                      </form>
                      <div className="w-full text-center text-[14px]">
                        <div className="pt-10">
                          <span className="mr-1 text-black dark:text-[#92969a]">
                            Already have a SARA account?
                          </span>
                          <Link
                            className="font-semibold text-[#1f78ff] hover:underline"
                            href="/sign-in"
                          >
                            Sign In
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SplashScreen>
  );
};

export default Register;
