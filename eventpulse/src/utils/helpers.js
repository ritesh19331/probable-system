/**
 * Format a date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return '';
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a distance in miles for display
 * @param {number} miles - Distance in miles
 * @returns {string} Formatted distance string
 */
export function formatDistance(miles) {
  if (miles < 0.1) {
    return 'Less than 0.1 miles';
  } else if (miles < 1) {
    return `${(miles * 10).toFixed(0) / 10} miles`;
  } else {
    return `${Math.round(miles * 10) / 10} miles`;
  }
}

/**
 * Calculate days until a post expires
 * @param {string|Date} expiryDate - Expiry date
 * @returns {number} Days until expiry
 */
export function calculateDaysUntilExpiry(expiryDate) {
  if (!expiryDate) return 0;
  
  const expiry = new Date(expiryDate);
  const now = new Date();
  
  // Return 0 if date is invalid or in the past
  if (isNaN(expiry.getTime()) || expiry < now) {
    return 0;
  }
  
  const differenceInTime = expiry.getTime() - now.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
}

/**
 * Get text describing how soon a post expires
 * @param {string|Date} expiryDate - Expiry date
 * @returns {Object} Object with text and urgency flag
 */
export function getExpiryText(expiryDate) {
  if (!expiryDate) {
    return { text: 'No expiry date', isUrgent: false };
  }
  
  const daysUntil = calculateDaysUntilExpiry(expiryDate);
  
  if (daysUntil <= 0) {
    return { text: 'Expired', isUrgent: false };
  } else if (daysUntil === 1) {
    return { text: 'Expires today!', isUrgent: true };
  } else if (daysUntil <= 2) {
    return { text: 'Expires tomorrow!', isUrgent: true };
  } else if (daysUntil <= 3) {
    return { text: `Expires in ${daysUntil} days`, isUrgent: true };
  } else {
    return { text: `Expires in ${daysUntil} days`, isUrgent: false };
  }
}

/**
 * Get detailed information about a post status
 * @param {string} status - Post status
 * @returns {Object} Object with status details
 */
export function getStatusDetails(status) {
  switch (status) {
    case 'active':
      return { 
        label: 'Active', 
        description: 'This post is active and available', 
        variant: 'success',
        color: 'green'
      };
    case 'claimed':
      return { 
        label: 'Claimed', 
        description: 'This post has been claimed but not completed', 
        variant: 'warning',
        color: 'yellow'
      };
    case 'completed':
      return { 
        label: 'Completed', 
        description: 'This transaction has been completed', 
        variant: 'default',
        color: 'gray'
      };
    case 'expired':
      return { 
        label: 'Expired', 
        description: 'This post has expired and is no longer available', 
        variant: 'destructive',
        color: 'red'
      };
    default:
      return { 
        label: status.charAt(0).toUpperCase() + status.slice(1), 
        description: '', 
        variant: 'default',
        color: 'gray'
      };
  }
}

/**
 * Get detailed information about a post type
 * @param {string} type - Post type ('donation' or 'request')
 * @returns {Object} Object with type details
 */
export function getPostTypeDetails(type) {
  switch (type) {
    case 'donation':
      return {
        label: 'Donation',
        description: 'Someone is offering food to share',
        variant: 'success',
        color: 'green',
        icon: 'GiftIcon'
      };
    case 'request':
      return {
        label: 'Request',
        description: 'Someone is requesting food',
        variant: 'info',
        color: 'blue',
        icon: 'HandIcon'
      };
    default:
      return {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        description: '',
        variant: 'default',
        color: 'gray',
        icon: 'FileIcon'
      };
  }
}

/**
 * Calculate the distance between two points using the Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} Distance in miles
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  // If any coordinates are missing, return a large distance
  if (!lat1 || !lng1 || !lat2 || !lng2) {
    return 9999;
  }
  
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

/**
 * Create a CSS class name string from multiple inputs
 * @param  {...any} classes - Class names to combine
 * @returns {string} Combined class string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}