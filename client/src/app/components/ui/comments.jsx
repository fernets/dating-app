import React, { useEffect } from 'react'
import { orderBy } from 'lodash'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  getCommentsList,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from '../../store/comments'
import { useParams } from 'react-router-dom'

const Comments = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const isCommentsLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getCommentsList())

  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const handleSubmit = async (data) => {
    await createComment(data)
    dispatch(createComment({ ...data, pageId: userId }))
  }

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id))
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isCommentsLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
