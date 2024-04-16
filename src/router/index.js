import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/main';
import ErrorPage from '../pages/error';
import PageList from '../utils/pages';

const PageRouters = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: PageList,
  },
]);

export default PageRouters;
