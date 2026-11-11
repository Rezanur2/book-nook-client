"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { XIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const toast = ToastPrimitive.createToastManager()

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed top-4 right-0 bottom-auto left-0 z-100 mx-auto w-auto max-w-sm px-4 outline-none sm:w-full",
        className
      )}
      {...props}
    />
  )
}

const toastTypeVariants: Record<string, string> = {
  success: "border-emerald-200/90 bg-[#F4FAF6]/98 text-emerald-950 shadow-emerald-950/5",
  error: "border-rose-200/90 bg-[#FDF3F3]/98 text-rose-950 shadow-rose-950/5",
  warning: "border-amber-200/90 bg-[#FFFBF0]/98 text-amber-950 shadow-amber-950/5",
  info: "border-[#E6E0D6] bg-[#FCFBF8]/98 text-[#292521] shadow-stone-900/10",
  loading: "border-[#762F3D]/25 bg-[#FAF8F3]/98 text-[#292521] shadow-stone-900/10",
}

function Toast({
  className,
  type,
  ...props
}: ToastPrimitive.Root.Props & { type?: string }) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      swipeDirection="up"
      className={cn(
        "group/toast pointer-events-auto absolute top-0 right-0 left-0 z-[calc(1000-var(--toast-index))] mx-auto w-full origin-top rounded-2xl border backdrop-blur-md shadow-xl will-change-transform outline-none select-none",
        toastTypeVariants[type || ""] || "border-[#E6E0D6] bg-[#FCFBF8]/98 text-[#292521] shadow-stone-900/10",
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
        "h-(--height) transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
        "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-expanded:h-(--toast-height) data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-limited:opacity-0 data-starting-style:transform-[translateY(-150%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]",
        "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        className
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3.5 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-sm font-bold font-playfair leading-tight text-inherit", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-xs opacity-80 leading-relaxed text-inherit", className)}
      {...props}
    />
  )
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  render = <Button variant="ghost" size="icon-sm" />,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        "relative shrink-0 text-gray-400 hover:text-gray-700 hover:bg-[#FAF8F3] rounded-lg p-1 transition-colors",
        className
      )}
      {...props}
    >
      {children ?? (
        <XIcon className="w-3.5 h-3.5" aria-hidden="true" />
      )}
    </ToastPrimitive.Close>
  )
}

function ToastIcon({ type }: { type: string | undefined }) {
  if (type === "success") {
    return (
      <span
        data-slot="toast-icon"
        className="shrink-0 w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-2xs"
      >
        <CircleCheckIcon className="w-4 h-4" aria-hidden="true" />
      </span>
    )
  }

  if (type === "error") {
    return (
      <span
        data-slot="toast-icon"
        className="shrink-0 w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-2xs"
      >
        <OctagonXIcon className="w-4 h-4" aria-hidden="true" />
      </span>
    )
  }

  if (type === "warning") {
    return (
      <span
        data-slot="toast-icon"
        className="shrink-0 w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-2xs"
      >
        <TriangleAlertIcon className="w-4 h-4" aria-hidden="true" />
      </span>
    )
  }

  if (type === "loading") {
    return (
      <span
        data-slot="toast-icon"
        className="shrink-0 w-8 h-8 rounded-xl bg-[#762F3D]/10 border border-[#762F3D]/20 flex items-center justify-center text-[#762F3D] shadow-2xs"
      >
        <Loader2Icon className="w-4 h-4 animate-spin text-[#762F3D]" aria-hidden="true" />
      </span>
    )
  }

  if (type === "info") {
    return (
      <span
        data-slot="toast-icon"
        className="shrink-0 w-8 h-8 rounded-xl bg-[#FAF8F3] border border-[#E6E0D6] flex items-center justify-center text-[#762F3D] shadow-2xs"
      >
        <InfoIcon className="w-4 h-4 text-[#762F3D]" aria-hidden="true" />
      </span>
    )
  }

  return null
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem} type={toastItem.type}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ))
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
}
