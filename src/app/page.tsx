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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

  const generatePrompt = () => {
    const selectedGender = gender === "other" ? otherGender : gender;
    return `Create a series of vibrant, inclusive health infographics for a ${age}-year-old ${selectedGender} 
    living in ${city}, ${country} with a ${culturalBackground} background. 
    Height: ${height}cm, Weight: ${weight}kg. Fitness level: ${fitnessLevel}.
    Address health concerns: ${healthIssues}. 
    Include dietary suggestions considering ${dietaryPreferences} preferences. 
    Use local landmarks and culturally relevant imagery to make the infographics 
    relatable and engaging. 
    Create comparative visualizations showing potential health improvements over 3 months, 6 months, and 1 year.
    Illustrate how their role as a ${communityRole} impacts community health.
    Incorporate seasonal health tips and local events relevant to ${currentDate}.`;
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
          <Button className="w-full">Generate Health Visualization</Button>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Generated Prompt</CardTitle>
          <CardDescription>
            This is an example of the prompt that will be used to create your
            personalized health visualization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea readOnly value={generatePrompt()} className="h-40" />
        </CardContent>
      </Card>
    </div>
  );
}
