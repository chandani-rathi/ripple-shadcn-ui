# Ripple Tailwindcss Template
Starter Ripple template with tailwindcss and shadcn ui support.

### Installation
```bash
npx degit chandani-rathi/ripple-starter-templates/tailwindcss hello-ripple
```

# Button
Customize a button or a component that looks like a button.

### Installation
```bash
npx shadcn@latest add https://chandani-rathi.github.io/ripple-shadcn-ui/r/button.json
```

## Code
```tsx
import { Button } from '@/components/ui/button.ripple';

export component ButtonDemo() {
   <div $class='w-full max-w-sm'>
         <Button $type='submit' $variant="default" $class='w-full'>{'Submit'}</Button>
   </div>
}
```
	
# Card
Customize a card with header, content, and footer.

### Installation
```bash
npx shadcn@latest add https://chandani-rathi.github.io/ripple-shadcn-ui/r/card.json
```
# Input
Customize a form input field or a component that looks like an input field.

### Installation
```bash
npx shadcn@latest add https://chandani-rathi.github.io/ripple-shadcn-ui/r/input.json
```

# Label
Renders an accessible label associated with fields.

### Installation
```bash
npx shadcn@latest add https://chandani-rathi.github.io/ripple-shadcn-ui/r/label.json
```