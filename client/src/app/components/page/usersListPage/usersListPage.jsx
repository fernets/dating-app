import React, { useState, useEffect } from 'react'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import { paginate } from '../../../utils/paginate'
import UsersTable from '../../ui/usersTable'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProfessionsList,
  getProfessionsLoadingStatus,
  loadProfessionsList
} from '../../../store/professions'
import { getCurrentUserId, getUsersList } from '../../../store/users'

const UsersListPage = () => {
  const users = useSelector(getUsersList())
  const currentUserId = useSelector(getCurrentUserId())
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const professions = useSelector(getProfessionsList())
  const professionsIsLoading = useSelector(getProfessionsLoadingStatus())
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

  const pageSize = 8

  const handleToggleBookmark = (id) => {
    const updatedUsers = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark }
      }
      return user
    })
    // setUsers(updatedUsers)
    console.log(updatedUsers)
  }

  useEffect(() => {
    dispatch(loadProfessionsList())
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') setSearchQuery('')
    setSelectedProf(item)
  }

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined)
    setSearchQuery(target.value)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchQuery
        ? data.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          )
        : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) ===
              JSON.stringify(selectedProf._id)
          )
        : data

      return filteredUsers.filter((user) => user._id !== currentUserId)
    }

    const filteredUsers = filterUsers(users)

    const usersCount = filteredUsers.length

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const usersCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className="d-flex">
        {professions && !professionsIsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}

        <div className="d-flex flex-column">
          <SearchStatus length={usersCount} />
          <input
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          {usersCount > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={usersCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return 'loading...'
}

export default UsersListPage
