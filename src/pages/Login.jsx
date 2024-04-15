import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

import {
  EmailValidators,
  PasswordValidators,
} from "../validators/FormValidators.js";
import { useUser } from "../hooks/useUser.js";
import { useLanguage } from "../hooks/useLanguage.js";

import ErrorAlert from "../components/ErrorAlert.jsx";
import Spinner from "../components/Spinner.jsx";
import Input from "../components/Forms/Form/Elements/Input.jsx";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loginUser, loadingUser } = useUser();
  const { texts: TEXT } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    setErrorMessage(null);
    const { email, password } = e;
    try {
      await loginUser({ email: email.toLowerCase(), password });
      navigate("/boards");
    } catch (err) {
      setErrorMessage("default");
      console.error(TEXT.errors?.login["default"]);
    }
  };

  const autoCompleteInputs = () => {
    reset();
    const { email, password } = formRef.current;
    email.value = "tester@gmail.com";
    password.value = "Tester1234";
    onSubmit({ email: email.value, password: password.value });
  };

  return (
    <>
      <Helmet title={TEXT.titles?.login} />

      <div className="w-full max-w-[350px] sm:max-w-[425px] bg-white p-6 rounded-3xl shadow-2xl shadow-black/50 mt-20 mb-10">
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
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 justify-items-center"
        >
          <div className="w-full justify-items-center grid gap-2">
            <Input
              id="email"
              type="text"
              label={TEXT.form?.inputs.email.label}
              placeholder={TEXT.form?.inputs.email.placeholder}
              icon="fa-solid fa-at"
              className="w-full max-w-[350px]"
              errorMessage={TEXT.errors?.email[errors.email?.message]}
              register={register("email", EmailValidators())}
            />
            <Input
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
            type="submit"
            className="relative flex items-center justify-center rounded-md py-1 sm:py-2 px-8 text-lg sm:text-xl font-medium btn-primary text-white"
          >
            <Spinner
              show={loadingUser}
              className="absolute left-2 w-5 h-5 fill-slate-200 animate-spin"
            />
            {TEXT.form?.submit.login}
          </button>
        </form>

        <p className="text-sm sm:text-base text-center mt-3">
          <span className="block min-[320px]:inline">
            {TEXT.login?.try_it}{" "}
          </span>
          <button
            onClick={autoCompleteInputs}
            className="text-blue-600 underline"
          >
            {TEXT.login?.click_here}
          </button>
        </p>

        <p className="text-sm sm:text-base text-center mt-2">
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
