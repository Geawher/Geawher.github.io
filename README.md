# geawher.github.io

Personal site of Jawher Jabri. Plain HTML, CSS and JavaScript: no framework, no build step.

## Edit

All content is in `assets/js/data.js`. Layout lives in `assets/js/app.js` (rendering and the
RL-loop figure) and `assets/css/style.css` (light and dark themes).

The CV is a copy of `../cvs/Jawher-Jabri-AI-Research-Engineer.pdf`. After rebuilding the CV,
copy it again:

    cp ../cvs/Jawher-Jabri-AI-Research-Engineer.pdf assets/cv/

## Preview

    python3 -m http.server 8000    # then open http://localhost:8000

## Deploy

Push this folder to a public GitHub repository named `Geawher.github.io`; GitHub Pages
serves it at https://geawher.github.io/ from the default branch.
