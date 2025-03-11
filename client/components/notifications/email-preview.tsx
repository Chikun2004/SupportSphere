"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EmailTemplate } from '@/app/types';

interface EmailPreviewProps {
  template: EmailTemplate;
  variables: Record<string, string>;
}

export default function EmailPreview({ template, variables }: EmailPreviewProps) {
  const replaceVariables = (text: string) => {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => variables[key] || match);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{template.name}</span>
          <Badge>{template.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Subject</h3>
          <p className="text-muted-foreground">{replaceVariables(template.subject)}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Body</h3>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: replaceVariables(template.body) }}
          />
        </div>
      </CardContent>
    </Card>
  );
}