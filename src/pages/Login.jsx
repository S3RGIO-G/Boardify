import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInput } from "../components/FormInput";
import { useLanguage } from "../hooks/useLanguage.js";
import {
  EmailValidators,
  PasswordValidators,
} from "../validators/FormValidators.js";
import { ErrorAlert } from "../components/ErrorAlert.jsx";
import { Spinner } from "../components/Spinner.jsx";

export function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loginUser, loadingUser } = useUser();
  const { texts: TEXT } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const onSubmit = async (e) => {
    setErrorMessage(null);
    const { email, password } = e;
    try {
      await loginUser({ email: email.toLowerCase(), password });
      navigate("/boards");
    } catch (err) {
      setErrorMessage("default");
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="w-full max-w-[475px] bg-white p-6 rounded-3xl shadow-2xl shadow-black/50">
        <h2 className="text-2xl sm:text-3xl text-center font-bold">
          {TEXT.login?.title}
        </h2>
        <p className="sm:text-lg font-medium text-gray-500 text-center mb-3">
          {TEXT.login?.subtitle}
        </p>

        {errorMessage && (
          <ErrorAlert
            className="max-w-[350px]"
            errorMessage={TEXT.errors?.login[errorMessage]}
            onClick={() => {
              setErrorMessage(null);
            }}
          />
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 justify-items-center"
        >
          <div className="w-full justify-items-center grid gap-2">
            <FormInput
              id="email"
              type="text"
              label={TEXT.form?.inputs.email.label}
              placeholder={TEXT.form?.inputs.email.placeholder}
              icon="fa-solid fa-at"
              className="w-full max-w-[350px]"
              errorMessage={TEXT.errors?.email[errors.email?.message]}
              register={register("email", EmailValidators())}
            />
            <FormInput
              id="password"
              type="password"
              label={TEXT.form?.inputs.password.label}
              placeholder={TEXT.form?.inputs.password.placeholder}
              icon="fa-solid fa-lock"
              className="w-full max-w-[350px]"
              errorMessage={TEXT.errors?.password[errors.password?.message]}
              register={{
                ...register("password", PasswordValidators()),
              }}
            />
          </div>
          <button
            className="relative flex items-center justify-center w-fit rounded-md py-2 px-9 text-lg sm:text-xl font-medium btn-primary text-white"
            type="submit"
          >
            {loadingUser && (
              <Spinner className="absolute left-2 w-5 h-5 fill-slate-200 animate-spin"></Spinner>
            )}
            {TEXT.form?.submit.login}
          </button>
        </form>

        <p className="text-sm sm:text-base text-center mt-3">
          <span className="block min-[320px]:inline">
            {TEXT.login?.no_account + " "}
          </span>
          <Link to={"/register"} className="text-blue-600 underline">
            {TEXT.login?.register_here}
          </Link>
        </p>
      </div>
    </>
  );
}
