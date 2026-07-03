// App State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'All';
let currentView = 'tasks';
let calendarDate = new Date();

const priorityColors = { High: 'text-red-600 bg-red-50', Medium: 'text-amber-600 bg-amber-50', Low: 'text-emerald-600 bg-emerald-50' };
const categoryIcons = { Work: '💼', Personal: '🏠', Shopping: '🛒', Health: '❤️' };

// Initialize App
function init() {
    renderFilters();
    renderTasks();
    renderStats();
    renderCalendar();
    lucide.createIcons();
}

// View Toggling
function switchView(view) {
    currentView = view;
    document.getElementById('view-tasks').classList.toggle('hidden', view !== 'tasks');
    document.getElementById('view-calendar').classList.toggle('hidden', view !== 'calendar');
    
    // Adjust active tab styles
    const tTasks = document.getElementById('tab-tasks');
    const tCal = document.getElementById('tab-calendar');
    if(view === 'tasks') {
        tTasks.className = "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white text-indigo-600 shadow-xs transition-all cursor-pointer";
        tCal.className = "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
    } else {
        tCal.className = "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white text-indigo-600 shadow-xs transition-all cursor-pointer";
        tTasks.className = "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer";
        renderCalendar();
    }
}

// Modal Controls
function openModal() { document.getElementById('task-modal').classList.remove('hidden'); }
function closeModal() { document.getElementById('task-modal').classList.add('hidden'); document.getElementById('task-form').reset(); }

// Core Task Management
function handleAddTask(e) {
    e.preventDefault();
    const newTask = {
        id: Date.now().toString(),
        title: document.getElementById('task-title').value,
        category: document.getElementById('task-category').value,
        priority: document.getElementById('task-priority').value,
        date: document.getElementById('task-date').value,
        completed: false
    };
    tasks.push(newTask);
    saveState();
    closeModal();
    init();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveState();
    init();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveState();
    init();
}

function saveState() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// DOM Render Helpers
function renderStats() {
    document.getElementById('stat-pending').innerText = tasks.filter(t => !t.completed).length;
    document.getElementById('stat-completed').innerText = tasks.filter(t => t.completed).length;
}

function renderFilters() {
    const container = document.getElementById('category-filters');
    const counts = tasks.reduce((acc, t) => ({...acc, [t.category]: (acc[t.category]||0)+1}), {});
    const list = ['All', 'Work', 'Personal', 'Shopping', 'Health'];
    
    container.innerHTML = list.map(cat => {
        const isActive = currentFilter === cat;
        const count = cat === 'All' ? tasks.length : (counts[cat] || 0);
        return `
            <button onclick="setFilter('${cat}')" class="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}">
                <span class="flex items-center gap-2">
                    <span>${categoryIcons[cat] || '📋'}</span> ${cat}
                </span>
                <span class="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 ${isActive ? 'bg-indigo-200/50 text-indigo-700' : ''}">${count}</span>
            </button>
        `;
    }).join('');
}

function setFilter(cat) {
    currentFilter = cat;
    document.getElementById('current-filter-title').innerText = cat === 'All' ? 'All Tasks' : `${categoryIcons[cat]} ${cat} Tasks`;
    renderFilters();
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById('task-list');
    const filtered = tasks.filter(t => currentFilter === 'All' || t.category === currentFilter);
    
    if(filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                <p class="text-slate-400 font-medium">No tasks found here. Create one to get started!</p>
            </div>`;
        return;
    }

    container.innerHTML = filtered.sort((a,b) => new Date(a.date) - new Date(b.date)).map(t => `
        <div class="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-xs hover:border-slate-300 transition-all ${t.completed ? 'opacity-65' : ''}">
            <div class="flex items-center gap-4 flex-1 min-w-0">
                <button onclick="toggleTask('${t.id}')" class="text-slate-300 hover:text-indigo-600 transition-all cursor-pointer">
                    <i data-lucide="${t.completed ? 'check-circle' : 'circle'}" class="w-6 h-6 ${t.completed ? 'text-emerald-500' : 'text-slate-400'}"></i>
                </button>
                <div class="truncate">
                    <p class="text-sm font-semibold ${t.completed ? 'line-through text-slate-400' : 'text-slate-800'}">${t.title}</p>
                    <div class="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span>${categoryIcons[t.category]} ${t.category}</span>
                        <span>•</span>
                        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> ${t.date}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-3 ml-4">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${priorityColors[t.priority]}">${t.priority}</span>
                <button onclick="deleteTask('${t.id}')" class="text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Calendar Logic
function changeMonth(direction) {
    calendarDate.setMonth(calendarDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthYearLabel = document.getElementById('calendar-month-year');
    
    grid.innerHTML = '';
    
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    monthYearLabel.innerText = calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Generate blank structural pad cells
    for(let i = 0; i < firstDayIndex; i++) {
        grid.innerHTML += `<div class="p-2 bg-slate-50/50 rounded-xl h-24 border border-transparent"></div>`;
    }
    
    // Build calendar day cells
    for(let day = 1; day <= lastDay; day++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayTasks = tasks.filter(t => t.date === dateString);
        
        let taskBadges = dayTasks.slice(0, 2).map(t => `
            <div class="text-[10px] truncate font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 ${t.completed ? 'line-through opacity-50' : ''}">
                ${t.title}
            </div>
        `).join('');
        
        if (dayTasks.length > 2) {
            taskBadges += `<div class="text-[9px] text-slate-400 font-bold text-left px-1">+${dayTasks.length - 2} more</div>`;
        }

        grid.innerHTML += `
            <div class="p-2 bg-white rounded-xl border border-slate-100 h-24 flex flex-col justify-between hover:bg-slate-50/80 transition-all">
                <span class="text-xs font-bold text-slate-700 text-left">${day}</span>
                <div class="space-y-1 overflow-hidden mt-1 flex-1 flex flex-col justify-end">
                    ${taskBadges}
                </div>
            </div>
        `;
    }
}

// Trigger initialization on load
window.onload = init;