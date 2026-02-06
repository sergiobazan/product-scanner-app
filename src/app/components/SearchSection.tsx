"use client";

import BarcodeInput from "./BarcodeInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine } from "lucide-react";

type Props = {
  onSearch: (code: string) => void;
  loading: boolean;
  onOpenScanner: () => void;
};

export default function SearchSection({
  onSearch,
  loading,
  onOpenScanner,
}: Props) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base">Buscar producto</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <BarcodeInput onSearch={onSearch} isLoading={loading} />

        <Button
          size="lg"
          className="w-full gap-2"
          onClick={onOpenScanner}
        >
          <ScanLine className="w-4 h-4" />
          Escanear con cámara
        </Button>
      </CardContent>
    </Card>
  );
}
