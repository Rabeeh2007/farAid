"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import type { WellnessEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Smile, Meh, Frown, Laugh, Annoyed, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type MoodOption = {
  value: WellnessEntry['mood'];
  label: string;
  icon: React.ElementType;
};

const moodOptions: MoodOption[] = [
  { value: 'great', label: 'Great', icon: Laugh },
  { value: 'good', label: 'Good', icon: Smile },
  { value: 'ok', label: 'OK', icon: Meh },
  { value: 'bad', label: 'Bad', icon: Frown },
  { value: 'terrible', label: 'Terrible', icon: Annoyed },
];

export default function WellnessTrackerPage() {
  const [log, setLog] = useLocalStorage<WellnessEntry[]>("wellness-log", []);
  const [mood, setMood] = useState<WellnessEntry['mood'] | undefined>();
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogMood = () => {
    if (!mood) {
      toast({
        title: "Please select a mood.",
        variant: "destructive",
      });
      return;
    }
    const newEntry: WellnessEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      mood,
      notes,
    };
    setLog([newEntry, ...log]);
    setMood(undefined);
    setNotes("");
    toast({
      title: "Mood Logged!",
      description: "Your wellness entry for today has been saved.",
    });
  };

  const handleDeleteEntry = (id: string) => {
    setLog(log.filter(entry => entry.id !== id));
    toast({
      title: "Entry Deleted",
      description: "The wellness log entry has been removed.",
    });
  };

  const handleClearHistory = () => {
    setLog([]);
    toast({
      title: "History Cleared",
      description: "All wellness log entries have been deleted.",
    });
  };

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold font-headline text-center">Mental Wellness Tracker</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">How are you feeling today?</CardTitle>
          <CardDescription>Select a mood and add any notes you'd like.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={mood}
            onValueChange={(value: WellnessEntry['mood']) => setMood(value)}
            className="flex flex-wrap justify-center gap-2 md:gap-4"
          >
            {moodOptions.map((option) => (
              <div key={option.value}>
                <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                <Label
                  htmlFor={option.value}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <option.icon className="mb-3 h-6 w-6" />
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Textarea
            placeholder="Add any thoughts or notes about your day..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogMood} className="ml-auto">Log Mood</Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline">Your Wellness History</CardTitle>
                <CardDescription>A log of your past wellness entries.</CardDescription>
            </div>
            {isClient && log.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear History
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your entire wellness history.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearHistory}>
                      Yes, delete everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
        </CardHeader>
        <CardContent>
          {isClient && log.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {log.map((entry) => {
                const moodOption = moodOptions.find(m => m.value === entry.mood);
                return (
                  <div key={entry.id} className="flex items-start space-x-4 p-3 rounded-lg bg-secondary">
                    {moodOption && <moodOption.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />}
                    <div className="flex-grow">
                      <p className="font-semibold">
                        {format(new Date(entry.date), "MMMM d, yyyy 'at' h:mm a")} - <span className="capitalize">{entry.mood}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{entry.notes || "No notes."}</p>
                    </div>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this wellness log entry.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteEntry(entry.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                  </div>
                )
              })}
            </div>
          ) : isClient ? (
            <p className="text-muted-foreground text-center py-4">You have no wellness entries yet.</p>
          ) : (
            <p className="text-muted-foreground text-center py-4">Loading history...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
