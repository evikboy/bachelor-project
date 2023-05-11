import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { loginUser } from "../../redux/slices/auth/authSlice"
import styles from "./LoginPage.module.scss"

export const LoginPage = () => {
    const dispatch = useDispatch()
    const { error } = useSelector((state) => state.auth)

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = (values) => {
        const data = dispatch(loginUser(values))

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }

        if (!data.payload.error) reset({ password: '' })
    }

    return (
        <form className={`${styles.root} d-flex flex-column gap-4 m-auto`} onSubmit={handleSubmit(onSubmit)}>
            <img src="/logo.svg" alt="logo" className="mx-auto d-block"></img>


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
                    {...register("password", { required: "Пароль є обов'язковим полем"})}
                />
                {errors.password && <span className={`${styles["icon-error"]} icon-circle-exclamation`}></span>}
            </div>
            {errors.password && <div className={`${styles.error}`}>{errors.password.message}</div>}


            <button type="submit" className="btn-default">Вхід</button>

            {error && <div className={styles.error}>{ error }</div>}
            
            <Link to={'/register'} className={`${styles["login-form__btn-reg"]} m-auto`} >
                Реєстрація
            </Link>
            
        </form>    
    )
}