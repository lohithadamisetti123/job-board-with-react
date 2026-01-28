# Job Board with Advanced Filtering and Bookmarking

A multi-page job board React application with advanced client-side filtering, search, sorting, pagination, bookmarking (persisted in localStorage), and an application tracker page. Fully containerized with Docker and served via Nginx.

## Features

- Job listings loaded from local `mock-data.json` (20+ jobs)
- Grid/List view toggle with test-friendly attributes
- Advanced filters:
  - Job type (All / Remote / Hybrid / Onsite)
  - Skills multi-select (react-select)
  - Salary range slider (rc-slider) initialized from data bounds
  - Active filter **badge** next to Filters title
- Search by job title or company name (debounced)
- Sorting by salary (high to low)
- Client-side pagination (page size 10)
- Bookmark / unbookmark jobs:
  - State stored in `localStorage` under key `bookmarkedJobs`
  - Bookmark button has `data-bookmarked="true|false"`
- `/tracker` page showing only bookmarked jobs
- Responsive, modern UI with subtle hover and fade-in animations
- Dockerized deployment with healthcheck

## Tech Stack

- React (Vite)
- React Router
- Zustand (state management)
- SWR (data fetching/caching)
- react-select (multi-select)
- rc-slider (range slider)
- Docker + Nginx (multi-stage build)

## Getting Started (Local Development)

### Prerequisites

- Node.js (18+ recommended)
- npm

### Installation

```bash
# Clone this repository
git clone https://github.com/lohithadamisetti123/job-board-with-react.git

cd job-board-with-react

# Install dependencies
npm install
```

### Run Dev Server

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Running with Docker

### Prerequisites

- Docker
- Docker Compose

### Build and Run

```bash
# From repository root
docker-compose up --build -d
```

The app will be available at:

```text
http://localhost:3000
```

The `app` service exposes port `3000 -> 80` and includes a HTTP healthcheck using `wget` against the main page.

Check container status:

```bash
docker ps
```

You should see `STATUS ... (healthy)` for the app container.

To view logs:

```bash
docker-compose logs -f
```

To stop all containers:

```bash
docker-compose down
```

## Environment Variables

This project currently uses a minimal set of environment variables.

See `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Create a `.env` file if you need to override defaults.

## Screenshots
- `screenshots/job-board-filters.png`
- `screenshots/tracker-page.png`

## Demo Video

- Demo video: `<your-demo-video-link>`


## Project Structure

```text
job-board-with-react/
  ├─ src/
  │  ├─ data/
  │  │  └─ mock-data.json
  │  ├─ components/
  │  │  ├─ filters/
  │  │  ├─ job/
  │  │  └─ layout/
  │  ├─ hooks/
  │  │  ├─ useJobStore.js
  │  │  └─ useJobsData.js
  │  ├─ pages/
  │  │  ├─ JobBoardPage.jsx
  │  │  └─ TrackerPage.jsx
  │  ├─ App.jsx
  │  └─ main.jsx
  ├─ public/
  ├─ Dockerfile
  ├─ docker-compose.yml
  ├─ nginx.conf
  ├─ .env.example
  ├─ package.json
  └─ README.md
```

## Testing Core Requirements (Manual Checklist)

- **Jobs list:** At least 20 job cards rendered with `data-testid="job-card-JOB_ID"`.
- **View mode:** `grid-view-btn` / `list-view-btn` toggle `data-view-mode` on `job-list-container`.
- **Job type filter:** `filter-job-type-remote` and `filter-job-type-hybrid` filter visible jobs.
- **Skills filter:** `filter-skills` (React + TypeScript) shows only jobs containing both.
- **Salary filter:** `filter-salary-slider` restricts visible jobs to selected salary range.
- **Search:** `search-input` filters by job title/company (case-insensitive, debounced).
- **Sort:** `sort-salary-desc` orders visible salaries in descending order (check first three).
- **Pagination:** `pagination-controls` and `pagination-next` navigate jobs 1–10 to 11–20.
- **Bookmarking:** `bookmark-btn-JOB_ID` updates `localStorage.bookmarkedJobs` and `data-bookmarked`.
- **Clear filters:** `clear-filters-btn` resets filters and restores initial job count.
- **Tracker page:** `/tracker` only renders bookmarked job cards.
