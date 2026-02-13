'use client';

import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Save, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CameraCaptureProps {
    onCapture: (imageSrc: string) => void;
    onClose: () => void;
    studentName: string;
}

export function CameraCapture({ onCapture, onClose, studentName }: CameraCaptureProps) {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImgSrc(imageSrc);
        }
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    const confirmSave = () => {
        if (imgSrc) {
            onCapture(imgSrc);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 md:items-center md:p-4">
            <div className="relative w-full max-w-2xl rounded-t-2xl bg-white p-4 shadow-2xl dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 md:rounded-2xl md:border md:p-6 animation-slide-up">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-zinc-100 p-2 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
                >
                    <X className="h-5 w-5 text-zinc-500" />
                </button>

                <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100 md:mb-6 md:text-2xl">
                    Foto: {studentName}
                </h2>

                <div className="relative overflow-hidden rounded-xl bg-black aspect-[3/4] md:aspect-video flex items-center justify-center">
                    {imgSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imgSrc} alt="Captured" className="h-full w-full object-cover" />
                    ) : (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={1280}
                            height={720}
                            videoConstraints={{ facingMode: 'user' }}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>

                <div className="mt-4 flex flex-col gap-3 md:mt-6 md:flex-row md:justify-center md:gap-4">
                    {imgSrc ? (
                        <>
                            <button
                                onClick={retake}
                                className="order-2 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 py-3.5 font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors md:order-1 md:w-auto md:px-6 md:py-2.5"
                            >
                                <RefreshCw className="h-5 w-5 md:h-4 md:w-4" />
                                Retake
                            </button>
                            <button
                                onClick={confirmSave}
                                className="order-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-medium text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 md:order-2 md:w-auto md:px-6 md:py-2.5"
                            >
                                <Save className="h-5 w-5 md:h-4 md:w-4" />
                                Save Photo
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={capture}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-4 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-xl hover:scale-[1.02] md:w-auto md:rounded-full md:px-8 md:py-3 md:hover:scale-105"
                        >
                            <Camera className="h-6 w-6 md:h-5 md:w-5" />
                            Capture Photo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
