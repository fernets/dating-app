import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersDataLoaded, loadUsersList } from '../../../store/users'

const UsersLoader = ({ children }) => {
  const dataLoaded = useSelector(getUsersDataLoaded())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataLoaded) {
      dispatch(loadUsersList())
    }
  }, [])

  if (!dataLoaded) {
    return 'Loading...'
  }

  return children
}

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UsersLoader
