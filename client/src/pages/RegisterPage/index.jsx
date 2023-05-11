import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { checkIsAuth, registerUser, clearError } from "../../redux/slices/auth/authSlice"

import styles from "./RegisterPage.module.scss"

export const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)

    useEffect(() => {
        dispatch(clearError())
        if (isAuth) navigate('/')
    }, [isAuth, navigate, dispatch])

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = (values) => {
        dispatch(registerUser(values))

        error && reset({ password: '' })
    }

    return (
        <form className={`${styles.root} d-flex flex-column gap-4 m-auto`} onSubmit={handleSubmit(onSubmit)}>
            <img src="/logo.svg" alt="logo" className="mx-auto d-block"></img>


            <div className="d-flex align-items-center">
                <input 
                    className={`textCtrl w-100 ${errors.username ? styles["outline-error"] : ''}`}
                    type="text" 
                    placeholder="Логін"
                    autoComplete="nope"
                    {...register("username", { required: "Логін є обов'язковим полем" })} 
                />
                {errors.username && <span className={`${styles["icon-error"]} icon-circle-exclamation`}></span>}
            </div>
            {errors.username && <div className={`${styles.error} `}>{errors.username.message}</div>}


            <div className="d-flex align-items-center">
                <input 
                    className={`textCtrl w-100 ${errors.email ? styles["outline-error"] : ''}`}
                    type="text"
                    placeholder="Email"
                    autoComplete="nope"
                    {...register("email", { required: "Email є обов'язковим полем", pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Неправильний формат email'}})}
                />
                {errors.email && <span className={`${styles["icon-error"]} icon-circle-exclamation`}></span>}
            </div>
            {errors.email && <div className={`${styles.error} `}>{errors.email.message}</div>}


            <div className="d-flex align-items-center">
                <input
                    className={`textCtrl w-100 ${errors.password ? styles["outline-error"] : ''}`}
                    type="password" 
                    placeholder="Пароль"
                    autoComplete="nope"
                    {...register("password", { required: "Пароль є обов'язковим полем", minLength: {value: 6, message: 'Пароль має бути довжиною не менше 6 символів'}})}
                />
                {errors.password && <span className={`${styles["icon-error"]} icon-circle-exclamation`}></span>}
            </div>
            {errors.password && <div className={`${styles.error}`}>{errors.password.message}</div>}


            <button
                type="submit" 
                className={`${styles["register-form__btn-reg"]} btn-default`}
            >
                Створити акаунт
            </button>

            {error && <div className={styles.error}>{ error }</div>}
        </form>    
    )
}