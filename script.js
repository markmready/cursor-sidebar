document.addEventListener('DOMContentLoaded', () => {
    // Make all category headers focusable
    document.querySelectorAll('.category-header').forEach(header => {
        if (!header.hasAttribute('tabindex')) {
            header.setAttribute('tabindex', '0');
        }
    });

    // Get all category headers
    const categoryHeaders = document.querySelectorAll('.category-header');
    const filterInput = document.getElementById('sidebarFilter');
    const sidebar = document.querySelector('.sidebar');
    const divider = document.querySelector('.sidebar-divider');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const searchContainer = document.querySelector('.search-container');

    // Add click handler for search container
    searchContainer.addEventListener('click', (e) => {
        // If sidebar is minimized, expand it first
        if (sidebar.classList.contains('minimized')) {
            sidebar.classList.remove('minimized');
            // Add a small delay to allow transition to complete
            setTimeout(() => {
                filterInput.focus();
            }, 200);
        } else {
            filterInput.focus();
        }
    });

    // Keyboard Navigation
    const handleKeyboardNav = (e) => {
        // Only handle keyboard nav when not in search/filter mode
        if (filterInput.value) return;

        const currentElement = document.activeElement;
        
        // If we're not focused within the sidebar, ignore
        if (!sidebar.contains(currentElement)) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                console.log('Down arrow pressed');
                
                // From search input
                if (currentElement.id === 'sidebarFilter') {
                    console.log('Moving from search to Home link');
                    const homeLink = document.querySelector('.l1-link');
                    if (homeLink) {
                        homeLink.focus();
                        homeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                        return;
                    }
                }
                
                // From Home link
                if (currentElement.classList.contains('l1-link')) {
                    console.log('Moving from Home link to first category');
                    const firstCategory = document.querySelector('.l1-category .category-header');
                    if (firstCategory) {
                        firstCategory.focus();
                        firstCategory.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                        return;
                    }
                }
                
                // From category header
                if (currentElement.classList.contains('category-header')) {
                    console.log('On category header, trying to move down...');
                    const currentCategory = currentElement.closest('.l1-category, .l2-category');
                    
                    // If this category is active, try to move to its first item
                    if (currentCategory.classList.contains('active')) {
                        // For L1 categories, check all direct children in order
                        if (currentCategory.classList.contains('l1-category')) {
                            const categoryContent = currentCategory.querySelector('.category-content');
                            if (categoryContent) {
                                // First try to find L2 links
                                const firstL2Link = categoryContent.querySelector('.l2-link');
                                if (firstL2Link) {
                                    firstL2Link.focus();
                                    firstL2Link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                    return;
                                }
                                // If no L2 links, try L2 categories
                                const firstL2Category = categoryContent.querySelector('.l2-category > .category-header');
                                if (firstL2Category) {
                                    firstL2Category.focus();
                                    firstL2Category.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                    return;
                                }
                            }
                        }
                    }
                    
                    // Try to find next category
                    let nextCategory = currentCategory.nextElementSibling;
                    while (nextCategory) {
                        if (nextCategory.classList.contains('l1-category')) {
                            const nextHeader = nextCategory.querySelector('.category-header');
                            if (nextHeader) {
                                nextHeader.focus();
                                nextHeader.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                return;
                            }
                        }
                        nextCategory = nextCategory.nextElementSibling;
                    }
                }
                
                // From a link within a category
                if (currentElement.classList.contains('l2-link') || currentElement.classList.contains('l3-link')) {
                    console.log('Moving from inner link...');
                    // Try next sibling first
                    let nextElement = currentElement.nextElementSibling;
                    while (nextElement) {
                        // Check for next link first
                        if (nextElement.classList.contains('l2-link') || nextElement.classList.contains('l3-link')) {
                            nextElement.focus();
                            nextElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                            return;
                        }
                        // Then check for L2 category
                        if (nextElement.classList.contains('l2-category')) {
                            const header = nextElement.querySelector('.category-header');
                            if (header) {
                                header.focus();
                                header.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                return;
                            }
                        }
                        nextElement = nextElement.nextElementSibling;
                    }
                    
                    // If no next sibling, try to move to next L1 category
                    const currentL1Category = currentElement.closest('.l1-category');
                    let nextL1Category = currentL1Category.nextElementSibling;
                    while (nextL1Category) {
                        if (nextL1Category.classList.contains('l1-category')) {
                            const nextHeader = nextL1Category.querySelector('.category-header');
                            if (nextHeader) {
                                nextHeader.focus();
                                nextHeader.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                return;
                            }
                        }
                        nextL1Category = nextL1Category.nextElementSibling;
                    }
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                console.log('Up arrow pressed');
                
                // From Home link to search
                if (currentElement.classList.contains('l1-link')) {
                    const searchInput = document.getElementById('sidebarFilter');
                    if (searchInput) {
                        searchInput.focus();
                        return;
                    }
                }
                
                // From category header
                if (currentElement.classList.contains('category-header')) {
                    const currentCategory = currentElement.closest('.l1-category');
                    
                    // If this is the first category after divider, try to go to divider's previous sibling
                    if (divider && currentCategory.previousElementSibling === divider) {
                        const prevSibling = divider.previousElementSibling;
                        if (prevSibling) {
                            if (prevSibling.classList.contains('l1-category')) {
                                // If previous category is active, try its last item
                                if (prevSibling.classList.contains('active')) {
                                    const items = Array.from(prevSibling.querySelectorAll('.category-content .sidebar-item'));
                                    for (let i = items.length - 1; i >= 0; i--) {
                                        const item = items[i];
                                        if (item.tagName === 'A' || item.classList.contains('category-header')) {
                                            item.focus();
                                            item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                            return;
                                        }
                                    }
                                }
                                // Otherwise focus its header
                                const prevHeader = prevSibling.querySelector('.category-header');
                                if (prevHeader) {
                                    prevHeader.focus();
                                    prevHeader.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                    return;
                                }
                            }
                        }
                    }
                    
                    // Rest of the category header navigation...
                    let prevElement = currentCategory.previousElementSibling;
                    while (prevElement) {
                        if (prevElement.classList.contains('l1-category')) {
                            // If previous category is active, try its last item
                            if (prevElement.classList.contains('active')) {
                                const items = Array.from(prevElement.querySelectorAll('.category-content .sidebar-item'));
                                for (let i = items.length - 1; i >= 0; i--) {
                                    const item = items[i];
                                    if (item.tagName === 'A' || item.classList.contains('category-header')) {
                                        item.focus();
                                        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                        return;
                                    }
                                }
                            }
                            // Otherwise focus its header
                            const prevHeader = prevElement.querySelector('.category-header');
                            if (prevHeader) {
                                prevHeader.focus();
                                prevHeader.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                                return;
                            }
                        }
                        prevElement = prevElement.previousElementSibling;
                    }
                    
                    // If we get here and this is the first category, go to Home
                    const homeLink = document.querySelector('.l1-link');
                    if (homeLink) {
                        homeLink.focus();
                        homeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                        return;
                    }
                }
                
                // From a link within a category
                if (currentElement.classList.contains('l2-link') || currentElement.classList.contains('l3-link')) {
                    // Try previous sibling first
                    let prevElement = currentElement.previousElementSibling;
                    if (prevElement && (prevElement.classList.contains('l2-link') || prevElement.classList.contains('l3-link'))) {
                        prevElement.focus();
                        // Ensure the element is visible in the viewport
                        prevElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                        return;
                    }
                    
                    // If no previous sibling, go to category header
                    const currentCategory = currentElement.closest('.l1-category');
                    const categoryHeader = currentCategory.querySelector('.category-header');
                    if (categoryHeader) {
                        categoryHeader.focus();
                        // Ensure the header is visible
                        categoryHeader.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                        return;
                    }
                }
                break;

            case 'ArrowRight': {
                if (currentElement.classList.contains('category-header')) {
                    e.preventDefault();
                    const category = currentElement.closest('.l1-category, .l2-category');
                    if (category && !category.classList.contains('active')) {
                        category.classList.add('active');
                        // Focus first item in category
                        setTimeout(() => {
                            const firstItem = category.querySelector('.category-content .sidebar-item');
                            if (firstItem) firstItem.focus();
                        }, 100);
                    }
                }
                break;
            }

            case 'ArrowLeft': {
                if (currentElement.closest('.category-content')) {
                    e.preventDefault();
                    const category = currentElement.closest('.l1-category, .l2-category');
                    if (category) {
                        const header = category.querySelector('.category-header');
                        category.classList.remove('active');
                        if (header) header.focus();
                    }
                }
                break;
            }

            case 'Home': {
                e.preventDefault();
                filterInput.focus();
                filterInput.scrollIntoView({ block: 'start', behavior: 'smooth' });
                break;
            }

            case 'End': {
                e.preventDefault();
                // Find last visible item
                const allItems = Array.from(sidebar.querySelectorAll('.sidebar-item, .category-header'));
                for (let i = allItems.length - 1; i >= 0; i--) {
                    if (getComputedStyle(allItems[i]).display !== 'none') {
                        allItems[i].focus();
                        allItems[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                        break;
                    }
                }
                break;
            }
        }
    };

    // Add keyboard navigation event listener to both search and sidebar content
    sidebar.addEventListener('keydown', handleKeyboardNav);
    filterInput.addEventListener('keydown', handleKeyboardNav);

    // Add click event listener to each category header
    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // If sidebar is minimized, expand it first
            if (sidebar.classList.contains('minimized')) {
                sidebar.classList.remove('minimized');
                // Add a small delay before toggling the category to ensure smooth transition
                setTimeout(() => {
                    header.parentElement.classList.toggle('active');
                }, 200);
            } else {
                // Get the parent category element and toggle active state
                header.parentElement.classList.toggle('active');
            }
        });
    });

    // Filter functionality
    filterInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const searchContainer = filterInput.closest('.search-container');
        
        // Show/hide divider and toggle button based on search
        divider.style.display = searchTerm ? 'none' : 'block';
        sidebarToggle.style.display = searchTerm ? 'none' : 'flex';

        // Toggle filtered class on search container and input
        searchContainer.classList.toggle('filtered', searchTerm.length > 0);
        filterInput.classList.toggle('filtered', searchTerm.length > 0);

        // If there's a search term and sidebar is minimized, expand it
        if (searchTerm && sidebar.classList.contains('minimized')) {
            sidebar.classList.remove('minimized');
        }

        // Always hide favorites category during search
        const favoritesCategory = document.querySelector('.favorites-category');
        if (favoritesCategory) {
            favoritesCategory.style.display = searchTerm ? 'none' : 'block';
        }

        if (!searchTerm) {
            // Reset everything if search is cleared
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.style.display = '';
                if (item.tagName === 'A') {
                    item.tabIndex = 0;
                }
            });
            document.querySelectorAll('.l1-category, .l2-category').forEach(category => {
                category.classList.remove('active');
            });
            // Update favorites visibility when search is cleared
            updateFavoritesList();
            return;
        }

        // First find categories with matching children
        const categories = document.querySelectorAll('.l1-category, .l2-category');
        categories.forEach(category => {
            // Skip the favorites category completely
            if (category.classList.contains('favorites-category')) {
                return;
            }

            const links = category.querySelectorAll('a');
            const categoryHeader = category.querySelector('.category-header');
            const headerText = categoryHeader.textContent.toLowerCase();
            const hasMatchingLinks = Array.from(links).some(link => 
                link.textContent.toLowerCase().includes(searchTerm)
            );

            if (hasMatchingLinks || headerText.includes(searchTerm)) {
                category.style.display = '';
                category.classList.add('active');
                // Show matching links, hide non-matching ones
                links.forEach(link => {
                    if (link.textContent.toLowerCase().includes(searchTerm)) {
                        link.style.display = '';
                        link.tabIndex = 0;
                    } else {
                        link.style.display = 'none';
                        link.tabIndex = -1;
                    }
                });
            } else {
                category.style.display = 'none';
                category.classList.remove('active');
                links.forEach(link => link.tabIndex = -1);
            }
        });

        // Handle top-level links (like Home)
        document.querySelectorAll('.l1-link').forEach(link => {
            if (link.textContent.toLowerCase().includes(searchTerm)) {
                link.style.display = '';
                link.tabIndex = 0;
            } else {
                link.style.display = 'none';
                link.tabIndex = -1;
            }
        });

        // Move focus to first visible link when pressing Enter in search
        filterInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const firstVisibleLink = document.querySelector('a.sidebar-item[style="display: ;"]:not([tabindex="-1"])');
                if (firstVisibleLink) {
                    e.preventDefault();
                    firstVisibleLink.focus();
                }
            }
        });
    });

    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('minimized');
        if (sidebar.classList.contains('minimized')) {
            document.querySelectorAll('.active').forEach(category => {
                category.classList.remove('active');
            });
        }
    });

    // Function to update favorites list
    function updateFavoritesList() {
        const favoritesCategory = document.querySelector('.favorites-category');
        if (!favoritesCategory) return;

        const favoritesContent = favoritesCategory.querySelector('.category-content');
        if (!favoritesContent) return;

        // Clear existing favorites
        favoritesContent.innerHTML = '';

        // Get all starred items
        const starredItems = document.querySelectorAll('.l2-link.starred, .l3-link.starred');
        
        // Hide/show the entire favorites category based on whether there are starred items
        favoritesCategory.style.display = starredItems.length > 0 ? 'block' : 'none';
        
        // If no starred items, we can return early
        if (starredItems.length === 0) return;

        starredItems.forEach(item => {
            // Create a new favorite item
            const favoriteItem = document.createElement('a');
            favoriteItem.href = item.href;
            favoriteItem.className = 'sidebar-item l2-link';
            
            // Create star icon
            const starIcon = document.createElement('span');
            starIcon.className = 'star-icon';
            
            // Copy the text content
            const textContent = item.textContent.trim();
            
            // Check if original item has an outlink icon
            const hasOutlink = item.querySelector('.outlink-icon');
            
            // Construct the favorite item
            favoriteItem.appendChild(starIcon);
            favoriteItem.appendChild(document.createTextNode(textContent));
            
            if (hasOutlink) {
                const outlinkIcon = document.createElement('img');
                outlinkIcon.src = 'Icons/Outlink.svg';
                outlinkIcon.alt = '';
                outlinkIcon.className = 'outlink-icon';
                favoriteItem.appendChild(outlinkIcon);
            }
            
            // Add to favorites
            favoritesContent.appendChild(favoriteItem);
        });
    }

    // Handle star icon clicks
    document.querySelectorAll('.star-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const link = icon.closest('.l2-link, .l3-link');
            if (!link) return;
            
            // Toggle starred state
            link.classList.toggle('starred');
            
            // Update favorites list
            updateFavoritesList();
            
            // Here you could also save the starred state to localStorage or send to a server
        });
    });

    // Initialize favorites list
    updateFavoritesList();
}); 