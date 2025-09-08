import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Siren, FileText, HeartPulse, Users, BookOpen, User, Phone } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Government Schemes",
    description: "Find relevant healthcare schemes.",
    href: "/schemes",
    icon: <FileText className="size-8 text-primary" />,
  },
  {
    title: "Track Your Wellness",
    description: "Log your daily mental well-being.",
    href: "/wellness-tracker",
    icon: <HeartPulse className="size-8 text-primary" />,
  },
  {
    title: "Find Mental Health Support",
    description: "Locate counselors near you.",
    href: "/support-locator",
    icon: <Users className="size-8 text-primary" />,
  },
    {
    title: "Mental Health Awareness",
    description: "Learn about mental wellbeing.",
    href: "/awareness",
    icon: <BookOpen className="size-8 text-primary" />,
  },
  {
    title: "General Helpline Directory",
    description: "Access a list of useful helplines.",
    href: "/helplines",
    icon: <Phone className="size-8 text-primary" />,
  },
  {
    title: "Your Profile",
    description: "View and manage your details.",
    href: "/profile",
    icon: <User className="size-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center p-4 md:p-8 space-y-8">
      <Card className="w-full max-w-4xl text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline">Emergency Assistance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-muted-foreground">In case of an emergency, press the button below to see a list of helplines.</p>
          <Button asChild size="lg" className="w-full max-w-xs animate-pulse">
            <Link href="/helplines">
              <Siren className="mr-2 h-6 w-6" />
              Call for Help
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.href} className="flex">
            <Card className="w-full hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">
                  {feature.title}
                </CardTitle>
                {feature.icon}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                  <div className="text-sm font-medium text-primary flex items-center">
                    Go to section <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
