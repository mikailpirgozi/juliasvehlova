import type { ProcessStep } from '@/lib/services'

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps): JSX.Element {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={step.step} className="flex gap-6">
          {/* Step number */}
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              {step.step}
            </div>
            {index < steps.length - 1 && (
              <div className="mx-auto mt-2 h-12 w-0.5 bg-gray-200" />
            )}
          </div>

          {/* Step content */}
          <div className="flex-1 pb-8">
            <div className="flex items-baseline justify-between">
              <h4 className="font-serif text-xl font-bold text-gray-900">{step.title}</h4>
              {step.duration && (
                <span className="text-sm font-medium text-accent-gold">{step.duration}</span>
              )}
            </div>
            <p className="mt-2 text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

