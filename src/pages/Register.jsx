import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  ConfirmPassValidators,
  EmailValidators,
  PasswordValidators,
  UserNameValidators,
} from "../validators/FormValidators";
import { useUser } from "../hooks/useUser";
import { useLanguage } from "../hooks/useLanguage";

import Spinner from "../components/Spinner";
import Input from "../components/Forms/Form/Elements/Input";

export default function Register() {
  const { registerUser, loadingUser, checkAvailabilityByField } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { texts: TEXT } = useLanguage();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
    setError,
    clearErrors,
    setValue,
    setFocus,
  } = useForm();

  const handlerNext = async ({ email, password }) => {
    const isAvailable = await checkAvailabilityByField(
      "email",
      email.toLowerCase()
    );

    if (!isAvailable) {
      setError("email", { message: "in_use" });
      setFocus("email");
    } else {
      setData({ email, password });
      setValue("userName", "");
      clearErrors("userName");
    }
  };

  const handlerCreate = async ({ userName }) => {
    const isAvailable = await checkAvailabilityByField("username", userName);

    if (!isAvailable) {
      setError("userName", { message: "in_use" });
      setFocus("userName");
    } else {
      await registerUser({ ...data, userName });
      navigate("/login");
    }
  };

  const onSubmit = async (e) => {
    if (loadingUser) return;
    const { email, password, userName } = e;

    if (!data) await handlerNext({ email, password });
    else await handlerCreate({ userName });
  };

  const onChangePassword = ({ target: { value } }) => {
    const { confirmPass } = watch();
    if (isSubmitted && value !== confirmPass)
      setError("confirmPass", { message: "distinct" });
    else clearErrors("confirmPass");
  };

  return (
    <>
      <Helmet title={TEXT.titles?.register} />

      <div className="w-full max-w-[350px] sm:max-w-[425px] bg-white p-6 rounded-3xl shadow-2xl shadow-black/50 mt-20 mb-10">
        <h2 className="text-2xl sm:text-3xl text-center font-bold">
          {TEXT.register?.title}
        </h2>

        <p className="sm:text-lg font-medium text-gray-500 text-center mb-3 sm:mb-4">
          {TEXT.register?.subtitle}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4  justify-items-center"
        >
          <div className="w-full justify-items-center grid gap-2">
            {!data ? (
              <>
                {/* EMAIL */}
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

                {/* PASSWORD */}
                <Input
                  id="password"
                  type="password"
                  label={TEXT.form?.inputs.password.label}
                  placeholder={TEXT.form?.inputs.password.placeholder}
                  icon="fa-solid fa-lock"
                  className="w-full max-w-[350px]"
                  errorMessage={TEXT.errors?.password[errors.password?.message]}
                  register={{
                    ...register(
                      "password",
                      PasswordValidators({ onChange: onChangePassword })
                    ),
                  }}
                />

                {/* CONFIRMPASSWORD */}
                <Input
                  id="confirmPass"
                  type="password"
                  label={TEXT.form?.inputs.confirmPass.label}
                  placeholder={TEXT.form?.inputs.confirmPass.placeholder}
                  icon="fa-solid fa-lock"
                  className="w-full max-w-[350px]"
                  errorMessage={
                    TEXT.errors?.confirmPass[errors.confirmPass?.message]
                  }
                  register={{
                    ...register("confirmPass", ConfirmPassValidators(watch())),
                  }}
                />
              </>
            ) : (
              // USERNAME
              <Input
                id="userName"
                type="text"
                label={TEXT.form?.inputs.userName.label}
                placeholder={TEXT.form?.inputs.userName.placeholder}
                icon="fa-solid fa-user"
                className="w-full max-w-[350px]"
                errorMessage={TEXT.errors?.userName[errors.userName?.message]}
                register={{
                  ...register("userName", UserNameValidators()),
                }}
              />
            )}
          </div>

          <button
            type="submit"
            className="relative flex items-center rounded-md py-1 sm:py-2 px-8 text-lg sm:text-xl btn-primary text-white font-medium"
          >
            <Spinner
              show={loadingUser}
              className="absolute left-2 w-5 h-5 fill-slate-200 animate-spin"
            />

            {!data
              ? TEXT.form?.submit.register.next
              : TEXT.form?.submit.register.create}
          </button>
        </form>

        <p className="text-sm sm:text-base text-center mt-3">
          <span className="block min-[320px]:inline">
            {TEXT.register?.have_account + " "}
          </span>
          <Link to={"/login"} className="text-blue-600 underline">
            {TEXT.register?.login_here}
          </Link>
        </p>
      </div>
    </>
  );
}
