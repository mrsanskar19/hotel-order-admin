"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [value, setValue] = React.useState(props.defaultValue || [0])
  const isCompleted = value[0] === 100

  return (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
     onValueChange={setValue}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-10 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary/20" />
       {!isCompleted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-sm font-medium text-primary/80 transition-opacity"
            style={{ opacity: 1 - value[0] / 80 }}
          >
            Slide to Complete
          </span>
        </div>
      )}
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-10 w-10 rounded-full border-2 border-primary bg-background ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center">
        <ChevronRight className="h-6 w-6 text-primary transition-transform duration-200 group-hover:translate-x-1" />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
)})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
