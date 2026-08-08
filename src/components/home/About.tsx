'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const trustees = [
    { name: "Smt. Neelam Singh", role: "Chairman", image: "/assets/trusties/neelam_singh.jpeg" },
    { name: "Smt. Akriti Singh", role: "Vice Chairman", image: "/assets/trusties/akriti_singh.jpg" },
    { name: "Mr. Amit Kumar Singh", role: "Secretary", image: "/assets/trusties/amit_singh.jpg" },
    { name: "Mr. Niyaz Ahamad", role: "Manager", image: "/assets/trusties/niyaz.jpg" },
];

const focusAreas = [
    "Holistic Rehabilitation",
    "Inclusive Education",
    "Skill Development & Vocational Training",
    "Community Sensitization",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const plugin = useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = Array.from(sectionRef.current?.querySelectorAll('.scroll-anim') || []);
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="about" ref={sectionRef} className="container mx-auto px-4 md:px-6">
      <div className="text-center opacity-0 scroll-anim">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Our Mission, Our Vision
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:gap-16 md:grid-cols-5">
        <div className="space-y-4 md:col-span-3 opacity-0 scroll-anim" style={{ animationDelay: '0.1s' }}>
          <p className="text-lg text-muted-foreground">
            Babu D.D. Singh Charitable Trust is dedicated to enabling differently abled and marginalized children and youth to receive comprehensive rehabilitation, education, and vocational training. Our mission is to empower these individuals so they can take care of their social, physical, and spiritual needs, and become fully integrated into society.
          </p>
          <p className="text-lg text-muted-foreground">
            We envision a world that ensures the inclusion of differently abled and marginalized children and youth into mainstream society. Our aim is to create an environment where they feel welcome, supported, and empowered.
          </p>
        </div>
        <div className="md:col-span-2 opacity-0 scroll-anim" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-headline text-xl font-semibold mb-4">Our Core Focus Areas</h3>
            <ul className="space-y-3">
                {focusAreas.map((area) => (
                    <li key={area} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{area}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 opacity-0 scroll-anim" style={{ animationDelay: '0.3s' }}>
        <h3 className="font-headline text-center text-2xl font-bold sm:text-3xl relative pb-4">
            Meet Our Trustees
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <svg width="100" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5C1 5 20 -3 50 5C80 13 99 5 99 5" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </span>
        </h3>
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto mt-8 sm:mt-12"
            opts={{
                loop: true,
                align: "start",
            }}
        >
            <CarouselContent className="-ml-4">
                {trustees.map((trustee) => (
                <CarouselItem key={trustee.name} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1 h-full">
                        <div className="group rounded-2xl border border-border/20 bg-card p-4 h-full flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:-translate-y-2">
                            <div className="relative mb-4 w-36 h-36">
                                <div className="relative w-full h-full rounded-2xl border-2 border-primary overflow-hidden shadow-inner bg-secondary">
                                    <Avatar className="h-full w-full rounded-none">
                                        <AvatarImage data-ai-hint="person portrait" src={trustee.image} alt={trustee.name} className="transition-transform duration-300 group-hover:scale-110 object-cover" />
                                        <AvatarFallback>{trustee.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-md shadow-md">+</div>
                                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-md shadow-md">+</div>
                            </div>
                            <p className="mt-2 font-semibold text-lg">{trustee.name}</p>
                            <p className="text-sm text-muted-foreground">{trustee.role}</p>
                        </div>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
