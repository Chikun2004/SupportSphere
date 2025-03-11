# SupportSphere Styles Documentation

## Theme Configuration

### Color Scheme
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.75rem;
}
```

### Dark Mode Colors
```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  /* ... other dark mode variables */
}
```

## Animation Effects

### Card 3D Effect
```css
.card-3d {
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
}

.card-3d:hover {
  transform: translateY(-12px) rotateX(10deg) rotateY(10deg) scale(1.05);
  box-shadow: 
    20px 20px 60px rgba(0, 0, 0, 0.2),
    -20px -20px 60px rgba(255, 255, 255, 0.1),
    inset 0 0 60px rgba(var(--primary), 0.1);
}
```

### Floating Animation
```css
.floating {
  animation: floating 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  transform-origin: center;
  filter: drop-shadow(0 0 8px rgba(var(--primary), 0.3));
}

@keyframes floating {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-12px) rotate(5deg) scale(1.05); }
  75% { transform: translateY(8px) rotate(-3deg) scale(0.95); }
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)) 0%,
    hsl(var(--ring)) 25%,
    hsl(var(--primary)) 50%,
    hsl(var(--ring)) 75%,
    hsl(var(--primary)) 100%
  );
  background-size: 400% 400%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradient 8s ease infinite;
}
```

### Glass Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}
```

### Shine Effect
```css
.shine {
  position: relative;
  overflow: hidden;
}

.shine::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 30%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.08) 70%,
    transparent 100%
  );
  transform: rotate(45deg);
  animation: shine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
```

## Layout Utilities

### Perspective Container
```css
.perspective-container {
  perspective: 2000px;
  perspective-origin: center center;
  transform-style: preserve-3d;
}
```

### Button Hover Effect
```css
.button-hover {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.button-hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  transform: translateX(-100%) rotate(45deg);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Grid System
```css
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

## Best Practices

### Performance
- Use `will-change` sparingly
- Optimize animations with `transform` and `opacity`
- Utilize hardware acceleration
- Minimize repaints

### Accessibility
- Maintain color contrast ratios
- Provide focus styles
- Support reduced motion
- Ensure readable text sizes