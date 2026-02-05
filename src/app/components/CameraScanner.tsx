"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

type Props = {
  onDetected: (barcode: string) => void;
  onClose: () => void;
};

export default function CameraScanner({ onDetected, onClose }: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const startedRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            if (!startedRef.current) return;

            onDetected(decodedText);
            stopScanner();
            onClose();
          },
          () => {},
        );

        startedRef.current = true;
      } catch (err) {
        console.error("Error iniciando camara", err);
      }
    };

    const stopScanner = async () => {
      try {
        if (scannerRef.current && startedRef.current) {
          await scannerRef.current.stop();
          scannerRef.current.clear();
          startedRef.current = false;
        }
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [onDetected, onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 w-full max-w-md">
        <div id="reader" className="w-full" />
        <button
          onClick={onClose}
          className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg">
          Cancelar
        </button>
      </div>
    </div>
  );
}
