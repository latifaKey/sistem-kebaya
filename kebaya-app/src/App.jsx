import React, { useState } from 'react';
import { CheckCircle2, Boxes } from 'lucide-react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingWhatsapp } from './components/common/FloatingWhatsapp';

// Storefront components
import { HeroBanner } from './components/storefront/HeroBanner';
import { CatalogView } from './components/storefront/CatalogView';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { BookingModal } from './components/storefront/BookingModal';
import { JanjiTemuModal, HowToRentView } from './components/storefront/JanjiTemuModal';

// Admin Backoffice components (Bywazu Attire Studio Backoffice)
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardView } from './components/admin/DashboardView';
import { BookingListView } from './components/admin/BookingListView';
import { BookingDetailModal } from './components/admin/BookingDetailModal';
import { InvoiceModal } from './components/admin/InvoiceModal';
import { PaymentView } from './components/admin/PaymentView';
import { TransactionView } from './components/admin/TransactionView';
import { ExpenseView } from './components/admin/ExpenseView';
import { NotificationCenter } from './components/admin/NotificationCenter';
import { KebayaCatalogAdmin } from './components/admin/KebayaCatalogAdmin';
import {
  AppointmentAdminView,
  InventoryStatusView,
  MaintenanceLaundryView,
  CustomerCRMView,
  BepAnalysisView,
  ReportsView,
  ActivityLogView,
  SettingsView,
  RentalCalendarAdminView,
  InvoiceGeneratorListView
} from './components/admin/AdditionalAdminViews';

// Data
import { INITIAL_KEBAYA_LIST } from './data/kebayaData';
import { INITIAL_BOOKINGS } from './data/bookingsData';
import { INITIAL_NOTIFICATIONS } from './data/financialData';

export default function App() {
  // Mode: 'client' (Public Storefront) vs 'admin' (Studio Management)
  const [currentMode, setCurrentMode] = useState('client');

  // Client navigation tab: 'catalog', 'appointment', 'terms'
  const [activeClientTab, setActiveClientTab] = useState('catalog');

  // Admin navigation page: 'dashboard', 'bookings', 'notifications', 'catalog-admin', 'payments', 'transactions', 'expenses', etc.
  const [activeAdminPage, setActiveAdminPage] = useState('dashboard');

  // Core stateful data
  const [kebayas, setKebayas] = useState(INITIAL_KEBAYA_LIST);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Active Modals
  const [detailKebaya, setDetailKebaya] = useState(null);
  const [bookingKebaya, setBookingKebaya] = useState(null);
  const [bookingPreselectedDate, setBookingPreselectedDate] = useState(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  // Admin Modals
  const [activeBookingDetail, setActiveBookingDetail] = useState(null);
  const [activeInvoiceBookingId, setActiveInvoiceBookingId] = useState(null);

  // Toast alert
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // HANDLERS
  const handleBookingSuccess = (newBooking) => {
    // Prepend to bookings list
    setBookings([newBooking, ...bookings]);

    // Add to notifications
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'booking',
      title: 'Reservasi Baru Masuk',
      message: `Reservasi baru ${newBooking.id} oleh ${newBooking.customerName} (${newBooking.kebayaName}).`,
      date: 'Baru saja',
      urgent: true,
      bookingId: newBooking.id
    };
    setNotifications([newNotif, ...notifications]);

    showToast(`Booking ${newBooking.id} berhasil dicatat ke sistem studio!`);
  };

  const handleMarkAsPaid = (bookingId) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          paidAmount: b.totalPrice,
          remainingAmount: 0,
          paymentStatus: 'PAID'
        };
      }
      return b;
    }));

    // Update active modals if currently viewed
    if (activeBookingDetail && activeBookingDetail.id === bookingId) {
      setActiveBookingDetail({
        ...activeBookingDetail,
        paidAmount: activeBookingDetail.totalPrice,
        remainingAmount: 0,
        paymentStatus: 'PAID'
      });
    }

    // Remove or resolve unpaid notification
    setNotifications(notifications.filter(n => n.bookingId !== bookingId));

    showToast(`Pembayaran ${bookingId} telah ditandai LUNAS!`);
  };

  const handleUpdateStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    if (activeBookingDetail) {
      setActiveBookingDetail({ ...activeBookingDetail, status: newStatus });
    }
    showToast(`Status reservasi ${bookingId} diubah menjadi ${newStatus}!`);
  };

  const handleDeleteBooking = (bookingId) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
    setActiveBookingDetail(null);
    showToast(`Reservasi ${bookingId} telah dihapus.`);
  };

  const handleToggleKebayaStatus = (kebayaId) => {
    setKebayas(kebayas.map(k => {
      if (k.id === kebayaId) {
        const nextStatus = k.status === 'Available' ? 'Maintenance' : 'Available';
        return { ...k, status: nextStatus };
      }
      return k;
    }));
    showToast(`Status kebaya diperbarui.`);
  };

  const handleAddKebaya = (newK) => {
    setKebayas([newK, ...kebayas]);
    showToast(`Kebaya baru ${newK.code} berhasil ditambahkan ke katalog!`);
  };

  // Find invoice booking object
  const activeInvoiceBooking = bookings.find(b => b.id === activeInvoiceBookingId);

  // Unpaid notifications count
  const unpaidCount = notifications.filter(n => n.urgent).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-stone-800">

      {/* Toast Notification Banner - Frosted Glass Style */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 btn-glass-dark px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* RENDER MODE: CLIENT WEBSITE */}
      {currentMode === 'client' && (
        <>
          <Navbar
            activeTab={activeClientTab}
            setActiveTab={setActiveClientTab}
            currentMode={currentMode}
            setCurrentMode={setCurrentMode}
          />

          <main className="flex-1">
            {activeClientTab === 'catalog' && (
              <>
                <HeroBanner
                  onExploreCatalog={() => {
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenAppointment={() => setActiveClientTab('appointment')}
                />
                <div id="catalog-section">
                  <CatalogView
                    kebayas={kebayas}
                    onSelectKebaya={(k) => setDetailKebaya(k)}
                  />
                </div>
              </>
            )}

            {activeClientTab === 'appointment' && (
              <div className="py-12">
                <JanjiTemuModal onClose={() => setActiveClientTab('catalog')} />
              </div>
            )}

            {activeClientTab === 'terms' && (
              <HowToRentView />
            )}
          </main>

          <Footer />
          <FloatingWhatsapp />

          {/* Client Modals */}
          {detailKebaya && (
            <ProductDetailModal
              kebaya={detailKebaya}
              onClose={() => setDetailKebaya(null)}
              onOpenBooking={(k, date) => {
                setDetailKebaya(null);
                setBookingKebaya(k);
                setBookingPreselectedDate(date);
              }}
              onOpenAppointment={() => {
                setDetailKebaya(null);
                setActiveClientTab('appointment');
              }}
            />
          )}

          {bookingKebaya && (
            <BookingModal
              kebaya={bookingKebaya}
              preselectedDate={bookingPreselectedDate}
              onClose={() => {
                setBookingKebaya(null);
                setBookingPreselectedDate(null);
              }}
              onBookingSuccess={handleBookingSuccess}
            />
          )}
        </>
      )}

      {/* RENDER MODE: STUDIO ADMIN (BACKOFFICE) */}
      {currentMode === 'admin' && (
        <AdminLayout
          activePage={activeAdminPage}
          setActivePage={setActiveAdminPage}
          onExitToClient={() => setCurrentMode('client')}
          unpaidCount={unpaidCount}
        >
          {activeAdminPage === 'dashboard' && (
            <DashboardView
              kebayas={kebayas}
              bookings={bookings}
              notifications={notifications}
              onNavigateToBookings={() => setActiveAdminPage('bookings')}
              onOpenBookingDetail={(b) => setActiveBookingDetail(b)}
              onOpenInvoice={(id) => setActiveInvoiceBookingId(id)}
            />
          )}

          {activeAdminPage === 'bookings' && (
            <BookingListView
              bookings={bookings}
              kebebaList={kebayas}
              onOpenBookingDetail={(b) => setActiveBookingDetail(b)}
              onOpenInvoice={(id) => setActiveInvoiceBookingId(id)}
              onMarkAsPaid={handleMarkAsPaid}
              onNewBookingClick={() => {
                setBookingKebaya(kebayas[0]);
                setBookingPreselectedDate('2026-11-28');
              }}
            />
          )}

          {activeAdminPage === 'notifications' && (
            <NotificationCenter
              notifications={notifications}
              onOpenInvoice={(id) => setActiveInvoiceBookingId(id)}
            />
          )}

          {activeAdminPage === 'catalog-admin' && (
            <KebayaCatalogAdmin
              kebayas={kebayas}
              onToggleStatus={handleToggleKebayaStatus}
              onAddKebaya={handleAddKebaya}
            />
          )}

          {activeAdminPage === 'transactions' && (
            <TransactionView bookings={bookings} />
          )}

          {activeAdminPage === 'payments' && (
            <PaymentView onOpenInvoice={(id) => setActiveInvoiceBookingId(id)} />
          )}

          {activeAdminPage === 'expenses' && (
            <ExpenseView />
          )}

          {/* 10 Additional Realistic Admin Views matching all sidebar modules */}
          {activeAdminPage === 'appointment-admin' && (
            <AppointmentAdminView onNavigateToBookings={() => setActiveAdminPage('bookings')} />
          )}

          {activeAdminPage === 'rental-calendar' && (
            <RentalCalendarAdminView
              bookings={bookings}
              onOpenBookingDetail={(b) => setActiveBookingDetail(b)}
            />
          )}

          {activeAdminPage === 'inventory' && (
            <InventoryStatusView kebayas={kebayas} />
          )}

          {activeAdminPage === 'maintenance' && (
            <MaintenanceLaundryView />
          )}

          {activeAdminPage === 'customers' && (
            <CustomerCRMView bookings={bookings} />
          )}

          {activeAdminPage === 'invoices' && (
            <InvoiceGeneratorListView
              bookings={bookings}
              onOpenInvoice={(id) => setActiveInvoiceBookingId(id)}
            />
          )}

          {activeAdminPage === 'bep-analysis' && (
            <BepAnalysisView kebayas={kebayas} />
          )}

          {activeAdminPage === 'reports' && (
            <ReportsView />
          )}

          {activeAdminPage === 'logs' && (
            <ActivityLogView />
          )}

          {activeAdminPage === 'settings' && (
            <SettingsView />
          )}

          {/* Admin Modals */}
          {activeBookingDetail && (
            <BookingDetailModal
              booking={activeBookingDetail}
              onClose={() => setActiveBookingDetail(null)}
              onOpenInvoice={(id) => {
                setActiveInvoiceBookingId(id);
              }}
              onUpdateStatus={handleUpdateStatus}
              onMarkAsPaid={handleMarkAsPaid}
              onDeleteBooking={handleDeleteBooking}
            />
          )}

          {activeInvoiceBooking && (
            <InvoiceModal
              booking={activeInvoiceBooking}
              onClose={() => setActiveInvoiceBookingId(null)}
              onMarkAsPaid={handleMarkAsPaid}
            />
          )}

          {bookingKebaya && (
            <BookingModal
              kebaya={bookingKebaya}
              preselectedDate={bookingPreselectedDate}
              onClose={() => setBookingKebaya(null)}
              onBookingSuccess={handleBookingSuccess}
            />
          )}
        </AdminLayout>
      )}

    </div>
  );
}
