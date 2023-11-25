import { PrintForm } from '@/components/forms/print';
import { getRoundsById } from '@/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const round = await getRoundsById(id);
  return round ? <PrintForm {...round} /> : <div>No Results Found</div>;
}
