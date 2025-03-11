import TicketDetailWrapper from './ticket-detail-wrapper';

// This generates the static paths for the tickets at build time
export async function generateStaticParams() {
  // For now, we'll hardcode some ticket IDs
  // In a real app, this would fetch from your database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

// Prevent dynamic routes - only allow static paths
export const dynamicParams = false;

export default function TicketPage({ params }: { params: { id: string } }) {
  return <TicketDetailWrapper id={params.id} />;
}