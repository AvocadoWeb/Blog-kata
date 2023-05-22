import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchArticleItem } from '../../store/articlesReducer'
import Article from '../../components/Article/Article'
import Spinner from '../../components/Spinner/Spinner'

import classes from '../../components/ArticlesPage/ArticlesPage.module.scss'

const ArticlesItemPage = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const { articleItem, isLoading } = useSelector((state) => state.articles)

  useEffect(() => {
    dispatch(fetchArticleItem({ slug }))
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
