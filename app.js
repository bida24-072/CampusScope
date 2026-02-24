// CampusScope App - Main JavaScript

class CampusScope {
    constructor() {
        this.currentPage = 'dashboard';
        this.resources = [];
        this.user = {
            name: 'John Student',
            role: 'Computer Science \'24',
            interests: ['AI', 'Machine Learning', 'Web Development']
        };
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupResourceFinder();
        this.setupSearch();
        this.setupARMode();
        this.loadUserData();
        this.checkMobileView();
    }
    
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-menu li');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });
    }
    
    switchPage(page) {
        // Update navigation
        document.querySelectorAll('.nav-menu li').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
        
        // Update page visibility
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        document.getElementById(page).classList.add('active');
        
        this.currentPage = page;
        
        // Load page-specific data
        switch(page) {
            case 'resource-finder':
                this.loadResources();
                break;
            case 'updates':
                this.loadUpdates();
                break;
            case 'social':
                this.loadSocialData();
                break;
        }
    }
    
    setupResourceFinder() {
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-resource');
        const resourceType = document.getElementById('resource-type');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchResources(searchInput.value, resourceType.value);
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.searchResources(searchInput.value, resourceType.value);
                }
            });
        }
        
        if (resourceType) {
            resourceType.addEventListener('change', () => {
                this.filterResourcesByType(resourceType.value);
            });
        }
    }
    
    setupSearch() {
        // Add search functionality for resources
        console.log('Search setup complete');
    }
    
    setupARMode() {
        const arBtn = document.querySelector('.ar-mode-btn');
        
        if (arBtn) {
            arBtn.addEventListener('click', () => {
                this.startARMode();
            });
        }
    }
    
    startARMode() {
        // Simulate AR mode
        alert('🎮 AR Mode Activated!\n\nPoint your camera at buildings to see:\n• Class schedules\n• Available study spots\n• Friend locations\n• Real-time navigation');
        
        // Add AR overlay effect
        const mapContainer = document.querySelector('.campus-map');
        if (mapContainer) {
            mapContainer.style.position = 'relative';
            
            // Add AR indicator
            const arIndicator = document.createElement('div');
            arIndicator.className = 'ar-indicator';
            arIndicator.innerHTML = `
                <div style="position: absolute; top: 10px; left: 10px; background: rgba(67, 97, 238, 0.9); color: white; padding: 8px; border-radius: 20px; font-size: 12px;">
                    <i class="fas fa-vr-cardboard"></i> AR Mode Active
                </div>
            `;
            mapContainer.appendChild(arIndicator);
        }
    }
    
    loadResources() {
        // Simulate loading resources
        console.log('Loading resources...');
        
        // Add loading state
        const resourceGrid = document.querySelector('.resource-grid');
        if (resourceGrid) {
            resourceGrid.innerHTML = '<div class="loading">Loading resources...</div>';
            
            // Simulate API call
            setTimeout(() => {
                this.displayResources();
            }, 1000);
        }
    }
    
    displayResources() {
        const resources = [
            {
                type: 'books',
                icon: 'book',
                title: 'Introduction to Algorithms',
                author: 'CLRS - 4th Edition',
                status: 'available',
                location: 'Library, 3rd Floor, Section A-12'
            },
            {
                type: 'books',
                icon: 'book',
                title: 'Deep Learning',
                author: 'Ian Goodfellow',
                status: 'checked',
                dueDate: '02/25',
                location: 'Library, 2nd Floor, Section B-5'
            },
            {
                type: 'study-spots',
                icon: 'chair',
                title: 'Quiet Study Room',
                description: 'Individual desks, power outlets',
                status: 'available',
                spots: 3,
                location: 'Library, 4th Floor, Room 401'
            },
            {
                type: 'lab-equipment',
                icon: 'microscope',
                title: 'Microscope - Lab Grade',
                description: 'Olympus CX23',
                status: 'available',
                location: 'Science Building, Lab 203'
            }
        ];
        
        const resourceGrid = document.querySelector('.resource-grid');
        resourceGrid.innerHTML = resources.map(resource => this.createResourceCard(resource)).join('');
    }
    
    createResourceCard(resource) {
        const statusClass = resource.status === 'available' ? 'available' : 'checked';
        const statusIcon = resource.status === 'available' ? 'check-circle' : 'clock';
        const statusText = resource.status === 'available' ? 
            (resource.spots ? `${resource.spots} spots free` : 'Available') : 
            `Due: ${resource.dueDate}`;
        
        return `
            <div class="resource-card" data-type="${resource.type}">
                <i class="fas fa-${resource.icon}"></i>
                <h4>${resource.title}</h4>
                <p>${resource.author || resource.description || ''}</p>
                <div class="resource-status ${statusClass}">
                    <i class="fas fa-${statusIcon}"></i> ${statusText}
                </div>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${resource.location}</p>
                <button class="locate-btn" ${resource.status !== 'available' ? 'disabled' : ''}>
                    ${resource.status === 'available' ? 'Locate' : 'Checked Out'}
                    <i class="fas fa-${resource.status === 'available' ? 'map-marker-alt' : 'clock'}"></i>
                </button>
            </div>
        `;
    }
    
    searchResources(query, type) {
        console.log(`Searching for: ${query}, Type: ${type}`);
        
        // Simulate search
        const resourceCards = document.querySelectorAll('.resource-card');
        let visibleCount = 0;
        
        resourceCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const matchesQuery = query === '' || title.includes(query.toLowerCase());
            const matchesType = type === 'all' || card.dataset.type === type;
            
            if (matchesQuery && matchesType) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results
        const resourceGrid = document.querySelector('.resource-grid');
        let noResults = resourceGrid.querySelector('.no-results');
        
        if (visibleCount === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <h3>No resources found</h3>
                    <p>Try adjusting your search or filters</p>
                `;
                noResults.style.textAlign = 'center';
                noResults.style.padding = '3rem';
                resourceGrid.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }
    
    filterResourcesByType(type) {
        this.searchResources(document.getElementById('search-resource').value, type);
    }
    
    loadUpdates() {
        console.log('Loading updates...');
        
        // Simulate loading real-time updates
        const updatesFeed = document.querySelector('.updates-feed');
        if (updatesFeed) {
            updatesFeed.innerHTML = '<div class="loading">Loading updates...</div>';
            
            setTimeout(() => {
                this.displayUpdates();
            }, 800);
        }
    }
    
    displayUpdates() {
        const updates = [
            {
                type: 'urgent',
                icon: 'exclamation-circle',
                title: 'Library Hours Extended',
                description: 'During exam week, library will be open 24/7 from Dec 10-20',
                time: '2 hours ago'
            },
            {
                type: 'event',
                icon: 'calendar-alt',
                title: 'Career Fair 2024',
                description: 'Register now for the annual career fair - March 15th',
                time: 'Yesterday'
            },
            {
                type: 'opportunity',
                icon: 'trophy',
                title: 'Hackathon Registration Open',
                description: '48-hour coding competition with $5000 in prizes',
                time: '2 days ago'
            }
        ];
        
        const updatesFeed = document.querySelector('.updates-feed');
        updatesFeed.innerHTML = updates.map(update => `
            <div class="update-card ${update.type === 'urgent' ? 'urgent' : ''}">
                <i class="fas fa-${update.icon}"></i>
                <div>
                    <h4>${update.title}</h4>
                    <p>${update.description}</p>
                    <span class="update-time">${update.time}</span>
                </div>
            </div>
        `).join('');
    }
    
    loadSocialData() {
        console.log('Loading social data...');
    }
    
    loadUserData() {
        // Update user profile
        document.querySelector('.user-name').textContent = this.user.name;
        document.querySelector('.user-role').textContent = this.user.role;
    }
    
    checkMobileView() {
        // Handle mobile navigation
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                // Add mobile menu button
                if (!document.querySelector('.mobile-menu-btn')) {
                    const header = document.querySelector('header');
                    const menuBtn = document.createElement('button');
                    menuBtn.className = 'mobile-menu-btn';
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    menuBtn.style.background = 'none';
                    menuBtn.style.border = 'none';
                    menuBtn.style.fontSize = '1.5rem';
                    menuBtn.style.cursor = 'pointer';
                    
                    menuBtn.addEventListener('click', () => {
                        document.querySelector('.sidebar').classList.toggle('active');
                    });
                    
                    header.insertBefore(menuBtn, header.firstChild);
                }
            } else {
                // Remove mobile menu button on larger screens
                const mobileBtn = document.querySelector('.mobile-menu-btn');
                if (mobileBtn) {
                    mobileBtn.remove();
                }
            }
        };
        
        window.addEventListener('resize', handleResize);
        handleResize();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new CampusScope();
    
    // Add click handlers for locate buttons (delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('locate-btn') && !e.target.disabled) {
            const resourceCard = e.target.closest('.resource-card');
            if (resourceCard) {
                const title = resourceCard.querySelector('h4').textContent;
                alert(`📍 Navigating to: ${title}\n\nFollow the AR path on your camera view!`);
            }
        }
        
        if (e.target.classList.contains('join-btn')) {
            const groupCard = e.target.closest('.group-card');
            if (groupCard) {
                const groupName = groupCard.querySelector('h4').textContent;
                alert(`✅ You've joined: ${groupName}\n\nCheck your email for group details!`);
                e.target.textContent = 'Joined ✓';
                e.target.disabled = true;
            }
        }
        
        if
(e.target.classList.contains('connect-btn')) {
            const mentorCard = e.target.closest('.mentor-card');
            if (mentorCard) {
                const mentorName = mentorCard.querySelector('h4').textContent;
                alert(`📧 Connection request sent to ${mentorName}`);
                e.target.textContent = 'Requested ✓';
                e.target.disabled = true;
            }
        }
    });
});
