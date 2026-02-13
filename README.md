# Carômetro Escolar / Student ID Manager

This is a Next.js application designed to manage student identification photos for a school environment. It allows for importing student data via CSV, searching for students, and capturing photos using a webcam. The photos are saved with a standardized naming convention (`Matricula_Nome.jpg`), making them suitable for facial recognition systems or ID card generation.

## Features

- **CSV Import**: Easily import student lists using a standard CSV file (`Matricula,Nome`).
- **Real-time Search**: meaningful search and filtering by student name or ID.
- **Webcam Integration**: Built-in camera interface to capture student photos directly in the browser.
- **Standardized File Saving**: Photos are automatically saved to `public/photos` with the filename format `Matricula_Nome.jpg`.
- **Visual Status Tracking**: Quickly see which students already have a photo (green border/checkmark) and which do not.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Camera**: [react-webcam](https://www.npmjs.com/package/react-webcam)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage Guide

### 1. Prepare Student Data
Create a CSV file (e.g., `students.csv`) with the following headers (or just the columns):
```csv
Matricula,Nome
12345,John Doe
67890,Jane Smith
...
```

### 2. Import Data
- Click the "Import CSV" button in the top right corner.
- Select your prepared CSV file.
- The student list will populate automatically.

### 3. Capture Photos
- Use the search bar to find a specific student.
- Click on a student card to open the camera interface.
- Allow camera access if prompted.
- Click "Capture Photo" to take a picture.
- Review the photo and click "Save Photo".
- The photo will be saved to the `public/photos` directory, and the student's card will update to show the new image.

## Project Structure

- `app/page.tsx`: Main entry point.
- `components/StudentList.tsx`: Manages the student list state, search, and CSV import.
- `components/CameraCapture.tsx`: Handles the webcam interface and image capture.
- `app/api/save-photo/route.ts`: API route responsible for saving the base64 image data to the file system.
- `public/photos`: Directory where captured photos are stored.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
