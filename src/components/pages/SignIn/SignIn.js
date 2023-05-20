import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { loginUser } from '../../../services/userService'

import classes from './SignIn.module.scss'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password }))
    reset()
    navigate('/')
  }
  useEffect(() => {
    if (token) navigate('/')
  }, [token, navigate])

  return (
    <div className={classes.in}>
      <h2 className={classes.in__title}>Sign In</h2>
      <form className={classes.in__form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.in__form__label}>
          <span className={classes.in__form__label__title}>Email address</span>
          <input
            className={errors?.email?.message ? classes.required : classes.input}
            placeholder="Email address"
            {...register('email', {
              required: 'Email is required field',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors?.email && <p className={classes.validate}>{errors?.email?.message || 'Error!'}</p>}
        </label>
        <label className={classes.in__form__label}>
          <span className={classes.in__form__label__title}>Password</span>
          <input
            type="password"
            className={errors?.password?.message ? classes.required : classes.input}
            placeholder="Password"
            {...register('password', {
              required: 'Password is required field',
              minLength: {
                value: 6,
                message: 'Password must contain 6-40 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must contain 6-40 characters',
              },
              pattern: {
                value: /^(?=.*\d)[0-9a-zA-Z]{8,}$/,
                message: 'Password must contain A-Z(a-z) and 0-9',
              },
            })}
          />
          {errors?.password && <p className={classes.validate}>{errors?.password?.message || 'Error!'}</p>}
        </label>
        <button className={classes.in__form__create}>Login</button>
      </form>
      <span className={classes.in__already}>
        Don’t have an account?{' '}
        <Link style={{ color: '#1890FF' }} to={'/sign-up'}>
          Sign Up
        </Link>
        .
      </span>
    </div>
  )
}

export default SignIn
