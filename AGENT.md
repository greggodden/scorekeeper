# PROJECT INSTRUCTIONS

You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI and Tailwind.

## Process
- Use Cursor's Plan Mode to create a structured, detailed plan, before generating any code.
- Utilize other .md files in this project for additional direction.
- If a prompt is not clear, ask for clarification before generating any code.
- Anticipate my needs; Suggest solutions I may not have considered.
- Leave no to-dos or placeholders.
- When dependencies are identified, prompt me to install them.

## Key Priciples

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Prefix event handlers with "handle" (handleClick, handleSubmit)
- Structure files: exported component, subcomponents, helpers, static content, types.
- Favor named exports for components.
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Use the Receive an Object, Return an Object (RORO) pattern.

## JavaScript/TypeScript Usage

- Use "function" keyword for pure functions. Omit semicolons.
- Use TypeScript for all code. Prefer interfaces over types. Avoid enums, use maps.
- File structure: Exported component, subcomponents, helpers, static content, types.
- Avoid unnecessary curly braces in conditional statements.
- For single-line statements in conditionals, omit curly braces.
- Use concise, one-line syntax for simple conditional statements (e.g., if (condition) doSomething()).
- Prioritize error handling and edge cases:
  - Handle errors and edge cases at the beginning of functions.
  - Use early returns for error conditions to avoid deeply nested if statements.
  - Place the happy path last in the function for improved readability.
  - Avoid unnecessary else statements; use if-return pattern instead.
  - Use guard clauses to handle preconditions and invalid states early.
  - Implement proper error logging and user-friendly error messages.
  - Consider using custom error types or error factories for consistent error handling.

## React/Next.js Usage

- Use functional components and TypeScript interfaces.
- Use declarative JSX.
- Use function, not const, for components.
- Place static content and interfaces at file end.
- Use content variables for static content outside render functions.
- Minimize 'use client', 'useEffect', and 'setState'. Favor RSC.
- Use Zod for form validation.
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: WebP format, size data, lazy loading.
- Model expected errors as return values: Avoid using try/catch for expected errors in Server Actions. Use useActionState to manage these errors and return them to the client.
- Use error boundaries for unexpected errors: Implement error boundaries using error.tsx and global-error.tsx files to handle unexpected errors and provide a fallback UI.
- Use useActionState with react-hook-form for form validation.
- Code in services/ dir always throw user-friendly errors that tanStackQuery can catch and show to the user.
- Use next-safe-action for all server actions:
  - Implement type-safe server actions with proper validation.
  - Utilize the `action` function from next-safe-action for creating actions.
  - Define input schemas using Zod for robust type checking and validation.
  - Handle errors gracefully and return appropriate responses.
  - Use import type { ActionResponse } from '@/types/actions'
  - Ensure all server actions return the ActionResponse type
  - Implement consistent error handling and success responses using ActionResponse
  - Example:
    ```typescript
    'use server'
    import { createSafeActionClient } from 'next-safe-action'
    import { z } from 'zod'
    import type { ActionResponse } from '@/app/actions/actions'
    const schema = z.object({
      value: z.string()
    })
    export const someAction = createSafeActionClient()
      .schema(schema)
      .action(async (input): Promise => {
        try {
          // Action logic here
          return { success: true, data: /* result */ }
        } catch (error) {
          return { success: false, error: error instanceof AppError ? error : appErrors.UNEXPECTED_ERROR, }
        }
      })
    ```

## Tailwind/Shadcn UI/Radix UI Usage

- Use Shadcn UI, Radix, and Tailwind Aria for components and styling.
- Implement responsive design with Tailwind CSS.
- Use mobile-first approach for responsive design.
- Utilize Tailwind's utility classes directly in the markup.

## Key Conventions

- Rely on Next.js App Router for state changes.
- Use 'nuqs' for URL search parameter state management.
- Prioritize Web Vitals (LCP, CLS, FID).
- Minimize 'use client' usage:
  - Prefer server components and Next.js SSR features.
  - Use 'use client' only for Web API access in small components.
  - Avoid using 'use client' for data fetching or state management.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.
- Use env variables to manage secrets.
- Exclude env variables from Git.
- Focus on readibility over being performant.
- Clearly comment all code.

Refer to Next.js documentation for Data Fetching, Rendering, and Routing best practices.