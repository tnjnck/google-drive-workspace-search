function openDriveSearch() {
    const driveIds = document.getElementById('driveIds').value.split(',');
    const searchTerm = document.getElementById('searchTerm').value;
    const searchAll = document.getElementById('searchAll').checked;
    const searchBaseUrl = 'https://drive.google.com/drive/u/0/search?q=';

    if (searchAll) {
        // Open a tab to search across all Google Drive (without 'in:')
        window.open(`${searchBaseUrl}${encodeURIComponent(searchTerm)}`, '_blank');
    }

    driveIds.forEach(id => {
        const trimmedId = id.trim();
        if (trimmedId) {
            const searchUrl = `${searchBaseUrl}${encodeURIComponent(searchTerm)}%20in:${trimmedId}`;
            window.open(searchUrl, '_blank');
        }
    });

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
