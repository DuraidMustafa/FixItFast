"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Zap,
  Target,
  Users,
  Trophy,
  BarChart3,
  Github,
  Rocket,
  Brain,
  Timer,
  ArrowRight,
  Sparkles,
  Gamepad2,
  Star,
  CheckCircle,
  AlertTriangle,
  Globe,
  Award,
  CloudLightningIcon as Lightning,
  Swords,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function FitItFastLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Header */}
      <header className='border-b border-gray-800/50 backdrop-blur-sm bg-black/80 sticky top-0 z-50'>
        <div className='container mx-auto px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='relative'>
              <Code2 className='h-8 w-8 text-emerald-400' />
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse' />
            </div>
            <span className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
              FitItFast
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4'>
            <Button
              variant='ghost'
              className='text-gray-300 hover:text-white hover:bg-gray-800'>
              <Github className='h-4 w-4 mr-2' />
              View on GitHub
            </Button>
            <Button className='bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
              Get Started
              <ArrowRight className='h-4 w-4 ml-2' />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-300 hover:text-white'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden border-t border-gray-800/50 bg-black/95 backdrop-blur-sm'>
            <div className='container mx-auto px-6 py-4 space-y-4'>
              <Button
                variant='ghost'
                className='w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800'>
                <Github className='h-4 w-4 mr-2' />
                View on GitHub
              </Button>
              <Button className='w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
                Get Started
                <ArrowRight className='h-4 w-4 ml-2' />
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10' />
        <div className='absolute inset-0'>
          <div className='absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse' />
          <div className='absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl' />
        </div>

        <div className='relative container mx-auto px-6 py-24 lg:py-32'>
          <div className='max-w-5xl mx-auto text-center'>
            <Badge
              variant='secondary'
              className='mb-8 bg-gray-800/50 text-emerald-400 border-emerald-400/20 px-4 py-2'>
              <Sparkles className='h-4 w-4 mr-2' />
              Competitive Debugging Platform
            </Badge>

            <h1 className='text-4xl md:text-6xl lg:text-8xl font-black tracking-tight mb-8'>
              <span className='bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'>
                Welcome to
              </span>
              <br />
              <span className='bg-gradient-to-r from-emerald-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent'>
                FitItFast
              </span>
            </h1>

            <div className='text-xl md:text-2xl lg:text-4xl font-bold text-gray-300 mb-8'>
              Where Debugging Becomes a{" "}
              <span className='bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent'>
                Battle
              </span>
            </div>

            <p className='text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 max-w-4xl mx-auto leading-relaxed'>
              Think you can fix broken code under pressure? Compete against real
              developers, fix real bugs, and climb the ranks.
            </p>

            <p className='text-base md:text-lg text-gray-500 mb-12 max-w-3xl mx-auto'>
              Built for those who want to sharpen real-world web dev skills —
              fast.
            </p>

            <Button
              size='lg'
              className='text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-emerald-500 hover:bg-emerald-600 text-black font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all'>
              <Rocket className='h-5 w-5 md:h-6 md:w-6 mr-3' />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* What Is FitItFast Section */}
      <section className='py-16 md:py-24 lg:py-32 bg-gradient-to-b from-transparent to-gray-900/50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16 md:mb-20'>
              <h2 className='text-3xl md:text-5xl lg:text-6xl font-black mb-6'>
                <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                  What Is{" "}
                </span>
                <span className='bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
                  FitItFast
                </span>
                <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                  ?
                </span>
              </h2>
              <div className='w-32 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto' />
            </div>

            <div className='grid lg:grid-cols-2 gap-12 md:gap-16 items-center'>
              <div className='space-y-6 md:space-y-8'>
                <p className='text-lg md:text-xl text-gray-300 leading-relaxed'>
                  FitItFast is a competitive, browser-based platform where web
                  developers debug real-world code issues —{" "}
                  <span className='text-emerald-400 font-semibold'>live</span>.
                </p>

                <p className='text-lg md:text-xl text-gray-300 leading-relaxed'>
                  From JavaScript logic bugs to broken UI elements, each match
                  throws a curveball. Your job?{" "}
                  <span className='text-red-400 font-semibold'>
                    Fix it before your opponent does
                  </span>
                  .
                </p>

                <Card className='bg-gray-900/50 border-gray-700 backdrop-blur-sm'>
                  <CardContent className='p-6 md:p-8'>
                    <h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center text-white'>
                      <Brain className='h-5 w-5 md:h-6 md:w-6 mr-3 text-emerald-400' />
                      You'll master:
                    </h3>
                    <ul className='space-y-4'>
                      <li className='flex items-start'>
                        <div className='w-2 h-2 bg-emerald-400 rounded-full mt-3 mr-4 flex-shrink-0' />
                        <span className='text-gray-300 text-base md:text-lg'>
                          Read and understand legacy or broken code quickly
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <div className='w-2 h-2 bg-blue-400 rounded-full mt-3 mr-4 flex-shrink-0' />
                        <span className='text-gray-300 text-base md:text-lg'>
                          Apply real-world debugging strategies
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <div className='w-2 h-2 bg-purple-400 rounded-full mt-3 mr-4 flex-shrink-0' />
                        <span className='text-gray-300 text-base md:text-lg'>
                          Pass automated test cases under time pressure
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className='text-center lg:text-left'>
                  <p className='text-xl md:text-2xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent'>
                    This isn't LeetCode. This is web dev warfare.
                  </p>
                </div>
              </div>

              <div className='relative'>
                <Card className='bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl'>
                  <CardContent className='p-6 md:p-8'>
                    <div className='space-y-6'>
                      <div className='flex items-center justify-between'>
                        <Badge
                          variant='destructive'
                          className='bg-red-500/20 text-red-400 border-red-500/30'>
                          Bug Detected
                        </Badge>
                        <div className='flex items-center text-gray-400'>
                          <Timer className='h-4 w-4 mr-2' />
                          <span className='font-mono'>02:34</span>
                        </div>
                      </div>

                      <div className='bg-black/50 rounded-lg p-4 md:p-6 font-mono text-xs md:text-sm border border-gray-700'>
                        <div className='text-red-400 mb-2'>
                          {"// Error: Cannot read property 'name'"}
                        </div>
                        <div className='text-red-400 mb-4'>
                          {"// of undefined"}
                        </div>
                        <div className='text-gray-300 line-through'>
                          {"const userName = data.user.name;"}
                        </div>
                        <div className='text-emerald-400 mt-2'>
                          {"const userName = data?.user?.name || 'Guest';"}
                        </div>
                      </div>

                      <div className='flex justify-between items-center'>
                        <div className='flex space-x-2'>
                          <div className='w-3 h-3 bg-emerald-400 rounded-full'></div>
                          <div className='w-3 h-3 bg-emerald-400 rounded-full'></div>
                          <div className='w-3 h-3 bg-emerald-400 rounded-full'></div>
                          <div className='w-3 h-3 bg-gray-600 rounded-full'></div>
                          <div className='w-3 h-3 bg-gray-600 rounded-full'></div>
                        </div>
                        <Badge
                          variant='secondary'
                          className='bg-emerald-500/20 text-emerald-400 border-emerald-500/30'>
                          3/5 Tests Passing
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900/50 to-transparent'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16 md:mb-20'>
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-black mb-6'>
              <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                How It{" "}
              </span>
              <span className='bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
                Works
              </span>
            </h2>
            <p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
              From broken code to victory in 4 simple steps
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
            {[
              {
                step: "01",
                title: "Choose Your Battle",
                description:
                  "Select solo challenges or join live PvP matches against other developers",
                icon: Gamepad2,
                gradient: "from-red-500 to-orange-500",
              },
              {
                step: "02",
                title: "Analyze the Bug",
                description:
                  "Read broken React, JavaScript, or DOM code and identify the issue quickly",
                icon: AlertTriangle,
                gradient: "from-orange-500 to-yellow-500",
              },
              {
                step: "03",
                title: "Code the Fix",
                description:
                  "Use our live editor to implement your solution with instant test feedback",
                icon: Code2,
                gradient: "from-emerald-500 to-blue-500",
              },
              {
                step: "04",
                title: "Claim Victory",
                description:
                  "Pass all tests first to win the match and climb the global leaderboard",
                icon: Trophy,
                gradient: "from-blue-500 to-purple-500",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className='group bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm relative overflow-hidden'>
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.gradient}`}
                />
                <CardContent className='p-6 md:p-8'>
                  <div className='flex items-center mb-6'>
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${step.gradient} mr-4`}>
                      <step.icon className='h-5 w-5 md:h-6 md:w-6 text-white' />
                    </div>
                    <div className='text-2xl md:text-3xl font-black text-gray-600'>
                      {step.step}
                    </div>
                  </div>
                  <h3 className='text-lg md:text-xl font-bold text-white mb-4'>
                    {step.title}
                  </h3>
                  <p className='text-sm md:text-base text-gray-400 leading-relaxed'>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className='py-16 md:py-24 lg:py-32 bg-gradient-to-b from-transparent to-gray-900/50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16 md:mb-20'>
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-black mb-6'>
              <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                Core{" "}
              </span>
              <span className='bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
                Features
              </span>
            </h2>
            <p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
              Everything you need to become a debugging champion
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {[
              {
                icon: Target,
                title: "Debugging Challenges That Matter",
                description:
                  "Solve actual React, DOM, or JavaScript issues — not just console logs or syntax errors.",
                gradient: "from-red-500 to-orange-500",
              },
              {
                icon: Zap,
                title: "Live Code Editor with Instant Feedback",
                description:
                  "Run code directly in the browser with zero setup. Tests run instantly and validate your fix.",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: BarChart3,
                title: "Skill-Based Progression",
                description:
                  "Track your improvement with challenge stats. Elo rankings, leaderboards & matchmaking coming soon.",
                gradient: "from-emerald-500 to-blue-500",
              },
              {
                icon: Code2,
                title: "Developer-Centric Experience",
                description:
                  "Built for web developers, by a web developer. Focused on real frontend bugs, not abstract theory.",
                gradient: "from-blue-500 to-purple-500",
              },
              {
                icon: Users,
                title: "Real-Time PvP Battles",
                description:
                  "Face off live. Fix the bug before your opponent. One test case at a time.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Trophy,
                title: "Global Elo Ranking System",
                description:
                  "Win matches to rank up. See how you stack against developers worldwide.",
                gradient: "from-pink-500 to-red-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className='group bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm'>
                <CardContent className='p-6 md:p-8'>
                  <div className='flex items-center mb-6'>
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mr-4`}>
                      <feature.icon className='h-5 w-5 md:h-6 md:w-6 text-white' />
                    </div>
                    <h3 className='text-lg md:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors'>
                      {feature.title}
                    </h3>
                  </div>
                  <p className='text-sm md:text-base text-gray-400 leading-relaxed'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Types Section */}
      <section className='py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900/50 to-transparent'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16 md:mb-20'>
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-black mb-6'>
              <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                Challenge{" "}
              </span>
              <span className='bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
                Types
              </span>
            </h2>
            <p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
              Multiple formats to test every aspect of your debugging skills
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto'>
            {[
              {
                title: "Solo Sprint",
                description:
                  "Race against the clock to fix bugs and improve your personal best times",
                features: [
                  "Unlimited attempts",
                  "Personal progress tracking",
                  "Skill improvement focus",
                ],
                icon: Lightning,
                iconColor: "text-emerald-400",
                bgColor: "bg-emerald-500/20",
                borderColor: "border-emerald-500/30",
                checkColor: "text-emerald-400",
              },
              {
                title: "Head-to-Head",
                description:
                  "1v1 battles where the fastest debugger takes all the glory",
                features: [
                  "Real-time competition",
                  "Elo rating system",
                  "Live matchmaking",
                ],
                icon: Swords,
                iconColor: "text-blue-400",
                bgColor: "bg-blue-500/20",
                borderColor: "border-blue-500/30",
                checkColor: "text-blue-400",
              },
            ].map((type, index) => (
              <Card
                key={index}
                className='group bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm'>
                <CardContent className='p-6 md:p-8'>
                  <div className='flex items-center mb-6'>
                    <div
                      className={`p-4 rounded-xl ${type.bgColor} border ${type.borderColor} mr-4`}>
                      <type.icon
                        className={`h-6 w-6 md:h-8 md:w-8 ${type.iconColor}`}
                      />
                    </div>
                    <h3 className='text-xl md:text-2xl font-bold text-white'>
                      {type.title}
                    </h3>
                  </div>
                  <p className='text-sm md:text-base text-gray-400 mb-6 leading-relaxed'>
                    {type.description}
                  </p>
                  <ul className='space-y-3'>
                    {type.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className='flex items-center'>
                        <CheckCircle
                          className={`h-4 w-4 ${type.checkColor} mr-3`}
                        />
                        <span className='text-sm md:text-base text-gray-300'>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Progression Section */}
      <section className='py-16 md:py-24 lg:py-32 bg-gradient-to-b from-transparent to-gray-900/50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-16 md:mb-20'>
              <h2 className='text-3xl md:text-5xl lg:text-6xl font-black mb-6'>
                <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                  Level Up{" "}
                </span>
                <span className='bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
                  Your Skills
                </span>
              </h2>
              <p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
                Climb through the ranks as you master the art of debugging
              </p>
            </div>

            <div className='space-y-4 md:space-y-6'>
              {[
                {
                  rank: "Bronze",
                  range: "0-1000",
                  description: "Learning the debugging basics",
                  iconColor: "text-orange-400",
                  bgColor: "bg-orange-500/20",
                  borderColor: "border-orange-500/30",
                },
                {
                  rank: "Silver",
                  range: "1000-1500",
                  description: "Solid debugging fundamentals",
                  iconColor: "text-gray-400",
                  bgColor: "bg-gray-500/20",
                  borderColor: "border-gray-500/30",
                },
                {
                  rank: "Gold",
                  range: "1500-2000",
                  description: "Advanced debugging techniques",
                  iconColor: "text-yellow-400",
                  bgColor: "bg-yellow-500/20",
                  borderColor: "border-yellow-500/30",
                },
                {
                  rank: "Platinum",
                  range: "2000-2500",
                  description: "Expert level debugging skills",
                  iconColor: "text-cyan-400",
                  bgColor: "bg-cyan-500/20",
                  borderColor: "border-cyan-500/30",
                },
                {
                  rank: "Diamond",
                  range: "2500+",
                  description: "Elite debugging master",
                  iconColor: "text-blue-400",
                  bgColor: "bg-blue-500/20",
                  borderColor: "border-blue-500/30",
                },
              ].map((tier, index) => (
                <Card
                  key={index}
                  className='bg-gray-900/50 border-gray-700 backdrop-blur-sm'>
                  <CardContent className='p-4 md:p-6'>
                    <div className='flex items-center space-x-4 md:space-x-6'>
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 ${tier.bgColor} border ${tier.borderColor} rounded-xl flex items-center justify-center`}>
                        <Award
                          className={`h-6 w-6 md:h-8 md:w-8 ${tier.iconColor}`}
                        />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center justify-between mb-2'>
                          <h3 className='text-lg md:text-2xl font-bold text-white'>
                            {tier.rank}
                          </h3>
                          <span className='text-sm md:text-lg text-gray-400 font-mono'>
                            {tier.range} ELO
                          </span>
                        </div>
                        <p className='text-sm md:text-lg text-gray-400'>
                          {tier.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className='py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900/50 to-transparent'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16 md:mb-20'>
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-black mb-6'>
              <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                Join the{" "}
              </span>
              <span className='bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
                Community
              </span>
            </h2>
            <p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
              Connect with developers worldwide and showcase your debugging
              prowess
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {[
              {
                title: "Global Leaderboards",
                description:
                  "See how you rank against developers from around the world",
                icon: Globe,
              },
              {
                title: "Public Profiles",
                description:
                  "Showcase your debugging skills and challenge history",
                icon: Star,
              },
              {
                title: "Achievement System",
                description:
                  "Unlock titles and recognition as you master different bug types",
                icon: Award,
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className='group bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm text-center'>
                <CardContent className='p-6 md:p-8'>
                  <div className='flex justify-center mb-6'>
                    <div className='p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30'>
                      <feature.icon className='h-6 w-6 md:h-8 md:w-8 text-emerald-400' />
                    </div>
                  </div>
                  <h3 className='text-lg md:text-xl font-bold text-white mb-4'>
                    {feature.title}
                  </h3>
                  <p className='text-sm md:text-base text-gray-400 leading-relaxed'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='py-16 md:py-24 lg:py-32 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10' />
        <div className='absolute inset-0'>
          <div className='absolute top-10 left-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse' />
          <div className='absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000' />
        </div>

        <div className='relative container mx-auto px-6 text-center'>
          <h2 className='text-3xl md:text-5xl lg:text-6xl font-black mb-8'>
            <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
              Ready to test your{" "}
            </span>
            <span className='bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
              skills?
            </span>
          </h2>
          <p className='text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto'>
            Join the arena where debugging skills are put to the ultimate test
          </p>

          <div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center'>
            <Button
              size='lg'
              className='text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-emerald-500 hover:bg-emerald-600 text-black font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all'>
              <Rocket className='h-5 w-5 md:h-6 md:w-6 mr-3' />
              Get Started Now
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent'>
              <Github className='h-5 w-5 md:h-6 md:w-6 mr-3' />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-800 py-8 md:py-12 bg-black'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center space-x-3 mb-6 md:mb-0'>
              <div className='relative'>
                <Code2 className='h-6 w-6 text-emerald-400' />
                <div className='absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse' />
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                FitItFast
              </span>
            </div>
            <div className='text-center text-gray-500 flex justify-center items-start flex-col'>
              <p>
                &copy; {new Date().getFullYear()} FitItFast. Built for
                developers who love a challenge.
              </p>{" "}
              Note: UI generated using Tailwind UI / AI tools to save time and
              focus on backend systems.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
