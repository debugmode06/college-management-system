import ArrearsPages from './pages/ArrearsPages';
// ...other imports

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ...other routes */}
        <Route path="/student/arrears" element={<ArrearsPages />} />
        {/* ...other routes */}
      </Routes>
    </BrowserRouter>
  );
}
