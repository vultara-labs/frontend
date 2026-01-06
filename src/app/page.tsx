import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CorePillars from "@/components/CorePillars";
import UserJourney from "@/components/UserJourney";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <Hero />
      <CorePillars />
      <UserJourney />
      <Footer />
    </main>
  );
}
