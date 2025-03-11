# SupportSphere Components Documentation

## Core Components

### Chat Components

#### ChatWindow
```typescript
import ChatWindow from '@/components/chat/chat-window';

<ChatWindow
  currentUser={user}
  recipientUser={agent}
  onSendMessage={handleMessage}
/>
```

Features:
- Real-time messaging
- File attachments
- Message history
- Typing indicators

#### SLATimer
```typescript
import SLATimer from '@/components/tickets/sla-timer';

<SLATimer ticket={ticket} />
```

Features:
- Real-time countdown
- Priority-based timing
- Visual progress
- Breach indicators

#### PriorityBadge
```typescript
import PriorityBadge from '@/components/tickets/priority-badge';

<PriorityBadge priority="high" />
```

Features:
- Priority-based colors
- Icon indicators
- Accessibility support

### Dashboard Components

#### RoleSwitcher
```typescript
import RoleSwitcher from '@/components/dashboard/role-switcher';

<RoleSwitcher />
```

Features:
- Role-based navigation
- Permission handling
- Dynamic routing

### Notification Components

#### EmailPreview
```typescript
import EmailPreview from '@/components/notifications/email-preview';

<EmailPreview
  template={template}
  variables={variables}
/>
```

Features:
- Template preview
- Variable substitution
- HTML rendering

## UI Components

### Button
```typescript
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
  Click me
</Button>
```

Variants:
- default
- destructive
- outline
- secondary
- ghost
- link

### Card
```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### Dialog
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Content
  </DialogContent>
</Dialog>
```

## Animation Components

### Motion Container
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

<motion.div
  initial="hidden"
  animate="show"
  variants={container}
>
  {children}
</motion.div>
```

### Motion Item
```typescript
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={item}>
  {content}
</motion.div>
```

## Layout Components

### NavBar
```typescript
import NavBar from '@/components/nav-bar';

<NavBar />
```

Features:
- Responsive design
- Dynamic navigation
- User menu
- Theme toggle

### BackButton
```typescript
import BackButton from '@/components/back-button';

<BackButton />
```

Features:
- Context-aware navigation
- History management
- Custom routing

## Form Components

### Input
```typescript
import { Input } from '@/components/ui/input';

<Input
  type="text"
  placeholder="Enter text"
  value={value}
  onChange={handleChange}
/>
```

### Select
```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option">Option</SelectItem>
  </SelectContent>
</Select>
```

### Textarea
```typescript
import { Textarea } from '@/components/ui/textarea';

<Textarea
  placeholder="Enter text"
  value={value}
  onChange={handleChange}
/>
```

## Utility Components

### Toast
```typescript
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed"
});
```

### Loading
```typescript
<div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
```

## CSS Utilities

### Animation Classes
- `card-3d`: 3D card effect
- `floating`: Floating animation
- `gradient-text`: Gradient text effect
- `glass`: Glass morphism effect
- `shine`: Shine effect
- `hover-lift`: Hover animation
- `glow`: Glow effect
- `button-hover`: Button hover animation

### Layout Classes
- `perspective-container`: 3D perspective container
- `parallax-layer`: Parallax effect
- `ripple`: Ripple effect

## Best Practices

### Performance
- Use memo for expensive computations
- Lazy load components when possible
- Optimize re-renders
- Use proper key props

### Accessibility
- Include ARIA labels
- Support keyboard navigation
- Maintain focus management
- Provide alternative text

### State Management
- Use appropriate state level
- Implement proper error handling
- Handle loading states
- Maintain data consistency