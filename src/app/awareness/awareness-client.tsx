"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ShieldCheck, HeartHandshake } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AwarenessClient() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline text-center">Mental Health Awareness</h1>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Brain className="text-primary" />
              Common Mental Health Problems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="stress">
                <AccordionTrigger className="font-semibold">Stress</AccordionTrigger>
                <AccordionContent className="prose prose-sm max-w-none">
                  <p>Stress is the body's reaction to any change that requires an adjustment or response. It's a normal part of life, but chronic stress can harm your health.</p>
                  <strong>Common Signs:</strong>
                  <ul>
                    <li>Feeling irritable, angry, or impatient</li>
                    <li>Difficulty sleeping or sleeping too much</li>
                    <li>Headaches, muscle pain, and frequent sickness</li>
                    <li>Feeling overwhelmed and losing control</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="anxiety">
                <AccordionTrigger className="font-semibold">Anxiety</AccordionTrigger>
                <AccordionContent className="prose prose-sm max-w-none">
                  <p>Anxiety is more than just feeling stressed or worried. It's a feeling of fear or unease that can be mild or severe. It's a key part of several different disorders.</p>
                  <strong>Common Signs:</strong>
                  <ul>
                    <li>Constant worrying or overthinking</li>
                    <li>Restlessness and an inability to relax</li>
                    <li>Physical symptoms like a racing heart, sweating, or trembling</li>
                    <li>Avoiding situations that trigger anxiety</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="depression">
                <AccordionTrigger className="font-semibold">Depression</AccordionTrigger>
                <AccordionContent className="prose prose-sm max-w-none">
                  <p>Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. It's more than just feeling "down."</p>
                  <strong>Common Signs:</strong>
                  <ul>
                    <li>Feeling sad, empty, or hopeless most of the day, nearly every day</li>
                    <li>Losing interest or pleasure in activities you once enjoyed</li>
                    <li>Significant changes in appetite or weight</li>
                    <li>Fatigue or loss of energy</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <HeartHandshake className="text-primary" />
              Tips for Mental Health Management
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Talk about your feelings:</strong> Sharing your feelings with someone you trust can be a great way to cope.</li>
              <li><strong>Stay Active:</strong> Regular physical activity can boost your mood and reduce stress. Even a short walk can help.</li>
              <li><strong>Eat Well:</strong> A balanced diet is important for both your physical and mental health.</li>
              <li><strong>Get Enough Sleep:</strong> Aim for 7-9 hours of quality sleep per night. Poor sleep can negatively affect your mood.</li>
              <li><strong>Take Breaks:</strong> When life gets overwhelming, step back. A few minutes of quiet time can make a difference.</li>
              <li><strong>Connect with Others:</strong> Spend time with family and friends. Strong social connections are vital for well-being.</li>
              <li><strong>Ask for Help:</strong> It's a sign of strength to ask for help when you need it. Talk to a friend, family member, or a professional.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <ShieldCheck className="text-primary" />
              Government Initiatives
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>The Government of India has launched several programs to improve mental healthcare accessibility:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>National Mental Health Programme (NMHP):</strong> Aims to ensure the availability and accessibility of minimum mental healthcare for all, particularly for the most vulnerable sections of the population.</li>
              <li><strong>KIRAN Helpline (1800-599-0019):</strong> A 24/7 toll-free helpline providing support for people facing anxiety, stress, depression, suicidal thoughts and other mental health concerns.</li>
              <li><strong>Manodarpan Initiative:</strong> Launched to provide psychosocial support to students, teachers, and families for their mental health and well-being during the COVID-19 outbreak.</li>
            </ul>
          </CardContent>
        </Card>
      </Accordion>
    </div>
  );
}
