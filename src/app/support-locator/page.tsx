"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, UserCheck, AlertCircle } from "lucide-react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import type { WellnessEntry } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface Counselor {
  id: number;
  name: string;
  specialty: string;
  distance: number;
  availability: "high" | "medium" | "low";
  phone: string;
}

const mockCounselors: Counselor[] = [
  { id: 1, name: "Dr. Anjali Sharma", specialty: "Cognitive Behavioral Therapy", distance: 2.5, availability: "high", phone: "123-456-7890" },
  { id: 2, name: "Mr. Sameer Verma", specialty: "Family Counseling", distance: 5.1, availability: "medium", phone: "123-456-7890" },
  { id: 3, name: "Dr. Priya Desai", specialty: "Stress & Anxiety Management", distance: 8.2, availability: "low", phone: "123-456-7890" },
  { id: 4, name: "Ms. Kavita Singh", specialty: "Youth Mental Health", distance: 12.0, availability: "high", phone: "123-456-7890" },
];

export default function SupportLocatorPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [wellnessData] = useLocalStorage<WellnessEntry[]>("wellness-log", []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // In a real app, you'd use the location to fetch real data.
          // Here, we just simulate a successful location fetch.
          setTimeout(() => setIsLoading(false), 1000);
        },
        (error) => {
          setLocationError(error.message);
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline text-center mb-8">Mental Health Support Locator</h1>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-4 p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Finding counselors near you...</p>
        </div>
      )}

      {locationError && !isLoading && (
        <Card className="bg-destructive/10 border-destructive text-center">
            <CardHeader>
                <div className="mx-auto bg-destructive/20 p-3 rounded-full w-fit">
                    <AlertCircle className="h-8 w-8 text-destructive"/>
                </div>
                <CardTitle>Location Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Could not access your location. Please enable location services in your browser settings to find counselors near you.</p>
                <p className="text-sm text-muted-foreground mt-2">{locationError}</p>
            </CardContent>
        </Card>
      )}

      {!isLoading && !locationError && (
        <div className="space-y-4">
          {mockCounselors.map(counselor => (
            <Card key={counselor.id} className="shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-headline flex items-center">
                      <UserCheck className="mr-2 h-5 w-5 text-primary" />
                      {counselor.name}
                    </CardTitle>
                    <CardDescription>{counselor.specialty}</CardDescription>
                  </div>
                  <Badge variant={counselor.availability === 'high' ? 'default' : counselor.availability === 'medium' ? 'secondary' : 'destructive'} className="capitalize">{counselor.availability} Availability</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{counselor.distance} km away (approx.)</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                 <a href={`tel:${counselor.phone}`}>
                  <Button>
                    Contact
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
