 const themeBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      if (document.body.classList.contains('dark-mode')) {
        // Moon icon for dark mode
        themeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0d6efd" viewBox="0 0 16 16">
            <path d="M6 0a7 7 0 0 1 7 7c0 1.648-.895 3.157-2.026 3.982-.218.134-.384.367-.384.64V14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1.378c0-.273-.166-.506-.384-.64C2.895 10.157 2 8.648 2 7A7 7 0 0 1 6 0z"/>
          </svg>
        `;
      } else {
        // Sun icon for light mode
        themeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFC107" viewBox="0 0 16 16">
            <path d="M8 2a5 5 0 0 1 5 5c0 1.657-.895 3.166-2.034 3.987-.203.14-.366.377-.366.646V13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1.367c0-.27-.163-.506-.366-.646C3.895 10.166 3 8.657 3 7a5 5 0 0 1 5-5zm0 10a4 4 0 0 0 4-4c0-1.144-.49-2.211-1.292-3-1.246-1.232-3.17-1.232-4.416 0C4.49 5.789 4 6.856 4 8a4 4 0 0 0 4 4z"/>
          </svg>`;
      }
    });