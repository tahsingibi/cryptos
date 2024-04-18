import { RouterProvider } from 'react-router-dom';
import PageRouters from './router';

export default function App() {
  return <RouterProvider router={PageRouters} />;
}
