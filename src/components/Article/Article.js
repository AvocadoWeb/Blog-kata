import classes from '../ArticlesPage/ArticlesPage.module.scss'

import { format } from 'date-fns'
import { Button, Popconfirm } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ReactMarkdown from 'react-markdown'
import Like from '../../assets/images/Like.svg'
import Liked from '../../assets/images/Liked.svg'
import { fetchArticles, fetchFavoriteArticle, fetchFavoriteDelete, fetchRemoveArticle } from '../../store/articlesReducer'

const Article = (props) => {
  const token = localStorage.getItem('token')
  const { slug, title, tagList, description, user, date, favoritesCount, body } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useSelector((state) => state.users);
  const [likeCount, setLikeCount] = useState(0)

  const likeHandler = useCallback(
    (slug) => {
      if (token) {
        if (localStorage.getItem(`like_${slug}`) === 'true') {
          dispatch(fetchFavoriteDelete({ slug }))
          setLikeCount(likeCount - 1)
        } else {
          dispatch(fetchFavoriteArticle({ slug }))
          setLikeCount(likeCount + 1)
        }
      }
    },
    [dispatch, token, likeCount]
  )

  const removeArticleItem = () => {
    dispatch(fetchRemoveArticle({ slug, token }))
    navigate('/')
    setTimeout(() => {
      dispatch(fetchArticles({ pageNumber: 0 }))
    }, 300)
  }

  return (
    <article className={classes.item}>
      <div className={classes.article}>
        <div className={classes.article__info}>
          <div className={classes.article__info__header}>
            <Link to={`/articles/${slug}`}>
              <h2 className={classes.article__info__header__title}>{title}</h2>
            </Link>
            <Button className={classes.like} onClick={() => likeHandler(slug)}>
              {localStorage.getItem(`like_${slug}`) === 'true' ? (
                <img className={classes.svgLike} src={Liked} alt="liked" />
              ) : (
                <img className={classes.svgLike} src={Like} alt="like" />
              )}
            </Button>
            <span className={classes.article__info__header__countLike}>{favoritesCount}</span>
          </div>

          <div className={classes.article__info__tag}>
            {tagList?.map((tag, index) => (
              <div key={index} className={tagList[0] === null || tagList[0] === '' ? null : classes.tagname}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <p className={classes.article__content}>{description}</p>

        {body ? <ReactMarkdown className={classes.description}>{body}</ReactMarkdown> : null}
      </div>
      <div className={classes.user}>
        <div className={classes.user__cont}>
          <div className={classes.user__cont__info}>
            <span className={classes.user__cont__info__name}>{user?.username}</span>
            <span className={classes.user__cont__info__date}>
              {date ? format(new Date(date), 'MMMM d, yyyy') : 'null'}
            </span>
          </div>
          <img className={classes.user__cont__avatar} src={user?.image} alt="User Avatar" />
        </div>
        <div className={classes.descbuttons}>
          {body &&  user?.username === data?.username ? (
            <div className={classes.buttons}>
              <Popconfirm
                title="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                onConfirm={removeArticleItem}
              >
                <button className={classes.delete}>Delete</button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`}>
                <button className={classes.edit}>Edit</button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default Article
