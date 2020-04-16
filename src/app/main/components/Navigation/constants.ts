interface Route {
  path: string
  label: string
}
export const routes: Route[] = [
  { path: '/home', label: 'Home' },
  { path: '/login', label: 'Sign In' },
]

const loggedInRoutes = []
