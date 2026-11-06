import { Check, ClipboardCheck, UserRoundCheck } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/Heading'
import { PhotoFrame } from '../../components/ui/PhotoFrame'
import { Reveal } from '../../components/ui/Reveal'
import { planaDocente, resumenPlana } from '../../content/docentes'
import { metodo } from '../../content/home'
import { photos } from '../../content/images'
import { PlanaDocente } from './PlanaDocente'

const plana = resumenPlana(planaDocente)

/** Capítulo 4 · cómo te preparamos: bento con la metodología, la plana real y los simulacros. */
export function MetodoChapter() {
  return (
    <section id="metodo" aria-labelledby="titulo-metodo" className="bg-hoja py-20 sm:py-28">
      <Container>
        <SectionHeading id="titulo-metodo" eyebrow={metodo.eyebrow} title={metodo.title} body={metodo.body} />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-6 lg:col-span-4 lg:row-span-2">
            <DocentesCard />
          </Reveal>
          <Reveal index={1} className="md:col-span-3 lg:col-span-2">
            <NivelesCard />
          </Reveal>
          <Reveal index={2} className="md:col-span-3 lg:col-span-2">
            <TutorCard />
          </Reveal>
          <Reveal index={3} className="md:col-span-6">
            <SimulacrosCard />
          </Reveal>
        </div>

        <Reveal as="ul" className="mt-8 flex flex-wrap gap-2.5">
          {metodo.extras.map((extra) => (
            <li key={extra} className="inline-flex items-center gap-2 rounded-full border border-linea bg-hoja px-4 py-2 text-sm font-semibold text-grafito">
              <Check aria-hidden="true" className="size-4 text-acento" strokeWidth={2.6} />
              {extra}
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}

function DocentesCard() {
  return (
    // La foto (5:3, tres docentes) va arriba a lo ancho: en una celda lateral la altura del texto la
    // recortaba hasta dejar solo a la docente del centro. Las áreas pasan a columnas para no alargar la tarjeta.
    <article className="lift flex h-full flex-col overflow-hidden rounded-3xl border border-linea bg-papel">
      <div className="aspect-[2/1] overflow-hidden bg-aula-50 lg:aspect-[5/2]">
        <PhotoFrame photo={photos.docentes} sizes="(min-width: 1024px) 60vw, 92vw" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-sm">
            <h3 className="text-2xl font-bold text-titulo">{metodo.docentes.title}</h3>
            <p className="mt-2 text-grafito-600">{metodo.docentes.body}</p>
          </div>
          <p className="font-display text-4xl font-extrabold text-acento">
            {plana.docentes} <span className="text-lg font-bold text-titulo">docentes en {plana.cursos} cursos</span>
          </p>
        </div>
        <dl className="mt-6 grid gap-x-6 gap-y-3 text-sm text-grafito-600 sm:grid-cols-3">
          {planaDocente.map((area) => (
            <div key={area.area}>
              <dt className="font-bold text-grafito">{area.area}</dt>
              <dd className="mt-0.5">{area.cursos.map((c) => c.name).join(' · ')}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto pt-5">
          <PlanaDocente />
        </div>
      </div>
    </article>
  )
}

function NivelesCard() {
  return (
    <article className="cuadricula-azul flex h-full flex-col justify-between gap-8 rounded-3xl p-7 text-white">
      <div>
        <h3 className="text-sm font-bold tracking-[0.16em] text-white/80 uppercase">{metodo.niveles.label}</h3>
        <ol className="mt-4 flex flex-wrap items-center gap-2 font-display text-2xl font-extrabold">
          {metodo.niveles.items.map((nivel, index) => (
            <li key={nivel} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-white/50">→</span>}
              {nivel}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="text-sm font-bold tracking-[0.16em] text-white/80 uppercase">{metodo.areas.label}</h3>
        <ul className="mt-4 flex gap-3">
          {metodo.areas.items.map((area) => (
            <li key={area} className="grid h-12 min-w-16 place-items-center rounded-full border-2 border-white px-4 font-display text-xl font-extrabold">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/** El "1" grande repite el título como dibujo (aria-hidden) y llena la altura que le toque en la fila. */
function TutorCard() {
  return (
    <article className="lift flex h-full flex-col rounded-3xl border border-linea bg-papel p-7">
      <UserRoundCheck aria-hidden="true" className="size-8 text-acento" />
      <h3 className="mt-5 text-2xl font-bold text-titulo">{metodo.tutor.title}</h3>
      <p className="mt-2 text-grafito-600">{metodo.tutor.body}</p>
      <div aria-hidden="true" className="relative mt-auto flex items-end gap-3 self-start pt-6 pb-4">
        <span className="font-display text-8xl leading-[0.8] font-extrabold text-acento">1</span>
        <span className="pr-1 pb-1 text-sm leading-tight font-bold text-grafito-600">
          tutor
          <br />
          por salón
        </span>
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-3 w-full overflow-visible">
          <path d="M2 7 C 25 3, 55 2, 98 5" fill="none" stroke="var(--color-menta)" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </article>
  )
}

/** Las barras son proporcionales a la duración publicada de cada parte (1 h y 2 h). Desde lg ocupa toda la fila: texto a la izquierda, barras a la derecha. */
function SimulacrosCard() {
  return (
    <article className="lift grid h-full gap-x-12 rounded-3xl border border-linea bg-papel p-7 lg:grid-cols-2 lg:items-end">
      <div>
        <ClipboardCheck aria-hidden="true" className="size-8 text-acento" />
        <h3 className="mt-5 text-2xl font-bold text-titulo">{metodo.simulacros.title}</h3>
        <p className="mt-2 text-grafito-600">{metodo.simulacros.body}</p>
      </div>
      <div>
        <div className="mt-6 flex gap-1.5" aria-hidden="true">
          <span className="h-3 flex-1 rounded-full bg-menta" />
          <span className="h-3 flex-2 rounded-full bg-aula" />
        </div>
        <dl className="mt-3 flex gap-1.5 text-sm">
          {metodo.simulacros.parts.map((part, index) => (
            <div key={part.label} className={index === 0 ? 'flex-1' : 'flex-2'}>
              <dt className="font-bold text-titulo">{part.label}</dt>
              <dd className="text-grafito-600">{part.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
