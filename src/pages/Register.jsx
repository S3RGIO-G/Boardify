import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { FormInput } from "../components/FormInput";
import { useForm } from "react-hook-form";
import {
  ConfirmPassValidators,
  EmailValidators,
  PasswordValidators,
  UserNameValidators,
} from "../validators/FormValidators";
import { getUsersByField } from "../services/users.service";
import { Spinner } from "../components/Spinner";
import { useUser } from "../hooks/useUser";

export function Register() {
  const { registerUser, loadingUser, setLoadingUser } = useUser();
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
    const res = await getUsersByField("email", email.toLowerCase());

    if (res.length) {
      setError("email", { message: "in_use" });
      setFocus("email");
    } else {
      setData({ email, password });
      setValue("userName", "");
      clearErrors("userName");
    }
  };

  const handlerCreate = async ({ userName }) => {
    const res = await getUsersByField("username", userName);

    if (res.length) {
      setError("userName", { message: "in_use" });
      setFocus("userName");
    } else {
      await registerUser({ ...data, userName });
      navigate("/login");
    }
  };

  const onSubmit = async (e) => {
    if (loadingUser) return;
    setLoadingUser(true);
    setTimeout(async () => {
      const { email, password, userName } = e;

      if (!data) await handlerNext({ email, password });
      else await handlerCreate({ userName });
      setLoadingUser(false);
    }, 1000);
  };

  const onChangePassword = ({ target: { value } }) => {
    const { confirmPass } = watch();
    if (isSubmitted && value !== confirmPass)
      setError("confirmPass", { message: "distinct" });
    else clearErrors("confirmPass");
  };

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  return (
    <>
      <div className="w-full max-w-[475px] bg-white p-6 rounded-3xl shadow-2xl shadow-black/50">
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

                {/* PASSWORD */}
                <FormInput
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
                <FormInput
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
              <FormInput
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
            className="relative flex items-center justify-center gap-3 w-fit rounded-md py-2 px-9 text-lg sm:text-xl btn-primary text-white font-medium"
            type="submit"
          >
            {loadingUser && (
              <Spinner className="absolute left-2 w-5 h-5 fill-slate-200 animate-spin" />
            )}

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
