// ===================================
// CLINIC PATIENT PORTAL - JAVASCRIPT
// Interactive Features & Data Management
// ===================================

// ============= DATA STORAGE =============
const appointmentsData = [
    {
        id: 1,
        date: '2025-11-22',
        time: '09:00',
        doctor: 'Dr. Sarah Smith',
        department: 'Cardiology',
        type: 'Follow-up Consultation',
        status: 'confirmed',
        location: 'Building A, Room 301'
    },
    {
        id: 2,
        date: '2025-11-25',
        time: '14:30',
        doctor: 'Dr. Michael Johnson',
        department: 'Dermatology',
        type: 'Regular Check-up',
        status: 'upcoming',
        location: 'Building B, Room 205'
    },
    {
        id: 3,
        date: '2025-11-28',
        time: '11:15',
        doctor: 'Dr. Emily Williams',
        department: 'Neurology',
        type: 'Consultation',
        status: 'pending',
        location: 'Building A, Room 410'
    },
    {
        id: 4,
        date: '2025-12-02',
        time: '10:00',
        doctor: 'Dr. David Brown',
        department: 'Orthopedics',
        type: 'Follow-up',
        status: 'upcoming',
        location: 'Building C, Room 102'
    }
];

const prescriptionsData = [
    {
        id: 1,
        name: 'Lisinopril',
        dosage: '10mg, Once daily',
        frequency: 'Daily',
        duration: '30 days',
        refills: 2,
        prescribedBy: 'Dr. Sarah Smith',
        prescribedDate: '2025-10-15',
        status: 'Active'
    },
    {
        id: 2,
        name: 'Metformin',
        dosage: '500mg, Twice daily',
        frequency: 'Twice daily',
        duration: '90 days',
        refills: 3,
        prescribedBy: 'Dr. Sarah Smith',
        prescribedDate: '2025-09-20',
        status: 'Active'
    },
    {
        id: 3,
        name: 'Atorvastatin',
        dosage: '20mg, Once daily at bedtime',
        frequency: 'Daily',
        duration: '30 days',
        refills: 1,
        prescribedBy: 'Dr. Michael Johnson',
        prescribedDate: '2025-11-01',
        status: 'Active'
    },
    {
        id: 4,
        name: 'Omeprazole',
        dosage: '20mg, Once daily before breakfast',
        frequency: 'Daily',
        duration: '60 days',
        refills: 2,
        prescribedBy: 'Dr. Emily Williams',
        prescribedDate: '2025-10-28',
        status: 'Active'
    },
    {
        id: 5,
        name: 'Aspirin',
        dosage: '81mg, Once daily',
        frequency: 'Daily',
        duration: 'Ongoing',
        refills: 5,
        prescribedBy: 'Dr. Sarah Smith',
        prescribedDate: '2025-08-10',
        status: 'Active'
    }
];

const medicalHistoryData = [
    {
        id: 1,
        date: '2025-11-15',
        title: 'Annual Physical Examination',
        description: 'Comprehensive health check including blood work, ECG, and vital signs monitoring. All results within normal range.',
        category: 'Checkup',
        doctor: 'Dr. Sarah Smith',
        tags: ['Physical', 'Blood Work', 'ECG']
    },
    {
        id: 2,
        date: '2025-10-20',
        title: 'Blood Pressure Management',
        description: 'Follow-up appointment for hypertension management. Blood pressure readings improved. Medication adjusted.',
        category: 'Follow-up',
        doctor: 'Dr. Sarah Smith',
        tags: ['Hypertension', 'Cardiology', 'Medication']
    },
    {
        id: 3,
        date: '2025-09-05',
        title: 'Skin Condition Treatment',
        description: 'Consultation for dermatitis. Prescribed topical corticosteroid cream. Follow-up scheduled in 4 weeks.',
        category: 'Treatment',
        doctor: 'Dr. Michael Johnson',
        tags: ['Dermatology', 'Prescription']
    },
    {
        id: 4,
        date: '2025-08-12',
        title: 'Lab Results - Cholesterol Panel',
        description: 'Lipid panel results show elevated LDL cholesterol. Started on statin therapy. Diet and exercise recommendations provided.',
        category: 'Lab Results',
        doctor: 'Dr. Sarah Smith',
        tags: ['Lab Results', 'Cholesterol', 'Lifestyle']
    },
    {
        id: 5,
        date: '2025-07-18',
        title: 'Vaccination - Influenza',
        description: 'Annual flu vaccine administered. No adverse reactions reported.',
        category: 'Immunization',
        doctor: 'Nurse Practitioner',
        tags: ['Vaccination', 'Preventive Care']
    },
    {
        id: 6,
        date: '2025-06-22',
        title: 'Consultation - Headaches',
        description: 'Neurological consultation for recurring headaches. MRI ordered to rule out underlying conditions.',
        category: 'Consultation',
        doctor: 'Dr. Emily Williams',
        tags: ['Neurology', 'Imaging']
    }
];

// ============= GLOBAL VARIABLES =============
let healthMetricsChartInstance = null;

// ============= THEME MANAGEMENT =============
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ============= SIDEBAR MANAGEMENT =============
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

sidebarToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const icon = sidebarToggle.querySelector('i');
    
    if (sidebar.classList.contains('collapsed')) {
        icon.classList.replace('fa-chevron-left', 'fa-chevron-right');
    } else {
        icon.classList.replace('fa-chevron-right', 'fa-chevron-left');
    }
    
    // Resize chart after sidebar animation completes
    setTimeout(() => {
        if (healthMetricsChartInstance) {
            healthMetricsChartInstance.resize();
        }
    }, 300); // Match the CSS transition duration
});

mobileMenuBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
        }
    }
});

// ============= PAGE NAVIGATION =============
const navLinks = document.querySelectorAll('.nav-link[data-page]');
const pages = document.querySelectorAll('.page-content');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');

const pageTitles = {
    dashboard: {
        title: 'Dashboard',
        subtitle: 'Welcome back, John! Here\'s your health overview.'
    },
    appointments: {
        title: 'Appointments',
        subtitle: 'Manage your upcoming and past appointments.'
    },
    prescriptions: {
        title: 'Prescriptions',
        subtitle: 'View and manage your active prescriptions.'
    },
    history: {
        title: 'Medical History',
        subtitle: 'Your complete medical history timeline.'
    },
    'lab-results': {
        title: 'Lab Results',
        subtitle: 'View and download your laboratory test results.'
    },
    'medical-records': {
        title: 'Medical Records',
        subtitle: 'Access your complete medical records and documents.'
    },
    'my-doctors': {
        title: 'My Doctors',
        subtitle: 'View your healthcare providers and specialists.'
    },
    settings: {
        title: 'Settings',
        subtitle: 'Manage your account and notification preferences.'
    },
    'help-support': {
        title: 'Help & Support',
        subtitle: 'Get assistance and answers to your questions.'
    }
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.dataset.page;
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target page
        pages.forEach(page => page.classList.add('hidden'));
        document.getElementById(`${targetPage}Page`).classList.remove('hidden');
        
        // Update page title
        const titleInfo = pageTitles[targetPage];
        if (titleInfo) {
            pageTitle.textContent = titleInfo.title;
            pageSubtitle.textContent = titleInfo.subtitle;
        }
        
        // Close mobile sidebar
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('mobile-open');
        }
    });
});

// ============= APPOINTMENTS RENDERING =============
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return { hour: `${displayHour}:${minutes}`, period };
}

function renderDashboardAppointments() {
    const container = document.getElementById('dashboardAppointments');
    const upcomingAppointments = appointmentsData.slice(0, 3);
    
    container.innerHTML = upcomingAppointments.map(apt => {
        const time = formatTime(apt.time);
        return `
            <div class="appointment-item">
                <div class="appointment-time">
                    <div class="appointment-hour">${time.hour}</div>
                    <div class="appointment-period">${time.period}</div>
                </div>
                <div class="appointment-details">
                    <div class="appointment-doctor">${apt.doctor}</div>
                    <div class="appointment-type">${apt.type}</div>
                    <div class="appointment-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(apt.date)}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${apt.location}</span>
                    </div>
                </div>
                <div class="appointment-actions">
                    <span class="appointment-status ${apt.status}">${apt.status}</span>
                    <button class="btn-icon" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" title="Reschedule">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" title="Cancel">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderAppointmentsTable() {
    const tbody = document.getElementById('appointmentsTableBody');
    
    tbody.innerHTML = appointmentsData.map(apt => {
        const time = formatTime(apt.time);
        return `
            <tr>
                <td>
                    <strong>${formatDate(apt.date)}</strong><br>
                    <small style="color: var(--text-tertiary)">${time.hour} ${time.period}</small>
                </td>
                <td>${apt.doctor}</td>
                <td>${apt.department}</td>
                <td>${apt.type}</td>
                <td><span class="appointment-status ${apt.status}">${apt.status}</span></td>
                <td>
                    <button class="btn-icon" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" title="Reschedule">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" title="Cancel">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ============= PRESCRIPTIONS RENDERING =============
function renderPrescriptions() {
    const container = document.getElementById('prescriptionsGrid');
    
    container.innerHTML = prescriptionsData.map(rx => `
        <div class="prescription-card">
            <div class="prescription-header">
                <div class="prescription-icon">
                    <i class="fas fa-pills"></i>
                </div>
                <div class="prescription-badge">${rx.status}</div>
            </div>
            <div class="prescription-name">${rx.name}</div>
            <div class="prescription-dosage">${rx.dosage}</div>
            <div class="prescription-info">
                <div class="prescription-info-item">
                    <span class="info-label">Frequency</span>
                    <span class="info-value">${rx.frequency}</span>
                </div>
                <div class="prescription-info-item">
                    <span class="info-label">Duration</span>
                    <span class="info-value">${rx.duration}</span>
                </div>
                <div class="prescription-info-item">
                    <span class="info-label">Refills Left</span>
                    <span class="info-value">${rx.refills}</span>
                </div>
            </div>
            <div class="prescription-footer">
                <div class="prescription-doctor">
                    Prescribed by ${rx.prescribedBy}
                </div>
                <button class="refill-btn">
                    <i class="fas fa-redo"></i> Refill
                </button>
            </div>
        </div>
    `).join('');
}

// ============= MEDICAL HISTORY RENDERING =============
function renderMedicalHistory() {
    const container = document.getElementById('medicalTimeline');
    
    container.innerHTML = medicalHistoryData.map(item => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDate(item.date)}</div>
            <div class="timeline-card">
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-description">${item.description}</div>
                <div class="timeline-tags">
                    ${item.tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// ============= HEALTH METRICS CHART =============
function renderHealthMetricsChart() {
    const ctx = document.getElementById('healthMetricsChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (healthMetricsChartInstance) {
        healthMetricsChartInstance.destroy();
    }
    
    healthMetricsChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            datasets: [
                {
                    label: 'Blood Pressure (Systolic)',
                    data: [128, 125, 130, 122, 120, 118, 121, 119, 117, 120, 118],
                    borderColor: '#0066CC',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Heart Rate (BPM)',
                    data: [75, 72, 78, 70, 68, 72, 70, 69, 71, 70, 68],
                    borderColor: '#00BFA6',
                    backgroundColor: 'rgba(0, 191, 166, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Weight (kg)',
                    data: [78, 77.5, 77, 76.8, 76.5, 76, 75.8, 75.5, 75.2, 75, 74.8],
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: {
                        family: 'Inter',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 13
                    },
                    padding: 12,
                    borderColor: 'rgba(226, 232, 240, 0.2)',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// ============= MODAL MANAGEMENT =============
const appointmentModal = document.getElementById('appointmentModal');
const bookAppointmentBtns = [
    document.getElementById('bookAppointmentBtn'),
    document.getElementById('bookAppointmentBtn2')
];
const closeAppointmentModal = document.getElementById('closeAppointmentModal');
const cancelAppointment = document.getElementById('cancelAppointment');
const submitAppointment = document.getElementById('submitAppointment');
const appointmentForm = document.getElementById('appointmentForm');

// Set minimum date to today
const dateInput = document.getElementById('appointmentDate');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Open modal
bookAppointmentBtns.forEach(btn => {
    btn?.addEventListener('click', () => {
        appointmentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    appointmentModal.classList.remove('active');
    document.body.style.overflow = '';
    appointmentForm.reset();
}

closeAppointmentModal?.addEventListener('click', closeModal);
cancelAppointment?.addEventListener('click', closeModal);

// Close modal when clicking outside
appointmentModal?.addEventListener('click', (e) => {
    if (e.target === appointmentModal) {
        closeModal();
    }
});

// Submit appointment
submitAppointment?.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
    }
    
    // Get form data
    const formData = {
        department: document.getElementById('appointmentDepartment').value,
        doctor: document.getElementById('appointmentDoctor').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        type: document.getElementById('appointmentType').value,
        reason: document.getElementById('appointmentReason').value
    };
    
    console.log('Appointment booked:', formData);
    
    // Show success message (you can replace this with a toast notification)
    alert('Appointment request submitted successfully! You will receive a confirmation email shortly.');
    
    closeModal();
});

// ============= TABLE SORTING =============
const tableHeaders = document.querySelectorAll('th');
tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        console.log('Sorting by:', header.textContent);
        // Add sorting logic here
    });
});

// ============= SEARCH FUNCTIONALITY =============
const searchInput = document.querySelector('.search-input');
searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // Add search logic here
});

// ============= LAB RESULTS RENDERING =============
const labResultsData = [
    {
        test: 'Complete Blood Count (CBC)',
        date: '2025-11-15',
        result: 'Normal',
        range: '4,500-11,000 cells/μL',
        status: 'normal'
    },
    {
        test: 'Lipid Panel',
        date: '2025-11-10',
        result: 'LDL: 145 mg/dL',
        range: '<100 mg/dL optimal',
        status: 'high'
    },
    {
        test: 'HbA1c (Diabetes)',
        date: '2025-10-28',
        result: '5.8%',
        range: '<5.7% normal',
        status: 'borderline'
    },
    {
        test: 'Thyroid Function (TSH)',
        date: '2025-10-20',
        result: '2.5 mIU/L',
        range: '0.4-4.0 mIU/L',
        status: 'normal'
    }
];

function renderLabResults() {
    const tbody = document.getElementById('labResultsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = labResultsData.map(lab => `
        <tr>
            <td><strong>${lab.test}</strong></td>
            <td>${formatDate(lab.date)}</td>
            <td>${lab.result}</td>
            <td>${lab.range}</td>
            <td>
                <span class="appointment-status ${lab.status === 'normal' ? 'confirmed' : lab.status === 'high' || lab.status === 'low' ? 'pending' : 'upcoming'}">
                    ${lab.status}
                </span>
            </td>
            <td>
                <button class="btn-icon" title="Download PDF">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn-icon" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// ============= MEDICAL RECORDS RENDERING =============
const medicalRecordsData = [
    {
        name: 'Annual Physical Exam - 2025',
        date: '2025-11-15',
        type: 'Exam Report',
        size: '2.3 MB',
        icon: 'fa-file-pdf'
    },
    {
        name: 'Prescription - Lisinopril',
        date: '2025-10-15',
        type: 'Prescription',
        size: '156 KB',
        icon: 'fa-file-prescription'
    },
    {
        name: 'Lab Results - Blood Work',
        date: '2025-11-10',
        type: 'Lab Results',
        size: '890 KB',
        icon: 'fa-file-medical'
    },
    {
        name: 'X-Ray - Chest',
        date: '2025-09-20',
        type: 'Imaging',
        size: '4.5 MB',
        icon: 'fa-file-image'
    }
];

function renderMedicalRecords() {
    const container = document.getElementById('medicalRecordsList');
    if (!container) return;
    
    container.innerHTML = medicalRecordsData.map(record => `
        <div style="padding: var(--spacing-lg); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: var(--spacing-lg); transition: background-color var(--transition-fast); cursor: pointer;" onmouseover="this.style.backgroundColor='var(--bg-hover)'" onmouseout="this.style.backgroundColor='transparent'">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, rgba(0, 102, 204, 0.1), rgba(0, 102, 204, 0.05)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--primary-color); font-size: 1.5rem;">
                <i class="fas ${record.icon}"></i>
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">${record.name}</div>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">
                    ${record.type} • ${formatDate(record.date)} • ${record.size}
                </div>
            </div>
            <div style="display: flex; gap: 0.25rem;">
                <button class="btn-icon" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn-icon" title="Share">
                    <i class="fas fa-share-alt"></i>
                </button>
                <button class="btn-icon" title="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// ============= MY DOCTORS RENDERING =============
const doctorsData = [
    {
        name: 'Dr. Sarah Smith',
        specialty: 'Cardiologist',
        phone: '+1 (555) 123-4567',
        email: 'sarah.smith@medicare.com',
        nextAppointment: '2025-11-22'
    },
    {
        name: 'Dr. Michael Johnson',
        specialty: 'Dermatologist',
        phone: '+1 (555) 234-5678',
        email: 'michael.johnson@medicare.com',
        nextAppointment: '2025-11-25'
    },
    {
        name: 'Dr. Emily Williams',
        specialty: 'Neurologist',
        phone: '+1 (555) 345-6789',
        email: 'emily.williams@medicare.com',
        nextAppointment: '2025-11-28'
    },
    {
        name: 'Dr. David Brown',
        specialty: 'Orthopedic Surgeon',
        phone: '+1 (555) 456-7890',
        email: 'david.brown@medicare.com',
        nextAppointment: null
    }
];

function renderDoctors() {
    const container = document.getElementById('doctorsGrid');
    if (!container) return;
    
    container.innerHTML = doctorsData.map(doctor => `
        <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--spacing-lg); transition: all var(--transition-fast);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 700; margin-bottom: var(--spacing-md);">
                ${doctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 style="margin-bottom: 0.25rem; color: var(--text-primary);">${doctor.name}</h4>
            <div style="color: var(--primary-color); font-size: 0.875rem; font-weight: 600; margin-bottom: var(--spacing-md);">${doctor.specialty}</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-sm); margin-bottom: var(--spacing-md); font-size: 0.875rem;">
                <div style="color: var(--text-secondary);">
                    <i class="fas fa-phone" style="width: 16px; margin-right: var(--spacing-sm);"></i>
                    ${doctor.phone}
                </div>
                <div style="color: var(--text-secondary);">
                    <i class="fas fa-envelope" style="width: 16px; margin-right: var(--spacing-sm);"></i>
                    ${doctor.email}
                </div>
            </div>
            ${doctor.nextAppointment ? `
                <div style="padding: var(--spacing-sm); background-color: rgba(0, 102, 204, 0.1); border-radius: var(--radius-md); font-size: 0.8125rem; color: var(--primary-color); margin-bottom: var(--spacing-md);">
                    <i class="fas fa-calendar-check"></i> Next: ${formatDate(doctor.nextAppointment)}
                </div>
            ` : ''}
            <div style="display: flex; gap: var(--spacing-sm);">
                <button class="btn btn-primary btn-sm" style="flex: 1;">
                    <i class="fas fa-calendar-plus"></i> Book
                </button>
                <button class="btn btn-secondary btn-sm" style="flex: 1;">
                    <i class="fas fa-comment"></i> Message
                </button>
            </div>
        </div>
    `).join('');
}

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', () => {
    // Render all data
    renderDashboardAppointments();
    renderAppointmentsTable();
    renderPrescriptions();
    renderMedicalHistory();
    renderHealthMetricsChart();
    renderLabResults();
    renderMedicalRecords();
    renderDoctors();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    console.log('✅ MediCare Patient Portal initialized successfully!');
});

// ============= UTILITY FUNCTIONS =============
function showNotification(message, type = 'info') {
    // You can implement a toast notification system here
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for scroll animations
document.querySelectorAll('.card, .stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
