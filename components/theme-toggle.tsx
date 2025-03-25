"use client"

import * as React from "react"
import { Moon } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  // Set dark theme by default
  React.useEffect(() => {
    setTheme("dark")
  }, [setTheme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px] rounded-none">
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="font-mono text-sm cursor-default rounded-none"
        >
          dark mode only
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
