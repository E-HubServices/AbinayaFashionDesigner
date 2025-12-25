import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Works from './pages/Works'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import { ConvexClientProvider } from "./components/ConvexClientProvider"
import { LanguageProvider } from "./contexts/LanguageContext"
import { AdminProvider } from "./contexts/AdminContext"
import FloatingChatIcon from "./components/FloatingWhatsApp"
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"

function App() {
    return (
        <div className="font-sans antialiased text-foreground bg-background">
            <ConvexClientProvider>
                <LanguageProvider>
                    <AdminProvider>
                        <Router>
                            <ScrollToTop />
                            <div className="min-h-screen w-full flex flex-col">
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/works" element={<Works />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/admin" element={<Admin />} />
                                    <Route path="*" element={<Home />} />
                                </Routes>
                                <FloatingChatIcon />
                            </div>
                        </Router>
                    </AdminProvider>
                </LanguageProvider>
            </ConvexClientProvider>
        </div>
    )
}

export default App
