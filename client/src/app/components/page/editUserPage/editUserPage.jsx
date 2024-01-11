import React, { useEffect, useState } from 'react'
import { validator } from '../../../utils/validator'
import BackHistoryButton from '../../common/backButton'
import MultiSelectField from '../../common/form/multiSelectField'
import RadioField from '../../common/form/radioField'
import SelectField from '../../common/form/selectField'
import TextField from '../../common/form/textField'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQualities,
  getQualitiesLoadingStatus
} from '../../../store/qualities'
import {
  getProfessionsList,
  getProfessionsLoadingStatus
} from '../../../store/professions'
import { getCurrentUserData, updateUserData } from '../../../store/users'

const EditUserPage = () => {
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUserData())
  const [data, setData] = useState()
  const professions = useSelector(getProfessionsList())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }))
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }))

  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    dispatch(
      updateUserData({
        ...data,
        qualities: data.qualities.map((qual) => qual.value)
      })
    )
  }

  function getQualitiesByIds(QualitiesIds) {
    const qualitiesArray = []
    for (const qualId of QualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
    return qualitiesArray
  }

  const transformData = (data) => {
    return getQualitiesByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }))
  }

  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      })
    }
  }, [professionsLoading, qualitiesLoading, currentUser, data])

  useEffect(() => {
    if (data && isLoading) {
      setLoading(false)
    }
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Email введен некорректно' }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите вашу профессию"
                name="profession"
                defaultOption="Choose..."
                options={professionsList}
                value={data.profession}
                onChange={handleChange}
                error={errors.profession}
              />
              <RadioField
                label="Выберите ваш пол"
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
              />
              <MultiSelectField
                label="Выберите ваши качества"
                options={qualitiesList}
                defaultValue={data.qualities}
                onChange={handleChange}
                name="qualities"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
