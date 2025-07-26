// Authentication Manager
class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkExistingAuth();
    }

    bindEvents() {
        const githubBtn = document.getElementById('githubLogin');
        const googleBtn = document.getElementById('googleLogin');
        const demoBtn = document.getElementById('demoLogin');

        if (githubBtn) githubBtn.addEventListener('click', () => this.handleGitHubLogin());
        if (googleBtn) googleBtn.addEventListener('click', () => this.handleGoogleLogin());
        if (demoBtn) demoBtn.addEventListener('click', () => this.handleDemoLogin());
    }

    async handleGitHubLogin() {
        this.showLoading();
        
        try {
            // GitHub OAuth configuration
            const clientId = 'your_github_client_id'; // Replace with your GitHub OAuth App Client ID
            const redirectUri = encodeURIComponent(window.location.origin + '/frontend/pages/');
            const scope = 'user:email';
            const state = this.generateState();
            
            localStorage.setItem('oauth_state', state);
            
            const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
            
            // For demo purposes, simulate OAuth flow
            await this.simulateOAuth('GitHub');
            
            // In production, redirect to GitHub
            // window.location.href = githubAuthUrl;
            
        } catch (error) {
            this.hideLoading();
            this.showNotification('GitHubログインに失敗しました', 'error');
        }
    }

    async handleGoogleLogin() {
        this.showLoading();
        
        try {
            // Google OAuth configuration
            const clientId = 'your_google_client_id'; // Replace with your Google OAuth Client ID
            const redirectUri = encodeURIComponent(window.location.origin + '/frontend/pages/');
            const scope = 'email profile';
            const state = this.generateState();
            
            localStorage.setItem('oauth_state', state);
            
            const googleAuthUrl = `https://accounts.google.com/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
            
            // For demo purposes, simulate OAuth flow
            await this.simulateOAuth('Google');
            
            // In production, redirect to Google
            // window.location.href = googleAuthUrl;
            
        } catch (error) {
            this.hideLoading();
            this.showNotification('Googleログインに失敗しました', 'error');
        }
    }

    async handleDemoLogin() {
        this.showLoading();
        
        try {
            await this.simulateOAuth('Demo User');
        } catch (error) {
            this.hideLoading();
            this.showNotification('デモログインに失敗しました', 'error');
        }
    }

    async simulateOAuth(provider) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create demo user
        const user = {
            id: Date.now(),
            name: `${provider} User`,
            email: `user@${provider.toLowerCase().replace(' ', '')}.com`,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(provider)}&background=8b5cf6&color=fff`,
            provider: provider,
            loginTime: new Date().toISOString()
        };
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        
        this.hideLoading();
        this.showNotification(`${provider}でログインしました！`, 'success');
        
        // Redirect to todo app after short delay
        setTimeout(() => {
            window.location.href = 'todo.html';
        }, 1500);
    }

    checkExistingAuth() {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const currentPath = window.location.pathname;
        
        if (isAuthenticated === 'true' && currentPath.includes('login.html')) {
            // Already logged in, redirect to todo app
            window.location.href = 'todo.html';
        } else if (isAuthenticated !== 'true' && currentPath.includes('todo.html') && !currentPath.includes('login.html')) {
            // Not authenticated and on todo page, redirect to login
            window.location.href = 'login.html';
        }
    }

    generateState() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.add('hidden');
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

    // Static method for logout
    static logout() {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        localStorage.removeItem('oauth_state');
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'notification info';
        notification.textContent = 'ログアウトしました';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Handle OAuth callback
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const state = urlParams.get('state');

if (code && state) {
    const storedState = localStorage.getItem('oauth_state');
    if (state === storedState) {
        // Handle OAuth callback
        const authManager = new AuthManager();
        authManager.showLoading();
        // In production, exchange code for access token
        setTimeout(() => {
            authManager.simulateOAuth('OAuth Provider');
        }, 1000);
    } else {
        console.error('Invalid OAuth state');
    }
}