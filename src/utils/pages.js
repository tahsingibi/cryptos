import Homepage from '../pages/homepage';
import ErrorPage from '../pages/error';

const PageList = [
  {
    path: '/',
    element: <Homepage />,
    title: 'Homepage',
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default PageList;
