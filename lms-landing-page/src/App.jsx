import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import Layout from './components/layout'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import AiTutor from './pages/AiTutor'
import LiveTutoring from './pages/LiveTutoring'
import StudyMaterial from './pages/StudyMaterial'
import Contact from './pages/Contact'

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: About })
const coursesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/courses', component: Courses })
const aiTutorRoute = createRoute({ getParentRoute: () => rootRoute, path: '/ai-tutor', component: AiTutor })
const liveTutoringRoute = createRoute({ getParentRoute: () => rootRoute, path: '/live-tutoring', component: LiveTutoring })
const studyMaterialRoute = createRoute({ getParentRoute: () => rootRoute, path: '/study-material', component: StudyMaterial })
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: Contact })

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  coursesRoute,
  aiTutorRoute,
  liveTutoringRoute,
  studyMaterialRoute,
  contactRoute,
])

const router = createRouter({ routeTree })

export default function App() {
  return <RouterProvider router={router} />
}
