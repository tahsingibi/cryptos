import { RouterProvider } from 'react-router-dom';
import PageRouters from './router';
import StoreProvider from './store/provider';

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={PageRouters} />
    </StoreProvider>
  );
}
