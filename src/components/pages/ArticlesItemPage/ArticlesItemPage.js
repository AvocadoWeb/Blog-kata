import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getArticleItem } from '../../../services/articlesService'
import Article from '../../Article/Article'
import Spinner from '../../Spinner/Spinner'

import classes from '../../ArticlesPage/ArticlesPage.module.scss'

const ArticlesItemPage = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const { articleItem, isLoading } = useSelector((state) => state.articles)

  useEffect(() => {
    dispatch(getArticleItem({ slug }))
  }, [dispatch, slug])

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.articles}>
      <section className={classes.articles__list}>
        <Article
          slug={articleItem.slug}
          title={articleItem.title}
          tagList={articleItem.tagList}
          favoritesCount={articleItem.favoritesCount}
          user={articleItem.author}
          date={articleItem.createdAt}
          description={articleItem.description}
          body={articleItem.body}
        />
      </section>
    </div>
  )
}

export default ArticlesItemPage
