"use client"

import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react"
import { dracula } from "@codesandbox/sandpack-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Code, Zap, Maximize2, Minimize2 } from "lucide-react"
import { SubmitButton } from "./submit-button"

export default function CodeEditorWithPreview({
  difficulty,
  time,
  language,
}: {
  difficulty: string
  time: string
  language: string
}) {
  const [template, setTemplate] = useState()
  const [files, setFiles] = useState()
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [userFiles, setUserFiles] = useState({})
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams({
      difficulty: difficulty.toString(),
      language: language.toString(),
    })

    const fetchChallenge = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/challenge/getChallenge?${queryParams}`)
        const data = await response.json()
        const challenge = data.challenge
        setTemplate(challenge.template)
        setFiles(challenge.files)
        setTitle(challenge.title)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChallenge()
  }, [difficulty, language])

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-green-900/20 text-green-400 border-green-800"
      case "medium":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-800"
      case "hard":
        return "bg-red-900/20 text-red-400 border-red-800"
      default:
        return "bg-gray-800 text-gray-300 border-gray-700"
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-7xl mx-auto bg-gray-900 border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2 text-gray-100">
              <Code className="h-6 w-6" />
              Code Challenge
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="h-6 w-16 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[600px] bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-gray-400 flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
              Loading challenge...
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-gray-900" : "w-full max-w-7xl mx-auto"}`}>
      <Card className="w-full shadow-2xl bg-gray-900 border-gray-800 h-full max-w-7xl">
        <CardHeader className="pb-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-lg border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-gray-100">
                <Code className="h-6 w-6 text-blue-400" />
                Code Challenge
              </CardTitle>
              {title && <h2 className="text-lg text-gray-300 font-medium">{title}</h2>}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-gray-400 hover:text-gray-200"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Badge variant="outline" className={`${getDifficultyColor(difficulty.toString())} font-medium`}>
                <Zap className="h-3 w-3 mr-1" />
                {difficulty.toString()}
              </Badge>
              <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
                <Clock className="h-3 w-3 mr-1" />
                {time.toString()}
              </Badge>
              <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-800">
                <Code className="h-3 w-3 mr-1" />
                {language.toString()}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 bg-gray-900 flex-1">
          {files && template ? (
            <div className="rounded-lg overflow-hidden border border-gray-700 shadow-lg mb-6">
              <SandpackProvider
                template={template}
                files={files}
                theme={dracula}
                options={{
                  recompileMode: "delayed",
                  recompileDelay: 300,
                }}
              >
                <SandpackLayout>
                  <SandpackCodeEditor
                    showTabs
                    showLineNumbers
                    style={{
                      height: 500,
                      flex: 2,
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <SandpackPreview
                      style={{
                        height: 350,
                        flex: 1,
                      }}
                    />
                    <SandpackConsole
                      style={{
                        height: 150,
                        borderTop: "1px solid #374151",
                      }}
                    />
                  </div>
                </SandpackLayout>
                <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                  <SubmitButton />
                </div>
              </SandpackProvider>
            </div>
          ) : (
            <div className="w-full h-[600px] bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-gray-400 flex items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                Loading editor...
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
