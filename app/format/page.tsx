'use client';
import FormatTemplate from '@/components/template';
import { PlayersData } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
export default function Page() {
  const searchParams = useSearchParams();
  const jugadorA = searchParams.get('jugadorA')!;
  const jugadorB = searchParams.get('jugadorB')!;
  const jugadorC = searchParams.get('jugadorC')!;
  const doblesC = searchParams.get('doblesC')!;
  const jugadorX = searchParams.get('jugadorX')!;
  const jugadorY = searchParams.get('jugadorY')!;
  const jugadorZ = searchParams.get('jugadorZ')!;
  const doblesZ = searchParams.get('doblesZ')!;
  const ultimoA = searchParams.get('ultimoA')!;
  const ultimoX = searchParams.get('ultimoX')!;

  const data: PlayersData = {
    jugadorA,
    jugadorB,
    jugadorC,
    doblesC,
    jugadorX,
    jugadorY,
    jugadorZ,
    doblesZ,
    ultimoA,
    ultimoX,
  };
  return <FormatTemplate {...data} />;
}
//
