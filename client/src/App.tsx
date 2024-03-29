import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Login = lazy(() => import('./pages/auth/login'));
const Register = lazy(() => import('./pages/auth/register'));
const Projects = lazy(() => import('./pages/projects'));
const Workshops = lazy(() => import('./pages/workshops'));
const ProjectsView = lazy(() => import('./pages/projects/view'));
const WorkshopsView = lazy(() => import('./pages/workshops/view'));
const Project = lazy(() => import('./pages/projects/project'));
const MyProjects = lazy(() => import('./pages/user/student/features/projects'));
const Student = lazy(() => import('./pages/user/student'));
const Institute = lazy(() => import('./pages/user/institute'));
const NotFound = lazy(() => import('./components/not-found'));
const MyWorkshops = lazy(() => import('./pages/user/institute/workshops'));
const StudentDashboard = lazy(() => import('./pages/user/student/features/dashboard'));
const InstituteDashboard = lazy(() => import('./pages/user/institute/dashboard'));
const AddProject = lazy(() => import('./pages/user/student/features/add-project'));
const EditProfile = lazy(() => import('./pages/user/student/features/edit'));
import Navbar from './components/navbar';
import Footer from './components/footer';
import Loader from './components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { Toaster } from 'react-hot-toast';
import { login, logout } from './redux/userSlice';
import ServerDown from './components/server-down';

function App() {
  const logged = useSelector((state: RootState) => state.user.logged);
  const type = useSelector((state: RootState) => state.user.type);
  const profileRoute = logged ? (
    type === 'student'
      ? <Route path="/profile"  >

        <Route index={true} element={<Student />} />
        <Route path="projects" element={<MyProjects />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="add" element={<AddProject />} />
        <Route path="edit" element={<EditProfile />} />

      </Route>
      : <Route path="/profile"  >

        <Route index={true} element={<Institute />} />
        <Route path="workshops" element={<MyWorkshops />} />
        <Route path="dashboard" element={<InstituteDashboard />} />

      </Route>
  ) : null;

  const loginRoute = !logged ? (
    <Route path="/auth/login" element={<Login />} />
  ) : null;
  const registerRoute = !logged ? (
    <Route path="/auth/register" element={<Register />} />
  ) : null;

  const [isLoading, setLoading] = useState(true)

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(process.env.SERVER_URL)
    const setSession = async () => {
      try {
        const response = await fetch(process.env.SERVER_URL + 'auth/get-details', {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('jwt') || ''
          },
        });
        const data = await response.json();
        if (data.success) {
          dispatch(login({ details: data.details }));
        }else{
          if(sessionStorage.getItem('jwt')){
            dispatch(logout());
          }
        }
      }catch{
        return <ServerDown/>
      }finally {
        setLoading(false);
      }
    };
    setSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Suspense fallback={<Loader />}>
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/workshops" element={<Workshops />} />
            {profileRoute}
            {loginRoute}
            {registerRoute}
            <Route path="/projects/view" element={<ProjectsView />} />
            <Route path="/workshops/view" element={<WorkshopsView />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        )}
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
export default App
