import Checkbox from 'antd/lib/checkbox/Checkbox'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchCurrentUser, fetchLoginUser, fetchRegisterUser, setUserData } from '../../store/usersReducer'

import classes from './SignUp.module.scss'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email, password } = useSelector((state) => state.users)
  const token = localStorage.getItem('token')

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const onSubmit = (data) => {
    dispatch(fetchRegisterUser(data))
    dispatch(setUserData(data))
    reset()
  }

  useEffect(() => {
    if (token) {
      dispatch(fetchLoginUser({ email, password }))
      dispatch(fetchCurrentUser({ token }))
      navigate('/')
    }
  }, [token, email, password, navigate, dispatch])

  return (
    <div className={classes.up}>
      <h3 className={classes.up__title}>Create new account</h3>
      <form className={classes.up__form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.up__form__label}>
          <span className={classes.up__form__label__title}>Username</span>
          <input
            className={errors?.username?.message ? classes.required : classes.input}
            placeholder="Username"
            {...register('username', {
              required: 'Username is required field',
              minLength: {
                value: 3,
                message: 'Username must contain 3-20 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must contain 3-20 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Username must contain only A-Z, a-z, 0-9',
              },
            })}
          />
          {errors?.username && <p className={classes.validate}>{errors?.username?.message || 'Error!'}</p>}
        </label>
        <label className={classes.up__form__label}>
          <span className={classes.up__form__label__title}>Email address</span>
          <input
            className={errors?.email?.message ? classes.required : classes.input}
            placeholder="Email address"
            {...register('email', {
              required: 'Email address is required field',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors?.email && <p className={classes.validate}>{errors?.email?.message || 'Error!'}</p>}
        </label>
        <label className={classes.up__form__label}>
          <span className={classes.up__form__label__title}>Password</span>
          <input
            className={errors?.password?.message ? classes.required : classes.input}
            type="password"
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
        <label className={classes.up__form__label}>
          <span className={classes.up__form__label__title}>Repeat Password</span>
          <input
            className={errors?.repeatPassword?.message ? classes.required : classes.input}
            type="password"
            placeholder="Repeat Password"
            {...register('repeatPassword', {
              required: 'Repeat password is required field',
              validate: (value) => getValues('password') === value || 'Passwords must match',
            })}
          />
          {errors?.repeatPassword && <p className={classes.validate}>{errors?.repeatPassword?.message || 'Error!'}</p>}
        </label>
        <div className={classes.up__form__line}></div>

        <Checkbox className={classes.up__form__checkbox}>
          <span className={classes.description}> I agree to the processing of my personal information</span>
        </Checkbox>
        <button className={classes.up__form__create}>Create</button>
      </form>
      <span className={classes.up__already}>
        Already have an account?{' '}
        <Link style={{ color: '#1890FF' }} to={'/sign-in'}>
          Sign In
        </Link>
        .
      </span>
    </div>
  )
}

export default SignUp
