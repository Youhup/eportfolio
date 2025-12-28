// JavaScript for Hobbies Page - Art Gallery Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const totalImages = 6;
    const imageFolder = 'img/';
    const imageNames = [];
    
    // Generate image names (1.jpg, 2.jpg, etc.)
    for (let i = 1; i <= totalImages; i++) {
        imageNames.push(`${i}.jpeg`);
    }
    
    // DOM Elements
    const galleryGrid = document.getElementById('art-gallery');
    const currentImgElement = document.getElementById('current-img');
    const totalImgsElement = document.getElementById('total-imgs');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeLightbox = document.getElementById('close-lightbox');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    // State
    let currentIndex = 0;
    
    // Initialize
    totalImgsElement.textContent = totalImages;
    loadGallery();
    setupEventListeners();
    
    // Functions
    function loadGallery() {
        galleryGrid.innerHTML = '';
        
        imageNames.forEach((imageName, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = index;
            
            const img = document.createElement('img');
            img.className = 'gallery-img';
            img.src = `${imageFolder}${imageName}`;
            img.alt = `Artwork ${index + 1}`;
            img.loading = 'lazy';
            
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            
            const title = document.createElement('p');
            title.className = 'gallery-title';
            title.textContent = `Artwork #${index + 1}`;
            
            overlay.appendChild(title);
            galleryItem.appendChild(img);
            galleryItem.appendChild(overlay);
            galleryGrid.appendChild(galleryItem);
            
            // Add click event to open lightbox
            galleryItem.addEventListener('click', () => openLightbox(index));
        });
        
        updateGalleryCounter();
    }
    
    function updateGalleryCounter() {
        currentImgElement.textContent = currentIndex + 1;
    }
    
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightboxHandler() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function updateLightbox() {
        const imageName = imageNames[currentIndex];
        lightboxImg.src = `${imageFolder}${imageName}`;
        lightboxImg.alt = `Artwork ${currentIndex + 1}`;
        lightboxTitle.textContent = `Artwork #${currentIndex + 1}`;
        lightboxCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
        updateGalleryCounter();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateLightbox();
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateLightbox();
    }
    
    function setupEventListeners() {
        // Navigation buttons
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);
        
        // Lightbox controls
        closeLightbox.addEventListener('click', closeLightboxHandler);
        lightboxPrev.addEventListener('click', prevImage);
        lightboxNext.addEventListener('click', nextImage);
        
        // Close lightbox on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightboxHandler();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                switch(e.key) {
                    case 'ArrowLeft':
                        prevImage();
                        break;
                    case 'ArrowRight':
                        nextImage();
                        break;
                    case 'Escape':
                        closeLightboxHandler();
                        break;
                }
            }
        });
        
        // Handle image loading errors
        const images = document.querySelectorAll('.gallery-img, #lightbox-img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dy=".3em">Artwork Image</text></svg>';
                this.alt = 'Image not available';
            });
        });
    }
});