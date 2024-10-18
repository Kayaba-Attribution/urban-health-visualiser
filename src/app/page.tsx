"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateImage, analyzeImage } from "../utils/imageGeneration";

export default function Home() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [healthIssues, setHealthIssues] = useState("");
  const [culturalBackground, setCulturalBackground] = useState("");
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [communityRole, setCommunityRole] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const generatePrompts = () => {
    const selectedGender = gender === "other" ? otherGender : gender;
    const basePrompt = `Create a stylized, infographic-like image for a ${age}-year-old ${selectedGender} 
    of ${culturalBackground} background in ${city}, ${country}. Height: ${height}cm, Weight: ${weight}kg. 
    Health concerns: ${healthIssues}. Dietary preferences: ${dietaryPreferences}. 
    Community role: ${communityRole}. Current date: ${currentDate}. Fitness level: ${fitnessLevel}.
    Use a consistent color palette and style across all images. Minimize text, focusing on visual storytelling. 
    Incorporate recognizable city landmarks and urban elements. Show realistic urban health challenges and personal adaptations.`;
  
    return [
      `${basePrompt} Image 1: Current State - Depict the person in their urban environment, highlighting typical health challenges they face (e.g., busy streets, fast food options, sedentary workplace). Show their current lifestyle choices and health status through visual metaphors.`,
      
      `${basePrompt} Image 2: Awareness & Small Changes (1 Month) - Illustrate the person becoming aware of urban health resources. Show them researching local parks, healthy restaurants, or community programs. Depict small initial changes like using stairs instead of elevators or carrying a reusable water bottle.`,
      
      `${basePrompt} Image 3: Adapting to Urban Environment (3 Months) - Visualize the person actively using existing city health resources. Show them jogging in a local park, shopping at a farmer's market, or participating in a community fitness class. Highlight how they're navigating urban challenges more healthily.`,
      
      `${basePrompt} Image 4: Lifestyle Integration (6 Months) - Depict how healthier habits have become part of their daily routine. Show them cycling to work, preparing home-cooked meals, or using a standing desk. Illustrate improved health markers through subtle visual cues.`,
      
      `${basePrompt} Image 5: Community Engagement (1 Year) - Create a split image comparing their initial state with their current lifestyle. Show how they've not only improved their own health but are now contributing to community health. Depict them volunteering at a community garden, organizing a neighborhood walking group, or teaching a healthy cooking class.`
    ];
  };
  const handleGenerateVisualization = async () => {
    setIsGenerating(true);
    setError("");
    const prompts = generatePrompts();
    const images = [];

    try {
      for (let i = 0; i < prompts.length; i++) {
        let prompt = prompts[i];
        if (i > 0) {
          // Analyze the previous image and incorporate insights into the next prompt
          console.log("Analyzing previous image:", images[i - 1]);
          const analysis = await analyzeImage(images[i - 1], prompts[i - 1]);
          prompt += ` Incorporate these elements from the previous image: ${analysis}`;
        }
        console.log("Generating image with prompt:", prompt);
        const newImage = await generateImage(prompt);
        images.push(newImage);
      }

      setGeneratedImages(images);
    } catch (err) {
      setError("An error occurred while generating images. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">
        UrbanHealth Visualizer
      </h1>
      <p className="text-xl text-center mb-8">Your City, Your Health Story</p>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>
            Enter your information to create a personalized health visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <div className="space-y-2">
              <Select onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {gender === "other" && (
                <Input
                  placeholder="Specify gender"
                  value={otherGender}
                  onChange={(e) => setOtherGender(e.target.value)}
                />
              )}
            </div>
            <Input
              placeholder="Height (cm)"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <Input
              placeholder="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Input
              placeholder="Cultural Background"
              value={culturalBackground}
              onChange={(e) => setCulturalBackground(e.target.value)}
            />
            <Select onValueChange={setFitnessLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Fitness Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="lightly active">Lightly Active</SelectItem>
                <SelectItem value="moderately active">
                  Moderately Active
                </SelectItem>
                <SelectItem value="very active">Very Active</SelectItem>
                <SelectItem value="extremely active">
                  Extremely Active
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder="Health Issues (e.g., diabetes, hypertension)"
            value={healthIssues}
            onChange={(e) => setHealthIssues(e.target.value)}
          />
          <Textarea
            placeholder="Dietary Preferences"
            value={dietaryPreferences}
            onChange={(e) => setDietaryPreferences(e.target.value)}
          />
          <Input
            placeholder="Community Role (e.g., teacher, volunteer, parent)"
            value={communityRole}
            onChange={(e) => setCommunityRole(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleGenerateVisualization}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Health Visualization"}
          </Button>
        </CardFooter>
      </Card>

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {generatedImages.length > 0 && (
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Your Health Journey Visualization</CardTitle>
            <CardDescription>
              A series of images depicting your health transformation over time
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Health visualization ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {
                    ["Current", "3 Months", "6 Months", "1 Year", "Impact"][
                      index
                    ]
                  }
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
