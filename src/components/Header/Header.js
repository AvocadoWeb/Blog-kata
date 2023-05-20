import { Link, Outlet, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setLogOut } from '../../redux/usersReducer'
import { getCurrentUser } from '../../services/userService'
import noAvatar from '../../img/no-avatar.svg'

import classes from './Header.module.scss'

const Header = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username, image } = useSelector((state) => state.users)

  useEffect(() => {
    if (token) dispatch(getCurrentUser({ token }))
  }, [token, dispatch])

  const userLogOut = () => {
    dispatch(setLogOut())
    navigate('/')
  }

  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to="/">
          <h1 className={classes.header__title}>Realworld Blog</h1>
        </Link>
        {token ? (
          <div className={classes.header__login}>
            <Link to="/new-article">
              <button className={classes.header__login__createarticle}>Create article</button>
            </Link>
            <Link to="/profile">
              <div className={classes.header__login__profile}>
                <span className={classes.header__login__profile__username}>{username}</span>
                <img
                  className={classes.header__login__profile__useravatar}
                  src={image ? image : noAvatar}
                  alt="User Avatar"
                />
              </div>
            </Link>
            <button className={classes.header__login__logout} onClick={userLogOut}>
              Log Out
            </button>
          </div>
        ) : (
          <div className={classes.header__auth}>
            <Link to="/sign-in">
              <button className={classes.header__auth__in}>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button className={classes.header__auth__up}>Sign Up</button>
            </Link>
          </div>
        )}
      </header>
      <Outlet />
    </React.Fragment>
  )
}

export default Header
