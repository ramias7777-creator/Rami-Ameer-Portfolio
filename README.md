# Rami Ameer Subira — Portfolio Website

A responsive, no-build static website created from the supplied portfolio PDF.

## Preview locally

From this folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

You may also use the **Live Server** extension in Visual Studio Code.

## Publish free with GitHub Pages

1. Create a new public GitHub repository, for example `rami-portfolio`.
2. Upload every file and folder from this package to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. GitHub will show the public website address after deployment.

No React, Node.js, npm, build command or paid hosting is required.

## Contact form

The contact form prepares a `mailto:` message and opens the visitor's email application. It does not store form data and requires no backend. For direct in-page delivery later, connect the form to a service such as Formspree or a custom backend.

## Main files

- `index.html` — home page
- `projects.html` — project directory
- `about.html` — profile, experience, education, skills and software
- `contact.html` — contact information and form
- Four individual project pages
- `assets/styles.css` — responsive design system
- `assets/site.js` — navigation, reveals, lightbox, transitions and contact form
- `assets/images/` — optimized WebP images extracted from the portfolio PDF
