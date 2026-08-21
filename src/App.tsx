// src/App.tsx

import type { JSX } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppRouter from '@/AppRouter';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <AppRouter />
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;