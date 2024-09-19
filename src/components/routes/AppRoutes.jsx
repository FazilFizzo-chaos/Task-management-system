import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from '../Auth/Login.jsx'
import RegisterComponent from '../Auth/RegisterComponent.jsx'
import HeaderComponent from '../pages/Header.jsx'
import AuthProvider, { useAuth } from '../contexts/AuthContext.jsx'
import ProjectDashboard from '../Dashboard/ProjectDashboard.jsx';
import ProjectDetail from '../Project/ProjectDetail.jsx';
import ProjectForm from '../Project/ProjectForm.jsx';
import ProjectList from '../Project/ProjectList.jsx';

// function AuthenticatedRoute({children}) {
//     const authContext = useAuth()

//     if(authContext.isAuthenticated)
//         return children

//     return <Navigate to="/" />
// }

function AppRoutes() {
    return (
        <AuthProvider>
         <BrowserRouter>
         <HeaderComponent />
         <Routes>
           <Route path='/login' element={ <LoginComponent />} />

           <Route path='/register' element={ <RegisterComponent /> } />

       <Route path="/dashboard" element={<ProjectDashboard />}>
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
        </Route>
         </Routes>
         </BrowserRouter>
        </AuthProvider>
    )
}

export default AppRoutes;