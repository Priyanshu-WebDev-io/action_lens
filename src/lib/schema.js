import { z } from 'zod';

export const ActionItemSchema = z.object({
  id: z.string().default(''),
  title: z.string(),
  description: z.string().optional().default(''),
  category: z.string().optional().default('General'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  isCompleted: z.boolean().default(false),
  estimatedTime: z.string().optional(),
});

export const DeadlineSchema = z.object({
  id: z.string().default(''),
  title: z.string(),
  date: z.string(),
  time: z.string().optional().default(''),
  isStrict: z.boolean().default(true),
  notes: z.string().optional().default(''),
  urgency: z.enum(['imminent', 'upcoming', 'standard']).default('upcoming'),
});

export const RequirementSchema = z.object({
  id: z.string().default(''),
  name: z.string(),
  format: z.string().optional().default(''),
  details: z.string().optional().default(''),
  mandatory: z.boolean().default(true),
});

export const DependencyStepSchema = z.object({
  id: z.string().default(''),
  stepNumber: z.number().default(1),
  title: z.string(),
  prerequisiteFor: z.string().optional().default(''),
  details: z.string().optional().default(''),
});

export const WarningSchema = z.object({
  id: z.string().default(''),
  title: z.string(),
  consequence: z.string().optional().default(''),
  severity: z.enum(['critical', 'warning', 'info']).default('warning'),
});

export const CustomSectionItemSchema = z.object({
  id: z.string().default(''),
  label: z.string(),
  value: z.string(),
  tag: z.string().optional().default(''),
});

export const CustomSectionSchema = z.object({
  id: z.string().default(''),
  title: z.string(),
  subtitle: z.string().optional().default(''),
  items: z.array(CustomSectionItemSchema).default([]),
});

export const SectionHeadingsSchema = z.object({
  actions: z.object({
    title: z.string().default('What You Need To Do'),
    subtitle: z.string().default('Actionable checklist for this document'),
  }).default({ title: 'What You Need To Do', subtitle: 'Actionable checklist for this document' }),
  deadlines: z.object({
    title: z.string().default('Deadlines & Timeline'),
    subtitle: z.string().default('Critical dates and schedule cutoffs'),
  }).default({ title: 'Deadlines & Timeline', subtitle: 'Critical dates and schedule cutoffs' }),
  requirements: z.object({
    title: z.string().default('Required Items & Proofs'),
    subtitle: z.string().default('Assets, documents, and specifications'),
  }).default({ title: 'Required Items & Proofs', subtitle: 'Assets, documents, and specifications' }),
  dependencies: z.object({
    title: z.string().default('Sequential Order & Prerequisites'),
    subtitle: z.string().default('Step-by-step workflow requirements'),
  }).default({ title: 'Sequential Order & Prerequisites', subtitle: 'Step-by-step workflow requirements' }),
  warnings: z.object({
    title: z.string().default('Important Advisories & Rules'),
    subtitle: z.string().default('Penalties, conditions, and closure notices'),
  }).default({ title: 'Important Advisories & Rules', subtitle: 'Penalties, conditions, and closure notices' }),
}).default({});

export const ActionPlanSchema = z.object({
  documentTitle: z.string(),
  documentType: z.string().optional().default('Notice'),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  sectionHeadings: SectionHeadingsSchema,
  actions: z.array(ActionItemSchema).default([]),
  deadlines: z.array(DeadlineSchema).default([]),
  requirements: z.array(RequirementSchema).default([]),
  dependencies: z.array(DependencyStepSchema).default([]),
  warnings: z.array(WarningSchema).default([]),
  customSections: z.array(CustomSectionSchema).default([]),
  suggestedQuestions: z.array(z.string()).default([]),
});
