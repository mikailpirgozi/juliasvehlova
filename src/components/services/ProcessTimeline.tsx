import type { ProcessStep } from '@/lib/services'

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.step} className="flex gap-4">
          {/* Step number */}
          <div className="flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-medium text-white">
              {step.step}
            </div>
            {index < steps.length - 1 && (
              <div className="mx-auto mt-1 h-full w-0.5 bg-gray-200" />
            )}
          </div>

          {/* Step content */}
          <div className="flex-1 pb-6">
            <div className="flex items-baseline justify-between">
              <h4 className="font-semibold text-gray-900">{step.title}</h4>
              {step.duration && (
                <span className="text-sm text-gray-500">{step.duration}</span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
