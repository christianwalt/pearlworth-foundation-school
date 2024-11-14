document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    const dropdownToggles = document.querySelectorAll('.dropdown > a, .nested-dropdown > a');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const parent = this.parentElement;
            const isNested = parent.classList.contains('nested-dropdown');
            const dropdownMenu = parent.querySelector(isNested ? '.nested-dropdown-menu' : '.dropdown-menu');

            // Close all other dropdowns at the same level
            const siblings = isNested 
                ? parent.parentElement.querySelectorAll(':scope > .nested-dropdown')
                : document.querySelectorAll('.main-nav > ul > li.dropdown');

            siblings.forEach(sibling => {
                if (sibling !== parent) {
                    sibling.classList.remove('active');
                    const siblingMenu = sibling.querySelector('.dropdown-menu, .nested-dropdown-menu');
                    if (siblingMenu) siblingMenu.style.display = 'none';
                }
            });

            // Toggle the clicked dropdown
            parent.classList.toggle('active');
            dropdownMenu.style.display = parent.classList.contains('active') ? 'block' : 'none';

            // If it's a top-level dropdown, close all nested dropdowns except the current one
            if (!isNested) {
                const allNestedDropdowns = document.querySelectorAll('.nested-dropdown');
                allNestedDropdowns.forEach(nested => {
                    if (!parent.contains(nested)) {
                        nested.classList.remove('active');
                        const nestedMenu = nested.querySelector('.nested-dropdown-menu');
                        if (nestedMenu) nestedMenu.style.display = 'none';
                    }
                });
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.nested-dropdown')) {
            const allDropdowns = document.querySelectorAll('.dropdown, .nested-dropdown');
            allDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu, .nested-dropdown-menu');
                if (dropdownMenu) dropdownMenu.style.display = 'none';
            });
        }
    });

    // Hamburger menu and off-canvas menu functionality
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('.site-header .container').appendChild(hamburgerMenu);

    const offCanvasMenu = document.querySelector('.off-canvas-menu');
    const offCanvasExit = document.querySelector('.off-canvas-exit');

    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        offCanvasMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        if (this.classList.contains('active')) {
            this.querySelector('span:first-child').style.transform = 'rotate(45deg) translate(5px, 5px)';
            this.querySelector('span:nth-child(2)').style.opacity = '0';
            this.querySelector('span:last-child').style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.querySelector('span:first-child').style.transform = 'none';
            this.querySelector('span:nth-child(2)').style.opacity = '1';
            this.querySelector('span:last-child').style.transform = 'none';
        }
    });

    // Off-canvas exit functionality
    offCanvasExit.addEventListener('click', function() {
        offCanvasMenu.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburgerMenu.querySelector('span:first-child').style.transform = 'none';
        hamburgerMenu.querySelector('span:nth-child(2)').style.opacity = '1';
        hamburgerMenu.querySelector('span:last-child').style.transform = 'none';
    });

    // Off-canvas menu dropdowns
    const offCanvasDropdowns = document.querySelectorAll('.off-canvas-dropdown > a, .off-canvas-nested-dropdown > a');

    offCanvasDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const dropdownMenu = parent.querySelector('.off-canvas-dropdown-menu, .off-canvas-nested-dropdown-menu');
            
            parent.classList.toggle('active');
            dropdownMenu.style.display = parent.classList.contains('active') ? 'block' : 'none';
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Close off-canvas menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!offCanvasMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            offCanvasMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburgerMenu.querySelector('span:first-child').style.transform = 'none';
            hamburgerMenu.querySelector('span:nth-child(2)').style.opacity = '1';
            hamburgerMenu.querySelector('span:last-child').style.transform = 'none';
        }
    });

    // Add event listeners for download buttons
    
       const downloadButton = document.querySelector('#download-button');
        
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert("To be accessed on pearlworth portal.");
        });
    }

    // Handle all download buttons
    const downloadButtons = document.querySelectorAll('.download-button');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert("To be accessed on Pearlworth portal.");
        });
    });

    // ... rest of your existing code ...
});