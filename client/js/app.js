import { fetchData, postData, updateData, deleteData } from './api.js';

const viewTitle = document.getElementById('view-title');
const contentArea = document.getElementById('content-area');
const navLinks = document.querySelectorAll('.sidebar-nav a');

// Modals
const modals = {
    resident: document.getElementById('resident-modal'),
    household: document.getElementById('household-modal'),
    certificate: document.getElementById('certificate-modal'),
    blotter: document.getElementById('blotter-modal')
};

const forms = {
    resident: document.getElementById('resident-form'),
    household: document.getElementById('household-form'),
    certificate: document.getElementById('certificate-form'),
    blotter: document.getElementById('blotter-form')
};

const views = {
    dashboard: async () => {
        viewTitle.textContent = 'Dashboard';
        try {
            const [residents, households, certificates, blotters] = await Promise.all([
                fetchData('/residents'),
                fetchData('/households'),
                fetchData('/certificates'),
                fetchData('/blotter')
            ]);
            
            const pendingBlotters = blotters.filter(b => b.status === 'Pending').length;

            contentArea.innerHTML = `
                <div class="card-grid">
                    <div class="card">
                        <i class="fas fa-users"></i>
                        <h3>Total Residents</h3>
                        <p>${residents.length}</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-home"></i>
                        <h3>Total Households</h3>
                        <p>${households.length}</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-file-contract"></i>
                        <h3>Certificates Issued</h3>
                        <p>${certificates.length}</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-gavel"></i>
                        <h3>Pending Blotters</h3>
                        <p>${pendingBlotters}</p>
                    </div>
                </div>
            `;
        } catch (error) {
            contentArea.innerHTML = `<p>Error loading dashboard: ${error.message}</p>`;
        }
    },
    residents: async () => {
        viewTitle.textContent = 'Residents';
        try {
            const residents = await fetchData('/residents');
            contentArea.innerHTML = `
                <div class="table-container">
                    <div style="margin-bottom: 1rem; display: flex; justify-content: flex-end;">
                        <button class="btn btn-primary" id="btn-add-resident"><i class="fas fa-plus"></i> Add Resident</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Household</th>
                                <th>Address</th>
                                <th>Voter</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${residents.map(r => `
                                <tr>
                                    <td>${r.first_name} ${r.last_name}</td>
                                    <td>${r.household_number || 'N/A'}</td>
                                    <td>${r.street_address || 'N/A'}, ${r.purok_zone || ''}</td>
                                    <td>${r.is_voter ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm btn-edit-resident" data-id="${r.id}"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-danger btn-sm btn-delete-resident" data-id="${r.id}"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            document.getElementById('btn-add-resident').onclick = () => showModal('resident');
            document.querySelectorAll('.btn-edit-resident').forEach(btn => {
                btn.onclick = () => editItem('resident', btn.dataset.id);
            });
            document.querySelectorAll('.btn-delete-resident').forEach(btn => {
                btn.onclick = () => deleteItem('resident', btn.dataset.id);
            });
        } catch (error) {
            contentArea.innerHTML = `<p>Error loading residents: ${error.message}</p>`;
        }
    },
    households: async () => {
        viewTitle.textContent = 'Households';
        try {
            const households = await fetchData('/households');
            contentArea.innerHTML = `
                <div class="table-container">
                    <div style="margin-bottom: 1rem; display: flex; justify-content: flex-end;">
                        <button class="btn btn-primary" id="btn-add-household"><i class="fas fa-plus"></i> Add Household</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>HH Number</th>
                                <th>Address</th>
                                <th>Purok</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${households.map(h => `
                                <tr>
                                    <td>${h.household_number}</td>
                                    <td>${h.street_address}</td>
                                    <td>${h.purok_zone}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm btn-edit-household" data-id="${h.id}"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-danger btn-sm btn-delete-household" data-id="${h.id}"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            document.getElementById('btn-add-household').onclick = () => showModal('household');
            document.querySelectorAll('.btn-edit-household').forEach(btn => {
                btn.onclick = () => editItem('household', btn.dataset.id);
            });
            document.querySelectorAll('.btn-delete-household').forEach(btn => {
                btn.onclick = () => deleteItem('household', btn.dataset.id);
            });
        } catch (error) {
            contentArea.innerHTML = `<p>Error loading households: ${error.message}</p>`;
        }
    },
    certificates: async () => {
        viewTitle.textContent = 'Certificates';
        try {
            const certificates = await fetchData('/certificates');
            contentArea.innerHTML = `
                <div class="table-container">
                    <div style="margin-bottom: 1rem; display: flex; justify-content: flex-end;">
                        <button class="btn btn-primary" id="btn-add-certificate"><i class="fas fa-plus"></i> Issue Certificate</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Control No.</th>
                                <th>Resident</th>
                                <th>Type</th>
                                <th>Date Issued</th>
                                <th>Issued By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${certificates.map(c => `
                                <tr>
                                    <td>${c.control_number}</td>
                                    <td>${c.first_name} ${c.last_name}</td>
                                    <td>${c.cert_type}</td>
                                    <td>${new Date(c.date_issued).toLocaleDateString()}</td>
                                    <td>${c.issued_by}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm btn-edit-certificate" data-id="${c.id}"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-danger btn-sm btn-delete-certificate" data-id="${c.id}"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            document.getElementById('btn-add-certificate').onclick = () => showModal('certificate');
            document.querySelectorAll('.btn-edit-certificate').forEach(btn => {
                btn.onclick = () => editItem('certificate', btn.dataset.id);
            });
            document.querySelectorAll('.btn-delete-certificate').forEach(btn => {
                btn.onclick = () => deleteItem('certificate', btn.dataset.id);
            });
        } catch (error) {
            contentArea.innerHTML = `<p>Error loading certificates: ${error.message}</p>`;
        }
    },
    blotter: async () => {
        viewTitle.textContent = 'Blotter Records';
        try {
            const blotters = await fetchData('/blotter');
            contentArea.innerHTML = `
                <div class="table-container">
                    <div style="margin-bottom: 1rem; display: flex; justify-content: flex-end;">
                        <button class="btn btn-primary" id="btn-add-blotter"><i class="fas fa-plus"></i> Record Blotter</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Complainant</th>
                                <th>Respondent</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${blotters.map(b => `
                                <tr>
                                    <td>${new Date(b.incident_date).toLocaleString()}</td>
                                    <td>${b.complainant_name}</td>
                                    <td>${b.respondent_name}</td>
                                    <td>${b.incident_type}</td>
                                    <td><span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span></td>
                                    <td>
                                        <button class="btn btn-primary btn-sm btn-edit-blotter" data-id="${b.id}"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-danger btn-sm btn-delete-blotter" data-id="${b.id}"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            document.getElementById('btn-add-blotter').onclick = () => showModal('blotter');
            document.querySelectorAll('.btn-edit-blotter').forEach(btn => {
                btn.onclick = () => editItem('blotter', btn.dataset.id);
            });
            document.querySelectorAll('.btn-delete-blotter').forEach(btn => {
                btn.onclick = () => deleteItem('blotter', btn.dataset.id);
            });
        } catch (error) {
            contentArea.innerHTML = `<p>Error loading blotters: ${error.message}</p>`;
        }
    }
};

// Modal Helpers
const showModal = async (type, data = null) => {
    forms[type].reset();
    document.getElementById(`${type}-id`).value = '';
    document.getElementById(`${type}-modal-title`).textContent = data ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;

    if (type === 'resident') {
        const households = await fetchData('/households');
        const select = document.getElementById('resident-household_id');
        select.innerHTML = '<option value="">Select Household</option>' + 
            households.map(h => `<option value="${h.id}">${h.household_number} - ${h.street_address}</option>`).join('');
    } else if (type === 'certificate') {
        const [residents, users] = await Promise.all([
            fetchData('/residents'),
            fetchData('/users') // I need to check if /users endpoint exists or use dummy/static for now. Let's assume it exists or add it.
        ]);
        const resSelect = document.getElementById('certificate-resident_id');
        resSelect.innerHTML = '<option value="">Select Resident</option>' + 
            residents.map(r => `<option value="${r.id}">${r.first_name} ${r.last_name}</option>`).join('');
        
        const userSelect = document.getElementById('certificate-issued_by_user_id');
        userSelect.innerHTML = '<option value="">Select User</option>' + 
            users.map(u => `<option value="${u.id}">${u.full_name}</option>`).join('');
    } else if (type === 'blotter') {
        const residents = await fetchData('/residents');
        const compSelect = document.getElementById('blotter-complainant_id');
        compSelect.innerHTML = '<option value="">Select Complainant</option>' + 
            residents.map(r => `<option value="${r.id}">${r.first_name} ${r.last_name}</option>`).join('');
        
        const respSelect = document.getElementById('blotter-respondent_id');
        respSelect.innerHTML = '<option value="">Select Respondent</option>' + 
            residents.map(r => `<option value="${r.id}">${r.first_name} ${r.last_name}</option>`).join('');
    }

    if (data) {
        document.getElementById(`${type}-id`).value = data.id;
        Object.keys(data).forEach(key => {
            const el = document.getElementById(`${type}-${key}`);
            if (el) {
                if (el.type === 'checkbox') el.checked = !!data[key];
                else if (el.type === 'date') el.value = data[key].split('T')[0];
                else if (el.type === 'datetime-local') {
                    if (data[key]) el.value = data[key].slice(0, 16);
                }
                else el.value = data[key];
            }
        });
    }
    modals[type].style.display = 'block';
};

const editItem = async (type, id) => {
    try {
        const endpoint = type === 'blotter' ? '/blotter' : `/${type}s`;
        const data = await fetchData(`${endpoint}/${id}`);
        showModal(type, data);
    } catch (error) {
        alert(`Error fetching ${type} data`);
    }
};

const deleteItem = async (type, id) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
        try {
            const endpoint = type === 'blotter' ? '/blotter' : `/${type}s`;
            await deleteData(`${endpoint}/${id}`);
            views[type]();
        } catch (error) {
            alert(`Error deleting ${type}`);
        }
    }
};

// Form Submissions
Object.keys(forms).forEach(type => {
    forms[type].onsubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById(`${type}-id`).value;
        const formData = {};
        const elements = forms[type].elements;
        
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el.id && el.id.startsWith(`${type}-`) && el.id !== `${type}-id`) {
                const key = el.id.replace(`${type}-`, '');
                if (el.type === 'checkbox') formData[key] = el.checked ? 1 : 0;
                else if (el.type === 'number') formData[key] = el.value === '' ? null : Number(el.value);
                else formData[key] = el.value;
            }
        }

        try {
            const endpoint = type === 'blotter' ? '/blotter' : `/${type}s`;
            if (id) {
                await updateData(`${endpoint}/${id}`, formData);
            } else {
                await postData(endpoint, formData);
            }
            modals[type].style.display = 'none';
            views[type]();
        } catch (error) {
            alert(`Error saving ${type}: ${error.message}`);
        }
    };
});

// Global Event Listeners
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = () => {
        const modalId = btn.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    };
});

window.onclick = (e) => {
    Object.values(modals).forEach(modal => {
        if (e.target == modal) modal.style.display = 'none';
    });
};

const handleNavigation = (e) => {
    e.preventDefault();
    const link = e.target.closest('a');
    if (!link) return;
    const view = link.dataset.view;
    
    navLinks.forEach(link => link.classList.remove('active'));
    link.classList.add('active');

    if (views[view]) {
        views[view]();
    }
};

navLinks.forEach(link => link.addEventListener('click', handleNavigation));

// Load initial view
views.dashboard();
