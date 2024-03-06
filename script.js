function openDriveSearch() {
    const driveIds = document.getElementById('driveIds').value.split(',');
    const searchTerm = document.getElementById('searchTerm').value;
    const searchBaseUrl = 'https://drive.google.com/drive/u/0/search?q=';

    driveIds.forEach(id => {
        const trimmedId = id.trim();
        if (trimmedId) {
            const searchUrl = `${searchBaseUrl}${encodeURIComponent(searchTerm)}%20in:${trimmedId}`;
            window.open(searchUrl, '_blank');
        }
    });

    // Save the last used IDs in local storage
    localStorage.setItem('lastUsedDriveIds', driveIds);
}

// Load last used IDs on page load
document.addEventListener('DOMContentLoaded', () => {
    const lastUsedDriveIds = localStorage.getItem('lastUsedDriveIds');
    if (lastUsedDriveIds) {
        document.getElementById('driveIds').value = lastUsedDriveIds;
    }
});
