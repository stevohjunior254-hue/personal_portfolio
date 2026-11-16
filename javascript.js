const tabLinks = document.querySelectorAll('.tab-links');
const tabContents = document.querySelectorAll('.tab-contents');

tabLinks.forEach((tabLink) => {
	tabLink.addEventListener('click', () => {
		const targetTab = document.getElementById(tabLink.dataset.tab);

		tabLinks.forEach((link) => {
			link.classList.remove('active-link');
			link.setAttribute('aria-selected', 'false');
		});
		tabContents.forEach((content) => {
			content.classList.remove('active-tab');
			content.hidden = true;
		});

		tabLink.classList.add('active-link');
		tabLink.setAttribute('aria-selected', 'true');
		targetTab.classList.add('active-tab');
		targetTab.hidden = false;
	});
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectCount = document.querySelector('.project-count');
const projectModal = document.querySelector('.project-modal');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('#modal-title');
const modalCategory = document.querySelector('.modal-category');
const modalDescription = document.querySelector('.modal-description');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

filterButtons.forEach((filterButton) => {
	filterButton.addEventListener('click', () => {
		const selectedFilter = filterButton.dataset.filter;
		let visibleProjects = 0;

		filterButtons.forEach((button) => {
			const isActive = button === filterButton;
			button.classList.toggle('active-filter', isActive);
			button.setAttribute('aria-pressed', String(isActive));
		});

		projectCards.forEach((card) => {
			const shouldShow = selectedFilter === 'all' || card.dataset.category === selectedFilter;
			card.hidden = !shouldShow;
			if (shouldShow) visibleProjects += 1;
		});

		projectCount.textContent = `${visibleProjects} ${visibleProjects === 1 ? 'project' : 'projects'}`;
	});
});

const closeModal = () => {
	projectModal.hidden = true;
	document.body.classList.remove('modal-open');
};

projectCards.forEach((card) => {
	card.addEventListener('click', () => {
		modalImage.src = card.dataset.image;
		modalImage.alt = card.querySelector('img').alt;
		modalTitle.textContent = card.dataset.title;
		modalCategory.textContent = card.dataset.category === 'print' ? 'Print design' : 'Branding';
		modalDescription.textContent = card.dataset.description;
		projectModal.hidden = false;
		document.body.classList.add('modal-open');
		projectModal.querySelector('.modal-close').focus();
	});
});

closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && !projectModal.hidden) closeModal();
});
