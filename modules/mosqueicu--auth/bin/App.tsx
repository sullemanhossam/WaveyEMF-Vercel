// // import { Suspense } from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // import Loading from '@/components/Loading';
// // import routes from '@/routes';
// // import { Layout } from '@/components/Layout';

// // export function App() {
// //   return (
// //     <Router>
// //       <Layout>
// //         <Suspense fallback={<Loading />}>
// //           <Routes>
// //             {routes.map(({ Component, ...props }, index) => {
// //               return <Route key={index} element={<Component />} {...props} />;
// //             })}
// //           </Routes>
// //         </Suspense>
// //       </Layout>
// //     </Router>
// //   );
// // }

// import React from 'react';
// import Login from './source/login/page';

// export const App = () => {
//   return <Login />;
// };

// import './App.css';
// The remote component provided by federation_provider
import ProviderButton from 'federation_provider/button';

export const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div>
        <ProviderButton />
      </div>
    </div>
  );
};
