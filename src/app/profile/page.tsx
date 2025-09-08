"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, User, Save, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import type { Profile } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";


export default function ProfilePage() {
  const [isClient, setIsClient] = useState(false);
  const [profiles, setProfiles] = useLocalStorage<Profile[]>("user-profiles", []);
  const [activeProfileId, setActiveProfileId] = useLocalStorage<string | null>("active-profile-id", null);

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (activeProfile) {
      setName(activeProfile.name);
      setPhone(activeProfile.phone);
      setAddress(activeProfile.address);
    } else {
      // If no active profile, clear the form
      setName("");
      setPhone("");
      setAddress("");
    }
  }, [activeProfileId, activeProfile]);

  const handleGetLocation = () => {
    setIsLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`Approx. location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setIsLocationLoading(false);
          toast({
            title: "Location Fetched",
            description: "Your approximate address has been filled in.",
          });
        },
        (error) => {
          setIsLocationLoading(false);
          toast({
            title: "Location Error",
            description: "Could not retrieve your location. Please enter your address manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLocationLoading(false);
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support location services.",
        variant: "destructive",
      });
    }
  };
  
  const handleSave = () => {
    if (!name || !phone) {
        toast({
            title: "Incomplete Profile",
            description: "Please enter your name and phone number.",
            variant: "destructive"
        });
        return;
    }

    if (activeProfileId) {
      // Update existing profile
      const updatedProfiles = profiles.map(p => 
        p.id === activeProfileId ? { ...p, name, phone, address } : p
      );
      setProfiles(updatedProfiles);
      toast({
          title: "Profile Saved",
          description: "Your details have been saved successfully."
      });
    } else {
      // Create new profile
      const newProfile: Profile = { id: new Date().toISOString(), name, phone, address };
      const updatedProfiles = [...profiles, newProfile];
      setProfiles(updatedProfiles);
      setActiveProfileId(newProfile.id);
      toast({
          title: "Profile Created",
          description: "Your new profile has been created and set as active."
      });
    }
  };

  const handleDeleteProfile = (idToDelete: string) => {
    const updatedProfiles = profiles.filter(p => p.id !== idToDelete);
    setProfiles(updatedProfiles);
    
    if (activeProfileId === idToDelete) {
      // If the active profile was deleted, switch to another or none
      const newActiveId = updatedProfiles.length > 0 ? updatedProfiles[0].id : null;
      setActiveProfileId(newActiveId);
    }
    
    toast({
      title: "Profile Deleted",
    });
  };

  const handleCreateNew = () => {
    setActiveProfileId(null);
  };

  if (!isClient) {
    return (
        <div className="py-8 max-w-2xl mx-auto space-y-8">
            <div>
                <Skeleton className="h-9 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-2/3 mx-auto mt-2" />
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64 mt-1" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                  </div>
                   <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-20 w-full" />
                   </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-32 ml-auto" />
                </CardFooter>
            </Card>
        </div>
    )
  }
  
  return (
    <div className="py-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-center">Manage Profiles</h1>
        <p className="text-muted-foreground text-center mt-2">Create a new profile or edit an existing one.</p>
      </div>
      
      <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-headline">{activeProfile ? "Edit Profile" : "Create New Profile"}</CardTitle>
                <CardDescription>{activeProfile ? `Editing profile for ${activeProfile.name}` : "Add details for the new profile."}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
             <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="address">Address</Label>
                    <Button variant="outline" size="sm" onClick={handleGetLocation} disabled={isLocationLoading}>
                        {isLocationLoading ? <Loader2 className="mr-2 animate-spin"/> : <MapPin className="mr-2"/>}
                        Get Location
                    </Button>
                </div>
                <Textarea id="address" placeholder="Enter your address or use 'Get Location'" value={address} onChange={e => setAddress(e.target.value)} rows={3}/>
             </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} className="ml-auto">
              <Save className="mr-2" />
              {activeProfile ? "Save Changes" : "Create Profile"}
            </Button>
          </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Profiles</CardTitle>
          <CardDescription>Select a profile to edit or delete.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {profiles.length > 0 ? profiles.map(p => (
            <div key={p.id} className={`flex items-center justify-between p-3 rounded-md ${activeProfileId === p.id ? 'bg-secondary' : 'bg-transparent'}`}>
              <button className="flex-1 text-left" onClick={() => setActiveProfileId(p.id)}>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.phone}</p>
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {p.name}'s Profile?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone and will permanently delete this profile.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteProfile(p.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )) : (
            <p className="text-muted-foreground text-center py-4">No profiles created yet.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={handleCreateNew} className="ml-auto">
            <PlusCircle className="mr-2"/>
            Create New Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
