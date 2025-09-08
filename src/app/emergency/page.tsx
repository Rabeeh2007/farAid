"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, AlertTriangle } from "lucide-react";

export default function EmergencyPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    setStatus("Getting your location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setStatus("Contacting nearest hospital...");
        },
        (err) => {
          setError(err.message);
          setStatus("Could not get location. Please call for help manually.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setStatus("Geolocation not supported. Please call for help manually.");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <Card className="w-full max-w-md text-center shadow-2xl border-2 border-destructive">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline text-destructive">
            Emergency Request Sent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center items-center p-6 mx-auto">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
          </div>
          <p className="text-lg font-semibold">{status}</p>
          
          {location && (
            <div className="text-sm text-muted-foreground p-2 bg-secondary rounded-md">
              <p className="flex items-center justify-center">
                <MapPin className="mr-2 h-4 w-4" />
                Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            </div>
          )}

          {error && (
            <div className="text-sm text-destructive p-2 bg-destructive/10 rounded-md">
              <p className="flex items-center justify-center">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Error: {error}
              </p>
            </div>
          )}

          <p className="text-muted-foreground pt-4">
            Help is on the way. If you can, please stay on the line and provide more details to the operator when they call.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
