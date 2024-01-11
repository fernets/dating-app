export function generateAuthError(message) {
  switch (message) {
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким Email уже существует'
    case 'EMAIL_NOT_FOUND':
      return 'Пользователь с таким Email не существует'
    case 'INVALID_EMAIL':
    case 'INVALID_PASSWORD':
    case 'INVALID_DATA':
      return 'Email или пароль введены некорректно'
    case 'NOT_FOUND':
      return 'Что-то пошло не так...'
    default:
      return 'Слишком много попыток входа. Попробуйте позднее'
  }
}
