import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchOverlay } from './components/common/SearchOverlay';
import { CookieBanner } from './components/common/CookieBanner';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomWrapPage } from './pages/CustomWrapPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { HelpContactPage } from './pages/HelpContactPage';
import { AboutPage } from './pages/AboutPage';
import { PolicyPage } from './pages/PolicyPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-ink selection:text-white">
      <ScrollToTop />

      {/* Primary Header */}
      <Header onOpenSearch={() => setSearchOpen(true)} />

      {/* Global Search Dialog */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Page Route View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/custom-wrap" element={<CustomWrapPage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/help" element={<HelpContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/policies" element={<PolicyPage />} />
          <Route path="/policies/:policyId" element={<PolicyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Studio Footer */}
      <Footer />

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
};

export default App;

