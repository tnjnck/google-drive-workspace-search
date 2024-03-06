function openDriveSearch() {
    const driveIds = document.getElementById('driveIds').value.split(',');
    const searchTerm = document.getElementById('searchTerm').value;
    const searchAll = document.getElementById('searchAll').checked;
    const searchBaseUrl = 'https://drive.google.com/drive/u/0/search?q=';

    let searchUrls = [];

    
    if (searchAll) {
        // Open a tab to search across all Google Drive (without 'in:')
        window.open(`${searchBaseUrl}${encodeURIComponent(searchTerm)}`, '_blank');
    }

    driveIds.forEach(id => {
        const trimmedId = id.trim();
        if (trimmedId) {
            const searchUrl = `${searchBaseUrl}${encodeURIComponent(searchTerm)}%20in:${trimmedId}`;
            searchUrls.push(searchUrl);        }
    });

    if (replaceTab && searchUrls.length > 0) {
        // Open all but the last URL in new tabs
        for (let i = 0; i < searchUrls.length - 1; i++) {
            window.open(searchUrls[i], '_blank');
    }
        // Navigate the current tab to the last URL
        window.location.href = searchUrls[searchUrls.length - 1];
    } else {
        // Open all URLs in new tabs
        searchUrls.forEach(url => window.open(url, '_blank'));
    }

    // Save states in local storage
    localStorage.setItem('lastUsedDriveIds', driveIds);
    localStorage.setItem('searchAllChecked', searchAll);
}

// Load last used states on page load
document.addEventListener('DOMContentLoaded', () => {
    const lastUsedDriveIds = localStorage.getItem('lastUsedDriveIds');
    const searchAllChecked = localStorage.getItem('searchAllChecked') === 'true';

    if (lastUsedDriveIds) {
        document.getElementById('driveIds').value = lastUsedDriveIds;
    }
    document.getElementById('searchAll').checked = searchAllChecked;
});

document.addEventListener('DOMContentLoaded', () => {
    // Existing code to load last used states

    // Focus on the search term input
    document.getElementById('searchTerm').focus();

    // Handle form submission
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        openDriveSearch();
    });
});
