// ============================================================
// FLOTTE 2.0 — Core Application JavaScript
// ============================================================

'use strict';

// ============================================================
// APP STATE
// ============================================================
const App = {
  currentPage: 'dashboard',
  sidebarCollapsed: false,
  currentUser: null,
  currentRole: 'admin', // 'admin' | 'owner'
  theme: 'dark',
  charts: {},

  // Demo data
  data: {
    vehicles: [
      { id: 'V001', plate: 'DK-0234-AB', brand: 'Toyota', model: 'Corolla', year: 2022, color: '#3B82F6', status: 'active', driver: 'Moussa Diallo', owner: 'Ibrahima Ndiaye', km: 45230, lastActivity: '2024-01-15', earnings: 2850000, fuel: 'Essence' },
      { id: 'V002', plate: 'DK-1567-CD', brand: 'Hyundai', model: 'Elantra', year: 2021, color: '#10B981', status: 'active', driver: 'Omar Ba', owner: 'Ibrahima Ndiaye', km: 67890, lastActivity: '2024-01-15', earnings: 3200000, fuel: 'Essence' },
      { id: 'V003', plate: 'DK-3891-EF', brand: 'Kia', model: 'Rio', year: 2023, color: '#F59E0B', status: 'maintenance', driver: 'Abdou Sow', owner: 'Fatou Diop', km: 12450, lastActivity: '2024-01-12', earnings: 980000, fuel: 'Essence' },
      { id: 'V004', plate: 'DK-5024-GH', brand: 'Nissan', model: 'Sentra', year: 2022, color: '#EF4444', status: 'inactive', driver: null, owner: 'Mamadou Fall', km: 89100, lastActivity: '2024-01-08', earnings: 4100000, fuel: 'Essence' },
      { id: 'V005', plate: 'DK-7123-IJ', brand: 'Toyota', model: 'Yaris', year: 2023, color: '#8B5CF6', status: 'active', driver: 'Cheikh Diagne', owner: 'Aminata Sy', km: 23780, lastActivity: '2024-01-15', earnings: 1750000, fuel: 'Essence' },
      { id: 'V006', plate: 'DK-8901-KL', brand: 'Suzuki', model: 'Swift', year: 2021, color: '#EC4899', status: 'active', driver: 'Lamine Gueye', owner: 'Ibrahima Ndiaye', km: 55600, lastActivity: '2024-01-15', earnings: 2640000, fuel: 'Essence' },
    ],
    drivers: [
      { id: 'D001', name: 'Moussa Diallo', phone: '+221 77 123 4567', email: 'moussa@email.com', vehicle: 'V001', status: 'active', rating: 4.8, trips: 1245, earnings: 2850000, joined: '2022-03-15', license: 'DKR-2019-001', avatar: 'MD' },
      { id: 'D002', name: 'Omar Ba', phone: '+221 76 234 5678', email: 'omar@email.com', vehicle: 'V002', status: 'active', rating: 4.6, trips: 1567, earnings: 3200000, joined: '2021-07-20', license: 'DKR-2018-045', avatar: 'OB' },
      { id: 'D003', name: 'Abdou Sow', phone: '+221 78 345 6789', email: 'abdou@email.com', vehicle: 'V003', status: 'suspended', rating: 4.2, trips: 456, earnings: 980000, joined: '2023-01-10', license: 'DKR-2020-112', avatar: 'AS' },
      { id: 'D004', name: 'Cheikh Diagne', phone: '+221 70 456 7890', email: 'cheikh@email.com', vehicle: 'V005', status: 'active', rating: 4.9, trips: 892, earnings: 1750000, joined: '2023-03-05', license: 'DKR-2021-078', avatar: 'CD' },
      { id: 'D005', name: 'Lamine Gueye', phone: '+221 77 567 8901', email: 'lamine@email.com', vehicle: 'V006', status: 'active', rating: 4.7, trips: 1123, earnings: 2640000, joined: '2021-11-18', license: 'DKR-2019-234', avatar: 'LG' },
    ],
    owners: [
      { id: 'O001', name: 'Ibrahima Ndiaye', phone: '+221 77 111 2222', email: 'ibrahima@email.com', vehicles: 3, status: 'active', totalRevenue: 8690000, balance: 1250000, joined: '2021-06-01' },
      { id: 'O002', name: 'Fatou Diop', phone: '+221 76 222 3333', email: 'fatou@email.com', vehicles: 1, status: 'active', totalRevenue: 980000, balance: 345000, joined: '2023-01-15' },
      { id: 'O003', name: 'Mamadou Fall', phone: '+221 78 333 4444', email: 'mamadou@email.com', vehicles: 1, status: 'inactive', totalRevenue: 4100000, balance: 0, joined: '2022-08-20' },
      { id: 'O004', name: 'Aminata Sy', phone: '+221 70 444 5555', email: 'aminata@email.com', vehicles: 1, status: 'active', totalRevenue: 1750000, balance: 520000, joined: '2023-03-10' },
    ],
    versements: [
      { id: 'VS001', date: '2024-01-15', vehicleId: 'V001', driverId: 'D001', amount: 95000, type: 'daily', status: 'paid', method: 'cash', note: 'Versement journalier' },
      { id: 'VS002', date: '2024-01-15', vehicleId: 'V002', driverId: 'D002', amount: 105000, type: 'daily', status: 'paid', method: 'wave', note: 'Versement journalier' },
      { id: 'VS003', date: '2024-01-15', vehicleId: 'V005', driverId: 'D004', amount: 88000, type: 'daily', status: 'pending', method: 'orange-money', note: 'En attente confirmation' },
      { id: 'VS004', date: '2024-01-14', vehicleId: 'V006', driverId: 'D005', amount: 92000, type: 'daily', status: 'paid', method: 'cash', note: '' },
      { id: 'VS005', date: '2024-01-14', vehicleId: 'V001', driverId: 'D001', amount: 97000, type: 'daily', status: 'paid', method: 'cash', note: '' },
      { id: 'VS006', date: '2024-01-13', vehicleId: 'V002', driverId: 'D002', amount: 110000, type: 'daily', status: 'paid', method: 'wave', note: '' },
      { id: 'VS007', date: '2024-01-10', vehicleId: 'V003', driverId: 'D003', amount: 76000, type: 'daily', status: 'overdue', method: 'cash', note: 'Retard paiement' },
    ],
    depenses: [
      { id: 'DE001', date: '2024-01-14', vehicleId: 'V001', category: 'carburant', amount: 25000, description: 'Plein carburant', receipt: true },
      { id: 'DE002', date: '2024-01-13', vehicleId: 'V003', category: 'reparation', amount: 85000, description: 'Changement pneus', receipt: true },
      { id: 'DE003', date: '2024-01-12', vehicleId: 'V002', category: 'assurance', amount: 180000, description: 'Renouvellement assurance', receipt: true },
      { id: 'DE004', date: '2024-01-10', vehicleId: 'V001', category: 'entretien', amount: 35000, description: 'Vidange + filtres', receipt: false },
      { id: 'DE005', date: '2024-01-08', vehicleId: 'V005', category: 'lavage', amount: 5000, description: 'Lavage complet', receipt: false },
      { id: 'DE006', date: '2024-01-05', vehicleId: 'V002', category: 'amende', amount: 15000, description: 'Amende stationnement', receipt: true },
    ],
    alerts: [
      { id: 'A001', type: 'danger', title: 'Versement en retard', message: 'V003 — Abdou Sow n\'a pas versé depuis 5 jours', time: '2h', read: false },
      { id: 'A002', type: 'warning', title: 'Maintenance requise', message: 'V004 — Vidange dépassée de 2 000 km', time: '4h', read: false },
      { id: 'A003', type: 'info', title: 'Nouveau versement', message: 'V002 — Omar Ba a versé 105 000 FCFA', time: '6h', read: false },
      { id: 'A004', type: 'success', title: 'Objectif atteint', message: 'V001 — Objectif mensuel 100% accompli', time: '1j', read: true },
      { id: 'A005', type: 'warning', title: 'Assurance expire', message: 'V006 — Assurance expire dans 15 jours', time: '2j', read: true },
    ]
  }
};

// ============================================================
// ROUTER
// ============================================================
const Router = {
  pages: {
    login: () => Pages.renderLogin(),
    dashboard: () => Pages.renderDashboard(),
    vehicles: () => Pages.renderVehicles(),
    drivers: () => Pages.renderDrivers(),
    versements: () => Pages.renderVersements(),
    depenses: () => Pages.renderDepenses(),
    analyse: () => Pages.renderAnalyse(),
    suivi: () => Pages.renderSuivi(),
    performance: () => Pages.renderPerformance(),
    alerts: () => Pages.renderAlerts(),
    rapports: () => Pages.renderRapports(),
    parametres: () => Pages.renderParametres(),
    acces: () => Pages.renderAcces(),
    chatbot: () => Pages.renderChatbot(),
    owner: () => Pages.renderOwnerPortal(),
  },

  navigate(page) {
    if (!Router.pages[page]) return;
    App.currentPage = page;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });

    // Update page title
    const titles = {
      dashboard: 'Tableau de Bord',
      vehicles: 'Véhicules',
      drivers: 'Chauffeurs',
      versements: 'Versements',
      depenses: 'Dépenses',
      analyse: 'Analyse',
      suivi: 'Suivi GPS',
      performance: 'Performance',
      alerts: 'Alertes',
      rapports: 'Rapports',
      parametres: 'Paramètres',
      acces: 'Gestion des Accès',
      chatbot: 'Assistant IA',
      owner: 'Espace Propriétaire',
    };

    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = titles[page] || page;

    // Render page
    const content = document.getElementById('page-content');
    if (content) {
      content.innerHTML = '';
      Router.pages[page]();
      content.scrollTop = 0;
    }
  }
};

// ============================================================
// SIDEBAR
// ============================================================
const Sidebar = {
  toggle() {
    App.sidebarCollapsed = !App.sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    if (sidebar) sidebar.classList.toggle('collapsed', App.sidebarCollapsed);
    if (mainContent) mainContent.classList.toggle('sidebar-collapsed', App.sidebarCollapsed);
    localStorage.setItem('sidebarCollapsed', App.sidebarCollapsed);
  },

  toggleMobile() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('mobile-open');
  }
};

// ============================================================
// MODALS
// ============================================================
const Modal = {
  open(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  create(options) {
    const { id, title, content, footer, size = 'md' } = options;
    const maxWidths = { sm: '400px', md: '560px', lg: '740px', xl: '900px' };
    const html = `
      <div class="modal-overlay" id="${id}" onclick="if(event.target===this) Modal.close('${id}')">
        <div class="modal" style="max-width:${maxWidths[size]}">
          <div class="modal-header">
            <h2 class="modal-title">${title}</h2>
            <button class="modal-close" onclick="Modal.close('${id}')">✕</button>
          </div>
          <div class="modal-body">${content}</div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>`;

    // Remove existing modal with same id
    document.getElementById(id)?.remove();

    // Append to body
    document.body.insertAdjacentHTML('beforeend', html);
    setTimeout(() => Modal.open(id), 10);
  }
};

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 3500) {
    this.init();
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const colors = { success: 'var(--green-400)', error: 'var(--red-400)', warning: 'var(--amber-400)', info: 'var(--brand-300)' };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeft = `3px solid ${colors[type]}`;
    toast.innerHTML = `
      <span style="font-size:18px">${icons[type]}</span>
      <span style="font-size:13.5px;flex:1">${message}</span>
      <button onclick="this.parentElement.remove()" style="color:var(--gray-400);font-size:16px;padding:4px 8px">✕</button>`;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideInRight .3s reverse';
      setTimeout(() => toast.remove(), 280);
    }, duration);
  }
};

// ============================================================
// CHARTS (using Chart.js)
// ============================================================
const Charts = {
  colors: {
    primary: '#4B7FE0',
    accent: '#00C6FF',
    green: '#10B981',
    amber: '#F59E0B',
    red: '#EF4444',
    purple: '#8B5CF6',
    grid: 'rgba(255,255,255,0.06)',
    text: '#8396B8',
  },

  defaultOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#8396B8',
          font: { family: "'Sora', sans-serif", size: 12 },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        }
      },
      tooltip: {
        backgroundColor: '#1D2A4A',
        borderColor: '#263352',
        borderWidth: 1,
        titleFont: { family: "'Sora', sans-serif", size: 13, weight: '600' },
        bodyFont:  { family: "'Sora', sans-serif", size: 12 },
        titleColor: '#EEF2FA',
        bodyColor:  '#AAB8D3',
        padding: 12,
        cornerRadius: 10,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
        ticks: { color: '#8396B8', font: { family: "'Sora', sans-serif", size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
        ticks: { color: '#8396B8', font: { family: "'Sora', sans-serif", size: 11 } }
      }
    }
  },

  revenue(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (App.charts[canvasId]) App.charts[canvasId].destroy();

    const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    const data1 = [8.2, 9.1, 10.4, 9.8, 11.2, 12.5, 11.8, 13.2, 12.1, 14.0, 13.5, 15.2];
    const data2 = [2.1, 2.4, 2.8, 2.6, 3.0, 3.4, 3.2, 3.6, 3.3, 3.8, 3.7, 4.1];

    App.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Versements (M FCFA)',
            data: data1,
            backgroundColor: 'rgba(74,127,224,.7)',
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Dépenses (M FCFA)',
            data: data2,
            backgroundColor: 'rgba(239,68,68,.5)',
            borderRadius: 6,
            borderSkipped: false,
          }
        ]
      },
      options: {
        ...this.defaultOptions,
        plugins: { ...this.defaultOptions.plugins },
      }
    });
  },

  weeklyTrend(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (App.charts[canvasId]) App.charts[canvasId].destroy();

    const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const data = [320000, 380000, 360000, 420000, 450000, 390000, 410000];

    App.charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Versements journaliers',
          data,
          borderColor: '#00C6FF',
          backgroundColor: 'rgba(0,198,255,.08)',
          borderWidth: 2.5,
          pointBackgroundColor: '#00C6FF',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: .4,
        }]
      },
      options: {
        ...this.defaultOptions,
        scales: {
          ...this.defaultOptions.scales,
          y: {
            ...this.defaultOptions.scales.y,
            ticks: {
              ...this.defaultOptions.scales.y.ticks,
              callback: v => (v/1000) + 'k'
            }
          }
        }
      }
    });
  },

  vehiclePerf(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (App.charts[canvasId]) App.charts[canvasId].destroy();

    App.charts[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: App.data.vehicles.map(v => v.plate),
        datasets: [{
          data: App.data.vehicles.map(v => v.earnings / 100000),
          backgroundColor: [
            'rgba(74,127,224,.85)',
            'rgba(0,198,255,.85)',
            'rgba(16,185,129,.85)',
            'rgba(245,158,11,.85)',
            'rgba(139,92,246,.85)',
            'rgba(236,72,153,.85)',
          ],
          borderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        ...this.defaultOptions,
        scales: {},
        cutout: '70%',
        plugins: {
          ...this.defaultOptions.plugins,
          tooltip: {
            ...this.defaultOptions.plugins.tooltip,
            callbacks: {
              label: ctx => ` ${(ctx.parsed * 100000).toLocaleString('fr-SN')} FCFA`
            }
          }
        }
      }
    });
  },

  expenseBreakdown(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (App.charts[canvasId]) App.charts[canvasId].destroy();

    App.charts[canvasId] = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['Carburant', 'Réparation', 'Assurance', 'Entretien', 'Lavage', 'Amendes'],
        datasets: [{
          data: [125000, 340000, 450000, 180000, 45000, 60000],
          backgroundColor: [
            'rgba(74,127,224,.7)',
            'rgba(239,68,68,.7)',
            'rgba(245,158,11,.7)',
            'rgba(16,185,129,.7)',
            'rgba(0,198,255,.7)',
            'rgba(236,72,153,.7)',
          ],
          borderWidth: 0,
        }]
      },
      options: {
        ...this.defaultOptions,
        scales: {
          r: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#8396B8', font: { size: 10 }, backdropColor: 'transparent' }
          }
        }
      }
    });
  }
};

// ============================================================
// UTILS
// ============================================================
const Utils = {
  formatCurrency(amount) {
    return new Intl.NumberFormat('fr-SN', { style: 'decimal', minimumFractionDigits: 0 }).format(amount) + ' FCFA';
  },

  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-SN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  },

  getStatusBadge(status) {
    const map = {
      active: `<span class="badge badge-success"><span class="status-dot active"></span> Actif</span>`,
      inactive: `<span class="badge badge-neutral"><span class="status-dot inactive"></span> Inactif</span>`,
      maintenance: `<span class="badge badge-warning"><span class="status-dot warning"></span> Maintenance</span>`,
      suspended: `<span class="badge badge-danger"><span class="status-dot danger"></span> Suspendu</span>`,
      paid: `<span class="badge badge-success">✓ Payé</span>`,
      pending: `<span class="badge badge-warning">⏳ En attente</span>`,
      overdue: `<span class="badge badge-danger">! En retard</span>`,
    };
    return map[status] || `<span class="badge badge-neutral">${status}</span>`;
  },

  getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  },

  avatarColors: ['#4B7FE0', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#00C6FF', '#059669'],

  getAvatarColor(name) {
    const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % this.avatarColors.length;
    return this.avatarColors[idx];
  },

  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  vehicleEmoji(brand) {
    const map = { Toyota: '🚗', Hyundai: '🚙', Kia: '🚗', Nissan: '🚘', Suzuki: '🚗' };
    return map[brand] || '🚗';
  }
};

// ============================================================
// PAGES
// ============================================================
const Pages = {

  // ----------------------------------------------------------
  // LOGIN
  // ----------------------------------------------------------
  renderLogin() {
    document.body.innerHTML = `
      <div class="auth-page">
        <div class="auth-bg"></div>
        <div class="auth-grid-lines"></div>
        <div class="auth-card page-section">
          <div class="auth-logo">
            <div class="auth-logo-icon">🚗</div>
            <div class="auth-logo-text">FLOTTE <span>2.0</span></div>
          </div>
          <h1 class="auth-title">Bienvenue</h1>
          <p class="auth-subtitle">Connectez-vous à votre espace de gestion de flotte</p>
          <div class="form-group">
            <label class="form-label">Adresse email</label>
            <div class="form-control-icon">
              <span class="icon">📧</span>
              <input type="email" class="form-control" id="login-email" placeholder="votre@email.com" value="admin@flotte2.sn">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Mot de passe</label>
            <div class="form-control-icon">
              <span class="icon">🔒</span>
              <input type="password" class="form-control" id="login-pass" placeholder="••••••••" value="••••••••">
            </div>
          </div>
          <div class="flex-between mb-24" style="font-size:13px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" checked style="accent-color:var(--brand-400)"> 
              <span style="color:var(--gray-300)">Se souvenir de moi</span>
            </label>
            <a href="#" style="color:var(--accent-400)">Mot de passe oublié?</a>
          </div>
          <button class="btn btn-primary btn-lg btn-block" onclick="Auth.login()">
            Se connecter →
          </button>
          <div style="margin-top:24px;text-align:center">
            <p style="font-size:12px;color:var(--gray-500)">Accès sécurisé · ngary.com</p>
          </div>
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // DASHBOARD
  // ----------------------------------------------------------
  renderDashboard() {
    const content = document.getElementById('page-content');
    const totalVersements = App.data.versements.filter(v=>v.status==='paid').reduce((s,v)=>s+v.amount,0);
    const totalDepenses = App.data.depenses.reduce((s,d)=>s+d.amount,0);
    const activeVehicles = App.data.vehicles.filter(v=>v.status==='active').length;
    const activeDrivers = App.data.drivers.filter(d=>d.status==='active').length;
    const pendingVersements = App.data.versements.filter(v=>v.status==='pending').length;
    const overdueVersements = App.data.versements.filter(v=>v.status==='overdue').length;

    content.innerHTML = `
      <div class="page-section">

        <!-- Period Tabs -->
        <div class="flex-between mb-24">
          <div>
            <h2 class="text-xl font-bold mb-4">Vue d'ensemble</h2>
            <p class="text-muted text-sm">Lundi 15 Janvier 2024</p>
          </div>
          <div class="tabs" style="max-width:400px">
            <div class="tab active" onclick="Tabs.switch(this,'dash')">Aujourd'hui</div>
            <div class="tab" onclick="Tabs.switch(this,'dash')">Semaine</div>
            <div class="tab" onclick="Tabs.switch(this,'dash')">Mois</div>
            <div class="tab" onclick="Tabs.switch(this,'dash')">Année</div>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="stats-grid mb-24">
          <div class="stat-card" style="--stat-color:#00C6FF;--stat-bg:rgba(0,198,255,.1)">
            <div class="stat-icon">💰</div>
            <div class="stat-value">${(totalVersements/1000).toFixed(0)}k</div>
            <div class="stat-label">Versements (FCFA)</div>
            <div class="stat-trend up">↑ +12.5%</div>
          </div>
          <div class="stat-card" style="--stat-color:#EF4444;--stat-bg:rgba(239,68,68,.1)">
            <div class="stat-icon">💸</div>
            <div class="stat-value">${(totalDepenses/1000).toFixed(0)}k</div>
            <div class="stat-label">Dépenses (FCFA)</div>
            <div class="stat-trend down">↑ +3.2%</div>
          </div>
          <div class="stat-card" style="--stat-color:#10B981;--stat-bg:rgba(16,185,129,.1)">
            <div class="stat-icon">🚗</div>
            <div class="stat-value">${activeVehicles}/${App.data.vehicles.length}</div>
            <div class="stat-label">Véhicules actifs</div>
            <div class="stat-trend up">↑ Stable</div>
          </div>
          <div class="stat-card" style="--stat-color:#8B5CF6;--stat-bg:rgba(139,92,246,.1)">
            <div class="stat-icon">👤</div>
            <div class="stat-value">${activeDrivers}</div>
            <div class="stat-label">Chauffeurs actifs</div>
            <div class="stat-trend up">↑ +1 ce mois</div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid-2 mb-24" style="gap:16px">
          <div class="card">
            <div class="card-header">
              <span class="card-title">📊 Revenus annuels</span>
              <button class="btn btn-ghost btn-sm" onclick="Toast.show('Export CSV en cours...','info')">Exporter</button>
            </div>
            <div class="card-body" style="height:240px">
              <canvas id="chart-revenue"></canvas>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <span class="card-title">📈 Versements cette semaine</span>
            </div>
            <div class="card-body" style="height:240px">
              <canvas id="chart-weekly"></canvas>
            </div>
          </div>
        </div>

        <!-- Recent Activity + Alerts -->
        <div class="grid-2" style="gap:16px">

          <!-- Recent Versements -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">💳 Versements récents</span>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('versements')">Voir tout →</button>
            </div>
            <div class="table-wrapper">
              <table class="table">
                <thead><tr>
                  <th>Véhicule</th><th>Chauffeur</th><th>Montant</th><th>Statut</th>
                </tr></thead>
                <tbody>
                  ${App.data.versements.slice(0,5).map(v => {
                    const vehicle = App.data.vehicles.find(vh=>vh.id===v.vehicleId);
                    const driver = App.data.drivers.find(d=>d.id===v.driverId);
                    return `<tr>
                      <td><span class="font-mono text-sm">${vehicle?.plate}</span></td>
                      <td>${driver?.name || '-'}</td>
                      <td class="font-semibold text-accent">${Utils.formatCurrency(v.amount)}</td>
                      <td>${Utils.getStatusBadge(v.status)}</td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Alerts -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">🔔 Alertes <span class="nav-badge" style="position:static;margin-left:6px">${App.data.alerts.filter(a=>!a.read).length}</span></span>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('alerts')">Voir tout →</button>
            </div>
            <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
              ${App.data.alerts.slice(0,4).map(a => `
                <div class="alert alert-${a.type === 'danger' ? 'danger' : a.type === 'warning' ? 'warning' : a.type === 'info' ? 'info' : 'success'}"
                     style="${a.read ? 'opacity:.6' : ''}">
                  <div style="flex:1">
                    <div class="font-semibold text-sm mb-4">${a.title}</div>
                    <div style="font-size:12px;opacity:.8">${a.message}</div>
                  </div>
                  <span style="font-size:11px;color:var(--gray-500);flex-shrink:0">${a.time}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Vehicle Status Overview -->
        <div class="card mt-24">
          <div class="card-header">
            <span class="card-title">🚗 Statut des véhicules</span>
            <button class="btn btn-ghost btn-sm" onclick="Router.navigate('vehicles')">Gérer →</button>
          </div>
          <div class="table-wrapper">
            <table class="table">
              <thead><tr>
                <th>Immatriculation</th><th>Marque / Modèle</th><th>Chauffeur</th>
                <th>Propriétaire</th><th>Km</th><th>Revenus total</th><th>Statut</th><th>Actions</th>
              </tr></thead>
              <tbody>
                ${App.data.vehicles.map(v => `
                  <tr>
                    <td><span class="font-mono" style="background:var(--gray-800);padding:3px 8px;border-radius:4px;font-size:12px">${v.plate}</span></td>
                    <td><strong>${v.brand}</strong> ${v.model} <span class="text-muted">(${v.year})</span></td>
                    <td>${v.driver || '<span class="text-muted">—</span>'}</td>
                    <td>${v.owner}</td>
                    <td class="font-mono">${v.km.toLocaleString('fr-SN')}</td>
                    <td class="text-accent font-semibold">${Utils.formatCurrency(v.earnings)}</td>
                    <td>${Utils.getStatusBadge(v.status)}</td>
                    <td>
                      <div class="flex gap-8">
                        <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Détails" onclick="Pages.vehicleDetail('${v.id}')">👁</button>
                        <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Modifier">✏️</button>
                      </div>
                    </td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>`;

    // Init charts after DOM ready
    setTimeout(() => {
      Charts.revenue('chart-revenue');
      Charts.weeklyTrend('chart-weekly');
    }, 50);
  },

  // ----------------------------------------------------------
  // VEHICLES
  // ----------------------------------------------------------
  renderVehicles() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <!-- Header Actions -->
        <div class="flex-between mb-24">
          <div class="flex gap-12">
            <div class="search-bar">
              <input type="text" placeholder="Rechercher un véhicule..." oninput="Pages.filterVehicles(this.value)">
            </div>
            <select class="form-control" style="width:160px" onchange="Pages.filterVehicleStatus(this.value)">
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
          <button class="btn btn-primary" onclick="Pages.modalAddVehicle()">+ Ajouter véhicule</button>
        </div>

        <!-- Stats Row -->
        <div class="stats-grid mb-24">
          ${[
            { label: 'Total véhicules', value: App.data.vehicles.length, icon: '🚗', color: '#4B7FE0', bg: 'rgba(74,127,224,.1)' },
            { label: 'Actifs', value: App.data.vehicles.filter(v=>v.status==='active').length, icon: '✅', color: '#10B981', bg: 'rgba(16,185,129,.1)' },
            { label: 'En maintenance', value: App.data.vehicles.filter(v=>v.status==='maintenance').length, icon: '🔧', color: '#F59E0B', bg: 'rgba(245,158,11,.1)' },
            { label: 'Inactifs', value: App.data.vehicles.filter(v=>v.status==='inactive').length, icon: '⏸', color: '#EF4444', bg: 'rgba(239,68,68,.1)' },
          ].map(s => `
            <div class="stat-card" style="--stat-color:${s.color};--stat-bg:${s.bg}">
              <div class="stat-icon">${s.icon}</div>
              <div class="stat-value">${s.value}</div>
              <div class="stat-label">${s.label}</div>
            </div>`).join('')}
        </div>

        <!-- Vehicle Grid -->
        <div id="vehicles-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
          ${App.data.vehicles.map(v => Pages.vehicleCard(v)).join('')}
        </div>
      </div>`;
  },

  vehicleCard(v) {
    const driver = App.data.drivers.find(d => d.vehicle === v.id);
    const statusColors = { active:'#10B981', maintenance:'#F59E0B', inactive:'#EF4444' };
    return `
      <div class="vehicle-card" id="vc-${v.id}">
        <div class="vehicle-img">
          ${Utils.vehicleEmoji(v.brand)}
          <div style="position:absolute;top:12px;right:12px">
            ${Utils.getStatusBadge(v.status)}
          </div>
        </div>
        <div class="vehicle-info">
          <div class="vehicle-plate">${v.plate}</div>
          <div class="font-semibold mb-4">${v.brand} ${v.model} <span class="text-muted">${v.year}</span></div>
          <div class="divider"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;margin-bottom:14px">
            <div><span class="text-muted">Chauffeur</span><br>${driver?.name || '<em class="text-muted">Non assigné</em>'}</div>
            <div><span class="text-muted">Kilométrage</span><br><span class="font-mono">${v.km.toLocaleString('fr-SN')} km</span></div>
            <div><span class="text-muted">Propriétaire</span><br>${v.owner}</div>
            <div><span class="text-muted">Revenus</span><br><span class="text-accent font-semibold">${(v.earnings/1000).toFixed(0)}k FCFA</span></div>
          </div>
          <div class="flex gap-8">
            <button class="btn btn-ghost btn-sm flex-1" onclick="Pages.vehicleDetail('${v.id}')">Détails</button>
            <button class="btn btn-primary btn-sm flex-1" onclick="Pages.addVersement('${v.id}')">+ Versement</button>
          </div>
        </div>
      </div>`;
  },

  filterVehicles(q) {
    const filtered = App.data.vehicles.filter(v =>
      v.plate.toLowerCase().includes(q.toLowerCase()) ||
      v.brand.toLowerCase().includes(q.toLowerCase()) ||
      v.model.toLowerCase().includes(q.toLowerCase()) ||
      v.owner.toLowerCase().includes(q.toLowerCase())
    );
    document.getElementById('vehicles-grid').innerHTML = filtered.map(v => Pages.vehicleCard(v)).join('');
    if (!filtered.length) document.getElementById('vehicles-grid').innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🚗</div><div class="empty-state-title">Aucun véhicule trouvé</div></div>`;
  },

  filterVehicleStatus(status) {
    const filtered = status ? App.data.vehicles.filter(v => v.status === status) : App.data.vehicles;
    document.getElementById('vehicles-grid').innerHTML = filtered.map(v => Pages.vehicleCard(v)).join('');
  },

  vehicleDetail(id) {
    const v = App.data.vehicles.find(x => x.id === id);
    const driver = App.data.drivers.find(d => d.vehicle === id);
    const versements = App.data.versements.filter(vs => vs.vehicleId === id);
    const depenses = App.data.depenses.filter(d => d.vehicleId === id);
    const totalVers = versements.filter(vs=>vs.status==='paid').reduce((s,vs)=>s+vs.amount,0);
    const totalDep = depenses.reduce((s,d)=>s+d.amount,0);

    Modal.create({
      id: 'modal-vehicle-detail',
      title: `🚗 ${v.brand} ${v.model} — ${v.plate}`,
      size: 'lg',
      content: `
        <div class="grid-2 mb-16">
          <div class="card-glass p-16 rounded-lg">
            <div class="text-muted text-sm mb-8">Informations</div>
            ${[
              ['Immatriculation', `<span class="font-mono">${v.plate}</span>`],
              ['Marque / Modèle', `${v.brand} ${v.model}`],
              ['Année', v.year],
              ['Carburant', v.fuel],
              ['Kilométrage', `${v.km.toLocaleString('fr-SN')} km`],
              ['Propriétaire', v.owner],
              ['Statut', Utils.getStatusBadge(v.status)],
            ].map(([l,v]) => `<div class="flex-between text-sm" style="padding:6px 0;border-bottom:1px solid var(--gray-750)"><span class="text-muted">${l}</span><span>${v}</span></div>`).join('')}
          </div>
          <div>
            <div class="stat-card mb-12" style="--stat-color:#00C6FF;--stat-bg:rgba(0,198,255,.1)">
              <div class="stat-icon">💰</div>
              <div class="stat-value">${(totalVers/1000).toFixed(0)}k</div>
              <div class="stat-label">Total versé (FCFA)</div>
            </div>
            <div class="stat-card" style="--stat-color:#EF4444;--stat-bg:rgba(239,68,68,.1)">
              <div class="stat-icon">💸</div>
              <div class="stat-value">${(totalDep/1000).toFixed(0)}k</div>
              <div class="stat-label">Total dépenses (FCFA)</div>
            </div>
          </div>
        </div>
        ${driver ? `
          <div class="card-glass p-16 rounded-lg mb-16">
            <div class="text-muted text-sm mb-12">Chauffeur assigné</div>
            <div class="flex gap-12" style="align-items:center">
              <div class="driver-avatar" style="background:${Utils.getAvatarColor(driver.name)}">${driver.avatar}</div>
              <div>
                <div class="font-semibold">${driver.name}</div>
                <div class="text-muted text-sm">${driver.phone} · ⭐ ${driver.rating}</div>
              </div>
              <span class="ml-auto">${Utils.getStatusBadge(driver.status)}</span>
            </div>
          </div>` : ''}
        <div class="card-glass p-16 rounded-lg">
          <div class="text-muted text-sm mb-12">5 derniers versements</div>
          ${versements.length ? `
          <table class="table" style="font-size:12px">
            <thead><tr><th>Date</th><th>Montant</th><th>Méthode</th><th>Statut</th></tr></thead>
            <tbody>${versements.slice(0,5).map(vs => `
              <tr><td>${Utils.formatDate(vs.date)}</td>
                  <td class="font-semibold">${Utils.formatCurrency(vs.amount)}</td>
                  <td>${vs.method}</td>
                  <td>${Utils.getStatusBadge(vs.status)}</td></tr>`).join('')}
            </tbody>
          </table>` : '<p class="text-muted text-sm">Aucun versement enregistré</p>'}
        </div>`,
      footer: `
        <button class="btn btn-ghost" onclick="Modal.close('modal-vehicle-detail')">Fermer</button>
        <button class="btn btn-primary" onclick="Pages.addVersement('${id}');Modal.close('modal-vehicle-detail')">+ Versement</button>`
    });
  },

  modalAddVehicle() {
    Modal.create({
      id: 'modal-add-vehicle',
      title: '🚗 Ajouter un véhicule',
      content: `
        <div class="form-group"><label class="form-label">Immatriculation *</label>
          <input type="text" class="form-control" placeholder="DK-0000-AB" style="text-transform:uppercase"></div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Marque *</label>
            <select class="form-control"><option>Toyota</option><option>Hyundai</option><option>Kia</option><option>Nissan</option><option>Suzuki</option><option>Honda</option><option>Autre</option></select></div>
          <div class="form-group"><label class="form-label">Modèle *</label>
            <input type="text" class="form-control" placeholder="Corolla"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Année *</label>
            <input type="number" class="form-control" value="2023" min="2000" max="2025"></div>
          <div class="form-group"><label class="form-label">Carburant</label>
            <select class="form-control"><option>Essence</option><option>Diesel</option><option>Hybride</option></select></div>
        </div>
        <div class="form-group"><label class="form-label">Propriétaire *</label>
          <select class="form-control">
            ${App.data.owners.map(o => `<option value="${o.id}">${o.name}</option>`).join('')}
          </select></div>
        <div class="form-group"><label class="form-label">Kilométrage actuel</label>
          <input type="number" class="form-control" placeholder="0" value="0"></div>`,
      footer: `
        <button class="btn btn-ghost" onclick="Modal.close('modal-add-vehicle')">Annuler</button>
        <button class="btn btn-primary" onclick="Toast.show('Véhicule ajouté avec succès','success');Modal.close('modal-add-vehicle')">Ajouter</button>`
    });
  },

  addVersement(vehicleId) {
    const vehicle = App.data.vehicles.find(v => v.id === vehicleId);
    Modal.create({
      id: 'modal-add-versement',
      title: '💳 Enregistrer un versement',
      content: `
        <div class="alert alert-info mb-16">
          Véhicule: <strong>${vehicle?.plate} — ${vehicle?.brand} ${vehicle?.model}</strong>
        </div>
        <div class="form-group"><label class="form-label">Montant (FCFA) *</label>
          <input type="number" class="form-control" id="v-amount" placeholder="90000" step="500"></div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Date *</label>
            <input type="date" class="form-control" value="${new Date().toISOString().slice(0,10)}"></div>
          <div class="form-group"><label class="form-label">Méthode de paiement</label>
            <select class="form-control"><option>cash</option><option>wave</option><option>orange-money</option><option>free-money</option><option>virement</option></select></div>
        </div>
        <div class="form-group"><label class="form-label">Note (optionnel)</label>
          <textarea class="form-control" rows="2" placeholder="Remarques..."></textarea></div>`,
      footer: `
        <button class="btn btn-ghost" onclick="Modal.close('modal-add-versement')">Annuler</button>
        <button class="btn btn-success" onclick="Toast.show('Versement enregistré ✓','success');Modal.close('modal-add-versement')">Enregistrer</button>`
    });
  },

  // ----------------------------------------------------------
  // DRIVERS
  // ----------------------------------------------------------
  renderDrivers() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="flex-between mb-24">
          <div class="search-bar">
            <input type="text" placeholder="Rechercher un chauffeur...">
          </div>
          <button class="btn btn-primary" onclick="Pages.modalAddDriver()">+ Ajouter chauffeur</button>
        </div>
        <div class="stats-grid mb-24">
          ${[
            { l:'Total chauffeurs', v:App.data.drivers.length, i:'👤', c:'#4B7FE0', bg:'rgba(74,127,224,.1)' },
            { l:'Actifs', v:App.data.drivers.filter(d=>d.status==='active').length, i:'✅', c:'#10B981', bg:'rgba(16,185,129,.1)' },
            { l:'Suspendus', v:App.data.drivers.filter(d=>d.status==='suspended').length, i:'🚫', c:'#EF4444', bg:'rgba(239,68,68,.1)' },
            { l:'Note moyenne', v:'4.7⭐', i:'⭐', c:'#F59E0B', bg:'rgba(245,158,11,.1)' },
          ].map(s=>`<div class="stat-card" style="--stat-color:${s.c};--stat-bg:${s.bg}"><div class="stat-icon">${s.i}</div><div class="stat-value">${s.v}</div><div class="stat-label">${s.l}</div></div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">👤 Liste des chauffeurs</span></div>
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>Chauffeur</th><th>Téléphone</th><th>Véhicule</th><th>Note</th><th>Courses</th><th>Revenus totaux</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                ${App.data.drivers.map(d => {
                  const vehicle = App.data.vehicles.find(v => v.id === d.vehicle);
                  return `<tr>
                    <td>
                      <div class="flex gap-12" style="align-items:center">
                        <div class="driver-avatar" style="background:${Utils.getAvatarColor(d.name)}">${d.avatar}</div>
                        <div>
                          <div class="font-semibold">${d.name}</div>
                          <div class="text-muted text-sm">${d.email}</div>
                        </div>
                      </div>
                    </td>
                    <td class="font-mono text-sm">${d.phone}</td>
                    <td>${vehicle ? `<span class="font-mono text-sm">${vehicle.plate}</span>` : '<span class="text-muted">—</span>'}</td>
                    <td>⭐ ${d.rating}</td>
                    <td class="font-mono">${d.trips.toLocaleString('fr-SN')}</td>
                    <td class="text-accent font-semibold">${Utils.formatCurrency(d.earnings)}</td>
                    <td>${Utils.getStatusBadge(d.status)}</td>
                    <td>
                      <div class="flex gap-8">
                        <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Détails">👁</button>
                        <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Modifier">✏️</button>
                        <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="${d.status==='active'?'Suspendre':'Activer'}">${d.status==='active'?'🚫':'✅'}</button>
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  modalAddDriver() {
    Modal.create({
      id: 'modal-add-driver',
      title: '👤 Ajouter un chauffeur',
      content: `
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Prénom *</label><input type="text" class="form-control"></div>
          <div class="form-group"><label class="form-label">Nom *</label><input type="text" class="form-control"></div>
        </div>
        <div class="form-group"><label class="form-label">Téléphone *</label>
          <input type="tel" class="form-control" placeholder="+221 77 000 0000"></div>
        <div class="form-group"><label class="form-label">Email</label>
          <input type="email" class="form-control" placeholder="chauffeur@email.com"></div>
        <div class="form-group"><label class="form-label">N° Permis *</label>
          <input type="text" class="form-control" placeholder="DKR-2024-000"></div>
        <div class="form-group"><label class="form-label">Véhicule assigné</label>
          <select class="form-control">
            <option value="">— Non assigné —</option>
            ${App.data.vehicles.map(v=>`<option value="${v.id}">${v.plate} — ${v.brand} ${v.model}</option>`).join('')}
          </select></div>`,
      footer: `
        <button class="btn btn-ghost" onclick="Modal.close('modal-add-driver')">Annuler</button>
        <button class="btn btn-primary" onclick="Toast.show('Chauffeur ajouté','success');Modal.close('modal-add-driver')">Ajouter</button>`
    });
  },

  // ----------------------------------------------------------
  // VERSEMENTS
  // ----------------------------------------------------------
  renderVersements() {
    const content = document.getElementById('page-content');
    const total = App.data.versements.filter(v=>v.status==='paid').reduce((s,v)=>s+v.amount,0);
    const pending = App.data.versements.filter(v=>v.status==='pending').reduce((s,v)=>s+v.amount,0);
    const overdue = App.data.versements.filter(v=>v.status==='overdue').reduce((s,v)=>s+v.amount,0);

    content.innerHTML = `
      <div class="page-section">
        <div class="flex-between mb-24">
          <div class="flex gap-12">
            <input type="date" class="form-control" value="2024-01-15" style="width:auto">
            <select class="form-control" style="width:160px">
              <option>Tous les statuts</option><option>Payé</option><option>En attente</option><option>En retard</option>
            </select>
          </div>
          <button class="btn btn-primary" onclick="Pages.addVersement(App.data.vehicles[0].id)">+ Enregistrer versement</button>
        </div>

        <div class="stats-grid mb-24">
          <div class="stat-card" style="--stat-color:#10B981;--stat-bg:rgba(16,185,129,.1)">
            <div class="stat-icon">✅</div>
            <div class="stat-value">${(total/1000).toFixed(0)}k</div>
            <div class="stat-label">Versements payés (FCFA)</div>
          </div>
          <div class="stat-card" style="--stat-color:#F59E0B;--stat-bg:rgba(245,158,11,.1)">
            <div class="stat-icon">⏳</div>
            <div class="stat-value">${(pending/1000).toFixed(0)}k</div>
            <div class="stat-label">En attente (FCFA)</div>
          </div>
          <div class="stat-card" style="--stat-color:#EF4444;--stat-bg:rgba(239,68,68,.1)">
            <div class="stat-icon">⚠️</div>
            <div class="stat-value">${(overdue/1000).toFixed(0)}k</div>
            <div class="stat-label">En retard (FCFA)</div>
          </div>
          <div class="stat-card" style="--stat-color:#00C6FF;--stat-bg:rgba(0,198,255,.1)">
            <div class="stat-icon">📊</div>
            <div class="stat-value">${App.data.versements.length}</div>
            <div class="stat-label">Total transactions</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">💳 Historique des versements</span>
            <button class="btn btn-ghost btn-sm" onclick="Toast.show('Export Excel en cours...','info')">📥 Exporter</button>
          </div>
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>ID</th><th>Date</th><th>Véhicule</th><th>Chauffeur</th><th>Montant</th><th>Méthode</th><th>Note</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                ${App.data.versements.map(vs => {
                  const v = App.data.vehicles.find(x=>x.id===vs.vehicleId);
                  const d = App.data.drivers.find(x=>x.id===vs.driverId);
                  return `<tr>
                    <td class="font-mono text-sm text-muted">${vs.id}</td>
                    <td>${Utils.formatDate(vs.date)}</td>
                    <td><span class="font-mono text-sm">${v?.plate}</span></td>
                    <td>${d?.name}</td>
                    <td class="font-semibold text-accent">${Utils.formatCurrency(vs.amount)}</td>
                    <td><span class="badge badge-neutral">${vs.method}</span></td>
                    <td class="text-muted text-sm">${vs.note||'—'}</td>
                    <td>${Utils.getStatusBadge(vs.status)}</td>
                    <td>
                      <div class="flex gap-8">
                        <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Reçu">🧾</button>
                        ${vs.status==='pending'?`<button class="btn btn-success btn-sm" onclick="Toast.show('Versement confirmé','success')">Confirmer</button>`:''}
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // DEPENSES
  // ----------------------------------------------------------
  renderDepenses() {
    const content = document.getElementById('page-content');
    const catIcons = { carburant:'⛽', reparation:'🔧', assurance:'📋', entretien:'🛠', lavage:'🧼', amende:'🚔' };
    const total = App.data.depenses.reduce((s,d)=>s+d.amount,0);

    content.innerHTML = `
      <div class="page-section">
        <div class="flex-between mb-24">
          <div class="flex gap-12">
            <select class="form-control" style="width:160px">
              <option>Toutes catégories</option>
              <option>Carburant</option><option>Réparation</option><option>Assurance</option><option>Entretien</option>
            </select>
          </div>
          <button class="btn btn-primary" onclick="Pages.modalAddDepense()">+ Ajouter dépense</button>
        </div>

        <div class="grid-2 mb-24" style="gap:16px">
          <div class="card">
            <div class="card-header"><span class="card-title">📊 Répartition des dépenses</span></div>
            <div class="card-body" style="height:260px"><canvas id="chart-depenses"></canvas></div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">📈 Résumé</span></div>
            <div class="card-body">
              <div class="stat-card mb-12" style="--stat-color:#EF4444;--stat-bg:rgba(239,68,68,.08)">
                <div class="stat-value">${Utils.formatCurrency(total)}</div>
                <div class="stat-label">Total dépenses (période)</div>
              </div>
              ${['carburant','reparation','assurance','entretien'].map(cat => {
                const s = App.data.depenses.filter(d=>d.category===cat).reduce((s,d)=>s+d.amount,0);
                const pct = total ? Math.round(s/total*100) : 0;
                return `
                  <div class="mb-12">
                    <div class="flex-between text-sm mb-4">
                      <span>${catIcons[cat]} ${cat}</span>
                      <span class="font-semibold">${(s/1000).toFixed(0)}k FCFA (${pct}%)</span>
                    </div>
                    <div class="progress"><div class="progress-bar" style="width:${pct}%;background:${cat==='carburant'?'var(--brand-300)':cat==='reparation'?'var(--red-400)':cat==='assurance'?'var(--amber-400)':'var(--green-400)'}"></div></div>
                  </div>`;
              }).join('')}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">💸 Liste des dépenses</span>
            <button class="btn btn-ghost btn-sm">📥 Exporter</button>
          </div>
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>Date</th><th>Véhicule</th><th>Catégorie</th><th>Description</th><th>Montant</th><th>Justificatif</th><th>Actions</th></tr></thead>
              <tbody>
                ${App.data.depenses.map(d => {
                  const v = App.data.vehicles.find(x=>x.id===d.vehicleId);
                  return `<tr>
                    <td>${Utils.formatDate(d.date)}</td>
                    <td><span class="font-mono text-sm">${v?.plate}</span></td>
                    <td><span class="badge badge-neutral">${catIcons[d.category]} ${d.category}</span></td>
                    <td>${d.description}</td>
                    <td class="font-semibold text-danger">${Utils.formatCurrency(d.amount)}</td>
                    <td>${d.receipt ? '<span class="badge badge-success">✓ Oui</span>' : '<span class="badge badge-neutral">Non</span>'}</td>
                    <td>
                      <div class="flex gap-8">
                        <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Modifier">✏️</button>
                        <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Supprimer" onclick="Toast.show('Dépense supprimée','success')">🗑</button>
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;

    setTimeout(() => Charts.expenseBreakdown('chart-depenses'), 50);
  },

  modalAddDepense() {
    Modal.create({
      id: 'modal-add-depense',
      title: '💸 Ajouter une dépense',
      content: `
        <div class="form-group"><label class="form-label">Véhicule *</label>
          <select class="form-control">
            ${App.data.vehicles.map(v=>`<option value="${v.id}">${v.plate} — ${v.brand} ${v.model}</option>`).join('')}
          </select></div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Catégorie *</label>
            <select class="form-control"><option>carburant</option><option>reparation</option><option>assurance</option><option>entretien</option><option>lavage</option><option>amende</option><option>autre</option></select></div>
          <div class="form-group"><label class="form-label">Date *</label>
            <input type="date" class="form-control" value="${new Date().toISOString().slice(0,10)}"></div>
        </div>
        <div class="form-group"><label class="form-label">Montant (FCFA) *</label>
          <input type="number" class="form-control" placeholder="0" step="100"></div>
        <div class="form-group"><label class="form-label">Description *</label>
          <input type="text" class="form-control" placeholder="Description de la dépense"></div>
        <div class="form-group"><label class="form-label">Justificatif</label>
          <input type="file" class="form-control" accept="image/*,.pdf"></div>`,
      footer: `
        <button class="btn btn-ghost" onclick="Modal.close('modal-add-depense')">Annuler</button>
        <button class="btn btn-primary" onclick="Toast.show('Dépense ajoutée','success');Modal.close('modal-add-depense')">Enregistrer</button>`
    });
  },

  // ----------------------------------------------------------
  // ANALYSE
  // ----------------------------------------------------------
  renderAnalyse() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="flex-between mb-24">
          <div class="tabs">
            <div class="tab active">Mensuel</div>
            <div class="tab">Trimestriel</div>
            <div class="tab">Annuel</div>
            <div class="tab">Personnalisé</div>
          </div>
          <button class="btn btn-ghost btn-sm">📥 Exporter rapport</button>
        </div>

        <!-- KPI Row -->
        <div class="stats-grid mb-24">
          <div class="stat-card" style="--stat-color:#10B981;--stat-bg:rgba(16,185,129,.08)">
            <div class="stat-icon">💹</div>
            <div class="stat-value">89%</div>
            <div class="stat-label">Taux de collecte</div>
            <div class="stat-trend up">↑ +3% vs mois dernier</div>
          </div>
          <div class="stat-card" style="--stat-color:#00C6FF;--stat-bg:rgba(0,198,255,.08)">
            <div class="stat-icon">📊</div>
            <div class="stat-value">97k</div>
            <div class="stat-label">Versement moyen/jour</div>
            <div class="stat-trend up">↑ Stable</div>
          </div>
          <div class="stat-card" style="--stat-color:#F59E0B;--stat-bg:rgba(245,158,11,.08)">
            <div class="stat-icon">⚡</div>
            <div class="stat-value">76%</div>
            <div class="stat-label">ROI flotte</div>
            <div class="stat-trend up">↑ +5.2%</div>
          </div>
          <div class="stat-card" style="--stat-color:#8B5CF6;--stat-bg:rgba(139,92,246,.08)">
            <div class="stat-icon">🎯</div>
            <div class="stat-value">4.7</div>
            <div class="stat-label">Note chauffeurs moy.</div>
            <div class="stat-trend up">↑ Excellent</div>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid-2 mb-24" style="gap:16px">
          <div class="card">
            <div class="card-header"><span class="card-title">💰 Revenus vs Dépenses</span></div>
            <div class="card-body" style="height:280px"><canvas id="chart-rev-dep"></canvas></div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">🚗 Performance par véhicule</span></div>
            <div class="card-body" style="height:280px"><canvas id="chart-vehicle-perf"></canvas></div>
          </div>
        </div>

        <!-- Top Performers -->
        <div class="card mb-24">
          <div class="card-header"><span class="card-title">🏆 Top Performeurs</span></div>
          <div class="card-body">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
              ${App.data.drivers.sort((a,b)=>b.earnings-a.earnings).slice(0,5).map((d,i) => `
                <div style="background:var(--gray-800);border-radius:var(--radius-md);padding:14px;border:1px solid var(--gray-700)">
                  <div class="flex gap-10 mb-10" style="align-items:center">
                    <span style="font-size:20px">${['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</span>
                    <div class="driver-avatar" style="background:${Utils.getAvatarColor(d.name)};width:32px;height:32px;font-size:12px">${d.avatar}</div>
                    <div>
                      <div class="font-semibold text-sm">${d.name}</div>
                      <div class="text-muted" style="font-size:11px">⭐ ${d.rating}</div>
                    </div>
                  </div>
                  <div class="text-accent font-semibold">${Utils.formatCurrency(d.earnings)}</div>
                  <div class="text-muted text-sm">${d.trips.toLocaleString('fr-SN')} courses</div>
                  <div class="progress mt-8"><div class="progress-bar" style="width:${Math.round(d.earnings/App.data.drivers[0].earnings*100)}%"></div></div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;

    setTimeout(() => {
      Charts.revenue('chart-rev-dep');
      Charts.vehiclePerf('chart-vehicle-perf');
    }, 50);
  },

  // ----------------------------------------------------------
  // SUIVI GPS
  // ----------------------------------------------------------
  renderSuivi() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="grid-2" style="gap:16px;height:calc(100vh - 160px)">
          <!-- Map -->
          <div style="display:flex;flex-direction:column;gap:12px;height:100%">
            <div class="map-container" style="flex:1">
              <div class="map-overlay">
                <div class="map-pulse">📍</div>
                <p class="font-semibold">Suivi GPS en temps réel</p>
                <p class="text-sm text-muted">Intégration Google Maps / Mapbox</p>
                <button class="btn btn-primary btn-sm" onclick="Toast.show('Connexion GPS...','info')">Activer le suivi</button>
              </div>
            </div>
            <div class="card" style="flex-shrink:0">
              <div class="card-body" style="padding:16px">
                <div class="flex gap-16" style="flex-wrap:wrap">
                  ${[
                    { label: 'En ligne', count: 4, color: 'success' },
                    { label: 'Hors ligne', count: 2, color: 'neutral' },
                    { label: 'En course', count: 3, color: 'accent' },
                  ].map(s=>`<div class="flex gap-8" style="align-items:center"><span class="status-dot ${s.color}"></span><span class="text-sm">${s.label}: <strong>${s.count}</strong></span></div>`).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Vehicle List -->
          <div class="card" style="overflow:hidden;display:flex;flex-direction:column">
            <div class="card-header"><span class="card-title">📡 Localisation véhicules</span></div>
            <div style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px">
              ${App.data.vehicles.map(v => `
                <div style="background:var(--gray-800);border-radius:var(--radius-md);padding:14px;border:1px solid var(--gray-700);cursor:pointer;transition:var(--transition)"
                     onmouseover="this.style.borderColor='var(--brand-400)'" onmouseout="this.style.borderColor='var(--gray-700)'">
                  <div class="flex-between mb-8">
                    <div class="flex gap-8" style="align-items:center">
                      <span class="status-dot ${v.status==='active'?'active':'inactive'}"></span>
                      <span class="font-mono font-semibold text-sm">${v.plate}</span>
                    </div>
                    ${Utils.getStatusBadge(v.status)}
                  </div>
                  <div class="text-muted text-sm">${v.driver || 'Non assigné'}</div>
                  <div class="text-muted text-sm mt-4">
                    ${v.status==='active'?'📍 Dakar, Plateau · Dernière activité: il y a 5 min':'⭕ Véhicule inactif'}
                  </div>
                  ${v.status==='active'?`
                  <div class="flex gap-16 mt-10" style="font-size:12px">
                    <span>⚡ ${Utils.randomBetween(30,80)} km/h</span>
                    <span>⛽ ${Utils.randomBetween(20,80)}%</span>
                    <span>📍 GPS OK</span>
                  </div>`:''}
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // PERFORMANCE
  // ----------------------------------------------------------
  renderPerformance() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="stats-grid mb-24">
          ${[
            { l:'Taux disponibilité', v:'91.5%', i:'⚡', c:'#10B981', bg:'rgba(16,185,129,.08)', t:'↑ +1.2%' },
            { l:'Revenus/véhicule/j', v:'97.5k', i:'💰', c:'#00C6FF', bg:'rgba(0,198,255,.08)', t:'↑ +5%' },
            { l:'Coût/km moyen', v:'85 FCFA', i:'🛣', c:'#F59E0B', bg:'rgba(245,158,11,.08)', t:'↓ -2%' },
            { l:'Satisfaction client', v:'4.7/5', i:'⭐', c:'#8B5CF6', bg:'rgba(139,92,246,.08)', t:'↑ Stable' },
          ].map(s=>`<div class="stat-card" style="--stat-color:${s.c};--stat-bg:${s.bg}">
            <div class="stat-icon">${s.i}</div><div class="stat-value">${s.v}</div>
            <div class="stat-label">${s.l}</div><div class="stat-trend up">${s.t}</div>
          </div>`).join('')}
        </div>

        <div class="card mb-24">
          <div class="card-header"><span class="card-title">📊 Tableau de bord performance</span></div>
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>Véhicule</th><th>Chauffeur</th><th>Jours actifs</th><th>Versements</th><th>Moyenne/jour</th><th>Dépenses</th><th>Bénéfice net</th><th>Score</th></tr></thead>
              <tbody>
                ${App.data.vehicles.filter(v=>v.driver).map(v => {
                  const driver = App.data.drivers.find(d=>d.vehicle===v.id);
                  const versements = App.data.versements.filter(vs=>vs.vehicleId===v.id&&vs.status==='paid');
                  const totalV = versements.reduce((s,vs)=>s+vs.amount,0);
                  const totalD = App.data.depenses.filter(d=>d.vehicleId===v.id).reduce((s,d)=>s+d.amount,0);
                  const net = totalV - totalD;
                  const jours = versements.length;
                  const moy = jours ? Math.round(totalV/jours) : 0;
                  const score = Math.min(100, Math.round((net/totalV||0)*100 + (driver?.rating||0)*5));
                  return `<tr>
                    <td><span class="font-mono text-sm">${v.plate}</span></td>
                    <td>${v.driver || '—'}</td>
                    <td>${jours}</td>
                    <td class="text-accent font-semibold">${Utils.formatCurrency(totalV)}</td>
                    <td>${Utils.formatCurrency(moy)}</td>
                    <td class="text-danger">${Utils.formatCurrency(totalD)}</td>
                    <td class="${net>=0?'text-success':'text-danger'} font-bold">${Utils.formatCurrency(net)}</td>
                    <td>
                      <div class="flex gap-8" style="align-items:center">
                        <div class="progress" style="width:80px"><div class="progress-bar" style="width:${score}%;background:${score>70?'var(--green-400)':score>40?'var(--amber-400)':'var(--red-400)'}"></div></div>
                        <span class="text-sm font-semibold">${score}</span>
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // ALERTS
  // ----------------------------------------------------------
  renderAlerts() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="flex-between mb-24">
          <div class="flex gap-12">
            <select class="form-control" style="width:160px">
              <option>Tous les types</option>
              <option>Danger</option><option>Avertissement</option><option>Info</option><option>Succès</option>
            </select>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="Toast.show('Toutes les alertes marquées comme lues','success')">✓ Tout marquer comme lu</button>
        </div>

        <div class="stats-grid mb-24">
          ${[
            { l:'Non lues', v:App.data.alerts.filter(a=>!a.read).length, i:'🔔', c:'#EF4444', bg:'rgba(239,68,68,.08)' },
            { l:'Critiques', v:App.data.alerts.filter(a=>a.type==='danger').length, i:'🚨', c:'#F59E0B', bg:'rgba(245,158,11,.08)' },
            { l:'Avertissements', v:App.data.alerts.filter(a=>a.type==='warning').length, i:'⚠️', c:'#F59E0B', bg:'rgba(245,158,11,.08)' },
            { l:'Informations', v:App.data.alerts.filter(a=>a.type==='info').length, i:'ℹ️', c:'#4B7FE0', bg:'rgba(74,127,224,.08)' },
          ].map(s=>`<div class="stat-card" style="--stat-color:${s.c};--stat-bg:${s.bg}">
            <div class="stat-icon">${s.i}</div><div class="stat-value">${s.v}</div><div class="stat-label">${s.l}</div>
          </div>`).join('')}
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">🔔 Centre d'alertes</span></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
            ${App.data.alerts.map(a => `
              <div class="alert alert-${a.type==='danger'?'danger':a.type==='warning'?'warning':a.type==='info'?'info':'success'}"
                   style="cursor:pointer;${a.read?'opacity:.6':''}">
                <div style="flex:1">
                  <div class="flex-between mb-4">
                    <span class="font-semibold">${a.title}</span>
                    <span style="font-size:11px;color:var(--gray-500)">${a.time}</span>
                  </div>
                  <p style="font-size:13px">${a.message}</p>
                </div>
                <div class="flex gap-8">
                  ${!a.read ? `<span class="status-dot active" style="flex-shrink:0"></span>` : ''}
                  <button class="btn btn-ghost btn-sm" onclick="Toast.show('Alerte traitée','success')">Traiter</button>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Configure Alerts -->
        <div class="card mt-24">
          <div class="card-header"><span class="card-title">⚙️ Configurer les alertes</span></div>
          <div class="card-body">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px">
              ${[
                { l:'Versement en retard', d:'Notifier après X jours', checked: true },
                { l:'Maintenance dépassée', d:'Kilométrage ou date dépassée', checked: true },
                { l:'Assurance expire', d:'Alerte 30j avant expiration', checked: true },
                { l:'Chauffeur inactif', d:'Plus de 2 jours sans activité', checked: false },
                { l:'Solde bas propriétaire', d:'Solde inférieur au seuil', checked: true },
                { l:'Objectif mensuel', d:'Suivi des objectifs de versement', checked: false },
              ].map(a=>`
                <label style="display:flex;align-items:center;gap:12px;background:var(--gray-800);padding:14px;border-radius:var(--radius-md);cursor:pointer;border:1px solid var(--gray-700)">
                  <input type="checkbox" ${a.checked?'checked':''} style="accent-color:var(--brand-400);width:16px;height:16px">
                  <div>
                    <div class="font-semibold text-sm">${a.l}</div>
                    <div class="text-muted" style="font-size:12px">${a.d}</div>
                  </div>
                </label>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // RAPPORTS
  // ----------------------------------------------------------
  renderRapports() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="stats-grid mb-24">
          ${[
            { l:'Rapport journalier', i:'📅', desc:'Aujourd\'hui', btn:'Générer' },
            { l:'Rapport hebdomadaire', i:'📆', desc:'Cette semaine', btn:'Générer' },
            { l:'Rapport mensuel', i:'🗓', desc:'Janvier 2024', btn:'Générer' },
            { l:'Rapport annuel', i:'📊', desc:'Année 2024', btn:'Générer' },
          ].map(r=>`
            <div class="card card-accent" style="cursor:pointer" onclick="Pages.generateReport('${r.l}')">
              <div class="card-body" style="text-align:center;padding:24px">
                <div style="font-size:36px;margin-bottom:12px">${r.i}</div>
                <div class="font-semibold mb-4">${r.l}</div>
                <div class="text-muted text-sm mb-16">${r.desc}</div>
                <button class="btn btn-primary btn-sm w-full">${r.btn}</button>
              </div>
            </div>`).join('')}
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">📋 Rapport personnalisé</span>
          </div>
          <div class="card-body">
            <div class="grid-2 mb-16">
              <div class="form-group">
                <label class="form-label">Date de début</label>
                <input type="date" class="form-control" value="2024-01-01">
              </div>
              <div class="form-group">
                <label class="form-label">Date de fin</label>
                <input type="date" class="form-control" value="2024-01-31">
              </div>
            </div>
            <div class="grid-2 mb-16">
              <div class="form-group">
                <label class="form-label">Propriétaire</label>
                <select class="form-control">
                  <option>Tous les propriétaires</option>
                  ${App.data.owners.map(o=>`<option>${o.name}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Véhicule</label>
                <select class="form-control">
                  <option>Tous les véhicules</option>
                  ${App.data.vehicles.map(v=>`<option>${v.plate}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="form-group mb-16">
              <label class="form-label">Données à inclure</label>
              <div class="flex gap-16" style="flex-wrap:wrap;margin-top:8px">
                ${['Versements','Dépenses','Kilométrage','Performance chauffeurs','Alertes','Graphiques'].map(opt=>`
                  <label class="flex gap-8" style="align-items:center;cursor:pointer;font-size:13px">
                    <input type="checkbox" checked style="accent-color:var(--brand-400)"> ${opt}
                  </label>`).join('')}
              </div>
            </div>
            <div class="flex gap-12">
              <button class="btn btn-primary" onclick="Pages.generateReport('Rapport personnalisé')">Générer le rapport</button>
              <button class="btn btn-ghost">📥 Export PDF</button>
              <button class="btn btn-ghost">📊 Export Excel</button>
            </div>
          </div>
        </div>
      </div>`;
  },

  generateReport(type) {
    Toast.show(`Génération du ${type} en cours...`, 'info');
    setTimeout(() => Toast.show(`${type} généré avec succès! Téléchargement...`, 'success'), 1500);
  },

  // ----------------------------------------------------------
  // ACCES (Admin)
  // ----------------------------------------------------------
  renderAcces() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="flex-between mb-24">
          <p class="text-muted text-sm">Gérez les accès des propriétaires à leur espace personnel</p>
          <button class="btn btn-primary" onclick="Pages.modalCreateAccess()">+ Créer un accès</button>
        </div>

        <div class="card mb-24">
          <div class="card-header"><span class="card-title">👥 Propriétaires — Comptes d'accès</span></div>
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>Propriétaire</th><th>Email</th><th>Téléphone</th><th>Véhicules</th><th>Dernière connexion</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                ${App.data.owners.map(o => `<tr>
                  <td>
                    <div class="flex gap-10" style="align-items:center">
                      <div class="driver-avatar" style="background:${Utils.getAvatarColor(o.name)};width:34px;height:34px;font-size:13px">${Utils.getInitials(o.name)}</div>
                      <div>
                        <div class="font-semibold">${o.name}</div>
                        <div class="text-muted text-sm">ID: ${o.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>${o.email}</td>
                  <td class="font-mono text-sm">${o.phone}</td>
                  <td><span class="badge badge-info">${o.vehicles} véhicule${o.vehicles>1?'s':''}</span></td>
                  <td class="text-muted text-sm">Il y a ${Utils.randomBetween(1,48)}h</td>
                  <td>${Utils.getStatusBadge(o.status)}</td>
                  <td>
                    <div class="flex gap-8">
                      <button class="btn btn-ghost btn-sm" onclick="Toast.show('Accès envoyé par SMS et WhatsApp','success')">📱 Envoyer accès</button>
                      <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Modifier mot de passe">🔑</button>
                      <button class="btn btn-ghost btn-sm btn-icon" data-tooltip="Révoquer accès">🚫</button>
                    </div>
                  </td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Audit Log -->
        <div class="card">
          <div class="card-header"><span class="card-title">📋 Journal d'audit</span></div>
          <div class="card-body">
            <div class="timeline">
              ${[
                { action: 'Connexion', user: 'Ibrahima Ndiaye', time: 'Il y a 2h', detail: 'IP: 41.82.144.12 · Mobile' },
                { action: 'Modification véhicule', user: 'Admin (Vous)', time: 'Il y a 3h', detail: 'DK-0234-AB — Mise à jour kilométrage' },
                { action: 'Versement ajouté', user: 'Admin (Vous)', time: 'Il y a 4h', detail: 'V002 — 105 000 FCFA — Wave' },
                { action: 'Connexion', user: 'Fatou Diop', time: 'Il y a 6h', detail: 'IP: 41.82.150.88 · Desktop' },
                { action: 'Export rapport', user: 'Ibrahima Ndiaye', time: 'Il y a 1j', detail: 'Rapport mensuel — Décembre 2023' },
              ].map(e=>`
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-time">${e.time}</div>
                  <div class="timeline-content">
                    <strong>${e.action}</strong> — ${e.user}
                    <div class="text-muted" style="font-size:12px;margin-top:2px">${e.detail}</div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  },

  modalCreateAccess() {
    Modal.create({
      id: 'modal-create-access',
      title: '🔐 Créer un accès propriétaire',
      content: `
        <div class="alert alert-info mb-16">Les identifiants seront envoyés automatiquement par SMS et WhatsApp.</div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Prénom *</label><input type="text" class="form-control"></div>
          <div class="form-group"><label class="form-label">Nom *</label><input type="text" class="form-control"></div>
        </div>
        <div class="form-group"><label class="form-label">Numéro de téléphone *</label>
          <input type="tel" class="form-control" placeholder="+221 77 000 0000">
          <span class="text-muted text-sm mt-4">Sera utilisé pour envoyer les identifiants</span></div>
        <div class="form-group"><label class="form-label">Email *</label>
          <input type="email" class="form-control" placeholder="proprietaire@email.com"></div>
        <div class="form-group">
          <label class="form-label">Générer mot de passe</label>
          <div class="flex gap-8">
            <input type="text" class="form-control font-mono" id="gen-pass" value="${Math.random().toString(36).slice(-8).toUpperCase()}" readonly>
            <button class="btn btn-ghost btn-sm" onclick="document.getElementById('gen-pass').value=Math.random().toString(36).slice(-8).toUpperCase()">🔄</button>
          </div>
        </div>`,
      footer: `
        <button class="btn btn-ghost" onclick="Modal.close('modal-create-access')">Annuler</button>
        <button class="btn btn-primary" onclick="Toast.show('Accès créé et envoyé par SMS + WhatsApp ✓','success');Modal.close('modal-create-access')">Créer et envoyer</button>`
    });
  },

  // ----------------------------------------------------------
  // CHATBOT
  // ----------------------------------------------------------
  renderChatbot() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="grid-2" style="gap:16px;height:calc(100vh - 160px)">
          <div class="chat-window" style="height:100%">
            <div style="background:linear-gradient(135deg,var(--brand-700),var(--gray-800));padding:16px;border-bottom:1px solid var(--gray-750)">
              <div class="flex gap-12" style="align-items:center">
                <div style="width:40px;height:40px;background:linear-gradient(135deg,var(--brand-400),var(--accent-500));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px">🤖</div>
                <div>
                  <div class="font-semibold">Assistant FLOTTE 2.0</div>
                  <div class="text-muted text-sm flex gap-6" style="align-items:center"><span class="status-dot active"></span> En ligne</div>
                </div>
              </div>
            </div>
            <div class="chat-messages" id="chat-messages">
              <div class="chat-msg bot">
                <div style="width:32px;height:32px;background:linear-gradient(135deg,var(--brand-400),var(--accent-500));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🤖</div>
                <div class="chat-bubble">
                  Bonjour ! Je suis votre assistant IA FLOTTE 2.0. Je peux vous aider à analyser vos données de flotte, générer des rapports, et répondre à vos questions sur vos véhicules et chauffeurs.
                  <br><br>Que puis-je faire pour vous ?
                </div>
              </div>
            </div>
            <div class="chat-input-area">
              <input type="text" class="chat-input" id="chat-input" placeholder="Posez votre question..." 
                     onkeydown="if(event.key==='Enter') Chatbot.send()">
              <button class="btn btn-primary btn-icon" onclick="Chatbot.send()">➤</button>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex-col gap-12">
            <div class="card">
              <div class="card-header"><span class="card-title">⚡ Questions rapides</span></div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:8px">
                ${[
                  'Quel est le bilan de la flotte ce mois?',
                  'Quels chauffeurs ont des retards de versement?',
                  'Génère un rapport de performance',
                  'Quels véhicules ont besoin de maintenance?',
                  'Quel est mon top chauffeur ce mois?',
                  'Analyse mes dépenses par catégorie',
                  'Quand expire l\'assurance de mes véhicules?',
                ].map(q=>`<button class="btn btn-ghost btn-sm" style="text-align:left;justify-content:flex-start" onclick="Chatbot.ask('${q}')">${q}</button>`).join('')}
              </div>
            </div>
            <div class="card">
              <div class="card-header"><span class="card-title">💡 Suggestions du jour</span></div>
              <div class="card-body">
                <div class="alert alert-warning mb-10">
                  <div><strong>⚠️ Attention:</strong> V003 n'a pas versé depuis 5 jours. Contacter Abdou Sow.</div>
                </div>
                <div class="alert alert-info">
                  <div><strong>💡 Conseil:</strong> Vos revenus de janvier sont en hausse de 12%. Excellent!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // OWNER PORTAL
  // ----------------------------------------------------------
  renderOwnerPortal() {
    const content = document.getElementById('page-content');
    const owner = App.data.owners[0]; // Demo: first owner
    const myVehicles = App.data.vehicles.filter(v => v.owner === owner.name);
    const myVersements = App.data.versements.filter(vs => myVehicles.some(v=>v.id===vs.vehicleId));
    const totalV = myVersements.filter(vs=>vs.status==='paid').reduce((s,vs)=>s+vs.amount,0);
    const pending = myVersements.filter(vs=>vs.status==='pending').length;
    const overdue = myVersements.filter(vs=>vs.status==='overdue').length;

    content.innerHTML = `
      <div class="page-section">
        <!-- Owner Header -->
        <div class="card card-accent mb-24">
          <div class="card-body" style="padding:24px">
            <div class="flex gap-16" style="align-items:center">
              <div style="width:60px;height:60px;background:linear-gradient(135deg,var(--brand-400),var(--accent-500));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:white;flex-shrink:0">${Utils.getInitials(owner.name)}</div>
              <div style="flex:1">
                <h2 class="text-xl font-bold">${owner.name}</h2>
                <p class="text-muted">${owner.email} · ${owner.phone}</p>
                <p class="text-muted text-sm">Membre depuis ${Utils.formatDate(owner.joined)}</p>
              </div>
              <div class="flex gap-12">
                <div style="text-align:center">
                  <div class="text-2xl font-bold text-accent">${myVehicles.length}</div>
                  <div class="text-muted text-sm">Véhicules</div>
                </div>
                <div style="text-align:center">
                  <div class="text-2xl font-bold text-success">${Utils.formatCurrency(owner.balance)}</div>
                  <div class="text-muted text-sm">Solde disponible</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-grid mb-24">
          <div class="stat-card" style="--stat-color:#10B981;--stat-bg:rgba(16,185,129,.08)">
            <div class="stat-icon">💰</div>
            <div class="stat-value">${(totalV/1000).toFixed(0)}k</div>
            <div class="stat-label">Total reçu (FCFA)</div>
            <div class="stat-trend up">↑ +8%</div>
          </div>
          <div class="stat-card" style="--stat-color:#F59E0B;--stat-bg:rgba(245,158,11,.08)">
            <div class="stat-icon">⏳</div>
            <div class="stat-value">${pending}</div>
            <div class="stat-label">En attente</div>
          </div>
          <div class="stat-card" style="--stat-color:#EF4444;--stat-bg:rgba(239,68,68,.08)">
            <div class="stat-icon">⚠️</div>
            <div class="stat-value">${overdue}</div>
            <div class="stat-label">En retard</div>
          </div>
          <div class="stat-card" style="--stat-color:#00C6FF;--stat-bg:rgba(0,198,255,.08)">
            <div class="stat-icon">🚗</div>
            <div class="stat-value">${myVehicles.filter(v=>v.status==='active').length}</div>
            <div class="stat-label">Véhicules actifs</div>
          </div>
        </div>

        <!-- My Vehicles -->
        <div class="section-title">Mes véhicules</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:24px">
          ${myVehicles.map(v => Pages.vehicleCard(v)).join('')}
        </div>

        <!-- Payment Status -->
        <div class="card">
          <div class="card-header"><span class="card-title">📊 Statut des versements</span></div>
          <div class="table-wrapper">
            <table class="table">
              <thead><tr><th>Date</th><th>Véhicule</th><th>Montant</th><th>Méthode</th><th>Statut</th></tr></thead>
              <tbody>
                ${myVersements.slice(0,10).map(vs => {
                  const v = myVehicles.find(x=>x.id===vs.vehicleId);
                  return `<tr>
                    <td>${Utils.formatDate(vs.date)}</td>
                    <td><span class="font-mono text-sm">${v?.plate}</span></td>
                    <td class="font-semibold text-accent">${Utils.formatCurrency(vs.amount)}</td>
                    <td><span class="badge badge-neutral">${vs.method}</span></td>
                    <td>${Utils.getStatusBadge(vs.status)}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // PARAMETRES
  // ----------------------------------------------------------
  renderParametres() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
      <div class="page-section">
        <div class="grid-2" style="gap:16px">
          <!-- Profile -->
          <div class="card">
            <div class="card-header"><span class="card-title">👤 Profil administrateur</span></div>
            <div class="card-body">
              <div class="flex-center flex-col mb-24">
                <div style="width:80px;height:80px;background:linear-gradient(135deg,var(--brand-400),var(--accent-500));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:white;margin-bottom:12px">NG</div>
                <div class="font-semibold text-lg">Admin FLOTTE 2.0</div>
                <div class="text-muted text-sm">admin@ngary.com · Super Admin</div>
              </div>
              <div class="form-group"><label class="form-label">Nom complet</label><input type="text" class="form-control" value="Admin FLOTTE 2.0"></div>
              <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-control" value="admin@ngary.com"></div>
              <div class="form-group"><label class="form-label">Téléphone</label><input type="tel" class="form-control" value="+221 77 000 0000"></div>
              <button class="btn btn-primary w-full" onclick="Toast.show('Profil mis à jour','success')">Sauvegarder</button>
            </div>
          </div>

          <!-- App Settings -->
          <div class="flex-col gap-16">
            <div class="card">
              <div class="card-header"><span class="card-title">⚙️ Paramètres de l'application</span></div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:16px">
                ${[
                  { l:'Notifications SMS', d:'Alertes versements par SMS', checked: true },
                  { l:'Notifications WhatsApp', d:'Résumé quotidien sur WhatsApp', checked: true },
                  { l:'Rapports automatiques', d:'Rapport hebdomadaire chaque lundi', checked: false },
                  { l:'Mode sombre', d:'Interface sombre (actuel)', checked: true },
                  { l:'Affichage en FCFA', d:'Devise locale Franc CFA', checked: true },
                ].map(s=>`
                  <div class="flex-between" style="padding:10px;background:var(--gray-800);border-radius:var(--radius-md)">
                    <div>
                      <div class="font-medium text-sm">${s.l}</div>
                      <div class="text-muted" style="font-size:12px">${s.d}</div>
                    </div>
                    <label style="position:relative;width:44px;height:24px;flex-shrink:0;cursor:pointer">
                      <input type="checkbox" ${s.checked?'checked':''} style="opacity:0;position:absolute;width:0;height:0">
                      <span style="position:absolute;inset:0;background:${s.checked?'var(--brand-400)':'var(--gray-600)'};border-radius:12px;transition:.2s"></span>
                      <span style="position:absolute;top:3px;left:${s.checked?'23':'3'}px;width:18px;height:18px;background:white;border-radius:50%;transition:.2s"></span>
                    </label>
                  </div>`).join('')}
              </div>
            </div>

            <div class="card">
              <div class="card-header"><span class="card-title">🔒 Sécurité</span></div>
              <div class="card-body">
                <div class="form-group"><label class="form-label">Mot de passe actuel</label><input type="password" class="form-control" placeholder="••••••••"></div>
                <div class="form-group"><label class="form-label">Nouveau mot de passe</label><input type="password" class="form-control" placeholder="••••••••"></div>
                <div class="form-group"><label class="form-label">Confirmer</label><input type="password" class="form-control" placeholder="••••••••"></div>
                <button class="btn btn-primary w-full" onclick="Toast.show('Mot de passe modifié','success')">Changer le mot de passe</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
};

// ============================================================
// CHATBOT
// ============================================================
const Chatbot = {
  responses: {
    'bilan': 'Ce mois, votre flotte a généré <strong>589 500 FCFA</strong> en versements avec un taux de collecte de 89%. Vos dépenses totales s\'élèvent à 345 000 FCFA, soit un bénéfice net de 244 500 FCFA.',
    'retard': '<strong>1 chauffeur</strong> a des retards de versement:<br>• Abdou Sow (V003) — 5 jours de retard — 76 000 FCFA dûs',
    'rapport': 'Je génère votre rapport de performance... <br>🏆 Top 3 chauffeurs:<br>1. Moussa Diallo — 4.8⭐ — 2 850 000 FCFA<br>2. Omar Ba — 4.6⭐ — 3 200 000 FCFA<br>3. Lamine Gueye — 4.7⭐ — 2 640 000 FCFA',
    'maintenance': '<strong>2 véhicules</strong> nécessitent attention:<br>• V003 (DK-3891-EF) — En maintenance<br>• V004 (DK-5024-GH) — Vidange dépassée de 2000km',
    'top': '🏆 Top chauffeur ce mois: <strong>Omar Ba</strong><br>• 3 200 000 FCFA de versements<br>• Note: 4.6/5<br>• 1 567 courses effectuées',
    'dépenses': 'Répartition des dépenses:<br>• Assurance: 450 000 FCFA (44%)<br>• Réparation: 340 000 FCFA (33%)<br>• Carburant: 125 000 FCFA (12%)<br>• Entretien: 180 000 FCFA (11%)',
    'assurance': '⚠️ Alertes assurance:<br>• V006 (DK-8901-KL) — Expire dans <strong>15 jours</strong><br>• V002 (DK-1567-CD) — Renouvellée le 13/01/2024',
    'default': 'Je suis votre assistant IA FLOTTE 2.0. Je peux analyser vos données de flotte, générer des rapports, et vous donner des insights sur vos véhicules et chauffeurs. Posez-moi une question spécifique!'
  },

  send() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    this.addMessage(msg, 'user');
    setTimeout(() => this.respond(msg), 600);
  },

  ask(question) {
    document.getElementById('chat-input').value = question;
    this.send();
  },

  addMessage(text, role) {
    const messages = document.getElementById('chat-messages');
    if (!messages) return;
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = role === 'bot' ?
      `<div style="width:32px;height:32px;background:linear-gradient(135deg,var(--brand-400),var(--accent-500));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🤖</div>
       <div class="chat-bubble">${text}</div>` :
      `<div class="chat-bubble">${text}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  },

  respond(msg) {
    const lower = msg.toLowerCase();
    let response = this.responses.default;
    if (lower.includes('bilan') || lower.includes('revenus')) response = this.responses['bilan'];
    else if (lower.includes('retard') || lower.includes('versement')) response = this.responses['retard'];
    else if (lower.includes('rapport') || lower.includes('performance')) response = this.responses['rapport'];
    else if (lower.includes('maintenance') || lower.includes('réparation')) response = this.responses['maintenance'];
    else if (lower.includes('top') || lower.includes('meilleur')) response = this.responses['top'];
    else if (lower.includes('dépense') || lower.includes('catégorie')) response = this.responses['dépenses'];
    else if (lower.includes('assurance') || lower.includes('expire')) response = this.responses['assurance'];
    this.addMessage(response, 'bot');
  }
};

// ============================================================
// TABS UTILITY
// ============================================================
const Tabs = {
  switch(el, group) {
    el.closest('.tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
};

// ============================================================
// AUTH
// ============================================================
const Auth = {
  login() {
    const email = document.getElementById('login-email')?.value;
    const pass = document.getElementById('login-pass')?.value;

    if (!email || !pass) {
      Toast.show('Veuillez remplir tous les champs', 'error');
      return;
    }

    Toast.show('Connexion en cours...', 'info', 1000);

    setTimeout(() => {
      App.currentUser = { name: 'Admin FLOTTE 2.0', email, role: 'admin' };
      App.renderApp();
    }, 800);
  },

  logout() {
    App.currentUser = null;
    Pages.renderLogin();
  }
};

// ============================================================
// APP INIT
// ============================================================
App.renderApp = function() {
  document.body.innerHTML = `
    <div class="app-layout">
      <!-- Sidebar -->
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <div class="logo-icon">🚗</div>
            <div class="logo-text">FLOTTE <span>2.0</span></div>
          </div>
          <div class="sidebar-toggle" onclick="Sidebar.toggle()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </div>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-label">Principal</div>
            <div class="nav-item active" data-page="dashboard" onclick="Router.navigate('dashboard')">
              <span class="nav-icon">📊</span><span class="nav-label">Tableau de Bord</span>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-section-label">Flotte</div>
            <div class="nav-item" data-page="vehicles" onclick="Router.navigate('vehicles')">
              <span class="nav-icon">🚗</span><span class="nav-label">Véhicules</span>
            </div>
            <div class="nav-item" data-page="drivers" onclick="Router.navigate('drivers')">
              <span class="nav-icon">👤</span><span class="nav-label">Chauffeurs</span>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-section-label">Finance</div>
            <div class="nav-item" data-page="versements" onclick="Router.navigate('versements')">
              <span class="nav-icon">💳</span><span class="nav-label">Versements</span>
              <span class="nav-badge">${App.data.versements.filter(v=>v.status==='pending').length}</span>
            </div>
            <div class="nav-item" data-page="depenses" onclick="Router.navigate('depenses')">
              <span class="nav-icon">💸</span><span class="nav-label">Dépenses</span>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-section-label">Analytique</div>
            <div class="nav-item" data-page="analyse" onclick="Router.navigate('analyse')">
              <span class="nav-icon">📈</span><span class="nav-label">Analyse</span>
            </div>
            <div class="nav-item" data-page="performance" onclick="Router.navigate('performance')">
              <span class="nav-icon">⚡</span><span class="nav-label">Performance</span>
            </div>
            <div class="nav-item" data-page="rapports" onclick="Router.navigate('rapports')">
              <span class="nav-icon">📋</span><span class="nav-label">Rapports</span>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-section-label">Opérations</div>
            <div class="nav-item" data-page="suivi" onclick="Router.navigate('suivi')">
              <span class="nav-icon">📍</span><span class="nav-label">Suivi GPS</span>
            </div>
            <div class="nav-item" data-page="alerts" onclick="Router.navigate('alerts')">
              <span class="nav-icon">🔔</span><span class="nav-label">Alertes</span>
              <span class="nav-badge">${App.data.alerts.filter(a=>!a.read).length}</span>
            </div>
          </div>

          <div class="nav-section">
            <div class="nav-section-label">Administration</div>
            <div class="nav-item" data-page="acces" onclick="Router.navigate('acces')">
              <span class="nav-icon">🔐</span><span class="nav-label">Gestion Accès</span>
            </div>
            <div class="nav-item" data-page="owner" onclick="Router.navigate('owner')">
              <span class="nav-icon">🏢</span><span class="nav-label">Espace Propriétaire</span>
            </div>
            <div class="nav-item" data-page="chatbot" onclick="Router.navigate('chatbot')">
              <span class="nav-icon">🤖</span><span class="nav-label">Assistant IA</span>
            </div>
            <div class="nav-item" data-page="parametres" onclick="Router.navigate('parametres')">
              <span class="nav-icon">⚙️</span><span class="nav-label">Paramètres</span>
            </div>
          </div>
        </nav>

        <div class="sidebar-footer">
          <div class="user-card" onclick="Auth.logout()">
            <div class="user-avatar">NG</div>
            <div class="user-info">
              <div class="user-name">Admin</div>
              <div class="user-role">Super Admin · ngary.com</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content" id="main-content">
        <!-- Header -->
        <header class="header">
          <div class="header-left">
            <button class="header-btn" style="display:none" id="mobile-menu-btn" onclick="Sidebar.toggleMobile()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <h1 class="page-title" id="page-title">Tableau de Bord</h1>
          </div>
          <div class="header-right">
            <div class="search-bar" style="display:none">
              <input type="text" placeholder="Recherche globale...">
            </div>
            <button class="header-btn" data-tooltip="Notifications" onclick="Router.navigate('alerts')">
              🔔
              <span class="notif-dot"></span>
            </button>
            <button class="header-btn" data-tooltip="Rapports" onclick="Router.navigate('rapports')">📊</button>
            <button class="header-btn" data-tooltip="Assistant IA" onclick="Router.navigate('chatbot')">🤖</button>
            <button class="btn btn-ghost btn-sm" onclick="Auth.logout()">Déconnexion</button>
          </div>
        </header>

        <!-- Page Content -->
        <div id="page-content" class="page-content"></div>
      </main>
    </div>`;

  // Restore sidebar state
  const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (collapsed) {
    App.sidebarCollapsed = true;
    document.getElementById('sidebar')?.classList.add('collapsed');
    document.getElementById('main-content')?.classList.add('sidebar-collapsed');
  }

  // Mobile: show menu button
  if (window.innerWidth <= 900) {
    document.getElementById('mobile-menu-btn').style.display = 'flex';
  }

  // Navigate to dashboard
  Router.navigate('dashboard');
};

// ============================================================
// START APP
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  Pages.renderLogin();

  // Auto-login for demo
  setTimeout(() => {
    App.currentUser = { name: 'Admin FLOTTE 2.0', email: 'admin@ngary.com', role: 'admin' };
    App.renderApp();
  }, 200);
});
