// Todo Application Manager
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.checkAuth();
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    checkAuth() {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated !== 'true') {
            window.location.href = 'login.html';
            return;
        }

        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.name) {
            this.displayUserInfo(user);
        }
    }

    displayUserInfo(user) {
        const userAvatar = document.getElementById('userAvatar');
        const userInfo = document.getElementById('userInfo');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const logoutBtn = document.getElementById('logoutBtn');

        if (!userAvatar || !userInfo || !userName || !userEmail || !logoutBtn) return;

        if (user.avatar) {
            userAvatar.innerHTML = `<img src="${user.avatar}" alt="${user.name}" class="w-full h-full rounded-full object-cover user-avatar">`;
        } else {
            userAvatar.innerHTML = `<span class="user-avatar">${user.name.charAt(0).toUpperCase()}</span>`;
        }

        userName.textContent = user.name;
        userEmail.textContent = user.email;

        userAvatar.classList.remove('hidden');
        userInfo.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
    }

    bindEvents() {
        const addBtn = document.getElementById('addBtn');
        const todoInput = document.getElementById('todoInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (addBtn) addBtn.addEventListener('click', () => this.addTodo());
        if (todoInput) {
            todoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.addTodo();
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
    }

    logout() {
        AuthManager.logout();
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        if (!input) return;

        const text = input.value.trim();
        
        if (text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            this.todos.unshift(todo);
            this.saveTodos();
            this.render();
            this.updateStats();
            input.value = '';
            
            this.showNotification('タスクが追加されました！', 'success');
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
            this.updateStats();
            
            const message = todo.completed ? 'タスクが完了しました！' : 'タスクが未完了に戻りました';
            this.showNotification(message, todo.completed ? 'success' : 'info');
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
        this.updateStats();
        this.showNotification('タスクが削除されました', 'error');
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'pending':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        
        if (!todoList || !emptyState) return;

        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        
        todoList.innerHTML = filteredTodos.map(todo => `
            <div class="todo-item flex items-center gap-3 p-4 glass rounded-xl hover-lift transition-all duration-300 ${todo.completed ? 'completed' : ''}">
                <button 
                    onclick="window.todoApp.toggleTodo(${todo.id})" 
                    class="flex-shrink-0 w-6 h-6 rounded-full border-2 ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400 hover:border-green-400'} transition-all duration-300 flex items-center justify-center"
                >
                    ${todo.completed ? '<i class="fas fa-check text-white text-xs"></i>' : ''}
                </button>
                
                <span class="flex-1 text-white ${todo.completed ? 'line-through text-gray-400' : ''} transition-all duration-300">
                    ${this.escapeHtml(todo.text)}
                </span>
                
                <button 
                    onclick="window.todoApp.deleteTodo(${todo.id})" 
                    class="flex-shrink-0 w-8 h-8 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        `).join('');
    }

    updateStats() {
        const totalCount = document.getElementById('totalCount');
        const completedCount = document.getElementById('completedCount');
        const pendingCount = document.getElementById('pendingCount');

        if (!totalCount || !completedCount || !pendingCount) return;

        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;

        totalCount.textContent = total;
        completedCount.textContent = completed;
        pendingCount.textContent = pending;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTodos() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userTodosKey = `todos_${user.id || 'anonymous'}`;
        localStorage.setItem('todos', JSON.stringify(this.todos));
        localStorage.setItem(userTodosKey, JSON.stringify(this.todos));
    }

    loadUserTodos() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userTodosKey = `todos_${user.id || 'anonymous'}`;
        const userTodos = localStorage.getItem(userTodosKey);
        
        if (userTodos) {
            this.todos = JSON.parse(userTodos);
        } else {
            this.todos = [];
        }
        
        this.render();
        this.updateStats();
    }
}