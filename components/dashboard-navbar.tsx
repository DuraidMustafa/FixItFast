"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Code2, Menu, X, Clock, Zap, Code } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";

// Move this outside the main component, before DashboardNavbar
const SinglePlayerModal = ({
  isOpen,
  onOpenChange,
  difficulty,
  setDifficulty,
  timeLimit,
  setTimeLimit,
  challengeType,
  setChallengeType,
  onStartChallenge,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  timeLimit: string;
  setTimeLimit: (value: string) => void;
  challengeType: string;
  setChallengeType: (value: string) => void;
  onStartChallenge: () => void;
}) => {
  const difficulties = [
    { value: "very-easy", label: "Very Easy", color: "text-green-300" },
    { value: "easy", label: "Easy", color: "text-blue-300" },
    { value: "normal", label: "Normal", color: "text-gray-300" },
    { value: "hard", label: "Hard", color: "text-yellow-300" },
    { value: "very-hard", label: "Very Hard", color: "text-red-300" },
  ];

  const timeLimits = [
    { value: "none", label: "No Time Limit" },
    ...Array.from({ length: 12 }, (_, i) => {
      const minutes = (i + 1) * 5;
      return { value: minutes.toString(), label: `${minutes} minutes` };
    }),
  ];

  const challengeTypes = [
    { value: "javascript", label: "JavaScript", icon: "🟨" },
    { value: "typescript", label: "TypeScript", icon: "🔷" },
    { value: "react", label: "React", icon: "⚛️" },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md bg-black border-gray-600 text-white'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-emerald-400 flex items-center gap-2'>
            <Zap className='h-5 w-5' />
            Configure Your SinglePlayer Challenge
          </DialogTitle>
          <DialogDescription className='text-gray-400'>
            Choose your difficulty level, time limit, and challenge type to get
            started with a singleplayer challenge.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          {/* Difficulty Selection */}
          <div className='space-y-2'>
            <Label
              htmlFor='difficulty'
              className='text-sm font-medium text-white flex items-center gap-2'>
              <Zap className='h-4 w-4 text-emerald-400' />
              Difficulty Level
            </Label>
            <Select
              value={difficulty}
              onValueChange={setDifficulty}>
              <SelectTrigger className='bg-gray-800 border-gray-600 text-white hover:bg-gray-700'>
                <SelectValue placeholder='Select difficulty level' />
              </SelectTrigger>
              <SelectContent className='bg-gray-800 border-gray-600'>
                {difficulties.map((diff) => (
                  <SelectItem
                    key={diff.value}
                    value={diff.value}
                    className='text-white hover:bg-gray-700 focus:bg-gray-700'>
                    <span className={`font-medium ${diff.color}`}>
                      {diff.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Limit Selection */}
          <div className='space-y-2'>
            <Label
              htmlFor='time-limit'
              className='text-sm font-medium text-white flex items-center gap-2'>
              <Clock className='h-4 w-4 text-emerald-400' />
              Time Limit
            </Label>
            <Select
              value={timeLimit}
              onValueChange={setTimeLimit}>
              <SelectTrigger className='bg-gray-800 border-gray-600 text-white hover:bg-gray-700'>
                <SelectValue placeholder='Select time limit' />
              </SelectTrigger>
              <SelectContent className='bg-gray-800 border-gray-600'>
                {timeLimits.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    className='text-white hover:bg-gray-700 focus:bg-gray-700'>
                    <span className='text-gray-200'>{time.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Challenge Type Selection */}
          <div className='space-y-2'>
            <Label
              htmlFor='challenge-type'
              className='text-sm font-medium text-white flex items-center gap-2'>
              <Code className='h-4 w-4 text-emerald-400' />
              Challenge Type
            </Label>
            <Select
              value={challengeType}
              onValueChange={setChallengeType}>
              <SelectTrigger className='bg-gray-800 border-gray-600 text-white hover:bg-gray-700'>
                <SelectValue placeholder='Select challenge type' />
              </SelectTrigger>
              <SelectContent className='bg-gray-800 border-gray-600'>
                {challengeTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className='text-white hover:bg-gray-700 focus:bg-gray-700'>
                    <span className='flex items-center gap-2 text-gray-200'>
                      <span>{type.icon}</span>
                      {type.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex gap-3 pt-4'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            className='flex-1 border-gray-600 bg-gray-800 text-white'>
            Cancel
          </Button>
          <Button
            onClick={onStartChallenge}
            disabled={!difficulty || !timeLimit || !challengeType}
            className='flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>
            Start Challenge
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MultiplayerModal = ({
  isOpen,
  onOpenChange,
  difficulty,
  setDifficulty,
  timeLimit,
  setTimeLimit,
  challengeType,
  setChallengeType,
  onStartChallenge,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  timeLimit: string;
  setTimeLimit: (value: string) => void;
  challengeType: string;
  setChallengeType: (value: string) => void;
  onStartChallenge: () => void;
}) => {
  const difficulties = [
    { value: "very-easy", label: "Very Easy", color: "text-green-300" },
    { value: "easy", label: "Easy", color: "text-blue-300" },
    { value: "normal", label: "Normal", color: "text-gray-300" },
    { value: "hard", label: "Hard", color: "text-yellow-300" },
    { value: "very-hard", label: "Very Hard", color: "text-red-300" },
  ];

  const timeLimits = [
    { value: "none", label: "No Time Limit" },
    ...Array.from({ length: 12 }, (_, i) => {
      const minutes = (i + 1) * 5;
      return { value: minutes.toString(), label: `${minutes} minutes` };
    }),
  ];

  const challengeTypes = [
    { value: "javascript", label: "JavaScript", icon: "🟨" },
    { value: "typescript", label: "TypeScript", icon: "🔷" },
    { value: "react", label: "React", icon: "⚛️" },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md bg-black border-gray-600 text-white'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-emerald-400 flex items-center gap-2'>
            <Zap className='h-5 w-5' />
            Configure Your Multiplayer Challenge
          </DialogTitle>
          <DialogDescription className='text-gray-400'>
            Choose your difficulty level, time limit, and challenge type to get
            started with a multiplayer challenge.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          {/* Difficulty Selection */}
          <div className='space-y-2'>
            <Label
              htmlFor='difficulty'
              className='text-sm font-medium text-white flex items-center gap-2'>
              <Zap className='h-4 w-4 text-emerald-400' />
              Difficulty Level
            </Label>
            <Select
              value={difficulty}
              onValueChange={setDifficulty}>
              <SelectTrigger className='bg-gray-800 border-gray-600 text-white hover:bg-gray-700'>
                <SelectValue placeholder='Select difficulty level' />
              </SelectTrigger>
              <SelectContent className='bg-gray-800 border-gray-600'>
                {difficulties.map((diff) => (
                  <SelectItem
                    key={diff.value}
                    value={diff.value}
                    className='text-white hover:bg-gray-700 focus:bg-gray-700'>
                    <span className={`font-medium ${diff.color}`}>
                      {diff.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Limit Selection */}
          <div className='space-y-2'>
            <Label
              htmlFor='time-limit'
              className='text-sm font-medium text-white flex items-center gap-2'>
              <Clock className='h-4 w-4 text-emerald-400' />
              Time Limit
            </Label>
            <Select
              value={timeLimit}
              onValueChange={setTimeLimit}>
              <SelectTrigger className='bg-gray-800 border-gray-600 text-white hover:bg-gray-700'>
                <SelectValue placeholder='Select time limit' />
              </SelectTrigger>
              <SelectContent className='bg-gray-800 border-gray-600'>
                {timeLimits.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    className='text-white hover:bg-gray-700 focus:bg-gray-700'>
                    <span className='text-gray-200'>{time.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Challenge Type Selection */}
          <div className='space-y-2'>
            <Label
              htmlFor='challenge-type'
              className='text-sm font-medium text-white flex items-center gap-2'>
              <Code className='h-4 w-4 text-emerald-400' />
              Challenge Type
            </Label>
            <Select
              value={challengeType}
              onValueChange={setChallengeType}>
              <SelectTrigger className='bg-gray-800 border-gray-600 text-white hover:bg-gray-700'>
                <SelectValue placeholder='Select challenge type' />
              </SelectTrigger>
              <SelectContent className='bg-gray-800 border-gray-600'>
                {challengeTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className='text-white hover:bg-gray-700 focus:bg-gray-700'>
                    <span className='flex items-center gap-2 text-gray-200'>
                      <span>{type.icon}</span>
                      {type.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex gap-3 pt-4'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            className='flex-1 border-gray-600 bg-gray-800 text-white'>
            Cancel
          </Button>
          <Button
            onClick={onStartChallenge}
            disabled={!difficulty || !timeLimit || !challengeType}
            className='flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>
            Start Challenge
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DashboardNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [multiplayerModalOpen, setMultiplayerModalOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [challengeType, setChallengeType] = useState("");
  const [multiplayerDifficulty, setMultiplayerDifficulty] = useState("");
  const [multiplayerTimeLimit, setMultiplayerTimeLimit] = useState("");
  const [multiplayerChallengeType, setMultiplayerChallengeType] = useState("");
  const router = useRouter();

  const handleStartChallenge = () => {
    if (difficulty && timeLimit && challengeType) {
      console.log("Starting challenge with:", {
        difficulty,
        timeLimit,
        challengeType,
      });
      setModalOpen(false);
      router.push(
        `/dashboard/challenge/singleplayer/${difficulty}/${timeLimit}/${challengeType}`,
      );

      setTimeout(() => {
        setDifficulty("");
        setTimeLimit("");
        setChallengeType("");
      }, 300);
    }
  };

  const handleStartMultiplayerChallenge = () => {
    if (
      multiplayerDifficulty &&
      multiplayerTimeLimit &&
      multiplayerChallengeType
    ) {
      console.log("Starting MULTIPLAYER challenge with:", {
        difficulty: multiplayerDifficulty,
        timeLimit: multiplayerTimeLimit,
        challengeType: multiplayerChallengeType,
      });
      setMultiplayerModalOpen(false);

      setTimeout(() => {
        setMultiplayerDifficulty("");
        setMultiplayerTimeLimit("");
        setMultiplayerChallengeType("");
      }, 300);
    }
  };

  return (
    <div className='bg-black text-white'>
      <header className='border-b border-gray-800/50 backdrop-blur-sm bg-black/80 sticky top-0 z-50'>
        <div className='container mx-auto px-6 py-4 flex items-center justify-between'>
          <Link href={"/dashboard"}>
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <Code2 className='h-8 w-8 text-emerald-400' />
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse' />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                FitItFast
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4'>
            <Button
              onClick={() => setModalOpen(true)}
              className='bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
              Start a SinglePlayer Challenge
            </Button>
            <Button
              onClick={() => setMultiplayerModalOpen(true)}
              className='bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
              Start a Multiplayer Challenge
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
                onClick={() => setModalOpen(true)}
                className='w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
                Start a SinglePlayer Challenge
              </Button>
              <Button
                onClick={() => setMultiplayerModalOpen(true)}
                className='w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold'>
                Start a Multiplayer Challenge
              </Button>
            </div>
          </div>
        )}
      </header>

      <SinglePlayerModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        timeLimit={timeLimit}
        setTimeLimit={setTimeLimit}
        challengeType={challengeType}
        setChallengeType={setChallengeType}
        onStartChallenge={handleStartChallenge}
      />

      <MultiplayerModal
        isOpen={multiplayerModalOpen}
        onOpenChange={setMultiplayerModalOpen}
        difficulty={multiplayerDifficulty}
        setDifficulty={setMultiplayerDifficulty}
        timeLimit={multiplayerTimeLimit}
        setTimeLimit={setMultiplayerTimeLimit}
        challengeType={multiplayerChallengeType}
        setChallengeType={setMultiplayerChallengeType}
        onStartChallenge={handleStartMultiplayerChallenge}
      />
    </div>
  );
};

export default DashboardNavbar;
