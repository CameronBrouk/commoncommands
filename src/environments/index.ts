import devEnvironment from './environment.dev'
import prodEnvironment from './environment.prod'

const environment =
  process.env.NODE_ENV !== 'production' ? devEnvironment : prodEnvironment

export default environment
