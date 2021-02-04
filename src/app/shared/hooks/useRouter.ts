import { useHistory, useLocation, useParams } from 'react-router'

/**
 * This hook exposes objects/functions that are relevant to the current route
 * @description This Hook is just an abstraction of the hooks given by react-router.
 * @returns routeParams - current routes parameters
 * @returns navigateTo - function that navivigates you to the next route
 * @returns currentRoute - the current route
 */
export const useRouter = <Params = {}>() => {
  const routeParams = useParams<Params>()
  const history = useHistory()
  const location = useLocation()

  const currentRoute = location.pathname

  const navigateTo = history.push

  return { routeParams, currentRoute, navigateTo }
}
