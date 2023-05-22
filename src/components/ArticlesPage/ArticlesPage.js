import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import { useEffect } from 'react'
import { fetchArticles, setPageNumber } from '../../store/articlesReducer'
import Spinner from '../Spinner/Spinner'

import classes from './ArticlesPage.module.scss'

import Article from '../Article'

const ArticlesPage = () => {
  const { articles, articlesCount, pageNumber, isLoading } = useSelector((state) => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles({ pageNumber: pageNumber * 5 - 5 }))
  }, [dispatch, pageNumber])

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.articles}>
          <section className={classes.articles__list}>
            {articles.map((el, index) => (
              <Article
                key={index}
                slug={el.slug}
                title={el.title}
                tagList={el.tagList}
                description={el.description}
                user={el.author}
                date={el.createdAt}
                favoritesCount={el.favoritesCount}
                favorited={el.favorited}
              />
            ))}
          </section>
          <Pagination
            className={classes.pagination}
            defaultCurrent={1}
            showSizeChanger={false}
            pageSize={5}
            current={pageNumber}
            total={articlesCount}
            onChange={(e) => dispatch(setPageNumber(e))}
          />
        </div>
      )}
    </>
  )
}

export default ArticlesPage
