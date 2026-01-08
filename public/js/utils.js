function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatSalary(min, max, currency = 'USD') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}

function showLoading(element) {
  element.innerHTML = '<span class="loading"></span>';
  element.disabled = true;
}

function hideLoading(element, originalText) {
  element.innerHTML = originalText;
  element.disabled = false;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formData) {
  const errors = [];
  
  for (const [key, value] of Object.entries(formData)) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors.push(`${key} is required`);
    }
  }
  
  return errors;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function checkAuth() {
  const token = getToken();
  const user = getUser();
  
  if (!token || !user) {
    window.location.href = '/login.html';
    return null;
  }
  
  return user;
}

function logout() {
  removeToken();
  removeUser();
  window.location.href = '/index.html';
}

function getJobTypeLabel(type) {
  const labels = {
    'full-time': 'Full Time',
    'part-time': 'Part Time',
    'contract': 'Contract',
    'internship': 'Internship',
    'temporary': 'Temporary'
  };
  return labels[type] || type;
}

function getStatusBadgeClass(status) {
  const classes = {
    'pending': 'badge-warning',
    'reviewed': 'badge-primary',
    'shortlisted': 'badge-primary',
    'accepted': 'badge-success',
    'rejected': 'badge-danger',
    'active': 'badge-success',
    'closed': 'badge-danger',
    'draft': 'badge-warning'
  };
  return classes[status] || 'badge-primary';
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function setupModalClose() {
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });
  
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', setupModalClose);
