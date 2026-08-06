import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust if your backend is hosted elsewhere
});

// --- Global Loader Logic ---
let activeRequests = 0;

const showLoader = () => {
  if (activeRequests === 0) {
    let loader = document.getElementById('global-api-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'global-api-loader';
      // using Tailwind classes assuming they are available globally
      loader.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300';
      loader.innerHTML = `
        <div class="flex flex-col items-center p-6 bg-white rounded-xl shadow-xl">
          <svg class="animate-spin h-10 w-10 text-brand mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-700 font-medium text-sm">Processing...</span>
        </div>
      `;
      document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
  }
  activeRequests++;
};

const hideLoader = () => {
  activeRequests--;
  if (activeRequests <= 0) {
    activeRequests = 0;
    const loader = document.getElementById('global-api-loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }
};
// ---------------------------

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    showLoader();
    // You can attach tokens here in the future
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    hideLoader();
    return response;
  },
  (error) => {
    hideLoader();
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.warn("Unauthorized access - maybe token expired?");
    }
    return Promise.reject(error);
  }
);

export default api;
