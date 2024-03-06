function openDriveSearch() {
    const driveIds = document.getElementById('driveIds').value.split(',');
    const searchTerm = document.getElementById('searchTerm').value;
    const searchAll = document.getElementById('searchAll').checked;
    const replaceTab = document.getElementById('replaceTab').checked;
    const searchBaseUrl = 'https://drive.google.com/drive/u/0/search?q=';
    let searchUrls = [];

    // Add general search URL first if 'search all' is checked
    if (searchAll) {
        searchUrls.push(`${searchBaseUrl}${encodeURIComponent(searchTerm)}`);
    }

    // Add URLs for each shared drive
    driveIds.forEach(id => {
        const trimmedId = id.trim();
        if (trimmedId) {
            searchUrls.push(`${searchBaseUrl}${encodeURIComponent(searchTerm)}%20in:${trimmedId}`);
        }
    });
    console.log(searchUrls)
    // Iterate through the array and open the searches
    for (let i = 0; i < searchUrls.length; i++) {
        if (i === searchUrls.length - 1 && replaceTab) {
            // Open the last search in the current tab
            window.location.href = searchUrls[i];
        } else {
            // Open the search in a new tab
            window.open(searchUrls[i], '_blank');
        }
    }

    localStorage.setItem('lastUsedDriveIds', driveIds);
    localStorage.setItem('searchAllChecked', searchAll);
    localStorage.setItem('replaceTabChecked', replaceTab);
}

// Rest of your existing event listener code...


document.addEventListener('DOMContentLoaded', () => {
    const lastUsedDriveIds = localStorage.getItem('lastUsedDriveIds');
    const searchAllChecked = localStorage.getItem('searchAllChecked') === 'true';
    const replaceTabChecked = localStorage.getItem('replaceTabChecked') === 'true'; // Retrieve the saved state

    if (lastUsedDriveIds) {
        document.getElementById('driveIds').value = lastUsedDriveIds;
    }
    document.getElementById('searchAll').checked = searchAllChecked;
    document.getElementById('replaceTab').checked = replaceTabChecked; // Set the state

    document.getElementById('searchTerm').focus();

    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        openDriveSearch();
    });
});
