'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Round } from '@/lib/types';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const formatSchema = z.object({
  roundName: z.string(),
  roundType: z.string(),
  tablesCount: z.string(),
  description: z.string().optional(),
  formats: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Tienes que seleccionar al menos uno de los formatos',
  }),
  players: z
    .array(
      z.object({
        value: z.string().optional(),
        placeholder: z.string().optional(),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof formatSchema>;

const formats = [
  {
    id: 'matches',
    label: 'Formato de partidos',
  },
  {
    id: 'captain',
    label: 'Formato de capitanes',
  },
] as const;

export function PrintForm({ players, title, type, id }: Round) {
  const router = useRouter();
  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    roundName: title,
    roundType: type,
    formats: [],
    players: [
      { value: '', placeholder: 'Jugador A' },
      { value: '', placeholder: 'Jugador B' },
      { value: '', placeholder: 'Jugador C' },
      { value: '', placeholder: 'Dobles C & (A o B)' },
      { value: '', placeholder: 'Jugador X' },
      { value: '', placeholder: 'Jugador Y' },
      { value: '', placeholder: 'Jugador Z' },
      { value: '', placeholder: 'Dobles Z & (X o Y)' },
      { value: '', placeholder: 'Ultimo A' },
      { value: '', placeholder: 'Ultimo X' },
    ],
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formatSchema),
    defaultValues,
    mode: 'onSubmit',
  });
  useEffect(() => {
    const resetDefaults: Partial<ProfileFormValues> = {
      players: [
        { value: players[0], placeholder: 'Jugador A' },
        { value: players[1], placeholder: 'Jugador B' },
        { value: players[2], placeholder: 'Jugador C' },
        { value: players[3], placeholder: 'Dobles C & (A o B)' },
        { value: players[4], placeholder: 'Jugador X' },
        { value: players[5], placeholder: 'Jugador Y' },
        { value: players[6], placeholder: 'Jugador Z' },
        { value: players[7], placeholder: 'Dobles Z & (X o Y)' },
      ],
    };
    form.reset(resetDefaults);
  }, [players, form, title, type]);

  const { fields, append } = useFieldArray({
    name: 'players',
    control: form.control,
  });

  const roundType = useWatch({ control: form.control, name: 'roundType' });

  async function onSubmit(data: ProfileFormValues) {
    console.log('data', data);
    console.log('done');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='roundName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input
                  placeholder='ex. Categoria A, Jornada #1'
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='roundType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de jornada</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccióna el tipo de jornada' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='singles'>Individual</SelectItem>
                  <SelectItem value='doubles'>Dobles</SelectItem>
                  <SelectItem value='teams'>Por Equipos</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Puedes conocer más sobre los tipos de torneos en las
                configuraciones.
                {/* <Link href='/examples/forms'>email settings</Link>. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {roundType === 'teams' && (
          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`players.${index}.value`}
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Lista de Jugadores
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Configurar jugadores del equipo A.
                    </FormDescription>
                    <FormDescription className={cn(index !== 4 && 'sr-only')}>
                      Configurar jugadores del equipo X.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={fields[index].placeholder}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name='tablesCount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad de Mesa</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccióna la cantidad' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='1'>Una mesa</SelectItem>
                  <SelectItem value='2'>Dos mesas</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Configura la cantidad de mesas sobre la que se jugara tu
                jornada.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='formats'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Formatos</FormLabel>
                <FormDescription>
                  Selecciona los tipos de formatos que quieres imprimir.
                </FormDescription>
              </div>
              {formats.map((format) => (
                <FormField
                  key={format.id}
                  control={form.control}
                  name='formats'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={format.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(format.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, format.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== format.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {format.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-4'>
          <Button type='submit'>Imprimir Formatos</Button>
          <Button type='button' variant='outline' onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
