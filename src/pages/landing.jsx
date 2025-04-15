import "./landing.css"; // Import CSS file for cursor effect
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const text =
    "💼 Discover your next career move or find top talent — all in one place!";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    let speed = phase === "typing" ? 40 : 20;
    const timeout = setTimeout(() => {
      if (phase === "typing") {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          setIndex(index + 1);
        } else {
          setTimeout(() => setPhase("deleting"), 1000);
        }
      } else if (phase === "deleting") {
        if (index > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex(index - 1);
        } else {
          setPhase("typing");
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, phase]);

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-2xl font-bold sm:text-4xl lg:text-6xl tracking-tighter pb-2">
          <img
            src="logo_new.png"
            alt="JobNexus Logo"
            className="h-7 sm:h-12 lg:h-16 my-2 sm:my-4 w-32 sm:w-48 lg:w-70"
          />
          — Your Next Job, Just a Nexus Away💫
        </h1>
        {/* Typing effect */}
        <p className="text-gray-300 sm:mt-[18px] text-xs sm:text-xl">
          {displayedText}
          <span className="blink-cursor">|</span>
        </p>
      </section>

      {/* CTA Buttons */}
      <div className="flex gap-6 justify-center mt-2.5">
        <Link to="/jobs">
          <Button variant={"heroBlue"} size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant={"heroGreen"} size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* Company Carousel */}
      <Carousel
        plugins={[Autoplay({ delay: 1000 })]}
        className="w-full py-10 mt-4"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img
                src={path}
                alt={name}
                className="h-7 sm:h-11 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Banner */}
      <img
        src="/banner_2.jpg"
        alt="banner image"
        className="w-full h-[80vh] mb-10 object-cover"
      />

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent className="mt-[-15px]">
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent className="mt-[-15px]">
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* FAQs */}
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
