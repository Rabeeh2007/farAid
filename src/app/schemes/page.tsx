import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Target, Users, CheckCircle } from "lucide-react";

const schemes = [
  {
    title: "Ayushman Bharat PM-JAY",
    shortDescription: "Provides health coverage up to ₹5 lakh per family per year for hospitalization.",
    tags: ["Health Insurance", "Hospitalization"],
    simplified: {
      goal: "To provide free healthcare services for serious illnesses requiring hospital stays.",
      benefits: "Covers costs for hospitalization, including pre and post-hospitalization expenses, for up to ₹5 lakh per family annually.",
      eligibility: "Primarily for poor and vulnerable families identified through the Socio-Economic Caste Census (SECC).",
    },
    link: "https://pmjay.gov.in/",
  },
  {
    title: "PMSMA",
    shortDescription: "Free, quality antenatal care for all pregnant women on the 9th of every month.",
    tags: ["Maternal Health", "Pregnancy"],
    simplified: {
      goal: "To ensure every pregnant woman receives high-quality check-ups during her pregnancy.",
      benefits: "Guaranteed free health check-up, including tests and screenings, by a specialist on the 9th of each month.",
      eligibility: "All pregnant women are eligible.",
    },
    link: "https://pmsma.nhp.gov.in/",
  },
  {
    title: "Janani Shishu Suraksha Karyakram (JSSK)",
    shortDescription: "Free delivery, C-section, and care for sick newborns in public health institutions.",
    tags: ["Maternal Health", "Child Health"],
    simplified: {
      goal: "To eliminate out-of-pocket expenses for pregnant women and sick infants.",
      benefits: "Completely free services including normal delivery, C-section, drugs, diet during stay, and transport. Also covers treatment for sick newborns up to 30 days after birth.",
      eligibility: "All pregnant women and sick newborns in public health facilities.",
    },
    link: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=841&lid=154",
  },
  {
    title: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    shortDescription: "Early screening and intervention for children (0-18 years) for health issues.",
    tags: ["Child Health", "Screening"],
    simplified: {
      goal: "To identify and treat health problems in children early.",
      benefits: "Screening for birth defects, diseases, deficiencies, and developmental delays. Free treatment, including surgeries, is provided.",
      eligibility: "All children from birth up to 18 years of age.",
    },
    link: "https://rbsk.gov.in/",
  },
  {
    title: "PM Matru Vandana Yojana (PMMVY)",
    shortDescription: "Provides ₹5,000 cash incentive to pregnant women for their first child.",
    tags: ["Maternal Health", "Financial Aid"],
    simplified: {
      goal: "To provide partial wage compensation and improve health-seeking behavior.",
      benefits: "₹5,000 paid in three installments for the first live birth, subject to fulfilling certain health and nutrition conditions.",
      eligibility: "All pregnant women and lactating mothers for their first child, excluding government employees.",
    },
    link: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
  },
  {
    title: "Mission Indradhanush",
    shortDescription: "Aims to achieve full immunization coverage for all children and pregnant women.",
    tags: ["Immunization", "Vaccination"],
    simplified: {
      goal: "To ensure no child or pregnant woman is left unvaccinated against major diseases.",
      benefits: "Provides vaccination against 12 vaccine-preventable diseases, free of cost.",
      eligibility: "All children under 2 years of age and all pregnant women.",
    },
    link: "https://www.nhp.gov.in/mission-indradhanush_pg",
  },
  {
    title: "National Health Mission (NHM)",
    shortDescription: "A broad mission to improve healthcare access and quality, especially in rural areas.",
    tags: ["Public Health", "Rural Health"],
    simplified: {
      goal: "To strengthen the entire healthcare system and make it accessible, affordable, and accountable.",
      benefits: "Supports a wide range of health services, from primary health centers to district hospitals. It is the parent program for many other schemes.",
      eligibility: "Universal access for all citizens.",
    },
    link: "https://nhm.gov.in/",
  },
  {
    title: "e-Sanjeevani",
    shortDescription: "Free tele-consultation platform for doctor appointments from home.",
    tags: ["Telemedicine", "Digital Health"],
    simplified: {
      goal: "To provide healthcare services to patients in their homes.",
      benefits: "Allows patients to consult with doctors and specialists online for free, reducing the need to travel.",
      eligibility: "Any citizen of India.",
    },
    link: "https://esanjeevani.in/",
  }
];

export default function SchemesPage() {
  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-headline">Government Healthcare Schemes</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Discover central government schemes designed to make healthcare affordable and accessible for you and your family.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.title} className="flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-headline">{scheme.title}</CardTitle>
              <CardDescription>{scheme.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {scheme.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full">
                    <Info className="mr-2" />
                    Learn More
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-headline">{scheme.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      A simplified overview of the scheme. For official details, please visit the government website.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <ScrollArea className="max-h-[60vh] pr-4">
                    <div className="space-y-6 text-sm py-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-full mt-1">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Goal of the Scheme</h4>
                          <p className="text-muted-foreground">{scheme.simplified.goal}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-full mt-1">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">What You Get (Benefits)</h4>
                          <p className="text-muted-foreground">{scheme.simplified.benefits}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-full mt-1">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Who Can Apply (Eligibility)</h4>
                          <p className="text-muted-foreground">{scheme.simplified.eligibility}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <AlertDialogFooter className="mt-4">
                    <AlertDialogAction asChild>
                      <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                        Visit Official Site
                      </a>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
