import { z } from 'zod';

export const ActionItemSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  title: z.string(),
  description: z.string().optional().default(''),
  category: z.string().optional().default('General'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  isCompleted: z.boolean().default(false),
  estimatedTime: z.string().optional(),
});

export const DeadlineSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  title: z.string(),
  date: z.string(),
  time: z.string().optional().default(''),
  isStrict: z.boolean().default(true),
  notes: z.string().optional().default(''),
  urgency: z.enum(['imminent', 'upcoming', 'standard']).default('upcoming'),
});

export const RequirementSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  name: z.string(),
  format: z.string().optional().default(''),
  details: z.string().optional().default(''),
  mandatory: z.boolean().default(true),
});

export const DependencyStepSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  stepNumber: z.number(),
  title: z.string(),
  prerequisiteFor: z.string().optional().default(''),
  details: z.string().optional().default(''),
});

export const WarningSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  title: z.string(),
  consequence: z.string().optional().default(''),
  severity: z.enum(['critical', 'warning', 'info']).default('warning'),
});

export const ActionPlanSchema = z.object({
  documentTitle: z.string(),
  documentType: z.string().optional().default('Notice'),
  summary: z.string(),
  actions: z.array(ActionItemSchema).default([]),
  deadlines: z.array(DeadlineSchema).default([]),
  requirements: z.array(RequirementSchema).default([]),
  dependencies: z.array(DependencyStepSchema).default([]),
  warnings: z.array(WarningSchema).default([]),
  suggestedQuestions: z.array(z.string()).default([]),
});
