import { Card } from "@/components/ui/card";
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
import { Phone, ArrowRight } from "lucide-react";

const helplines = [
  { name: "National Emergency Number", number: "112" },
  { name: "Police", number: "100" },
  { name: "Fire", number: "101" },
  { name: "Ambulance", number: "102" },
  { name: "Disaster Management Services", number: "108" },
  { name: "Women Helpline", number: "1091" },
  { name: "Women Helpline (Domestic Abuse)", number: "181" },
  { name: "Child Helpline", number: "1098" },
  { name: "Senior Citizen Helpline", number: "14567" },
  { name: "Kisan Call Centre", number: "1800-180-1551" },
  { name: "National Health Helpline", number: "1800-180-1104" },
  { name: "Mental Health Helpline (KIRAN)", number: "1800-599-0019" },
];

export default function HelplinesPage() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline text-center mb-8">General Helpline Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {helplines.map((helpline) => (
          <AlertDialog key={helpline.name}>
            <AlertDialogTrigger asChild>
              <Card className="group relative cursor-pointer overflow-hidden rounded-lg border p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:bg-primary/5">
                  <div className="flex flex-col items-start justify-between h-full">
                    <div>
                      <h3 className="text-lg font-headline mb-2">{helpline.name}</h3>
                      <div
                        className="flex items-center space-x-3 text-xl font-semibold text-primary"
                      >
                        <Phone className="h-5 w-5" />
                        <span>{helpline.number}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowRight className="h-6 w-6" />
                  </div>
              </Card>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Call {helpline.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to call the number: {helpline.number}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <a href={`tel:${helpline.number}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </a>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
    </div>
  );
}
