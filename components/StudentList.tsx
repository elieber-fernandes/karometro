'use client';

import React, { useState, useMemo } from 'react';
import { Search, Upload, User, CheckCircle, Camera as CameraIcon } from 'lucide-react';
import { Student } from '@/types';
import { CameraCapture } from '@/components/CameraCapture';

export function StudentList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [showCamera, setShowCamera] = useState(false);

    // Filter students based on search term
    const filteredStudents = useMemo(() => {
        if (!searchTerm) return students;
        const lowerTerm = searchTerm.toLowerCase();
        return students.filter(
            (s) =>
                s.name.toLowerCase().includes(lowerTerm) ||
                s.id.toLowerCase().includes(lowerTerm)
        );
    }, [students, searchTerm]);

    // Handle CSV Import
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return;

            // Assuming CSV format: Matricula,Nome (or separate by semicolon)
            // We'll try to detect the separator
            const lines = text.split('\n');
            const newStudents: Student[] = [];

            // Simple parsing logic - can be improved based on specific CSV format
            lines.forEach((line) => {
                const cleanedLine = line.trim();
                if (!cleanedLine) return;

                // Try comma then semicolon
                let parts = cleanedLine.split(',');
                if (parts.length < 2) parts = cleanedLine.split(';');

                if (parts.length >= 2) {
                    const id = parts[0].trim();
                    const name = parts[1].trim();
                    // Skip header if it looks like "Matricula" or "ID"
                    if (id.toLowerCase() === 'matricula' || id.toLowerCase() === 'id') return;

                    newStudents.push({
                        id,
                        name,
                        photoUrl: '', // Initial state
                    });
                }
            });

            setStudents(newStudents);
        };
        reader.readAsText(file);
    };

    const handleCapture = async (imageSrc: string) => {
        if (!selectedStudent) return;

        try {
            const response = await fetch('/api/save-photo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    matricula: selectedStudent.id,
                    name: selectedStudent.name,
                    image: imageSrc,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Update student with new photo URL to show visual feedback
                setStudents((prev) =>
                    prev.map((s) =>
                        s.id === selectedStudent.id ? { ...s, photoUrl: data.path } : s
                    )
                );
                setShowCamera(false);
                setSelectedStudent(null);
            } else {
                alert('Failed to save photo. Please try again.');
            }
        } catch (error) {
            console.error('Error saving photo:', error);
            alert('An error occurred while saving.');
        }
    };

    return (
        <div className="mx-auto w-full max-w-5xl p-4 md:p-6">
            {/* Header & Upload */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6 md:mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
                        Carômetro Escolar
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 md:mt-2 md:text-base">
                        Manage student photos and IDs efficiently.
                    </p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    {/* CSV Upload Button */}
                    <label className="cursor-pointer flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-900/10 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-700 transition-all active:scale-95">
                        <Upload className="h-4 w-4" />
                        Import CSV
                        <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                    <div className="text-xs text-zinc-500 md:text-sm">
                        {students.length} students
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6 md:mb-8">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full rounded-xl border-0 bg-white py-3 pl-11 pr-4 text-base text-zinc-900 shadow-xl shadow-black/5 ring-1 ring-zinc-900/10 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-800 md:py-4 md:pl-12"
                />
            </div>

            {/* Student List Grid */}
            {students.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 py-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50 md:py-20">
                    <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                        <Upload className="h-8 w-8 text-zinc-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        No students loaded
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
                        Import a CSV file with "Matricula,Nome" to get started.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredStudents.map((student) => (
                        <div
                            key={student.id}
                            onClick={() => {
                                setSelectedStudent(student);
                                setShowCamera(true);
                            }}
                            className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all active:scale-[0.98] md:gap-4 md:p-4 md:hover:shadow-lg ${student.photoUrl
                                ? 'border-green-200 bg-green-50/50 dark:border-green-900/50 dark:bg-green-900/10'
                                : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                                }`}
                        >
                            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 md:h-12 md:w-12">
                                {student.photoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={`${student.photoUrl}?t=${new Date().getTime()}`} // Cache buster
                                        alt={student.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <User className="h-5 w-5 text-zinc-400 md:h-6 md:w-6" />
                                    </div>
                                )}
                                {/* Status Indicator */}
                                {student.photoUrl && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                        <CheckCircle className="h-3 w-3 text-white drop-shadow-md md:h-4 md:w-4" />
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {student.name}
                                </p>
                                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                    ID: {student.id}
                                </p>
                            </div>

                            {!student.photoUrl && (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 md:bg-blue-600 md:text-white md:opacity-0 md:group-hover:opacity-100 md:w-auto md:h-auto md:p-1.5 md:bg-blue-600 md:text-white transition-opacity">
                                    <CameraIcon className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Camera Modal */}
            {showCamera && selectedStudent && (
                <CameraCapture
                    studentName={selectedStudent.name}
                    onClose={() => {
                        setShowCamera(false);
                        setSelectedStudent(null);
                    }}
                    onCapture={handleCapture}
                />
            )}
        </div>
    );
}
