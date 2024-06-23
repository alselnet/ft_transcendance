const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('accessToken');
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (csrfToken) {
        headers['x-csrf-token'] = csrfToken;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            const refreshResponse = await fetch('https://localhost/api/token/refresh/', {  // Modification de l'URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                localStorage.setItem('accessToken', refreshData.access);
                headers['Authorization'] = `Bearer ${refreshData.access}`;
                return fetch(url, {
                    ...options,
                    headers,
                });
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '#/connexion';
            }
        }
    }

    return response;
};

export { fetchWithAuth };
