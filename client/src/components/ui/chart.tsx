'use client';

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: Record<keyof typeof THEMES, string>
  }
}

type ChartContextProps = { config: ChartConfig }

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within a <ChartContainer />")
  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-slate-500 [&_.recharts-cartesian-grid_line]:stroke-slate-100 flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.theme || cfg.color)
  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) =>
            colorConfig
              .map(([key, itemConfig]) => {
                const color = itemConfig.theme?.[theme as keyof typeof THEMES] || itemConfig.color
                return color ? `${prefix} [data-chart=${id}] { --color-${key}: ${color}; }` : null
              })
              .filter(Boolean)
              .join("\n")
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  label,
  labelFormatter,
  labelClassName,
}: {
  active?: boolean
  payload?: Array<{ dataKey?: string | number; name?: string | number; value?: number; color?: string; payload?: Record<string, unknown> }>
  className?: string
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  label?: string
  labelFormatter?: (value: string, payload: unknown[]) => React.ReactNode
  labelClassName?: string
}) {
  const { config } = useChart()

  if (!active || !payload?.length) return null

  const tooltipLabel = (() => {
    if (hideLabel || !payload.length) return null
    if (labelFormatter) {
      return <div className={cn("font-medium mb-1", labelClassName)}>{labelFormatter(label ?? "", payload)}</div>
    }
    const labelFromConfig = label ? config[label]?.label || label : null
    if (!labelFromConfig) return null
    return <div className={cn("font-medium mb-1", labelClassName)}>{labelFromConfig}</div>
  })()

  return (
    <div className={cn("border border-slate-200 bg-white grid min-w-[8rem] items-start gap-1 rounded-lg px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {tooltipLabel}
      <div className="grid gap-1">
        {payload.map((item, index) => {
          const key = String(item.dataKey || item.name || "value")
          const itemConfig = config[key]
          const indicatorColor = item.color

          return (
            <div key={index} className={cn("flex w-full items-center gap-2", indicator === "dot" && "items-center")}>
              {!itemConfig?.icon && (
                <div
                  className={cn("shrink-0 rounded-[2px]", {
                    "h-2 w-2": indicator === "dot",
                    "w-1 h-3": indicator === "line",
                  })}
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <div className="flex flex-1 justify-between items-center leading-none">
                <span className="text-slate-500">{itemConfig?.label || item.name}</span>
                {item.value !== undefined && (
                  <span className="text-slate-900 font-mono font-medium tabular-nums ml-3">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  payload,
  verticalAlign = "bottom",
}: {
  className?: string
  payload?: Array<{ value?: string; color?: string; dataKey?: string | number }>
  verticalAlign?: "top" | "bottom"
}) {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
      {payload.map((item, i) => {
        const key = String(item.dataKey || item.value || "value")
        const itemConfig = config[key]

        return (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
            <span className="text-slate-500 text-xs">{itemConfig?.label || item.value}</span>
          </div>
        )
      })}
    </div>
  )
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
