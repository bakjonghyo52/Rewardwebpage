// Sidebar Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }

    // Initial tab load (default to overview if no hash)
    // Or just default in HTML to show overview first.
});

// Tab Switching Logic
function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.add('hidden');
    });

    // Show selected tab content
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');

    // Update Sidebar Active State
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-blue-50', 'text-blue-600');
        el.classList.add('text-gray-700', 'hover:bg-gray-50');
    });

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.remove('text-gray-700', 'hover:bg-gray-50');
        activeNav.classList.add('bg-blue-50', 'text-blue-600');
    }
}

// Reward History Logic
const transactions = [
    { id: 1, type: 'earn', amount: 500, description: '제품 만족도 설문조사 완료', date: '2025-11-26', category: '설문조사' },
    { id: 2, type: 'earn', amount: 1000, description: '디자인 외주 매칭 완료', date: '2025-11-25', category: '외주' },
    { id: 3, type: 'spend', amount: 3000, description: '현금 환전', date: '2025-11-24', category: '환전' },
    { id: 4, type: 'earn', amount: 200, description: '개발자 별점 제공', date: '2025-11-24', category: '별점' },
    { id: 5, type: 'earn', amount: 300, description: '프로필 완성', date: '2025-11-23', category: '프로필' },
    { id: 6, type: 'earn', amount: 100, description: '일일 방문 체크인', date: '2025-11-23', category: '방문' },
    { id: 7, type: 'spend', amount: 1500, description: '설문조사 의뢰', date: '2025-11-22', category: '의뢰' },
    { id: 8, type: 'earn', amount: 800, description: '소비자 트렌드 설문 완료', date: '2025-11-22', category: '설문조사' },
    { id: 9, type: 'earn', amount: 1500, description: '콘텐츠 작성 외주 완료', date: '2025-11-21', category: '외주' },
    { id: 10, type: 'spend', amount: 5000, description: '현금 환전', date: '2025-11-20', category: '환전' },
];

let currentFilter = 'all';
let currentSearch = '';

function renderTransactions() {
    const list = document.getElementById('transaction-list');
    const noResults = document.getElementById('no-results');

    if (!list) return;

    const filtered = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
            t.category.toLowerCase().includes(currentSearch.toLowerCase());
        const matchesType = currentFilter === 'all' ? true : t.type === currentFilter;
        return matchesSearch && matchesType;
    });

    list.innerHTML = '';

    if (filtered.length === 0) {
        if (noResults) noResults.classList.remove('hidden');
    } else {
        if (noResults) noResults.classList.add('hidden');
        filtered.forEach(t => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors';
            // Using Lucide icons: calendar tag
            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-2 text-gray-600">
                        <i data-lucide="calendar" class="w-4 h-4"></i>
                        <span>${t.date}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-gray-900">${t.description}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">${t.category}</span>
                </td>
                <td class="px-6 py-4 text-right">
                    <span class="${t.type === 'earn' ? 'text-green-600' : 'text-red-600'} font-bold">
                        ${t.type === 'earn' ? '+' : '-'}${t.amount.toLocaleString()}P
                    </span>
                </td>
            `;
            list.appendChild(tr);
        });
        // Re-initialize icons for new elements
        if (window.lucide) window.lucide.createIcons();
    }
    updateSummary();
}

function updateSummary() {
    const totalEarned = transactions.filter(t => t.type === 'earn').reduce((sum, t) => sum + t.amount, 0);
    const totalSpent = transactions.filter(t => t.type === 'spend').reduce((sum, t) => sum + t.amount, 0);

    const earnedEl = document.getElementById('summary-earned');
    const spentEl = document.getElementById('summary-spent');
    const netEl = document.getElementById('summary-net');

    if (earnedEl) earnedEl.innerText = `${totalEarned.toLocaleString()}P`;
    if (spentEl) spentEl.innerText = `${totalSpent.toLocaleString()}P`;
    if (netEl) netEl.innerText = `${(totalEarned - totalSpent).toLocaleString()}P`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on a page with transactions
    const list = document.getElementById('transaction-list');
    if (list) {
        renderTransactions(); // Initial render

        // Search Listener
        const searchInput = document.getElementById('history-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                renderTransactions();
            });
        }

        // Filter Buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentFilter = btn.dataset.filter;

                // Update UI for buttons
                filterBtns.forEach(b => {
                    // Reset all
                    b.classList.remove('bg-blue-600', 'bg-green-600', 'bg-red-600', 'text-white');
                    b.classList.add('bg-gray-100', 'text-gray-700');
                });

                // Active button style
                btn.classList.remove('bg-gray-100', 'text-gray-700');
                if (currentFilter === 'all') btn.classList.add('bg-blue-600', 'text-white');
                else if (currentFilter === 'earn') btn.classList.add('bg-green-600', 'text-white');
                else if (currentFilter === 'spend') btn.classList.add('bg-red-600', 'text-white');

                renderTransactions();
            });
        });
    }
});
