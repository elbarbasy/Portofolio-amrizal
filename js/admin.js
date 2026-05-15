/* ============================================
   ADMIN PANEL + LOCALSTORAGE DATABASE
   CRUD Operations for Projects
   ============================================ */

// Default projects data
const DEFAULT_PROJECTS = [
    {
        id: 1,
        title: "Social Media Campaign",
        desc: "Desain konten Instagram untuk brand lokal dengan konsep retro 80s",
        tools: "Canva, Photoshop",
        image: "https://via.placeholder.com/600x400/1a1a1a/E50914?text=PROJECT+01",
        link: "#"
    },
    {
        id: 2,
        title: "TikTok Video Reel",
        desc: "Video editing dengan transisi smooth dan efek glitch untuk konten viral",
        tools: "CapCut",
        image: "https://via.placeholder.com/600x400/1a1a1a/E50914?text=PROJECT+02",
        link: "#"
    },
    {
        id: 3,
        title: "Brand Identity Design",
        desc: "Logo dan branding kit untuk startup teknologi",
        tools: "Canva, Figma",
        image: "https://via.placeholder.com/600x400/1a1a1a/E50914?text=PROJECT+03",
        link: "#"
    }
];

// Admin state
let isAdminLoggedIn = false;
let projects = [];

/* ============================================
   LOCALSTORAGE FUNCTIONS
   ============================================ */

function loadProjects() {
    const saved = localStorage.getItem('amrizalProjects');
    if (saved) {
        projects = JSON.parse(saved);
    } else {
        projects = [...DEFAULT_PROJECTS];
        saveProjects();
    }
    renderProjects();
    renderAdminProjects();
}

function saveProjects() {
    localStorage.setItem('amrizalProjects', JSON.stringify(projects));
}

/* ============================================
   RENDER PROJECTS (PUBLIC)
   ============================================ */

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    const emptyState = document.getElementById('empty-projects');

    if (!grid) return;

    if (projects.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    grid.innerHTML = projects.map((project, index) => `
        <div class="project-card group reveal-up" data-delay="${index * 100}">
            <div class="relative overflow-hidden">
                <img src="${project.image}" 
                     alt="${project.title}"
                     class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                     onerror="this.src='https://via.placeholder.com/600x400/1a1a1a/E50914?text=NO+IMAGE'">

                <div class="project-overlay">
                    <div>
                        <h3 class="font-anton text-xl text-white mb-1">${project.title}</h3>
                        <p class="text-st-red text-sm font-retro">${project.tools}</p>
                    </div>
                </div>

                <!-- Play Button -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="w-16 h-16 bg-st-red/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span class="text-2xl text-white">▶</span>
                    </div>
                </div>
            </div>

            <div class="p-6">
                <p class="text-gray-400 text-sm leading-relaxed">${project.desc}</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-xs text-st-red font-retro">${project.tools}</span>
                    <a href="${project.link}" target="_blank" 
                       class="text-sm text-white hover:text-st-red transition-colors flex items-center gap-1">
                        VIEW <span class="text-lg">→</span>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

/* ============================================
   RENDER ADMIN PROJECTS LIST
   ============================================ */

function renderAdminProjects() {
    const list = document.getElementById('admin-projects-list');
    if (!list) return;

    if (projects.length === 0) {
        list.innerHTML = '<p class="text-gray-500 text-center py-4 font-retro">NO PROJECTS FOUND</p>';
        return;
    }

    list.innerHTML = projects.map(project => `
        <div class="admin-project-item">
            <div class="flex items-center gap-4">
                <img src="${project.image}" alt="${project.title}" 
                     class="w-16 h-16 object-cover rounded"
                     onerror="this.src='https://via.placeholder.com/64/1a1a1a/E50914?text=NO'">
                <div>
                    <h4 class="font-bold text-white">${project.title}</h4>
                    <p class="text-xs text-gray-400">${project.tools}</p>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="editProject(${project.id})" 
                        class="px-3 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/40 transition-colors text-sm">
                    EDIT
                </button>
                <button onclick="deleteProject(${project.id})" 
                        class="px-3 py-1 bg-st-red/20 text-st-red rounded hover:bg-st-red/40 transition-colors text-sm">
                    DELETE
                </button>
            </div>
        </div>
    `).join('');
}

/* ============================================
   ADMIN PANEL FUNCTIONS
   ============================================ */

function toggleAdmin() {
    const modal = document.getElementById('admin-modal');
    const loginForm = document.getElementById('admin-login');
    const dashboard = document.getElementById('admin-dashboard');

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        if (isAdminLoggedIn) {
            loginForm.classList.add('hidden');
            dashboard.classList.remove('hidden');
            renderAdminProjects();
        } else {
            loginForm.classList.remove('hidden');
            dashboard.classList.add('hidden');
        }
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function adminLogin() {
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;

    // Hardcoded credentials (change in production!)
    if (user === 'admin' && pass === '123456') {
        isAdminLoggedIn = true;
        document.getElementById('admin-login').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        renderAdminProjects();

        // Clear inputs
        document.getElementById('admin-user').value = '';
        document.getElementById('admin-pass').value = '';
    } else {
        alert('ACCESS DENIED: Invalid credentials');
    }
}

function adminLogout() {
    isAdminLoggedIn = false;
    document.getElementById('admin-dashboard').classList.add('hidden');
    document.getElementById('admin-login').classList.remove('hidden');
}

/* ============================================
   CRUD OPERATIONS
   ============================================ */

function addProject() {
    const title = document.getElementById('project-title').value;
    const desc = document.getElementById('project-desc').value;
    const tools = document.getElementById('project-tools').value;
    const image = document.getElementById('project-image').value;
    const link = document.getElementById('project-link').value;

    if (!title) {
        alert('ERROR: Title is required');
        return;
    }

    const newProject = {
        id: Date.now(),
        title: title,
        desc: desc || 'No description provided',
        tools: tools || 'Canva, CapCut',
        image: image || 'https://via.placeholder.com/600x400/1a1a1a/E50914?text=NEW+PROJECT',
        link: link || '#'
    };

    projects.push(newProject);
    saveProjects();
    renderProjects();
    renderAdminProjects();
    clearForm();

    alert('SUCCESS: Project added to the Upside Down');
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    document.getElementById('project-title').value = project.title;
    document.getElementById('project-desc').value = project.desc;
    document.getElementById('project-tools').value = project.tools;
    document.getElementById('project-image').value = project.image;
    document.getElementById('project-link').value = project.link;

    // Change add button to update
    const addBtn = document.querySelector('button[onclick="addProject()"]');
    addBtn.textContent = 'UPDATE PROJECT';
    addBtn.onclick = () => updateProject(id);
}

function updateProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    project.title = document.getElementById('project-title').value;
    project.desc = document.getElementById('project-desc').value;
    project.tools = document.getElementById('project-tools').value;
    project.image = document.getElementById('project-image').value;
    project.link = document.getElementById('project-link').value;

    saveProjects();
    renderProjects();
    renderAdminProjects();
    clearForm();

    // Reset button
    const addBtn = document.querySelector('button[onclick="updateProject(' + id + ')"]');
    if (addBtn) {
        addBtn.textContent = 'ADD PROJECT';
        addBtn.onclick = addProject;
    }

    alert('SUCCESS: Project updated');
}

function deleteProject(id) {
    if (!confirm('WARNING: Are you sure you want to delete this project?')) return;

    projects = projects.filter(p => p.id !== id);
    saveProjects();
    renderProjects();
    renderAdminProjects();

    alert('SUCCESS: Project deleted');
}

function clearForm() {
    document.getElementById('project-title').value = '';
    document.getElementById('project-desc').value = '';
    document.getElementById('project-tools').value = '';
    document.getElementById('project-image').value = '';
    document.getElementById('project-link').value = '';
}

/* ============================================
   CONTACT FORM HANDLER
   ============================================ */

function handleContact(e) {
    e.preventDefault();

    const form = document.getElementById('contact-form');
    const success = document.getElementById('contact-success');

    // Hide form, show success
    form.classList.add('hidden');
    success.classList.remove('hidden');

    // Reset after 5 seconds
    setTimeout(() => {
        form.classList.remove('hidden');
        success.classList.add('hidden');
        form.reset();
    }, 5000);
}

/* ============================================
   INITIALIZE
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});
