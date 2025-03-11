"use client";

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';

export default function RoleSwitcher() {
  const [role, setRole] = useState<string>('customer');
  const router = useRouter();

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    router.push(`/dashboard/${newRole.toLowerCase()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Shield className="h-4 w-4 text-muted-foreground" />
      <Select value={role} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="customer">Customer</SelectItem>
          <SelectItem value="support">Support Agent</SelectItem>
          <SelectItem value="admin">Administrator</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}