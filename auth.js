const AUTH_API = 'http://127.0.0.1:8000/api/auth/';

const Auth = {
    getAccessToken() {
        return localStorage.getItem('access_token');
    },

    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    },

    getUsername() {
        return localStorage.getItem('username');
    },

    isAuthenticated() {
        return !!this.getAccessToken();
    },

    setTokens(access, refresh, username) {
        localStorage.setItem('access_token', access);
        if (refresh) localStorage.setItem('refresh_token', refresh);
        if (username) localStorage.setItem('username', username);
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    },

    async register(data) {
        return $.ajax({
            url: `${AUTH_API}register/`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        }).catch(xhr => {
            throw xhr.responseJSON || { message: 'Помилка реєстрації' };
        });
    },

    async login(username, password) {
        try {
            const data = await $.ajax({
                url: `${AUTH_API}login/`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username, password })
            });
            this.setTokens(data.access, data.refresh, username);
            return data;
        } catch (xhr) {
            throw xhr.responseJSON || { message: 'Невірні дані' };
        }
    },

    async refreshAccessToken() {
        const refresh = this.getRefreshToken();
        if (!refresh) {
            this.logout();
            return null;
        }

        try {
            const data = await $.ajax({
                url: `${AUTH_API}token/refresh/`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ refresh })
            });
            localStorage.setItem('access_token', data.access);
            return data.access;
        } catch (err) {
            this.logout();
            return null;
        }
    },

    async authenticatedRequest(ajaxOptions) {
        let token = this.getAccessToken();
        ajaxOptions.headers = ajaxOptions.headers || {};
        ajaxOptions.headers['Authorization'] = `Bearer ${token}`;

        try {
            return await $.ajax(ajaxOptions);
        } catch (xhr) {
            if (xhr.status === 401 && this.getRefreshToken()) {
                const newToken = await this.refreshAccessToken();
                if (newToken) {
                    ajaxOptions.headers['Authorization'] = `Bearer ${newToken}`;
                    return await $.ajax(ajaxOptions);
                }
            }
            throw xhr;
        }
    },

    async getCurrentUser() {
        return this.authenticatedRequest({
            url: `${AUTH_API}me/`,
            type: 'GET'
        });
    },

    renderNav() {
        const $authLinks = $('#auth-links');
        if (!$authLinks.length) return;

        if (this.isAuthenticated()) {
            const username = this.getUsername() || 'Користувач';
            $authLinks.html(`
                <a href="profile.html" class="nav-user">👤 ${username}</a>
                <button id="btn-logout" class="btn btn-sm btn-logout">Вийти</button>
            `);
            $('#btn-logout').on('click', () => this.logout());
        } else {
            $authLinks.html(`
                <a href="login.html" class="nav-btn">Увійти</a>
                <a href="register.html" class="nav-btn">Реєстрація</a>
            `);
        }
    }
};

$(document).ready(function() {
    Auth.renderNav();
});